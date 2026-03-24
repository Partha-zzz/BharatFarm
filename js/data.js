// ============================================
// DATA: DISEASE DATABASE & CROP DATA
// ============================================

// Disease Database
const diseaseDatabase = {
    healthy: {
        name: 'Healthy Plant',
        description: 'Your plant appears healthy with no visible signs of disease.',
        fertilizers: [
            'NPK 19-19-19 for balanced nutrition',
            'Organic compost for soil health',
            'Micronutrient mix for optimal growth'
        ],
        treatments: [
            'Continue regular watering schedule',
            'Monitor for any changes',
            'Maintain proper sunlight exposure'
        ]
    },
    leaf_blight: {
        name: 'Leaf Blight',
        description: 'Fungal infection causing brown/yellow spots and leaf death.',
        fertilizers: [
            'Potash (MOP) - strengthens plant immunity',
            'Calcium-based fertilizer',
            'Reduce nitrogen temporarily'
        ],
        treatments: [
            'Apply Mancozeb fungicide (2g/L water)',
            'Remove infected leaves immediately',
            'Improve air circulation',
            'Avoid overhead watering'
        ]
    },
    powdery_mildew: {
        name: 'Powdery Mildew',
        description: 'White powdery coating on leaves caused by fungus.',
        fertilizers: [
            'Sulphur-based fertilizer',
            'Potassium-rich fertilizer',
            'Avoid excess nitrogen'
        ],
        treatments: [
            'Spray neem oil solution (5ml/L)',
            'Apply sulphur dust',
            'Increase plant spacing',
            'Water at soil level only'
        ]
    },
    bacterial_spot: {
        name: 'Bacterial Leaf Spot',
        description: 'Dark water-soaked spots caused by bacteria.',
        fertilizers: [
            'Copper-based fertilizer',
            'Balanced NPK with extra potassium',
            'Avoid high nitrogen'
        ],
        treatments: [
            'Apply copper hydroxide spray',
            'Remove severely infected plants',
            'Disinfect tools after use',
            'Rotate crops next season'
        ]
    },
    nutrient_deficiency: {
        name: 'Nutrient Deficiency',
        description: 'Yellowing or discoloration due to lack of nutrients.',
        fertilizers: [
            'Complete NPK 20-20-20',
            'Micronutrient spray (Zn, Fe, Mn)',
            'Organic manure application'
        ],
        treatments: [
            'Soil testing recommended',
            'Apply foliar spray for quick absorption',
            'Add organic matter to soil',
            'Maintain proper pH (6.0-7.0)'
        ]
    },
    rust: {
        name: 'Rust Disease',
        description: 'Orange-brown pustules on leaf undersides.',
        fertilizers: [
            'High potassium fertilizer',
            'Phosphorus supplement',
            'Reduce nitrogen'
        ],
        treatments: [
            'Apply Propiconazole fungicide',
            'Remove infected debris',
            'Improve drainage',
            'Plant resistant varieties'
        ]
    }
};

