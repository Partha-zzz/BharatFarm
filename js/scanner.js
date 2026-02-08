// ============================================
// SMART LEAF SCANNER & DISEASE DETECTOR
// ============================================

let mobileNetModel = null;
let isModelLoading = false;

// Initialize Scanner and Load Model
document.addEventListener('DOMContentLoaded', () => {
    initScannerDragDrop();
    loadModel();
});

async function loadModel() {
    try {
        isModelLoading = true;
        console.log('Loading MobileNet model...');
        mobileNetModel = await mobilenet.load();
        console.log('MobileNet model loaded successfully');
        isModelLoading = false;
    } catch (error) {
        console.error('Error loading model:', error);
        isModelLoading = false;
    }
}

function handleLeafUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = document.getElementById('leafPreviewImg');
            img.src = event.target.result;
            // storing original image for canvas processing
            img.onload = () => {
                document.getElementById('scannerPreview').style.display = 'block';
                document.getElementById('analyzeBtn').style.display = 'inline-flex';
                document.getElementById('scanResult').style.display = 'none';

                // Reset any previous error alerts
                const existingAlert = document.querySelector('.scanner-alert');
                if (existingAlert) existingAlert.remove();
            };
        };
        reader.readAsDataURL(file);
    }
}

function openCamera() {
    const input = document.getElementById('leafInput');
    input.setAttribute('capture', 'environment');
    input.click();
}

async function analyzeLeaf() {
    const img = document.getElementById('leafPreviewImg');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const loadingEl = document.getElementById('scanLoading');
    const resultEl = document.getElementById('scanResult');

    if (!mobileNetModel) {
        alert("AI Model is still loading. Please wait a moment and try again.");
        if (!isModelLoading) loadModel();
        return;
    }

    analyzeBtn.style.display = 'none';
    loadingEl.classList.remove('hidden');
    resultEl.style.display = 'none';

    // Clear previous debug info
    const prevDebug = document.getElementById('scanDebugInfo');
    if (prevDebug) prevDebug.remove();

    try {
        // Step 1: Object Detection
        const predictions = await mobileNetModel.classify(img);
        console.log('AI Predictions:', predictions);

        // --- DEBUGGING: Show user what AI sees ---
        const topPrediction = predictions[0].className;
        const debugDiv = document.createElement('div');
        debugDiv.id = 'scanDebugInfo';
        debugDiv.style.marginTop = '10px';
        debugDiv.style.fontSize = '0.9rem';
        debugDiv.style.color = '#666';
        debugDiv.innerHTML = `<strong>AI Detected:</strong> ${topPrediction} (${Math.round(predictions[0].probability * 100)}%)`;
        document.getElementById('scannerPreview').appendChild(debugDiv);
        // ------------------------------------------

        // EXTENDED KEYWORDS FOR IMAGENET (Since 'person' is not a class)
        const nonPlantKeywords = [
            // Clothing & Accessories
            'suit', 'tie', 'windsor tie', 'bow tie', 'shirt', 'jersey', 't-shirt', 'sweatshirt', 'cardigan',
            'jacket', 'coat', 'trench coat', 'lab coat', 'gown', 'pajama', 'kimono', 'wig', 'mask',
            'sunglasses', 'sunglass', 'spectacles', 'hat', 'cap', 'helmet', 'uniform', 'apron', 'bikini',
            'bra', 'skirt', 'stocking', 'sock', 'miniskirt', 'maillot',

            // Human Roles / Activities
            'groom', 'scuba diver', 'ballplayer', 'baseball player', 'basketball player', 'acrobat',
            'plunger', 'diaper', 'crutch', 'dumbbell', 'barbell',

            // Body parts (sometimes detected)
            'hair', 'face', 'ear', 'nose', 'mouth',

            // Common Objects often in selfies
            'mirror', 'monitor', 'screen', 'phone', 'cellphone', 'cellular telephone', 'ipod',
            'notebook', 'paper', 'pen', 'desk', 'chair', 'couch', 'sofa', 'bed'
        ];

        const isNonPlant = predictions.some(p =>
            nonPlantKeywords.some(keyword => p.className.toLowerCase().includes(keyword))
        );

        if (isNonPlant) {
            showError(`Detected "${topPrediction}". This does not look like a plant.`);
            loadingEl.classList.add('hidden');
            analyzeBtn.style.display = 'inline-flex';
            return;
        }

        const plantKeywords = ['leaf', 'plant', 'tree', 'flower', 'vegetable', 'fruit', 'cabbage', 'broccoli', 'corn', 'pot', 'grass', 'daisy', 'rose', 'herb', 'shrub', 'spinach', 'lettuce', 'fern', 'ivy', 'vine', 'agriculture', 'crop', 'potted plant', 'vase'];
        let isPlant = predictions.some(p =>
            plantKeywords.some(keyword => p.className.toLowerCase().includes(keyword))
        );

        // FALLBACK: Color Heuristic Check
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        let greenCount = 0;
        let totalCount = 0;

        for (let i = 0; i < data.length; i += 16) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            if (g > r && g > b && g > 60) greenCount++;
            totalCount++;
        }

        const greenRatio = greenCount / totalCount;
        console.log('Green Ratio:', greenRatio);

        // Append Green Ratio to Debug
        debugDiv.innerHTML += ` | <strong>Green Level:</strong> ${Math.round(greenRatio * 100)}%`;

        // Strict fallback: Needs 35% green to be considered potential plant if AI missed it
        if (!isPlant && greenRatio > 0.35) {
            console.log('AI uncertain but Green Ratio is significant. Allowing.');
            isPlant = true;
        }

        if (!isPlant) {
            showError(`Detected "${topPrediction}". No plant detected.`);
            loadingEl.classList.add('hidden');
            analyzeBtn.style.display = 'inline-flex';
            return;
        }

        // Step 2: Color Analysis for Disease Heuristics
        const diseaseResult = analyzeLeafHealth(img);

        // Step 3: Display Results
        displayResult(diseaseResult);
        loadingEl.classList.add('hidden');

    } catch (error) {
        console.error('Analysis error:', error);
        showError("An error occurred during analysis. Please try again.");
        loadingEl.classList.add('hidden');
        analyzeBtn.style.display = 'inline-flex';
    }
}

