// leafDetector.js

let cocoSsdModel = null;

async function loadLeafDetector() {
    try {
        console.log('[LeafDetector] Loading COCO-SSD model...');
        cocoSsdModel = await cocoSsd.load();
        console.log('[LeafDetector] COCO-SSD model loaded.');
    } catch (err) {
        console.error('[LeafDetector] Failed to load COCO-SSD model:', err);
    }
}

// Load on DOM Ready
document.addEventListener('DOMContentLoaded', loadLeafDetector);

/**
 * Runs object detection to verify if the image contains a plant/leaf.
 * @param {HTMLImageElement} imageElement 
 * @returns {Promise<{isPlant: boolean, bbox: number[] | null}>} Object indicating if plant is detected and its bounding box.
 */
async function detectLeaf(imageElement) {
    if (!cocoSsdModel) {
        console.warn('[LeafDetector] Model not loaded. Skipping leaf detection.');
        return { isPlant: true, bbox: null }; // Fallback so we don't block
    }

    try {
        const predictions = await cocoSsdModel.detect(imageElement);
        console.log('[LeafDetector] COCO-SSD predictions:', predictions);

        // COCO-SSD might not have 'leaf', but including based on requirements
        const validClasses = ['plant', 'leaf', 'potted plant', 'flower', 'tree', 'apple', 'orange', 'broccoli', 'carrot', 'vase'];

        let bestDetection = null;

        for (const pred of predictions) {
            if (validClasses.includes(pred.class.toLowerCase()) && pred.score > 0.5) {
                if (!bestDetection || pred.score > bestDetection.score) {
                    bestDetection = pred;
                }
            }
        }

        if (bestDetection) {
            console.log(`[LeafDetector] Best detection: ${bestDetection.class} (${Math.round(bestDetection.score * 100)}%)`);
            return { isPlant: true, bbox: bestDetection.bbox };
        }

        return { isPlant: false, bbox: null }; // No plant-related object detected
    } catch (err) {
        console.error('[LeafDetector] Error during detection:', err);
        return { isPlant: true, bbox: null }; // fallback
    }
}

window.detectLeaf = detectLeaf;
