// ============================================
// DASHBOARD UPDATE FUNCTIONS
// ============================================

function updateDashboard() {
    document.getElementById('dashWeatherStatus').textContent = currentWeather.temp + '°C';

    const safety = document.getElementById('dashWeatherSafety');
    if (currentWeather.rainProbability >= 70) {
        safety.textContent = 'NOT SAFE';
        safety.className = 'status unsafe';
    } else {
        safety.textContent = 'SAFE';
        safety.className = 'status safe';
    }

    if (selectedCrop) {
        document.getElementById('dashNextActivity').textContent = cropData[selectedCrop].roadmap[0].activity;
    }

    if (calculatedCosts) {
        document.getElementById('dashTotalCost').textContent = '₹' + calculatedCosts.totalCost.toLocaleString('en-IN');
        document.getElementById('dashRevenue').textContent = '₹' + calculatedCosts.expectedRevenue.toLocaleString('en-IN');
    }
}
