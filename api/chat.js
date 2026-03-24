// Vercel Serverless Function: api/chat.js
// This acts as a proxy to keep your OpenRouter API Key secret.

export default async function handler(req, res) {
    // 1. Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 2. Get the API Key from Environment Variables (Set these in Vercel Dashboard)
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        return res.status(500).json({
            error: 'API Key not configured on server. Please add OPENROUTER_API_KEY to Vercel Environment Variables.'
        });
    }

    try {
        const { model, messages, temperature, max_tokens, top_p } = req.body;

        // 3. Forward the request to OpenRouter
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://bharatfarm.vercel.app', // Update with your actual Vercel URL
                'X-Title': 'BharatFarm Proxy',
            },
            body: JSON.stringify({
                model: model || 'openrouter/free',
                messages: messages,
                temperature: temperature || 0.7,
                max_tokens: max_tokens || 800,
                top_p: top_p || 0.9,
            }),
        });

        const data = await response.json();

        // 4. Return the response to the frontend
        return res.status(response.status).json(data);
    } catch (error) {
        console.error('Proxy Error:', error);
        return res.status(500).json({ error: 'Failed to connect to AI provider' });
    }
}
