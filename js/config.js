// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

const API_BASE_URL = 'http://localhost:3000/api';

// ── OpenRouter AI Chat Assistant ─────────────────
// Get your FREE key at: https://openrouter.ai/keys
// Replace the value below with your key, or enter it in the chatbot at runtime.
const OPENROUTER_API_KEY = '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';

// ── Unsplash API Configuration ─────────────────
// Get your FREE key at: https://unsplash.com/oauth/applications
const UNSPLASH_API_KEY = 'mHKzCJ1XvHD7aAD7cIks0mX1uLBzKD6mo8Q620CLt0g';
const USE_UNSPLASH = true; // ✅ Enabled - Real crop images active!

// ── Pexels API Configuration ─────────────────
// Get your FREE key at: https://www.pexels.com/api/
const PEXELS_API_KEY = 'sJAkekKPJAxzSOMaF6t6CAz9pDdWo4oPzbIMaRaKv8CT2Gus0od77XHQ';
const USE_PEXELS = true; // Set to true when you add your API key

// Land conversion rates
const LAND_CONVERSIONS = {
    kathaPerBigha: 20,
    acrePerBigha: 0.62,
    kathaPerAcre: 32.26,
    bighaPerAcre: 1.61
};
