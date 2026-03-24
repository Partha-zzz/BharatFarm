// Vercel Serverless Function: api/unsplash.js
// Proxy for Unsplash API to hide the API Key

export default async function handler(req, res) {
    const { query } = req.query;
    const apiKey = process.env.UNSPLASH_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Unsplash API Key not configured' });
    }

    try {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${apiKey}`
        );
        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch from Unsplash' });
    }
}