// Crop Data — fallback values based on Indian agriculture (used when AI API is unavailable)
const cropData = {
    // ═══════════════════ CEREALS ═══════════════════
    rice: {
        name: 'Rice', icon: '🌾',
        duration: '120-150 days', wateringFrequency: 'Every 3-4 days',
        fertilizers: 'Urea, DAP, Potash', fertilizerSchedule: 'Day 15, 35, 55',
        seedRate: 25, seedPrice: 45, fertilizerRate: 100, fertilizerPrice: 30,
        yieldPerAcre: 2000, marketPrice: 22,
        roadmap: [
            { day: 1, activity: 'Land Preparation', desc: 'Plough and level field.', type: 'prep' },
            { day: 3, activity: 'Seed Sowing', desc: 'Sow seeds or transplant.', type: 'seed' },
            { day: 5, activity: 'First Watering', desc: 'Maintain 2-3 inches water.', type: 'water' },
            { day: 15, activity: 'Apply Urea', desc: 'First dose Urea.', type: 'fertilizer' },
            { day: 35, activity: 'Apply DAP', desc: 'Phosphorus boost.', type: 'fertilizer' },
            { day: 55, activity: 'Apply Potash', desc: 'Final fertilizer.', type: 'fertilizer' },
            { day: 120, activity: 'Harvest', desc: 'Harvest when 80% golden.', type: 'harvest' }
        ]
    },
    wheat: {
        name: 'Wheat', icon: '🌾',
        duration: '100-120 days', wateringFrequency: 'Every 20-25 days',
        fertilizers: 'Urea, DAP, MOP', fertilizerSchedule: 'Day 21, 45, 70',
        seedRate: 40, seedPrice: 35, fertilizerRate: 120, fertilizerPrice: 28,
        yieldPerAcre: 1800, marketPrice: 25,
        roadmap: [
            { day: 1, activity: 'Land Preparation', desc: 'Deep ploughing.', type: 'prep' },
            { day: 2, activity: 'Seed Sowing', desc: 'Sow at 3-5 cm depth.', type: 'seed' },
            { day: 5, activity: 'First Irrigation', desc: 'Light irrigation.', type: 'water' },
            { day: 21, activity: 'Apply Urea', desc: 'First Urea dose.', type: 'fertilizer' },
            { day: 45, activity: 'Apply DAP', desc: 'Tillering stage.', type: 'fertilizer' },
            { day: 70, activity: 'Apply MOP', desc: 'Grain development.', type: 'fertilizer' },
            { day: 115, activity: 'Harvest', desc: 'Harvest when golden.', type: 'harvest' }
        ]
    },
    maize: {
        name: 'Maize (Corn)', icon: '🌽',
        duration: '90-120 days', wateringFrequency: 'Every 8-10 days',
        fertilizers: 'Urea, DAP, Zinc Sulphate', fertilizerSchedule: 'Day 0, 25, 45',
        seedRate: 8, seedPrice: 350, fertilizerRate: 100, fertilizerPrice: 30,
        yieldPerAcre: 2500, marketPrice: 18,
        roadmap: [
            { day: 1, activity: 'Land Preparation', desc: 'Deep ploughing.', type: 'prep' },
            { day: 2, activity: 'Seed Sowing', desc: '60x20 cm spacing.', type: 'seed' },
            { day: 25, activity: 'First Urea', desc: '1/3 Urea dose.', type: 'fertilizer' },
            { day: 45, activity: 'Second Urea', desc: 'Remaining Urea.', type: 'fertilizer' },
            { day: 100, activity: 'Harvest', desc: 'When husks brown.', type: 'harvest' }
        ]
    },
    barley: {
        name: 'Barley', icon: '🌾',
        duration: '110-130 days', wateringFrequency: 'Every 20-25 days',
        fertilizers: 'Urea, DAP, MOP', fertilizerSchedule: 'Day 20, 40',
        seedRate: 35, seedPrice: 40, fertilizerRate: 80, fertilizerPrice: 26,
        yieldPerAcre: 1500, marketPrice: 22
    },
    oats: {
        name: 'Oats', icon: '🌾',
        duration: '90-110 days', wateringFrequency: 'Every 20-25 days',
        fertilizers: 'Urea, SSP', fertilizerSchedule: 'Day 20, 40',
        seedRate: 30, seedPrice: 50, fertilizerRate: 60, fertilizerPrice: 24,
        yieldPerAcre: 1200, marketPrice: 30
    },

    // ═══════════════════ VEGETABLES ═══════════════════
    tomato: {
        name: 'Tomato', icon: '🍅',
        duration: '60-80 days', wateringFrequency: 'Every 3-4 days',
        fertilizers: 'NPK, Urea, Potash', fertilizerSchedule: 'Day 15, 30, 50',
        seedRate: 0.4, seedPrice: 3500, fertilizerRate: 120, fertilizerPrice: 32,
        yieldPerAcre: 10000, marketPrice: 20
    },
    potato: {
        name: 'Potato', icon: '🥔',
        duration: '90-120 days', wateringFrequency: 'Every 7-10 days',
        fertilizers: 'NPK Complex, Urea', fertilizerSchedule: 'Day 0, 30, 60',
        seedRate: 600, seedPrice: 25, fertilizerRate: 150, fertilizerPrice: 32,
        yieldPerAcre: 8000, marketPrice: 15,
        roadmap: [
            { day: 1, activity: 'Land Preparation', desc: 'Deep ploughing, ridges.', type: 'prep' },
            { day: 2, activity: 'Planting', desc: 'Plant tubers 5-7 cm deep.', type: 'seed' },
            { day: 5, activity: 'First Irrigation', desc: 'Light irrigation.', type: 'water' },
            { day: 30, activity: 'Apply Urea', desc: 'Top dressing.', type: 'fertilizer' },
            { day: 60, activity: 'Final Fertilizer', desc: 'Light potash.', type: 'fertilizer' },
            { day: 100, activity: 'Harvest', desc: 'Harvest when dry.', type: 'harvest' }
        ]
    },
    onion: {
        name: 'Onion', icon: '🧅',
        duration: '120-150 days', wateringFrequency: 'Every 10-14 days',
        fertilizers: 'NPK, Urea, Sulphur', fertilizerSchedule: 'Day 15, 40, 70',
        seedRate: 4, seedPrice: 1200, fertilizerRate: 100, fertilizerPrice: 30,
        yieldPerAcre: 8000, marketPrice: 18
    },
    carrot: {
        name: 'Carrot', icon: '🥕',
        duration: '70-90 days', wateringFrequency: 'Every 7-10 days',
        fertilizers: 'NPK, Potash', fertilizerSchedule: 'Day 15, 40',
        seedRate: 3, seedPrice: 2000, fertilizerRate: 80, fertilizerPrice: 28,
        yieldPerAcre: 6000, marketPrice: 20
    },
    cabbage: {
        name: 'Cabbage', icon: '🥬',
        duration: '90-120 days', wateringFrequency: 'Every 5-7 days',
        fertilizers: 'NPK, Urea, Boron', fertilizerSchedule: 'Day 15, 35, 60',
        seedRate: 0.3, seedPrice: 4000, fertilizerRate: 100, fertilizerPrice: 30,
        yieldPerAcre: 10000, marketPrice: 12
    },
    spinach: {
        name: 'Spinach', icon: '🥬',
        duration: '40-50 days', wateringFrequency: 'Every 4-5 days',
        fertilizers: 'Urea, NPK', fertilizerSchedule: 'Day 10, 25',
        seedRate: 10, seedPrice: 300, fertilizerRate: 50, fertilizerPrice: 25,
        yieldPerAcre: 4000, marketPrice: 25
    },
    brinjal: {
        name: 'Brinjal (Eggplant)', icon: '🍆',
        duration: '120-150 days', wateringFrequency: 'Every 4-5 days',
        fertilizers: 'NPK, Urea, Potash', fertilizerSchedule: 'Day 20, 45, 70',
        seedRate: 0.3, seedPrice: 4500, fertilizerRate: 110, fertilizerPrice: 30,
        yieldPerAcre: 10000, marketPrice: 18
    },
    cauliflower: {
        name: 'Cauliflower', icon: '🥦',
        duration: '90-120 days', wateringFrequency: 'Every 5-7 days',
        fertilizers: 'NPK, Urea, Boron', fertilizerSchedule: 'Day 15, 35, 60',
        seedRate: 0.3, seedPrice: 5000, fertilizerRate: 100, fertilizerPrice: 30,
        yieldPerAcre: 8000, marketPrice: 15
    },
    okra: {
        name: 'Okra (Lady\'s Finger)', icon: '🟢',
        duration: '50-60 days', wateringFrequency: 'Every 4-5 days',
        fertilizers: 'NPK, Urea', fertilizerSchedule: 'Day 15, 35',
        seedRate: 4, seedPrice: 800, fertilizerRate: 80, fertilizerPrice: 28,
        yieldPerAcre: 4000, marketPrice: 22
    },
    capsicum: {
        name: 'Capsicum (Bell Pepper)', icon: '🫑',
        duration: '90-150 days', wateringFrequency: 'Every 3-5 days',
        fertilizers: 'NPK, Calcium Nitrate, Potash', fertilizerSchedule: 'Day 15, 40, 65',
        seedRate: 0.2, seedPrice: 8000, fertilizerRate: 120, fertilizerPrice: 35,
        yieldPerAcre: 6000, marketPrice: 40
    },

    // ═══════════════════ FRUITS ═══════════════════
    mango: {
        name: 'Mango', icon: '🥭',
        duration: 'Perennial (5-7 years)', wateringFrequency: 'Every 10-15 days',
        fertilizers: 'NPK, FYM, Zinc Sulphate', fertilizerSchedule: 'Annually',
        seedRate: 40, seedPrice: 150, fertilizerRate: 200, fertilizerPrice: 25,
        yieldPerAcre: 4000, marketPrice: 40
    },
    banana: {
        name: 'Banana', icon: '🍌',
        duration: '9-12 months', wateringFrequency: 'Every 4-5 days',
        fertilizers: 'Urea, SSP, MOP, FYM', fertilizerSchedule: 'Monthly',
        seedRate: 700, seedPrice: 25, fertilizerRate: 250, fertilizerPrice: 28,
        yieldPerAcre: 12000, marketPrice: 15
    },
    apple: {
        name: 'Apple', icon: '🍎',
        duration: 'Perennial (3-4 years)', wateringFrequency: 'Every 7-10 days',
        fertilizers: 'NPK, FYM, Calcium', fertilizerSchedule: 'Annually',
        seedRate: 200, seedPrice: 250, fertilizerRate: 200, fertilizerPrice: 30,
        yieldPerAcre: 5000, marketPrice: 60
    },
    papaya: {
        name: 'Papaya', icon: '🍈',
        duration: '8-10 months', wateringFrequency: 'Every 5-7 days',
        fertilizers: 'NPK, FYM, Micronutrients', fertilizerSchedule: 'Every 2 months',
        seedRate: 0.2, seedPrice: 15000, fertilizerRate: 150, fertilizerPrice: 28,
        yieldPerAcre: 15000, marketPrice: 12
    },
    guava: {
        name: 'Guava', icon: '🍐',
        duration: 'Perennial (3-4 years)', wateringFrequency: 'Every 7-10 days',
        fertilizers: 'NPK, FYM, Zinc Sulphate', fertilizerSchedule: 'Biannually',
        seedRate: 100, seedPrice: 80, fertilizerRate: 150, fertilizerPrice: 25,
        yieldPerAcre: 6000, marketPrice: 30
    },
    orange: {
        name: 'Orange', icon: '🍊',
        duration: 'Perennial (3-4 years)', wateringFrequency: 'Every 7-10 days',
        fertilizers: 'NPK, FYM, Zinc, Boron', fertilizerSchedule: 'Twice a year',
        seedRate: 150, seedPrice: 120, fertilizerRate: 180, fertilizerPrice: 28,
        yieldPerAcre: 5000, marketPrice: 35
    },
    grapes: {
        name: 'Grapes', icon: '🍇',
        duration: 'Perennial (2-3 years)', wateringFrequency: 'Every 5-7 days',
        fertilizers: 'NPK, FYM, Micronutrients', fertilizerSchedule: 'Quarterly',
        seedRate: 1000, seedPrice: 50, fertilizerRate: 200, fertilizerPrice: 30,
        yieldPerAcre: 8000, marketPrice: 50
    },
    pomegranate: {
        name: 'Pomegranate', icon: '🔴',
        duration: 'Perennial (2-3 years)', wateringFrequency: 'Every 7-10 days',
        fertilizers: 'NPK, FYM, Micronutrients', fertilizerSchedule: 'Biannually',
        seedRate: 200, seedPrice: 100, fertilizerRate: 150, fertilizerPrice: 28,
        yieldPerAcre: 5000, marketPrice: 60
    },
    watermelon: {
        name: 'Watermelon', icon: '🍉',
        duration: '70-100 days', wateringFrequency: 'Every 3-5 days',
        fertilizers: 'NPK, Urea, Potash', fertilizerSchedule: 'Day 15, 35, 55',
        seedRate: 1.5, seedPrice: 3000, fertilizerRate: 100, fertilizerPrice: 30,
        yieldPerAcre: 12000, marketPrice: 8
    },
    pineapple: {
        name: 'Pineapple', icon: '🍍',
        duration: '16-18 months', wateringFrequency: 'Every 7-10 days',
        fertilizers: 'Urea, SSP, Potash, FYM', fertilizerSchedule: 'Every 3 months',
        seedRate: 17000, seedPrice: 3, fertilizerRate: 200, fertilizerPrice: 25,
        yieldPerAcre: 15000, marketPrice: 15
    },

    // ═══════════════════ OILSEEDS ═══════════════════
    mustard: {
        name: 'Mustard', icon: '🌻',
        duration: '110-140 days', wateringFrequency: 'Every 25-30 days',
        fertilizers: 'Urea, SSP, Sulphur', fertilizerSchedule: 'Day 0, 25, 50',
        seedRate: 2, seedPrice: 120, fertilizerRate: 80, fertilizerPrice: 25,
        yieldPerAcre: 600, marketPrice: 55,
        roadmap: [
            { day: 1, activity: 'Land Preparation', desc: 'Fine tilth.', type: 'prep' },
            { day: 2, activity: 'Seed Sowing', desc: 'Line sowing.', type: 'seed' },
            { day: 25, activity: 'Apply Urea', desc: 'Top dressing.', type: 'fertilizer' },
            { day: 50, activity: 'Apply Sulphur', desc: 'Oil content boost.', type: 'fertilizer' },
            { day: 125, activity: 'Harvest', desc: 'When 75% yellow.', type: 'harvest' }
        ]
    },
    soybean: {
        name: 'Soybean', icon: '🫘',
        duration: '95-120 days', wateringFrequency: 'Every 10-15 days',
        fertilizers: 'DAP, SSP, Rhizobium', fertilizerSchedule: 'Day 0, 30',
        seedRate: 30, seedPrice: 80, fertilizerRate: 60, fertilizerPrice: 28,
        yieldPerAcre: 800, marketPrice: 45
    },
    sunflower: {
        name: 'Sunflower', icon: '🌻',
        duration: '80-100 days', wateringFrequency: 'Every 10-15 days',
        fertilizers: 'NPK, Urea, Boron', fertilizerSchedule: 'Day 0, 30, 55',
        seedRate: 3, seedPrice: 500, fertilizerRate: 80, fertilizerPrice: 28,
        yieldPerAcre: 700, marketPrice: 55
    },
    groundnut: {
        name: 'Groundnut (Peanut)', icon: '🥜',
        duration: '90-120 days', wateringFrequency: 'Every 10-12 days',
        fertilizers: 'SSP, Gypsum, Rhizobium', fertilizerSchedule: 'Day 0, 35, 60',
        seedRate: 50, seedPrice: 100, fertilizerRate: 100, fertilizerPrice: 22,
        yieldPerAcre: 1000, marketPrice: 50
    }
};
