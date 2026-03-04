// ============================================
// COMPREHENSIVE CROPS DATABASE
// ============================================
// Contains real Indian crops with:
// - Common & scientific names
// - Category (vegetable, fruit, cereal, pulse, oilseed)
// - Growing information
// - Image search keywords (for fetching from APIs)

const CROPS_DATABASE = {
    // ═══════════════════════════════════════════
    // VEGETABLES (10)
    // ═══════════════════════════════════════════
    tomato: {
        commonName: 'Tomato',
        scientificName: 'Solanum lycopersicum',
        category: 'vegetable',
        climate: 'Warm, sunlight (6-8 hours daily)',
        soil: 'Well-drained, fertile loamy soil',
        duration: '60-80 days',
        wateringFrequency: 'Regular, 3-4 times weekly',
        harvesting: 'June to September (Summer harvest)',
        imageKeywords: 'tomato red vegetable garden fresh',
        imageUrl: null // Will be fetched from API
    },
    potato: {
        commonName: 'Potato',
        scientificName: 'Solanum tuberosum',
        category: 'vegetable',
        climate: 'Cool season, 15-25°C',
        soil: 'Loose, well-aerated sandy loam',
        duration: '90-120 days',
        wateringFrequency: 'Regular, weekly once',
        harvesting: 'October to March',
        imageKeywords: 'potato vegetable harvest farm',
        imageUrl: null
    },
    onion: {
        commonName: 'Onion',
        scientificName: 'Allium cepa',
        category: 'vegetable',
        climate: 'Cool to moderate, 13-24°C',
        soil: 'Well-drained fertile loamy soil',
        duration: '120-150 days',
        wateringFrequency: 'Moderate, once in 2 weeks',
        harvesting: 'March to May',
        imageKeywords: 'onion bulb vegetable market',
        imageUrl: null
    },
    carrot: {
        commonName: 'Carrot',
        scientificName: 'Daucus carota',
        category: 'vegetable',
        climate: 'Cool season, 15-20°C',
        soil: 'Loose, well-drained sandy soil',
        duration: '70-90 days',
        wateringFrequency: 'Light irrigation, weekly',
        harvesting: 'October to January',
        imageKeywords: 'carrots harvest root vegetable bunch',
        imageUrl: null
    },
    cabbage: {
        commonName: 'Cabbage',
        scientificName: 'Brassica oleracea',
        category: 'vegetable',
        climate: 'Cool season, 15-22°C',
        soil: 'Fertile loamy soil with organic matter',
        duration: '90-120 days',
        wateringFrequency: 'Regular, 2-3 times weekly',
        harvesting: 'November to February',
        imageKeywords: 'cabbage green vegetable fresh',
        imageUrl: null
    },
    spinach: {
        commonName: 'Spinach',
        scientificName: 'Spinacia oleracea',
        category: 'vegetable',
        climate: 'Cool season, 10-20°C',
        soil: 'Rich, well-draining fertile soil',
        duration: '40-50 days',
        wateringFrequency: 'Regular, light watering',
        harvesting: 'October to March',
        imageKeywords: 'spinach fresh green leaves vegetable',
        imageUrl: null
    },
    brinjal: {
        commonName: 'Brinjal (Eggplant)',
        scientificName: 'Solanum melongena',
        category: 'vegetable',
        climate: 'Warm humid, 25-30°C',
        soil: 'Well-drained fertile loamy soil',
        duration: '120-150 days',
        wateringFrequency: 'Regular, 4-5 times weekly',
        harvesting: 'July to December',
        imageKeywords: 'eggplant purple brinjal vegetable',
        imageUrl: null
    },
    cauliflower: {
        commonName: 'Cauliflower',
        scientificName: 'Brassica oleracea var. botrytis',
        category: 'vegetable',
        climate: 'Cool season, 10-21°C',
        soil: 'Well-drained fertile loamy soil',
        duration: '90-120 days',
        wateringFrequency: 'Regular, 2-3 times weekly',
        harvesting: 'December to February',
        imageKeywords: 'cauliflower white vegetable fresh',
        imageUrl: null
    },
    okra: {
        commonName: 'Okra (Lady\s Finger)',
        scientificName: 'Abelmoschus esculentus',
        category: 'vegetable',
        climate: 'Warm, 20-30°C',
        soil: 'Well-drained loamy soil',
        duration: '50-60 days',
        wateringFrequency: 'Regular, 3-4 times weekly',
        harvesting: 'June to September',
        imageKeywords: 'okra bhindi pods green vegetable',
        imageUrl: null
    },
    capsicum: {
        commonName: 'Capsicum (Bell Pepper)',
        scientificName: 'Capsicum annuum',
        category: 'vegetable',
        climate: 'Warm, 21-29°C',
        soil: 'Well-drained fertile loamy soil',
        duration: '90-150 days',
        wateringFrequency: 'Regular, 2-3 times weekly',
        harvesting: 'September to May',
        imageKeywords: 'bell pepper capsicum red green vegetable',
        imageUrl: null
    },

    // ═══════════════════════════════════════════
    // FRUITS (10)
    // ═══════════════════════════════════════════
    mango: {
        commonName: 'Mango',
        scientificName: 'Mangifera indica',
        category: 'fruit',
        climate: 'Warm tropical, 24-30°C',
        soil: 'Well-drained loamy to sandy soil',
        duration: 'Perennial (5-7 years to first yield)',
        wateringFrequency: 'Moderate, seasonal irrigation',
        harvesting: 'April to June',
        imageKeywords: 'mango fruit',
        imageUrl: null
    },
    banana: {
        commonName: 'Banana',
        scientificName: 'Musa sapientum',
        category: 'fruit',
        climate: 'Warm humid, 20-30°C',
        soil: 'Rich fertile well-drained soil',
        duration: 'Perennial (9-12 months per cycle)',
        wateringFrequency: 'High, frequent irrigation',
        harvesting: 'Year-round (5-7 months after planting)',
        imageKeywords: 'banana fruit',
        imageUrl: null
    },
    apple: {
        commonName: 'Apple',
        scientificName: 'Malus domestica',
        category: 'fruit',
        climate: 'Cool temperate, 10-20°C',
        soil: 'Well-drained fertile loamy soil',
        duration: 'Perennial (3-4 years to first yield)',
        wateringFrequency: 'Moderate, regular irrigation',
        harvesting: 'September to November',
        imageKeywords: 'apple fruit',
        imageUrl: null
    },
    papaya: {
        commonName: 'Papaya',
        scientificName: 'Carica papaya',
        category: 'fruit',
        climate: 'Warm tropical, 22-26°C',
        soil: 'Well-drained sandy loamy soil',
        duration: 'Perennial (8-10 months to first yield)',
        wateringFrequency: 'Moderate, regular irrigation',
        harvesting: 'Year-round (peak June-July)',
        imageKeywords: 'papaya fruit',
        imageUrl: null
    },
    guava: {
        commonName: 'Guava',
        scientificName: 'Psidium guajava',
        category: 'fruit',
        climate: 'Warm tropical, 23-28°C',
        soil: 'Well-drained soil, tolerates poor soil',
        duration: 'Perennial (3-4 years to first yield)',
        wateringFrequency: 'Moderate, occasional irrigation',
        harvesting: 'September to November',
        imageKeywords: 'guava fruit',
        imageUrl: null
    },
    orange: {
        commonName: 'Orange',
        scientificName: 'Citrus sinensis',
        category: 'fruit',
        climate: 'Subtropical, 15-30°C',
        soil: 'Well-drained fertile loamy soil',
        duration: 'Perennial (3-4 years to first yield)',
        wateringFrequency: 'Moderate, regular irrigation',
        harvesting: 'December to February',
        imageKeywords: 'orange citrus fruit',
        imageUrl: null
    },
    grapes: {
        commonName: 'Grapes',
        scientificName: 'Vitis vinifera',
        category: 'fruit',
        climate: 'Temperate to subtropical, 15-25°C',
        soil: 'Well-drained loamy to clayey soil',
        duration: 'Perennial (2-3 years to first yield)',
        wateringFrequency: 'Moderate, regular irrigation',
        harvesting: 'April to June',
        imageKeywords: 'grapes fruit',
        imageUrl: null
    },
    pomegranate: {
        commonName: 'Pomegranate',
        scientificName: 'Punica granatum',
        category: 'fruit',
        climate: 'Subtropical, 20-30°C',
        soil: 'Well-drained loamy to sandy soil',
        duration: 'Perennial (2-3 years to first yield)',
        wateringFrequency: 'Low to moderate irrigation',
        harvesting: 'September to November',
        imageKeywords: 'pomegranate fruit',
        imageUrl: null
    },
    watermelon: {
        commonName: 'Watermelon',
        scientificName: 'Citrullus lanatus',
        category: 'fruit',
        climate: 'Warm, 25-35°C',
        soil: 'Well-drained sandy loamy soil',
        duration: '70-100 days',
        wateringFrequency: 'High, frequent irrigation',
        harvesting: 'April to June',
        imageKeywords: 'watermelon fruit',
        imageUrl: null
    },
    pineapple: {
        commonName: 'Pineapple',
        scientificName: 'Ananas comosus',
        category: 'fruit',
        climate: 'Warm tropical, 22-28°C',
        soil: 'Well-drained sandy loamy soil',
        duration: 'Perennial (16-18 months to first yield)',
        wateringFrequency: 'Moderate, regular irrigation',
        harvesting: 'December to March',
        imageKeywords: 'pineapple fruit',
        imageUrl: null
    },

    // ═══════════════════════════════════════════
    // CEREALS (5)
    // ═══════════════════════════════════════════
    rice: {
        commonName: 'Rice',
        scientificName: 'Oryza sativa',
        category: 'cereal',
        climate: 'Tropical/Subtropical, 21-37°C',
        soil: 'Clayey/Alluvial soil (water-retentive)',
        duration: '120-150 days',
        wateringFrequency: 'High, flooded fields',
        harvesting: 'October to November',
        imageKeywords: 'rice paddy grain field harvest',
        imageUrl: null
    },
    wheat: {
        commonName: 'Wheat',
        scientificName: 'Triticum aestivum',
        category: 'cereal',
        climate: 'Cool/Dry, 15-25°C',
        soil: 'Well-drained loamy soil',
        duration: '120-140 days',
        wateringFrequency: 'Moderate, 4-5 irrigations',
        harvesting: 'March to April',
        imageKeywords: 'wheat grain field golden crop',
        imageUrl: null
    },
    maize: {
        commonName: 'Maize (Corn)',
        scientificName: 'Zea mays',
        category: 'cereal',
        climate: 'Warm, 21-37°C',
        soil: 'Well-drained fertile loamy soil',
        duration: '90-120 days',
        wateringFrequency: 'Moderate, 4-6 irrigations',
        harvesting: 'September to October',
        imageKeywords: 'corn maize field green crop India',
        imageUrl: null
    },
    barley: {
        commonName: 'Barley',
        scientificName: 'Hordeum vulgare',
        category: 'cereal',
        climate: 'Cool, 15-22°C',
        soil: 'Well-drained loamy soil',
        duration: '110-130 days',
        wateringFrequency: 'Low, 2-3 irrigations',
        harvesting: 'March to April',
        imageKeywords: 'barley grain cereal crop field',
        imageUrl: null
    },
    oats: {
        commonName: 'Oats',
        scientificName: 'Avena sativa',
        category: 'cereal',
        climate: 'Cool season, 10-20°C',
        soil: 'Well-drained loamy soil',
        duration: '90-110 days',
        wateringFrequency: 'Low, rainfall dependent',
        harvesting: 'March to April',
        imageKeywords: 'oats cereal grain crop',
        imageUrl: null
    },

    // ═══════════════════════════════════════════
    // OILSEEDS (4)
    // ═══════════════════════════════════════════
    mustard: {
        commonName: 'Mustard',
        scientificName: 'Brassica juncea',
        category: 'oilseed',
        climate: 'Cool/Dry, 15-25°C',
        soil: 'Well-drained loamy soil',
        duration: '90-110 days',
        wateringFrequency: 'Low, 2-3 irrigations',
        harvesting: 'February to March',
        imageKeywords: 'mustard yellow flower field oilseed',
        imageUrl: null
    },
    soybean: {
        commonName: 'Soybean',
        scientificName: 'Glycine max',
        category: 'oilseed',
        climate: 'Warm, 20-30°C',
        soil: 'Well-drained loamy soil',
        duration: '95-120 days',
        wateringFrequency: 'Moderate, 4-6 irrigations',
        harvesting: 'October to November',
        imageKeywords: 'soybean pod plant crop oilseed',
        imageUrl: null
    },
    sunflower: {
        commonName: 'Sunflower',
        scientificName: 'Helianthus annuus',
        category: 'oilseed',
        climate: 'Warm, 20-30°C',
        soil: 'Well-drained loamy to sandy soil',
        duration: '80-100 days',
        wateringFrequency: 'Moderate, 4-5 irrigations',
        harvesting: 'August to September',
        imageKeywords: 'sunflower yellow bloom flower field',
        imageUrl: null
    },
    groundnut: {
        commonName: 'Groundnut (Peanut)',
        scientificName: 'Arachis hypogaea',
        category: 'oilseed',
        climate: 'Warm, 24-28°C',
        soil: 'Well-drained loamy sandy soil',
        duration: '90-120 days',
        wateringFrequency: 'Moderate, 4-5 irrigations',
        harvesting: 'September to October',
        imageKeywords: 'peanut groundnut crop oilseed',
        imageUrl: null
    }
};

// Function to get crops by category
function getCropsByCategory(category) {
    return Object.entries(CROPS_DATABASE)
        .filter(([key, crop]) => crop.category === category || category === 'all')
        .map(([key, crop]) => ({ id: key, ...crop }));
}

// Function to search crops
function searchCrops(query) {
    const q = query.toLowerCase();
    return Object.entries(CROPS_DATABASE)
        .filter(([key, crop]) => 
            crop.commonName.toLowerCase().includes(q) ||
            crop.scientificName.toLowerCase().includes(q) ||
            key.toLowerCase().includes(q)
        )
        .map(([key, crop]) => ({ id: key, ...crop }));
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CROPS_DATABASE, getCropsByCategory, searchCrops };
}