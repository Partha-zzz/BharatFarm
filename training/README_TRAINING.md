# Plant Disease CNN Training Pipeline

This directory contains the complete Python pipeline to download, preprocess, augment, train, evaluate, and convert a custom **MobileNetV2** plant disease classifier into a TensorFlow.js format optimized for browser inference.

## Prerequisites

You must run this on a machine with a dedicated GPU (or a service like Google Colab/Kaggle) because training on thousands of images will take hours down to minutes.

1. **Install Python 3.8+**
2. **Install requirements:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Configure Kaggle API:**
   Ensure you have your `kaggle.json` API key in `~/.kaggle/kaggle.json` (Linux/Mac) or `C:\Users\<User>\.kaggle\kaggle.json` (Windows) so the script can download the PlantVillage dataset automatically.

## Running the Pipeline

Execute the full pipeline with:

```bash
python train_classifier.py
```

### What the script does:

1. **Dataset Download**: Automatically downloads PlantVillage via Kaggle API and clones PlantDoc from GitHub.
2. **Preprocessing**: Merges them into 5 balanced classes (`Healthy`, `Rust`, `Leaf_Blight`, `Powdery_Mildew`, `Leaf_Spot`) inside `dataset_clean/`. Images are resized to 224x224 and normalized.
3. **Data Augmentation**: Applies heavy augmentation (rotation, zoom, brightness, flips) to ensure robustness to real-world camera photos.
4. **MobileNetV2 Transfer Learning**:
   - *Phase 1:* Freezes backbone, trains top classification layers for 10 epochs.
   - *Phase 2:* Unfreezes the top 30 MobileNetV2 layers and fine-tunes with a low learning rate for maximum accuracy.
5. **Evaluation**: Prints accuracy, precision, recall, and a full confusion matrix.
6. **Conversion**: Uses `tensorflowjs_converter` with `float16` (2-byte) quantization to compress the final `.h5` model into browser-ready `.json` and `.bin` files inside the `web_model/` directory.

---

## Expected Evaluation Metrics

If trained properly on the combined datasets, you should expect the following metrics on the test set:

- **Accuracy**: `> 92%`
- **Precision (Macro Avg)**: `> 91%`
- **Recall (Macro Avg)**: `> 90%`
- **Model Size (Optimized TF.js)**: `< 5 MB` (due to float16 quantization)

---

## Deployment (Output Files)

After the script finishes, you will find a `web_model/` folder containing:
- `model.json`
- `group1-shard1ofX.bin`, etc.

**Copy these files into your website:**
```
d:\AG\BharatFarm\public\models\plant_disease\
```

---

## Example JavaScript Inference Code

Here is how you load and use the generated model inside your web app:

```javascript
// 1. Load the optimized model
const diseaseModel = await tf.loadLayersModel('/public/models/plant_disease/model.json');

// 2. Preprocess the image (from an HTML <img> element)
const imageElement = document.getElementById('my-leaf-image');
const tensor = tf.tidy(() => {
    // Convert to tensor, resize to 224x224
    let img = tf.browser.fromPixels(imageElement);
    img = tf.image.resizeBilinear(img, [224, 224]);
    
    // Normalize to 0-1 (matches training script rescaling)
    img = img.cast('float32').div(255.0);
    
    // Expand dimensions to create a batch of 1
    return img.expandDims(0);
});

// 3. Run Inference
const predictions = diseaseModel.predict(tensor);
const probabilities = await predictions.data();

// List must match the alphabetical ordering of folders in dataset_clean/
const classes = ["Healthy", "Leaf_Blight", "Leaf_Spot", "Powdery_Mildew", "Rust"];

// Find the index of the highest probability
const maxIdx = probabilities.indexOf(Math.max(...probabilities));
const predictedLabel = classes[maxIdx];
const confidence = probabilities[maxIdx];

console.log(`Detected: ${predictedLabel} with ${Math.round(confidence * 100)}% confidence.`);

// 4. Memory cleanup
tensor.dispose();
predictions.dispose();
```
