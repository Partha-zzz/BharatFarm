// ============================================
// SMART LEAF SCANNER & DISEASE DETECTOR
// ============================================

let mobileNetModel = null;
let isModelLoading = false;


// Model is loaded once from the initialization chain
// (app.js calls initScannerDragDrop, scanner loads model on demand)


async function analyzeLeaf() {
    const imgElement = document.getElementById('leafPreviewImg');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const loadingEl = document.getElementById('scanLoading');
    const resultEl = document.getElementById('scanResult');

    analyzeBtn.style.display = 'none';
    loadingEl.classList.remove('hidden');
    resultEl.style.display = 'none';

    // Clear previous debug info
    const prevDebug = document.getElementById('scanDebugInfo');
    if (prevDebug) prevDebug.remove();

    try {
<<<<<<< HEAD
        console.log('Sending image to Gemini API...');
=======

>>>>>>> a7755fd2a3aa0207d4d297713660c27b66b4b548

        // 1. Get Base64 image data from the UI Image Element
        const base64Image = imgElement.src;

        // Extract mimetype and base64 payload
        const mimeMatch = base64Image.match(/data:(image\/\w+);base64,/);
        const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
        const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");

        // 2. Call our local Gemini endpoint
        let response;
        let retries = 1;
        while (retries >= 0) {
            try {
                // Production: Use backend proxy to protect API keys and apply verification logic
                response = await fetch('/api/analyze-leaf', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ mimeType, base64Image: cleanBase64 })
                });
                break;
            } catch (err) {
                if (retries === 0) throw err;
<<<<<<< HEAD
                console.log("Fetch failed, retrying in 2 seconds...");
=======
                console.warn("Fetch failed, retrying in 2 seconds...");
>>>>>>> a7755fd2a3aa0207d4d297713660c27b66b4b548
                await new Promise(r => setTimeout(r, 2000));
                retries--;
            }
        }

        if (!response.ok) {
            throw new Error(`Server returned Status: ${response.status}`);
        }

        const data = await response.json();
<<<<<<< HEAD
        console.log('Gemini Predictions:', data);
=======

>>>>>>> a7755fd2a3aa0207d4d297713660c27b66b4b548

        if (!data.success) {
            showError(data.error || "Could not analyze the leaf image.");
            loadingEl.classList.add('hidden');
            analyzeBtn.style.display = 'inline-flex';
            return;
        }

        const result = data.disease;

        // Display Results
        document.getElementById('scanResult').style.display = 'block';

        const statusEl = document.getElementById('diseaseStatus');
<<<<<<< HEAD
        const nameEl = document.getElementById('diseaseName');
        const fertHeader = document.getElementById('fertHeader');
        const treatHeader = document.getElementById('treatHeader');
        
        const isHealthy = result.status === 'healthy';
        
        // Defensive Safety Net: Check status, name, AND description for signs of a missed leaf
        const descLower = (result.description || "").toLowerCase();
        const nameLower = (result.name || "").toLowerCase();
        const isNonLeaf = result.status === 'non_leaf' || 
                          nameLower.includes('no leaf') || 
                          descLower.includes('does not contain') || 
                          descLower.includes('not a plant') ||
                          descLower.includes('shows a person');

        if (isNonLeaf) {
            statusEl.style.display = 'none';
            nameEl.style.display = 'none';
            if (fertHeader) fertHeader.style.display = 'none';
            if (treatHeader) treatHeader.style.display = 'none';
        } else {
            statusEl.style.display = 'inline-block';
            nameEl.style.display = 'block';
            if (fertHeader) fertHeader.style.display = 'block';
            if (treatHeader) treatHeader.style.display = 'block';
            
            statusEl.textContent = isHealthy ? 'Healthy Plant' : 'Issue Detected';
            statusEl.className = 'disease-badge ' + (isHealthy ? 'healthy' : 'diseased');
        }

        nameEl.textContent = result.name;
        document.getElementById('diseaseDescription').textContent = result.description;

        const fertList = document.getElementById('fertilizerRecommendations');
        if (result.fertilizers && Array.isArray(result.fertilizers) && !isNonLeaf) {
=======
        const isHealthy = result.status === 'healthy';

        statusEl.textContent = isHealthy ? 'Healthy Plant' : 'Issue Detected';
        statusEl.className = 'disease-badge ' + (isHealthy ? 'healthy' : 'diseased');

        document.getElementById('diseaseName').textContent = result.name;
        document.getElementById('diseaseDescription').textContent = result.description;

        const fertList = document.getElementById('fertilizerRecommendations');
        if (result.fertilizers && Array.isArray(result.fertilizers)) {
>>>>>>> a7755fd2a3aa0207d4d297713660c27b66b4b548
            fertList.innerHTML = result.fertilizers.map(f =>
                `<div class="recommendation-item"><i class="fas fa-check-circle"></i><span>${f}</span></div>`
            ).join('');
        } else {
            fertList.innerHTML = '';
        }

        const treatList = document.getElementById('treatmentTips');
<<<<<<< HEAD
        if (result.treatments && Array.isArray(result.treatments) && !isNonLeaf) {
=======
        if (result.treatments && Array.isArray(result.treatments)) {
>>>>>>> a7755fd2a3aa0207d4d297713660c27b66b4b548
            treatList.innerHTML = result.treatments.map(t =>
                `<div class="recommendation-item"><i class="fas fa-check-circle"></i><span>${t}</span></div>`
            ).join('');
        } else {
            treatList.innerHTML = '';
        }

        if (typeof logActivity === 'function') {
            logActivity('scan', 'Plant leaf scanned via AI', isHealthy ? 'Healthy Plant' : `Detected ${result.name}`);
            updateUserStatistic('totalScans');
        }
<<<<<<< HEAD
=======
        
        // Gamification Hook
        if (window.bfGamification) {
            window.bfGamification.trackScan();
        }
>>>>>>> a7755fd2a3aa0207d4d297713660c27b66b4b548

        loadingEl.classList.add('hidden');

    } catch (error) {
        console.error('Analysis error:', error);
        showError("⚠️ Network is slow, retrying connection...");
        loadingEl.classList.add('hidden');
        analyzeBtn.style.display = 'inline-flex';
    }
}

