# 🌾 BharatFarm - The Intelligent Agri-Platform

[![Project Status: Active](https://img.shields.io/badge/Project%20Status-Active-brightgreen)](https://github.com/Souvik-Dey-2029/BharatFarm_Final-Version)
[![Built for: Farmers](https://img.shields.io/badge/Built%20for-Indian%20Farmers-orange)](https://bharatfarm.live)
[![Tech: AI-Powered](https://img.shields.io/badge/Tech-AI--Powered-blue)](#-intelligent-ai-ecosystem)
[![UI: Mobile-First](https://img.shields.io/badge/UI-Mobile--First-red)](#-premium-mobile-experience)

**BharatFarm** is a state-of-the-art, full-stack agricultural ecosystem designed to revolutionize how Indian farmers manage their crops. By blending advanced AI capabilities with a premium mobile-first interface, BharatFarm provides actionable insights, real-time assistance, and a direct-to-market trade platform.

## 🎬 Cinematic Experience
The platform now features a high-performance, scroll-controlled cinematic landing page using GSAP and ScrollTrigger, guiding users through the project's story with 240 high-resolution frames and dynamic feature overlays.

---

## 🚀 Key Features

### 🤖 Intelligent AI Ecosystem
- **🎙️ KrishiBot Voice Assistant**: A hands-free, real-time AI companion using STT (Speech-to-Text) and TTS (Text-to-Speech) to answer farming queries instantly.
- **🍃 AI Leaf Disease Scanner**: Interactive scanner that identifies crop diseases from photos and suggests precise fertilizer and treatment protocols.
- **🧠 Predictive Analytics**: Secured through a Node.js proxy server using Gemini 2.0 Flash for low-latency, high-accuracy agricultural advice.

### 📱 Premium Mobile Experience
- **Glassmorphic UI**: A stunning, modern design with fluid animations and responsive glassmorphism.
- **Notch-Friendly Layout**: Seamless full-screen experience designed for modern mobile devices.
- **Immersive Chatbot**: A bezel-less, high-impact interface for AI interactions.

### 📊 Farming Management Tools
- **🌤️ Smart Weather & Safety**: Real-time localized weather data with proximity-based safety alerts for farming operations.
- **🌾 Dynamic Crop Database**: Deep data for 33 major Indian crops, integrated with Unsplash/Pexels APIs for high-resolution visual identification.
- **💰 Financial Suite**: Professional cost and revenue calculators supporting local land units (Acre, Bigha, Katha) with yield estimation.
- **🗺️ Activity Roadmap**: Precision day-by-day schedules tailored to the specific lifecycle of each crop.

### 🛒 Integrated Marketplace
- **Direct Trade**: A dual-role marketplace for farmers to sell produce directly and buyers to browse fresh local inventory.
- **Digital Agri-India Portal**: A government-inspired branding for trust and professional trade experience.

---

## 🏗️ Technical Architecture

BharatFarm uses a high-performance **SPA (Single Page Application)** architecture powered by a dedicated **Node.js** backend.

### Technology Stack
- **Frontend**: HTML5, CSS3 (Modern Flex/Grid, Variables, Glassmorphism), Vanilla JavaScript (ES6+ Modules).
- **Backend**: Node.js, Express-style routing, `dotenv` for security.
- **AI Integrations**: Gemini 2.0 Flash (via OpenRouter), Vision-Language Models for Leaf Scanning and Payment Verification.
- **APIs**: OpenWeatherMap (Weather), Unsplash/Pexels (Imagery).

### Project Structure
```text
BharatFarm/
├── server.js               # Node.js Backend (AI Proxy, Vision, Payment Logic)
├── index.html              # NEW: Cinematic Landing Page (Entry Point)
├── app.html                # Main SPA Application (Dashboard, Auth, Tools)
├── css/                    
│   ├── landing.css         # Styling for cinematic scroll experience
│   ├── mobile-ui.css       # Mobile-specific UX enhancements
│   ├── glassmorphism.css   # Dynamic UI tokens and styles
│   └── components.css      # Modular UI components
└── js/                     
    ├── landing.js          # GSAP ScrollTrigger Sequence Logic
    ├── realtimeVoice.js    # AI Voice Assistant logic
    ├── cropsData.js        # Offline-first crop intelligence database
    ├── scanner.js          # Leaf disease vision analysis
    └── marketplace.js      # Trade & role management
```

---

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [NPM](https://www.npmjs.com/) (latest)

### Step-by-Step Installation

1. **Clone the Project**
   ```bash
   git clone https://github.com/Souvik-Dey-2029/BharatFarm_Final-Version.git
   cd BharatFarm_Final-Version
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   OPENROUTER_API_KEY=your_gemini_api_key_here
   UNSPLASH_API_KEY=your_unsplash_key_here
   ```

4. **Launch Server**
   ```bash
   node server.js
   ```

5. **Access the App**
   Open `http://localhost:5000` in your browser to experience the cinematic landing page. Click **Login / Dashboard** to enter the main application (`app.html`). Use Mobile View (F12) for the designed experience.

---

## 🔒 Security & AI Proxy
BharatFarm implements a secure backend proxy to protect API keys and ensure CORS compliance. All AI requests, including the **KrishiBot** and **Vision Scanner**, are routed through `server.js`, where they are authenticated and optimized before reaching external LLMs.

---

## 👥 Development Team
- **Souvik Dey** - Lead Developer
- **Partha Sarathi Sarkar** - Full Stack Developer
- **Samrat Chatterjee** - Backend Developer
- **Snehasis Chakroborty** - Frontend Developer

---

## 📜 License
*Demonstration project intended for agricultural empowerment. All rights reserved &copy; 2026 BharatFarm.*

---
**BharatFarm** – *Empowering Indian Farmers with Smart Technology* 🌾
