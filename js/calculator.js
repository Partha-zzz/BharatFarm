// ============================================
// CALCULATOR FUNCTIONS
// ============================================

let currentLandUnit = 'acre';
let calculatedCosts = null;

function setLandUnit(unit) {
    currentLandUnit = unit;
    document.querySelectorAll('.land-unit-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const labels = { acre: 'Acres', bigha: 'Bigha', katha: 'Katha' };
    document.getElementById('landUnitLabel').textContent = labels[unit];
    updateLandConversion();
}

function updateLandConversion() {
    const value = parseFloat(document.getElementById('landSize').value) || 0;
    const convEl = document.getElementById('landConversion');

    let acres, bigha, katha;
    if (currentLandUnit === 'acre') {
        acres = value;
        katha = value * LAND_CONVERSIONS.kathaPerAcre;
        bigha = value * LAND_CONVERSIONS.bighaPerAcre;
    } else if (currentLandUnit === 'bigha') {
        bigha = value;
        acres = value * LAND_CONVERSIONS.acrePerBigha;
        katha = value * LAND_CONVERSIONS.kathaPerBigha;
    } else {
        katha = value;
        bigha = value / LAND_CONVERSIONS.kathaPerBigha;
        acres = bigha * LAND_CONVERSIONS.acrePerBigha;
    }

    convEl.textContent = `= ${acres.toFixed(2)} Acre = ${katha.toFixed(2)} Katha = ${bigha.toFixed(2)} Bigha`;
}

function getLandSizeInAcres() {
    const value = parseFloat(document.getElementById('landSize').value) || 0;
    if (currentLandUnit === 'acre') return value;
    if (currentLandUnit === 'bigha') return value * LAND_CONVERSIONS.acrePerBigha;
    return (value / LAND_CONVERSIONS.kathaPerBigha) * LAND_CONVERSIONS.acrePerBigha;
}

const aiCostCache = {};

async function calculateCosts() {
    const cropKey = document.getElementById('calcCrop').value;
    const landSize = getLandSizeInAcres();

    if (!cropKey) {
        alert('Please select a crop!');
        return;
    }
    if (landSize <= 0) {
        alert('Please enter valid land size!');
        return;
    }

    selectedCrop = cropKey;
    
    // UI Feedback: Loading state on button
    const calcBtns = document.querySelectorAll('button[onclick="calculateCosts()"]');
    const btnTexts = [];
    calcBtns.forEach((btn, idx) => {
        btnTexts[idx] = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Fetching AI Data...';
        btn.disabled = true;
    });

    try {
        let crop = { ...cropData[cropKey] };
        
        // Fetch AI data if not already cached
        if (!aiCostCache[cropKey]) {
            aiCostCache[cropKey] = await fetchAICostData(crop.name);
        }
        
        // Override static data with AI real-time data if available
        if (aiCostCache[cropKey]) {
            crop = { ...crop, ...aiCostCache[cropKey] };
        }

        const seedQty = crop.seedRate * landSize;
        const seedCost = seedQty * crop.seedPrice;
        const fertQty = crop.fertilizerRate * landSize;
        const fertCost = fertQty * crop.fertilizerPrice;
        const totalCost = seedCost + fertCost;
        const expectedYield = crop.yieldPerAcre * landSize;
        const expectedRevenue = expectedYield * crop.marketPrice;
        const profitMargin = (((expectedRevenue - totalCost) / expectedRevenue) * 100).toFixed(1);

        calculatedCosts = { seedQty, seedCost, fertQty, fertCost, totalCost, expectedYield, expectedRevenue, profitMargin };

        document.getElementById('seedQty').textContent = seedQty.toFixed(1) + ' kg';
        document.getElementById('seedCost').textContent = '₹' + seedCost.toLocaleString('en-IN');
        document.getElementById('fertQty').textContent = fertQty.toFixed(1) + ' kg';
        document.getElementById('fertCost').textContent = '₹' + fertCost.toLocaleString('en-IN');
        document.getElementById('totalCost').textContent = '₹' + totalCost.toLocaleString('en-IN');
        document.getElementById('expectedYield').textContent = expectedYield.toLocaleString('en-IN') + ' kg';
        document.getElementById('marketPrice').textContent = '₹' + crop.marketPrice + '/kg';
        document.getElementById('expectedRevenue').textContent = '₹' + expectedRevenue.toLocaleString('en-IN');
        document.getElementById('profitMargin').textContent = profitMargin + '%';
        
        const sourceNotice = aiCostCache[cropKey] ? 'AI Market Data' : 'Estimated Defaults';
        document.getElementById('revenueExplanation').textContent =
            `Based on ${landSize.toFixed(2)} acre(s) of ${crop.name}, expected yield: ${expectedYield.toLocaleString('en-IN')} kg, revenue: ₹${expectedRevenue.toLocaleString('en-IN')}. (${sourceNotice})`;

        if (typeof generateRoadmap === 'function') generateRoadmap(cropKey);
        if (typeof generateNotifications === 'function') generateNotifications(cropKey);
        
        // SAVE SESSION DATA
        const sessionData = {
            crop: cropKey,
            landSize: landSize,
            landUnit: currentLandUnit,
            startDate: new Date().toISOString(),
            costs: calculatedCosts
        };
        localStorage.setItem('bharatfarm_session', JSON.stringify(sessionData));
        
        if (typeof updateDashboard === 'function') updateDashboard();
        
    } catch (e) {
        console.error("Error calculating costs: ", e);
        alert("Calculator Error: " + e.message + "\n\nSee console for details.");
    } finally {
        calcBtns.forEach((btn, idx) => {
            btn.innerHTML = btnTexts[idx];
            btn.disabled = false;
        });
    }
}

async function fetchAICostData(cropName) {
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY.trim() === '') return null;
    
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": window.location.href,
                "X-Title": "BharatFarm"
            },
            body: JSON.stringify({
                model: "google/gemini-2.5-flash", // Fast, accurate model for structured data
                messages: [
                    {
                        role: "system",
                        content: `You are an expert Indian agricultural economist. Provide current average farming cost data for India in pure JSON format. Return ONLY the raw JSON object, without markdown formatting, backticks, or additional text.
Required JSON keys (MUST all be numbers):
{
  "seedRate": <number: kg needed per acre>,
  "seedPrice": <number: cost in ₹ per kg>,
  "fertilizerRate": <number: total kg of primary fertilizers needed per acre>,
  "fertilizerPrice": <number: average cost in ₹ per kg of fertilizer>,
  "yieldPerAcre": <number: average yield in kg per acre>,
  "marketPrice": <number: average selling price in ₹ per kg>
}`
                    },
                    {
                        role: "user",
                        content: `Provide the farming cost data for crop: ${cropName}`
                    }
                ]
            })
        });

        if (!response.ok) throw new Error("OpenRouter API request failed");
        
        const data = await response.json();
        let content = data.choices[0].message.content.trim();
        
        // Clean up markdown block if model ignored instructions
        if (content.startsWith('```json')) content = content.substring(7);
        if (content.startsWith('```')) content = content.substring(3);
        if (content.endsWith('```')) content = content.substring(0, content.length - 3);
        
        const parsed = JSON.parse(content.trim());
        
        // Simple validation to ensure all required fields are numbers
        const requiredFields = ['seedRate', 'seedPrice', 'fertilizerRate', 'fertilizerPrice', 'yieldPerAcre', 'marketPrice'];
        for (const field of requiredFields) {
            if (typeof parsed[field] !== 'number' || isNaN(parsed[field])) {
                throw new Error(`Invalid data received for ${field}`);
            }
        }
        
        return parsed;
    } catch (error) {
        console.warn("AI Data fetch failed, falling back to local dataset:", error);
        return null;
    }
}

function initLandSizeListener() {
    const landSizeInput = document.getElementById('landSize');
    if (landSizeInput) {
        landSizeInput.addEventListener('input', updateLandConversion);
    }
}
