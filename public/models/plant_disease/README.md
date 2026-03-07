# Plant Disease Classification Model

Place your TensorFlow.js PlantVillage model files here:

```
/public/models/plant_disease/
├── model.json          ← TF.js LayersModel manifest
├── group1-shard1of1.bin  ← (or however many shards your model uses)
└── ...
```

## How to obtain model files

1. Clone the PlantVillage TF.js model repo:
   ```
   git clone https://github.com/ayush1997/Plant-Disease-Detection-TensorflowJS
   ```
2. Copy `model.json` and all `.bin` shard files from the repo into this directory.

## Fallback behaviour

If `model.json` is NOT present, `scanner.js` will automatically use a
pixel-statistics-based fallback on the **cropped leaf region** detected
by COCO-SSD. This is far more accurate than the original whole-image HSL
analysis because background pixels are eliminated before analysis.

Dropping in real model files instantly upgrades prediction quality with
zero code changes required.