function analyzeLeafHealth(imgElement) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imgElement.naturalWidth || imgElement.width;
    canvas.height = imgElement.naturalHeight || imgElement.height;
    ctx.drawImage(imgElement, 0, 0);

    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = frame.data;
    const length = data.length;

    let greenPixels = 0;
    let yellowPixels = 0;
    let brownPixels = 0;
    let whitePixels = 0;
    let darkPixels = 0;
    let totalExamined = 0;

    for (let i = 0; i < length; i += 16) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Green: G is dominant
        if (g > r && g > b && g > 60) {
            greenPixels++;
        }
        // Yellow: R and G are high, B is low
        else if (r > 150 && g > 150 && b < 100) {
            yellowPixels++;
        }
        // Brown/Rust: R is dominant, but dark
        else if (r > g && r > b && r < 180 && r > 60) {
            brownPixels++;
        }
        // White/Gray (Mildew)
        else if (r > 180 && g > 180 && b > 180 && Math.abs(r - g) < 30) {
            whitePixels++;
        }
        // Dark/Black (Spots)
        else if (r < 60 && g < 60 && b < 60) {
            darkPixels++;
        }
        totalExamined++;
    }

    const greenRatio = greenPixels / totalExamined;
    const yellowRatio = yellowPixels / totalExamined;
    const brownRatio = brownPixels / totalExamined;
    const whiteRatio = whitePixels / totalExamined;
    const darkRatio = darkPixels / totalExamined;

    if (greenRatio > 0.45) return 'healthy';

    // Disease Determination
    if (whiteRatio > 0.05) return 'powdery_mildew';
    if (brownRatio > 0.1) return 'rust';
    if (yellowRatio > 0.1) return 'nutrient_deficiency';
    if (darkRatio > 0.05) return 'leaf_blight';

    const maxDisease = Math.max(whiteRatio, brownRatio, yellowRatio, darkRatio);
    if (maxDisease === whiteRatio) return 'powdery_mildew';
    if (maxDisease === brownRatio) return 'rust';
    if (maxDisease === yellowRatio) return 'nutrient_deficiency';
    if (maxDisease === darkRatio) return 'bacterial_spot';

    return 'healthy';
}

function displayResult(diseaseKey) {
    const result = diseaseDatabase[diseaseKey] || diseaseDatabase['healthy'];
    const resultSection = document.getElementById('scanResult');

    const statusEl = document.getElementById('diseaseStatus');
    const isHealthy = diseaseKey === 'healthy';

    statusEl.textContent = isHealthy ? 'Healthy Plant' : 'Issue Detected';
    statusEl.className = 'disease-badge ' + (isHealthy ? 'healthy' : 'diseased');

    document.getElementById('diseaseName').textContent = result.name;
    document.getElementById('diseaseDescription').textContent = result.description;

    const fertList = document.getElementById('fertilizerRecommendations');
    fertList.innerHTML = result.fertilizers.map(f =>
        `<div class="recommendation-item"><i class="fas fa-check-circle"></i><span>${f}</span></div>`
    ).join('');

    const treatList = document.getElementById('treatmentTips');
    treatList.innerHTML = result.treatments.map(t =>
        `<div class="recommendation-item"><i class="fas fa-check-circle"></i><span>${t}</span></div>`
    ).join('');

    resultSection.style.display = 'block';
}

function showError(message) {
    const preview = document.getElementById('scannerPreview');
    // Remove existing
    const existing = document.querySelector('.scanner-alert');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.className = 'scanner-alert';
    div.style.background = '#ffebee';
    div.style.color = '#c62828';
    div.style.padding = '10px';
    div.style.borderRadius = '8px';
    div.style.marginTop = '10px';
    div.style.fontWeight = 'bold';
    div.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;

    preview.appendChild(div);
}

// Drag and drop setup
function initScannerDragDrop() {
    const scannerBox = document.getElementById('scannerBox');
    if (scannerBox) {
        scannerBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            scannerBox.classList.add('dragover');
        });

        scannerBox.addEventListener('dragleave', () => {
            scannerBox.classList.remove('dragover');
        });

        scannerBox.addEventListener('drop', (e) => {
            e.preventDefault();
            scannerBox.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                document.getElementById('leafInput').files = e.dataTransfer.files;
                handleLeafUpload({ target: { files: [file] } });
            }
        });
    }
}
