// Vercel Serverless Function: api/pexels.js
// Proxy for Pexels API to hide the API Key

export default async function handler(req, res) {
    const { query } = req.query;
    const apiKey = process.env.PEXELS_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Pexels API Key not configured' });
    }

    try {
        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=1&per_page=1`,
            { headers: { 'Authorization': apiKey } }
        );
        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch from Pexels' });
    }
}
