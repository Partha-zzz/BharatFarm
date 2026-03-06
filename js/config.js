// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

const API_BASE_URL = '/api';

// ── OpenRouter AI Chat Assistant ─────────────────
// Keys are now secured in .env and accessed via /api/chat proxy.
const OPENROUTER_API_KEY = ''; 

// ── Unsplash API Configuration ─────────────────
// Keys are now secured in .env and accessed via /api/unsplash proxy.
const UNSPLASH_API_KEY = '';
const USE_UNSPLASH = true; 

// ── Pexels API Configuration ─────────────────
// Keys are now secured in .env and accessed via /api/pexels proxy.
const PEXELS_API_KEY = '';
const USE_PEXELS = true; 

// Land conversion rates
const LAND_CONVERSIONS = {
    kathaPerBigha: 20,
    acrePerBigha: 0.62,
    kathaPerAcre: 32.26,
    bighaPerAcre: 1.61
};
