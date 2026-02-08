// ============================================
// LEAF SCANNER FUNCTIONS
// ============================================

function handleLeafUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            document.getElementById('leafPreviewImg').src = event.target.result;
            document.getElementById('scannerPreview').style.display = 'block';
            document.getElementById('analyzeBtn').style.display = 'inline-flex';
            document.getElementById('scanResult').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

function openCamera() {
    const input = document.getElementById('leafInput');
    input.setAttribute('capture', 'environment');
    input.click();
}

function analyzeLeaf() {
    document.getElementById('scanLoading').classList.remove('hidden');
    document.getElementById('analyzeBtn').style.display = 'none';

    setTimeout(() => {
        const diseases = Object.keys(diseaseDatabase);
        const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
        const result = diseaseDatabase[randomDisease];

        const statusEl = document.getElementById('diseaseStatus');
        statusEl.textContent = randomDisease === 'healthy' ? 'Healthy' : 'Disease Detected';
        statusEl.className = 'disease-badge ' + (randomDisease === 'healthy' ? 'healthy' : 'diseased');

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

        document.getElementById('scanLoading').classList.add('hidden');
        document.getElementById('scanResult').style.display = 'block';
    }, 2000);
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
