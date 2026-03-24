const fs = require('fs');
const path = require('path');

const diseases = [
  // ================= CROPS =================
  {
    id: "rice_blast",
    category: "plant",
    crop: "Rice",
    name_en: "Rice Blast",
    name_bn: "ধানের ব্লাস্ট রোগ",
    scientific_name: "Magnaporthe oryzae",
    severity: "high",
    description: "One of the most destructive diseases of rice causing lesions on leaves and panicles.",
    symptoms: [
      "Check leaves for diamond-shaped white to gray lesions with dark borders.",
      "Check stem nodes: they turn black and break easily.",
      "Inspect panicle branches: they may rot and grains remain empty."
    ],
    causes: ["Fungus (Magnaporthe oryzae)"],
    spread_conditions: ["High humidity (>90%)", "Temperature between 25-28°C", "Excessive nitrogen"],
    solutions: {
      biological: ["Spray Pseudomonas fluorescens formulation @ 5g/L"],
      chemical: [
        { fertilizer_or_pesticide: "Tricyclazole 75% WP", usage: "Foliar spray", dosage: "0.6g per liter of water" }
      ],
      home_remedies: ["Spray cow urine (10%) mixed with water"]
    },
    prevention: ["Plant blast-resistant varieties like Swarna", "Avoid excessive nitrogen application", "Burn infected stubble after harvest to break lifecycle"],
    fertilizers_recommended: [{ name: "Potassium", type: "chemical", purpose: "Increases disease resistance" }]
  },
  {
    id: "wheat_rust",
    category: "plant",
    crop: "Wheat",
    name_en: "Yellow Rust",
    name_bn: "গমের হলুদ মরিচা",
    scientific_name: "Puccinia striiformis",
    severity: "high",
    description: "A major wheat disease causing yellow stripes on leaves, stunting growth.",
    symptoms: [
      "Check leaves for yellow, powdery blisters arranged in distinct parallel stripes.",
      "Run fingers over leaves; a yellow-orange powder (spores) will rub off.",
      "Check for premature drying of leaves starting from the tips."
    ],
    causes: ["Fungus (Puccinia striiformis)"],
    spread_conditions: ["Cool temperatures (10-20°C) and high humidity or morning dew"],
    solutions: {
      biological: ["Use rust-resistant wheat varieties (e.g., PBW 343)"],
      chemical: [
        { fertilizer_or_pesticide: "Propiconazole 25% EC", usage: "Foliar spray at first sign", dosage: "1ml per liter of water" }
      ],
      home_remedies: ["Early sowing to allow crop to mature before rust peaks"]
    },
    prevention: ["Plant resistant varieties is the only reliable prevention", "Eradicate volunteer wheat hosting the fungus in off-seasons"],
    fertilizers_recommended: [{ name: "Balanced NPK", type: "chemical", purpose: "Avoid excessive Nitrogen which promotes rust" }]
  },
  {
    id: "maize_fall_armyworm",
    category: "pest",
    crop: "Maize",
    name_en: "Fall Armyworm",
    name_bn: "ফল আর্মিওয়ার্ম",
    scientific_name: "Spodoptera frugiperda",
    severity: "high",
    description: "A highly invasive caterpillar pest that rapidly destroys maize whorls and cobs.",
    symptoms: [
      "Inspect the central leaf whorl: look for ragged, elongated holes.",
      "Check for large amounts of granular yellowish-brown frass (excrement) in the whorl.",
      "Look for the caterpillar: it has an inverted 'Y' mark on its head and 4 dark spots in a square on the second-to-last segment."
    ],
    causes: ["Pest (Spodoptera frugiperda moth caterpillar)"],
    spread_conditions: ["Warm weather, spreads rapidly via wind-borne moths"],
    solutions: {
      biological: ["Release Trichogramma egg parasitoids", "Apply Neem Seed Kernel Extract (NSKE 5%)"],
      chemical: [
        { fertilizer_or_pesticide: "Emamectin Benzoate 5% SG", usage: "Spray directly into the whorl", dosage: "0.4g per liter of water" }
      ],
      home_remedies: ["Apply a mixture of sand and lime/ash directly into the whorls to suffocate larvae"]
    },
    prevention: ["Deep summer ploughing to expose pupae", "Intercrop maize with legumes like pigeon pea or beans", "Erect bird perches to encourage predatory birds"],
    fertilizers_recommended: [{ name: "Organic Compost", type: "organic", purpose: "Improve plant vigor" }]
  },
  {
    id: "cotton_bollworm",
    category: "pest",
    crop: "Cotton",
    name_en: "Pink Bollworm",
    name_bn: "গোলাপী বোলওয়ার্ম",
    scientific_name: "Pectinophora gossypiella",
    severity: "high",
    description: "A destructive pest of cotton that eats the seeds and damages the cotton fibers.",
    symptoms: [
      "Check the flowers: they fail to open properly and form a 'rosette' shape.",
      "Inspect developing bolls: look for small entrance holes.",
      "Slice a boll open: presence of pinkish caterpillars inside eating the seeds."
    ],
    causes: ["Pest (Moth caterpillar)"],
    spread_conditions: ["Continuous cotton cultivation, leftover debris"],
    solutions: {
      biological: ["Install Pheromone traps (Gossyplure) @ 5/acre", "Release Trichogramma bactrae"],
      chemical: [
        { fertilizer_or_pesticide: "Spinosad 45% SC", usage: "Foliar spray", dosage: "0.3ml per liter of water" }
      ],
      home_remedies: ["Handpick and bury rosette flowers/damaged bolls"]
    },
    prevention: ["Strictly terminate the crop after 180 days; do not leave stalks in field", "Deep ploughing to destroy hibernating larvae", "Grow Bt Cotton varieties"],
    fertilizers_recommended: [{ name: "Potash", type: "chemical", purpose: "Promotes boll maturity" }]
  },

  // ================= VEGETABLES =================
  {
    id: "tomato_leaf_curl",
    category: "plant",
    crop: "Tomato",
    name_en: "Tomato Leaf Curl Virus",
    name_bn: "টমেটোর পাতা কোঁকড়ানো রোগ",
    scientific_name: "Tomato leaf curl virus (ToLCV)",
    severity: "high",
    description: "Viral disease spread by whiteflies causing severe stunting and leaf curling, stopping fruit yield.",
    symptoms: [
      "Check new upper leaves: they curl upwards, become small, crinkled, and leathery.",
      "Check plant size: severe stunting with bushy appearance due to shortened internodes.",
      "Look under the leaves: presence of tiny white flying insects (whiteflies) when disturbed.",
      "Check flowering: flowers drop off and no new fruits form."
    ],
    causes: ["Virus transmitted by Whitefly (Bemisia tabaci)"],
    spread_conditions: ["High whitefly populations in warm, dry weather"],
    solutions: {
      biological: ["Spray Neem oil (5ml/L) to deter whiteflies", "Install yellow sticky traps (15-20 per acre)"],
      chemical: [
        { fertilizer_or_pesticide: "Imidacloprid 17.8% SL", usage: "Systemic spray to kill vectors", dosage: "0.5ml per liter of water" }
      ],
      home_remedies: ["Uproot and completely burn infected plants to stop virus spread (No cure once infected)"]
    },
    prevention: ["Use virus-resistant hybrid varieties", "Raise seedlings inside a 40-mesh nylon net", "Cultivate a barrier crop of tall maize/sorghum around the field"],
    fertilizers_recommended: [{ name: "Micronutrient mix", type: "chemical", purpose: "Help healthy plants resist vector attacks" }]
  },
  {
    id: "potato_late_blight",
    category: "plant",
    crop: "Potato",
    name_en: "Late Blight",
    name_bn: "নাবি ধসা (লেট ব্লাইট)",
    scientific_name: "Phytophthora infestans",
    severity: "high",
    description: "Highly destructive fungal-like disease that causes rapid rotting of potato leaves and tubers.",
    symptoms: [
      "Inspect leaf edges: look for water-soaked, irregular pale green/brown spots.",
      "Check under the leaf in early morning: look for a white, fuzzy fungal growth ring around the spots.",
      "Check the tubers (potatoes): they show brownish-purple sunken lesions and a dry, granular rot inside."
    ],
    causes: ["Oomycete (Phytophthora infestans)"],
    spread_conditions: ["Cool, cloudy, and moist weather (15-20°C with >90% RH)"],
    solutions: {
      biological: ["Foliar spray of Trichoderma viride or Bacillus subtilis"],
      chemical: [
        { fertilizer_or_pesticide: "Mancozeb 75% WP", usage: "Prophylactic Spray", dosage: "2.5g per liter of water" },
        { fertilizer_or_pesticide: "Cymoxanil 8% + Mancozeb 64% WP", usage: "Curative spray if disease is observed", dosage: "2g per liter of water" }
      ],
      home_remedies: ["Cut and remove the haulms (stems/leaves) immediately if the field gets heavily infected to save the underground tubers"]
    },
    prevention: ["Use only certified disease-free seed tubers", "Ensure good field drainage so water doesn't stagnate", "High earthing up to cover tubers completely with soil"],
    fertilizers_recommended: [{ name: "Muriate of Potash", type: "chemical", purpose: "Improves tuber skin thickness and disease resistance" }]
  },
  {
    id: "brinjal_shoot_borer",
    category: "pest",
    crop: "Brinjal",
    name_en: "Shoot and Fruit Borer",
    name_bn: "বেগুনের ডগা ও ফল ছিদ্রকারী পোকা",
    scientific_name: "Leucinodes orbonalis",
    severity: "high",
    description: "Caterpillar that bores into the tender shoots causing them to droop, and later bores into fruits making them unfit for sale.",
    symptoms: [
      "Check the top growing shoots: they suddenly wilt, droop, and dry up ('dead hearts').",
      "Inspect the fruits: look for round bore holes.",
      "Check around the holes: presence of insect excreta (frass) plugging the holes."
    ],
    causes: ["Pest (Moth larva)"],
    spread_conditions: ["Warm and humid climates, continuous brinjal farming"],
    solutions: {
      biological: ["Install sex pheromone traps (Lucilure) @ 10-15 per acre to trap male moths", "Release Trichogramma chilonis wasps"],
      chemical: [
        { fertilizer_or_pesticide: "Chlorantraniliprole 18.5% SC", usage: "Foliar spray", dosage: "0.3ml per liter of water" }
      ],
      home_remedies: ["Manually pluck and destroy drooping shoots and infested fruits every week"]
    },
    prevention: ["Avoid continuous brinjal cultivation in the same field", "Plant coriander or marigold as intercrops to attract beneficial insects"],
    fertilizers_recommended: [{ name: "Neem Cake", type: "organic", purpose: "Soil application acts as a systemic deterrent" }]
  },
  {
    id: "chilli_anthracnose",
    category: "plant",
    crop: "Chilli",
    name_en: "Anthracnose / Fruit Rot",
    name_bn: "মরিচের অ্যানথ্রাকনোজ (ফল পচা)",
    scientific_name: "Colletotrichum capsici",
    severity: "high",
    description: "Fungal disease causing ripe chilli fruits to rot and drop, drastically reducing spice quality.",
    symptoms: [
      "Inspect ripe/red fruits: look for circular, sunken lesions with black margins.",
      "Look closely at the spots: they often have concentric rings of black dots (fungal fruiting bodies).",
      "Check the branches: severe infection causes 'die-back', where branches die from the tip downwards."
    ],
    causes: ["Fungus (Colletotrichum capsici)"],
    spread_conditions: ["Heavy rainfall, high humidity, excessive overhead irrigation"],
    solutions: {
      biological: ["Seed treatment with Pseudomonas fluorescens"],
      chemical: [
        { fertilizer_or_pesticide: "Azoxystrobin 11% + Tebuconazole 18.3% SC", usage: "Foliar spray", dosage: "1ml per liter of water" }
      ],
      home_remedies: ["Collect and burn diseased fruits and twigs"]
    },
    prevention: ["Treat seeds with hot water (50°C for 30 mins) before sowing", "Use wider plant spacing for air circulation", "Harvest fruits immediately upon ripening"],
    fertilizers_recommended: [{ name: "Calcium Nitrate", type: "chemical", purpose: "Prevents blossom end rot and strengthens fruit walls" }]
  },
  {
    id: "cabbage_diamondback_moth",
    category: "pest",
    crop: "Cabbage",
    name_en: "Diamondback Moth",
    name_bn: "ডায়মন্ডব্যাক মথ",
    scientific_name: "Plutella xylostella",
    severity: "high",
    description: "The most notorious pest of cabbage and cauliflower worldwide, causing severe defoliation.",
    symptoms: [
      "Check the leaves: small pale green caterpillars eating the lower surface.",
      "Look for 'window-pane' damage: caterpillars leave the upper transparent epidermis intact, creating a window effect.",
      "Inspect the cabbage head: severe feeding causes the head to be stunted and unmarketable."
    ],
    causes: ["Pest (Moth caterpillar)"],
    spread_conditions: ["Dry and hot weather, overuse of chemical pesticides causing resistance"],
    solutions: {
      biological: ["Spray Bacillus thuringiensis (Bt) kurstaki formulation", "Pheromone traps"],
      chemical: [
        { fertilizer_or_pesticide: "Spinosad 45% SC", usage: "Spray", dosage: "0.3ml per liter of water" }
      ],
      home_remedies: ["Spray garlic-chilli extract to deter moths from laying eggs"]
    },
    prevention: ["Plant Indian mustard as a trap crop around the cabbage field", "Practice crop rotation with non-cruciferous crops (like beans or tomatoes)"],
    fertilizers_recommended: [{ name: "Sulphur", type: "chemical", purpose: "Cruciferous crops require sulfur for strong flavor and growth" }]
  },

  // ================= FRUITS =================
  {
    id: "mango_anthracnose",
    category: "plant",
    crop: "Mango",
    name_en: "Mango Anthracnose",
    name_bn: "আমের অ্যানথ্রাকনোজ",
    scientific_name: "Colletotrichum gloeosporioides",
    severity: "high",
    description: "The most common disease of mango causing black spots on leaves, blossom blight, and severe fruit set loss.",
    symptoms: [
      "Check new leaves: oval, irregular dark brown to black spots that coalesce.",
      "Inspect flowers/panicles: they develop black spots, dry up, and fall off (Blossom Blight).",
      "Check ripening fruits: dark sunken lesions that cause the fruit to rapidly rot post-harvest."
    ],
    causes: ["Fungus (Colletotrichum gloeosporioides)"],
    spread_conditions: ["High humidity, frequent rains, and heavy dew during flowering and fruit setting"],
    solutions: {
      biological: ["Pre-harvest spray of Pseudomonas fluorescens"],
      chemical: [
        { fertilizer_or_pesticide: "Hexaconazole 5% EC", usage: "Foliar spray at panicle emergence", dosage: "1ml per liter of water" },
        { fertilizer_or_pesticide: "Carbendazim 50% WP", usage: "Pre-harvest spray", dosage: "1g per liter of water" }
      ],
      home_remedies: ["After harvest, dip mangoes in hot water (52°C for 10 minutes) before storing"]
    },
    prevention: ["Prune tree canopy to allow sunlight penetration and drying of leaves", "Collect and burn fallen infected leaves and twigs in the orchard"],
    fertilizers_recommended: [{ name: "Zinc Sulphate", type: "chemical", purpose: "Foliar spray to prevent little leaf and boost immunity" }]
  },
  {
    id: "banana_panama_wilt",
    category: "plant",
    crop: "Banana",
    name_en: "Panama Wilt",
    name_bn: "কলার পানামা রোগ",
    scientific_name: "Fusarium oxysporum f. sp. cubense",
    severity: "high",
    description: "A devastating soil-borne fungal disease that enters through roots and blocks the vascular system of the banana plant.",
    symptoms: [
      "Check the oldest (lower) leaves: they turn yellow at the margins and dry up.",
      "Observe the leaf collapsing: leaves wilt and collapse at the petiole, hanging down like a skirt around the trunk.",
      "Cut the pseudostem (trunk): look for reddish-brown or black distinct vascular discoloration rings inside."
    ],
    causes: ["Fungus (Fusarium oxysporum - TR4 is highly destructive)"],
    spread_conditions: ["Infected planting material (suckers), contaminated soil/water, poor drainage"],
    solutions: {
      biological: ["Apply Trichoderma viride enriched farmyard manure in the planting pit"],
      chemical: [
        { fertilizer_or_pesticide: "Carbendazim 50% WP", usage: "Pseudostem injection or soil drenching", dosage: "2g per liter of water" }
      ],
      home_remedies: ["Uproot and completely burn the infected plant, including the underground corm"]
    },
    prevention: ["Plant disease-free tissue-cultured plantlets", "Do not reuse fields that had Panama disease for at least 3-4 years", "Ensure proper drainage"],
    fertilizers_recommended: [{ name: "Lime", type: "chemical", purpose: "Apply to soil to raise pH, which somewhat suppresses the fungus" }]
  },
  {
    id: "citrus_canker",
    category: "plant",
    crop: "Citrus/Lemon",
    name_en: "Citrus Canker",
    name_bn: "লেবুর ক্যাংকার রোগ",
    scientific_name: "Xanthomonas axonopodis pv. citri",
    severity: "medium",
    description: "A highly contagious bacterial disease affecting lemon, orange, and lime trees, causing lesions on fruits and leaves.",
    symptoms: [
      "Check the leaves and fruits: look for raised, corky, brownish blister-like lesions.",
      "Hold leaves against the light: lesions have a distinct yellow halo around them.",
      "Check twigs: rough scabby lesions causing dieback in severe cases."
    ],
    causes: ["Bacteria (Xanthomonas)"],
    spread_conditions: ["Wind-driven rain, overhead irrigation, leaf miner insect damage"],
    solutions: {
      biological: ["Control the Citrus Leaf Miner pest (which spreads the bacteria) using Neem oil"],
      chemical: [
        { fertilizer_or_pesticide: "Copper Oxychloride 50% WP + Streptomycin", usage: "Foliar spray", dosage: "3g + 0.1g per liter of water" }
      ],
      home_remedies: ["Prune and burn infected twigs and fallen leaves before monsoon starts"]
    },
    prevention: ["Prune trees before the rainy season", "Spray copper fungicides prophylactically", "Use disease-free nursery stock"],
    fertilizers_recommended: [{ name: "Magnesium Sulphate", type: "chemical", purpose: "Prevent yellowing of leaves, keeping the plant robust" }]
  },
  {
    id: "papaya_ringspot",
    category: "plant",
    crop: "Papaya",
    name_en: "Papaya Ringspot Virus (PRSV)",
    name_bn: "পেঁপের রিং স্পট রোগ",
    scientific_name: "Papaya ringspot virus",
    severity: "high",
    description: "A fatal viral disease spread by aphids that causes mottled leaves and rings on fruits, halting production.",
    symptoms: [
      "Inspect the young leaves: prominent yellow mottling, mosaic patterns, and distortion (shoestring effect).",
      "Check the fruit surface: distinct dark green 'rings' or 'C'-shaped spots.",
      "Check the stem/petioles: water-soaked green streaks."
    ],
    causes: ["Virus transmitted by Aphids"],
    spread_conditions: ["Presence of aphids, growing papaya continuously near infected orchards"],
    solutions: {
      biological: ["Spray Neem Oil (5ml/L) to deter aphids from feeding"],
      chemical: [
        { fertilizer_or_pesticide: "Imidacloprid 17.8% SL", usage: "Spray to control aphid vectors", dosage: "0.5ml per liter of water" }
      ],
      home_remedies: ["Rogue (uproot) infected plants immediately upon spotting symptoms to save the rest of the orchard"]
    },
    prevention: ["Grow papaya under net houses during seedling stage", "Grow a border crop of maize or tall sorghum to block flying aphids", "Grow PRSV tolerant varieties"],
    fertilizers_recommended: [{ name: "Organic Manure + Boron", type: "organic", purpose: "Boron prevents lumpy fruit deformation often mistaken for PRSV" }]
  },
  {
    id: "apple_scab",
    category: "plant",
    crop: "Apple",
    name_en: "Apple Scab",
    name_bn: "আপেলের স্ক্যাব",
    scientific_name: "Venturia inaequalis",
    severity: "high",
    description: "A serious fungal disease that causes black, scabby spots on apple leaves and fruits, making them unsellable.",
    symptoms: [
      "Check the leaves in spring: olive-green, somewhat velvety spots appear.",
      "Check the fruits: dark brown to black, corky scabs form on the skin.",
      "Inspect fruit shape: heavily infected fruits become cracked and deformed."
    ],
    causes: ["Fungus (Venturia inaequalis)"],
    spread_conditions: ["Fungus overwinters in dead leaves; spores release during spring rains"],
    solutions: {
      biological: ["Application of Trichoderma to fallen leaves in autumn to speed up decomposition"],
      chemical: [
        { fertilizer_or_pesticide: "Difenoconazole 25% EC", usage: "Foliar spray before and after blossom", dosage: "0.3ml per liter of water" },
        { fertilizer_or_pesticide: "Captan 50% WP", usage: "Protective spray", dosage: "2g per liter of water" }
      ],
      home_remedies: ["Rake up and remove all fallen leaves in autumn; burn or compost them away from the orchard to destroy overwintering fungus"]
    },
    prevention: ["Plant scab-resistant varieties", "Prune trees well to open the canopy for rapid leaf drying after rain", "Apply a urea spray to fallen leaves in autumn to accelerate rotting"],
    fertilizers_recommended: [{ name: "Calcium spray", type: "chemical", purpose: "Enhances fruit skin integrity" }]
  }
];

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir);
}

fs.writeFileSync(path.join(dataDir, 'agriculture_diseases.json'), JSON.stringify(diseases, null, 2));
console.log('Dataset newly initialized strictly with ' + diseases.length + ' extremely high-quality Crop/Veg/Fruit diseases with symptom checks and preventions.');