/* ==========================================
   LEGACY HSL COLOR ANALYSIS ALGORITHM
   (Disabled: Using Gemini Vision API instead)
   ==========================================
function analyzeLeafHealthHSL(imgElement) {
    const canvas = document.createElement('canvas');
    // ...
}

function displayResult(diseaseKey) {
    // ...
}
*/

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

function handleLeafUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const previewImg = document.getElementById('leafPreviewImg');
        previewImg.src = e.target.result;
        document.getElementById('scannerPreview').style.display = 'block';
        document.getElementById('analyzeBtn').style.display = 'inline-flex';

        // Clear previous results
        document.getElementById('scanResult').style.display = 'none';
        const prevDebug = document.getElementById('scanDebugInfo');
        if (prevDebug) prevDebug.remove();
        const alert = document.querySelector('.scanner-alert');
        if (alert) alert.remove();
    };
    reader.readAsDataURL(file);
}

let cameraStream = null;

async function openCamera() {
    const modal = document.getElementById('cameraModal');
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    const previewImg = document.getElementById('cameraPreviewImg');

    // Reset UI
    video.style.display = 'block';
    canvas.style.display = 'none';
    previewImg.style.display = 'none';
    document.getElementById('captureBtn').style.display = 'inline-flex';
    document.getElementById('retakeBtn').style.display = 'none';
    document.getElementById('usePhotoBtn').style.display = 'none';

    modal.style.display = 'flex';

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = cameraStream;
    } catch (err) {
        console.error("Camera access denied:", err);
        alert("Camera access was denied or is not available.");
        closeCamera();
    }
}

function closeCamera() {
    const modal = document.getElementById('cameraModal');
    modal.style.display = 'none';
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
}

function capturePhoto() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    const previewImg = document.getElementById('cameraPreviewImg');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

    video.style.display = 'none';
    previewImg.src = dataUrl;
    previewImg.style.display = 'block';

    document.getElementById('captureBtn').style.display = 'none';
    document.getElementById('retakeBtn').style.display = 'inline-flex';
    document.getElementById('usePhotoBtn').style.display = 'inline-flex';

    if (cameraStream) {
        video.pause();
    }
}

function retakePhoto() {
    const video = document.getElementById('cameraVideo');
    const previewImg = document.getElementById('cameraPreviewImg');

    video.style.display = 'block';
    previewImg.style.display = 'none';

    if (cameraStream) {
        video.play();
    }

    document.getElementById('captureBtn').style.display = 'inline-flex';
    document.getElementById('retakeBtn').style.display = 'none';
    document.getElementById('usePhotoBtn').style.display = 'none';
}

function usePhoto() {
    const previewImg = document.getElementById('cameraPreviewImg');
    const mainPreviewImg = document.getElementById('leafPreviewImg');

    mainPreviewImg.src = previewImg.src;
    document.getElementById('scannerPreview').style.display = 'block';
    document.getElementById('analyzeBtn').style.display = 'inline-flex';

    document.getElementById('scanResult').style.display = 'none';
    const alert = document.querySelector('.scanner-alert');
    if (alert) alert.remove();
    const prevDebug = document.getElementById('scanDebugInfo');
    if (prevDebug) prevDebug.remove();

    closeCamera();
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
                document.getElementById('fileInput').files = e.dataTransfer.files;
                handleLeafUpload({ target: { files: [file] } });
            }
        });
    }
}