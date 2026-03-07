import os
import shutil
import glob
import zipfile
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import GlobalAveragePooling2D, BatchNormalization, Dense, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from sklearn.metrics import classification_report

print("TensorFlow Version:", tf.__version__)
print("Num GPUs Available:", len(tf.config.list_physical_devices('GPU')))

# ==========================================
# 1. Dataset Downloading & Extraction
# ==========================================
def download_datasets():
    print("--- Downloading Datasets ---")

    if not os.path.exists("plantdisease.zip") and not os.path.exists("plantvillage"):
        print("Downloading PlantVillage from Kaggle...")
        os.system("kaggle datasets download -d emmarex/plantdisease -p .")

    if os.path.exists("plantdisease.zip") and not os.path.exists("plantvillage"):
        print("Extracting dataset...")
        with zipfile.ZipFile("plantdisease.zip", 'r') as zip_ref:
            zip_ref.extractall("plantvillage")

    if not os.path.exists("PlantDoc-Dataset"):
        print("Cloning PlantDoc Dataset from GitHub...")
        os.system("git clone https://github.com/pratikkayal/PlantDoc-Dataset.git")

# ==========================================
# 2. Build Simplified 5-Class Dataset
# ==========================================
TARGET_CLASSES = ["Healthy", "Rust", "Leaf_Blight", "Powdery_Mildew", "Leaf_Spot"]
DATASET_DIR = "dataset_clean"
MAX_PER_CLASS = 1500

def build_dataset():
    print("--- Building Simplified Dataset ---")

    if os.path.exists(DATASET_DIR):
        print(f"{DATASET_DIR} already exists. Skipping rebuild.")
        return

    for cls in TARGET_CLASSES:
        os.makedirs(os.path.join(DATASET_DIR, cls), exist_ok=True)

    def get_target_class(folder_name):
        lower = folder_name.lower()

        if "healthy" in lower:
            return "Healthy"

        if "rust" in lower:
            return "Rust"

        if "blight" in lower:
            return "Leaf_Blight"

        if "mold" in lower or "mildew" in lower:
            return "Powdery_Mildew"

        if "spot" in lower:
            return "Leaf_Spot"

        return None

    sources = [
        "plantvillage/PlantVillage",
        "PlantDoc-Dataset/train"
    ]

    for source in sources:

        if not os.path.exists(source):
            continue

        for root, dirs, files in os.walk(source):

            folder_name = os.path.basename(root)
            target_class = get_target_class(folder_name)

            if target_class:

                for file in files:

                    if not file.lower().endswith(('.png', '.jpg', '.jpeg')):
                        continue

                    class_files = glob.glob(os.path.join(DATASET_DIR, target_class, "*"))

                    if len(class_files) >= MAX_PER_CLASS:
                        continue

                    src_path = os.path.join(root, file)
                    dst_path = os.path.join(
                        DATASET_DIR,
                        target_class,
                        f"{source.replace('/', '_')}_{file}"
                    )

                    shutil.copy2(src_path, dst_path)

    for cls in TARGET_CLASSES:
        files = glob.glob(os.path.join(DATASET_DIR, cls, "*"))
        print(f"Class {cls}: {len(files)} images")

# ==========================================
# 3. Data Generators
# ==========================================
def get_data_generators():

    print("--- Setting up Data Generators ---")

    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        horizontal_flip=True,
        zoom_range=[0.8, 1.2],
        brightness_range=[0.8, 1.2],
        validation_split=0.3
    )

    test_datagen = ImageDataGenerator(
        rescale=1./255,
        validation_split=0.3
    )

    train_gen = train_datagen.flow_from_directory(
        DATASET_DIR,
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical',
        subset='training',
        shuffle=True
    )

    val_gen = test_datagen.flow_from_directory(
        DATASET_DIR,
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical',
        subset='validation',
        shuffle=False
    )

    return train_gen, val_gen

# ==========================================
# 4. Build Model
# ==========================================
def build_model(num_classes):

    print("--- Building MobileNetV2 Model ---")

    base_model = MobileNetV2(
        input_shape=(224, 224, 3),
        include_top=False,
        weights="imagenet"
    )

    base_model.trainable = False

    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = BatchNormalization()(x)
    x = Dense(128, activation="relu")(x)
    x = Dropout(0.5)(x)

    predictions = Dense(num_classes, activation="softmax")(x)

    model = Model(inputs=base_model.input, outputs=predictions)

    model.compile(
        optimizer=Adam(learning_rate=0.001),
        loss="categorical_crossentropy",
        metrics=[
            "accuracy",
            tf.keras.metrics.Precision(name='precision'),
            tf.keras.metrics.Recall(name='recall')
        ]
    )

    return model, base_model

# ==========================================
# 5. Training Procedure
# ==========================================
def train_model(model, base_model, train_gen, val_gen):

    os.makedirs("models", exist_ok=True)

    callbacks = [
        EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True),
        ModelCheckpoint("models/best_plant_model.h5", save_best_only=True)
    ]

    print("--- Phase 1: Training Classifier Head ---")

    model.fit(
        train_gen,
        epochs=10,
        validation_data=val_gen,
        callbacks=callbacks
    )

    print("--- Phase 2: Fine-tuning Backbone ---")

    base_model.trainable = True

    for layer in base_model.layers[:-30]:
        layer.trainable = False

    model.compile(
        optimizer=Adam(learning_rate=0.0001),
        loss="categorical_crossentropy",
        metrics=[
            "accuracy",
            tf.keras.metrics.Precision(name='precision'),
            tf.keras.metrics.Recall(name='recall')
        ]
    )

    model.fit(
        train_gen,
        epochs=15,
        validation_data=val_gen,
        callbacks=callbacks
    )

    return model

# ==========================================
# 6. Evaluation
# ==========================================
def evaluate_model(model, val_gen):

    print("--- Evaluating Model ---")

    results = model.evaluate(val_gen)

    print(f"Loss: {results[0]:.4f}")
    print(f"Accuracy: {results[1]:.4f}")
    print(f"Precision: {results[2]:.4f}")
    print(f"Recall: {results[3]:.4f}")

    val_gen.reset()

    predictions = model.predict(val_gen)

    y_pred = np.argmax(predictions, axis=1)
    y_true = val_gen.classes

    print("\nClassification Report:")
    print(classification_report(y_true, y_pred, target_names=val_gen.class_indices.keys()))

# ==========================================
# 7. Convert to TensorFlow.js
# ==========================================
def convert_to_tfjs():

    print("--- Converting to TensorFlow.js ---")

    model_path = "models/plant_disease_classifier.h5"
    web_model_dir = "web_model"

    os.makedirs(web_model_dir, exist_ok=True)

    cmd = f"tensorflowjs_converter --input_format keras --quantization_bytes 2 {model_path} {web_model_dir}"

    os.system(cmd)

    print("Conversion complete.")
    print("Copy files to your website /public/models/plant_disease/")

# ==========================================
# Execution Pipeline
# ==========================================
if __name__ == "__main__":

    download_datasets()

    build_dataset()

    train_gen, val_gen = get_data_generators()

    num_classes = len(train_gen.class_indices)

    print("Detected Classes:", train_gen.class_indices)

    model, base_model = build_model(num_classes)

    model = train_model(model, base_model, train_gen, val_gen)

    evaluate_model(model, val_gen)

    print("Saving final model...")

    model.save("models/plant_disease_classifier.h5")

    convert_to_tfjs()

    print("Pipeline Finished Successfully!")