# BharatFarm Crop Database - Setup & Configuration

## ✅ What's Included

### Complete Crop Database
✨ **33 Real Indian Crops** organized in 5 categories:
- **Vegetables** (10): Tomato, Potato, Onion, Carrot, Cabbage, Spinach, Brinjal, Cauliflower, Okra, Capsicum
- **Fruits** (10): Mango, Banana, Apple, Papaya, Guava, Orange, Grapes, Pomegranate, Watermelon, Pineapple
- **Cereals** (5): Rice, Wheat, Maize, Barley, Oats
- **Pulses** (4): Chickpea, Lentil, Pigeon Pea, Green Gram
- **Oilseeds** (4): Mustard, Soybean, Sunflower, Groundnut

Each crop includes:
- Common & Scientific names
- Growing climate & soil requirements
- Duration & harvesting period
- Water frequency
- Image keywords for API fetching

### Enhanced Features
- 🖼️ **Real crop-specific images** from Unsplash API (with fallback images)
- 🎨 **Beautiful responsive grid** (5 columns desktop → 1 column mobile)
- ✨ **Smooth hover animations** and selected state highlighting
- 🏷️ **Category badges** with color-coded styling
- 🔍 **Real-time search** across crop names and scientific names
- 📱 **Fully responsive design** for all devices
- ⚡ **Lazy image loading** for optimal performance
- 🌐 **Category filtering** (All, Cereal, Vegetable, Fruit, Pulse, Oilseed)

---

## 🚀 Getting Started

### Step 1: Basic Setup (No API Key Required)
The application works out-of-the-box with fallback images from Unsplash. Just open your page and the crop grid will display with beautiful placeholder images.

### Step 2: Optional - Add Unsplash Images (Recommended)

To get **real crop-specific images**:

1. **Get a Free Unsplash API Key:**
   - Go to: https://unsplash.com/oauth/applications
   - Sign up (free) or login
   - Create a new application
   - Copy your `Access Key`

2. **Add API Key to config.js:**
   ```javascript
   // In js/config.js
   const UNSPLASH_API_KEY = 'YOUR_ACCESS_KEY_HERE';
   const USE_UNSPLASH = true;  // Change to true
   ```

3. **Done!** The crop cards will now fetch real images from Unsplash

### Step 3: Alternative - Use Pexels API

1. **Get a Free Pexels API Key:**
   - Go to: https://www.pexels.com/api/
   - Sign up and create an application
   - Copy your API key

2. **Add API Key to config.js:**
   ```javascript
   // In js/config.js
   const PEXELS_API_KEY = 'YOUR_API_KEY_HERE';
   const USE_PEXELS = true;  // Change to true
   ```

---

## 📁 File Structure

```
js/
├── config.js          # API configuration & constants
├── cropsData.js       # Complete crop database (33 crops)
└── crops.js           # Crop UI logic, search, filtering, image loading

css/
└── crops.css          # Responsive grid, animations, styling
```

---

## 🎯 Features Breakdown

### 1. **Real Crop Database** (`cropsData.js`)
- 33 carefully curated Indian crops
- Each with scientific names, growing conditions
- Organized by category
- Search helper functions included

### 2. **Smart Image Fetching** (`crops.js`)
- Three image sources in priority order:
  1. Unsplash API (if configured)
  2. Pexels API (if configured)
  3. Fallback - generic crop image
- Caching system to avoid duplicate API calls
- Non-blocking async loading

### 3. **Responsive Grid** (`crops.css`)
```
Desktop (>1440px):  5 columns
Tablet (1024px):    3 columns
Mobile (<768px):    2 columns
Phone (<480px):     1 column
```

### 4. **Category Filtering**
- All, Cereal, Vegetable, Fruit, Pulse, Oilseed
- Real-time filtering with search support
- Pagination for large result sets

### 5. **Hover & Select Animations**
- Smooth card elevation on hover
- Image zoom effect
- Category badge reveal on hover
- Selected state highlight with glow

---

## 🔧 Customization

### Add More Crops
Edit `js/cropsData.js` and add to `CROPS_DATABASE`:
```javascript
tomato: {
    commonName: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'vegetable',
    climate: 'Warm, sunlight (6-8 hours daily)',
    soil: 'Well-drained, fertile loamy soil',
    duration: '60-80 days',
    wateringFrequency: 'Regular, 3-4 times weekly',
    harvesting: 'June to September',
    imageKeywords: 'red tomato fresh garden',
    imageUrl: null
}
```

### Customize Colors
Edit `css/crops.css` badge colors:
```css
.crop-card[data-crop-id*="tomato"] .crop-badge {
    background: rgba(239, 68, 68, 0.9);
    color: white;
}
```

### Change Grid Columns
Edit `css/crops.css` media queries:
```css
.crop-grid {
    grid-template-columns: repeat(5, 1fr);  /* Change 5 to your preferred number */
}
```

---

## 📊 Crop Database Categories

| Category | Count | Examples |
|----------|-------|----------|
| Vegetables | 10 | Tomato, Potato, Carrot, Spinach |
| Fruits | 10 | Mango, Apple, Banana, Orange |
| Cereals | 5 | Rice, Wheat, Maize, Barley |
| Pulses | 4 | Chickpea, Lentil, Green Gram |
| Oilseeds | 4 | Mustard, Sunflower, Groundnut |
| **TOTAL** | **33** | |

---

## 🐛 Troubleshooting

### Images Not Loading?
1. Check if `cropsData.js` is loaded before `crops.js`
2. Open browser console (F12) for error messages
3. Make sure API key is correct (if using Unsplash/Pexels)
4. Images will fallback to generic placeholder

### Search Not Working?
1. Ensure `cropsData.js` is loaded
2. Check console for JavaScript errors
3. Make sure `searchCrops()` function is available

### Grid Not Responsive?
1. Check if `crops.css` is properly linked
2. Clear browser cache and reload
3. Test in different screen sizes

---

## 🎨 Dark Mode Support

The crops section automatically adapts to your theme:
```css
[data-theme="dark"] .crop-card { ... }
[data-theme="dark"] .filter-btn { ... }
```

---

## ⚡ Performance Tips

1. **Image Caching:** Already implemented - images are cached after first fetch
2. **Lazy Loading:** Images load asynchronously without blocking UI
3. **Pagination:** Limits grid to 12 crops per page for fast rendering
4. **CSS Animations:** Use GPU-accelerated transforms

---

## 📝 API Rate Limits

- **Unsplash Free:** 50 requests/hour
- **Pexels Free:** 200 requests/hour

With caching, you won't hit these limits unless you have >50-200 unique crop searches.

---

## 🎯 Next Steps

Recommended enhancements:
- [ ] Add more crops based on regional availability
- [ ] Connect to real crop pricing APIs
- [ ] Add disease/pest information
- [ ] Link to YouTube farming guides
- [ ] Add seasonal crop recommendations

---

## 📧 Support

For issues or questions:
1. Check the browser console (F12 → Console tab)
2. Review the code comments in `cropsData.js` and `crops.js`
3. Verify API keys are correctly added

**Happy Farming! 🌾**
