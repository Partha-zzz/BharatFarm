# FarmAssist - Smart Agriculture Platform

A comprehensive web application designed to help farmers make smarter decisions through technology. FarmAssist provides weather monitoring, crop planning, disease detection, cost calculation, and activity scheduling tools.

## Features

- **🌤️ Weather Monitoring**: Real-time weather data with farming safety alerts
- **🍃 Leaf Disease Scanner**: Upload or capture leaf images to detect diseases and get treatment recommendations
- **🌾 Crop Planning**: Detailed information for multiple crops including rice, wheat, potato, mustard, vegetables, and maize
- **💰 Cost Calculator**: Calculate seed and fertilizer costs with support for multiple land units (Acre, Bigha, Katha)
- **📊 Revenue Prediction**: Estimate expected yields and revenue based on crop and land size
- **🗺️ Activity Roadmap**: Day-by-day farming activity schedules for each crop
- **🔔 Smart Notifications**: Personalized alerts for watering, fertilizing, and weather conditions
- **🌓 Dark/Light Theme**: Toggle between themes for comfortable viewing

## Project Structure

```
d:/farm/
├── index.html              # Main HTML file
├── index.html.backup       # Backup of original file
├── server.js               # Backend server
├── css/                    # Stylesheets
│   ├── variables.css       # CSS custom properties & themes
│   ├── base.css            # Reset & base styles
│   ├── components.css      # Reusable components
│   ├── loading.css         # Loading page styles
│   ├── auth.css            # Login/register styles
│   ├── header.css          # Header & navigation
│   ├── dashboard.css       # Dashboard section
│   ├── scanner.css         # Leaf scanner section
│   ├── weather.css         # Weather section
│   ├── crops.css           # Crops section
│   ├── calculator.css      # Calculator & revenue
│   ├── roadmap.css         # Roadmap timeline
│   ├── notifications.css   # Notifications & alerts
│   └── responsive.css      # Media queries
└── js/                     # JavaScript modules
    ├── config.js           # Configuration & constants
    ├── data.js             # Crop & disease data
    ├── auth.js             # Authentication
    ├── theme.js            # Theme management
    ├── navigation.js       # Section navigation
    ├── scanner.js          # Leaf scanner
    ├── weather.js          # Weather functionality
    ├── crops.js            # Crop selection
    ├── calculator.js       # Cost calculations
    ├── roadmap.js          # Roadmap generation
    ├── notifications.js    # Notification system
    ├── dashboard.js        # Dashboard updates
    └── app.js              # Main initialization
```

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (for running the backend server)

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd d:/farm
   ```

3. Install dependencies (if using the backend):
   ```bash
   npm install
   ```

4. Start the backend server (optional):
   ```bash
   node server.js
   ```

5. Open `index.html` in your web browser or serve it using a local server

### Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Explore Dashboard**: View quick stats and get started with various features
3. **Select a Crop**: Choose from available crops to get personalized recommendations
4. **Check Weather**: Enter your location to get farming-relevant weather data
5. **Scan Leaves**: Upload or capture leaf images to detect diseases
6. **Calculate Costs**: Enter your land size and crop to estimate costs and revenue
7. **View Roadmap**: See day-by-day farming activities for your selected crop

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with CSS Variables for theming
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Poppins)
- **Storage**: LocalStorage for user data and preferences
- **Backend**: Node.js with Express (optional)

## Features in Detail

### Land Unit Support
The calculator supports three common Indian land measurement units:
- **Acre**: International standard
- **Bigha**: Common in North India
- **Katha**: Common in Bihar, West Bengal, and Assam

Automatic conversion between units is provided.

### Crop Database
Includes detailed information for:
- Rice (120-150 days)
- Wheat (100-120 days)
- Potato (90-120 days)
- Mustard (110-140 days)
- Vegetables (60-90 days)
- Maize (90-120 days)

Each crop includes seed rates, fertilizer requirements, watering schedules, and market prices.

### Disease Detection
The leaf scanner can identify:
- Healthy plants
- Leaf Blight
- Powdery Mildew
- Bacterial Spot
- Nutrient Deficiency
- Rust Disease

Each diagnosis includes fertilizer recommendations and treatment tips.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (responsive design)

## Contributing

This is a demonstration project. Feel free to fork and modify for your needs.

## License

This project is provided as-is for educational and demonstration purposes.

## Contact

For questions or support, please refer to the contact information in the application footer.

---

**© 2024 FarmAssist - Smart Agriculture Platform**  
*Helping farmers make smarter decisions*
