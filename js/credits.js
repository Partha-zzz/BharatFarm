// ============================================
// CREDITS SYSTEM LOGIC
// ============================================

const CREDITS_API_URL = 'http://localhost:5000';
let currentCreditProfile = null;

async function initCredits() {
    // Only fetch if user is logged in
    const user = JSON.parse(localStorage.getItem('bharatfarm_current_user'));
    if (!user || (!user.phone)) return;

    try {
        const response = await fetch(`${CREDITS_API_URL}/api/credits/status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: user.phone })
        });
        const data = await response.json();
        
        if (data.success) {
            currentCreditProfile = data.profile;
            updateCreditBadge();
            
            // Re-render marketplace grid if in buyer tab to update any already unlocked buttons
            if (marketplaceState && marketplaceState.role === 'buyer' && marketplaceState.activeTab === 'buyer') {
                renderMarketplaceProducts();
            }
        }
    } catch (e) {
        console.error("Failed to load credits setup:", e);
    }
}

function updateCreditBadge() {
    const badge = document.getElementById('creditBadge');
    const balance = document.getElementById('creditBalance');
    const freeTextSpan = document.getElementById('freeAttemptsBadge'); // Optional badge to show free attempts
    
    if (!badge || !balance || !currentCreditProfile) return;
    
    badge.style.display = 'flex'; // show when logged in
    
    // Show free attempts if available, otherwise credit points
    if (currentCreditProfile.freeAttempts > 0) {
        balance.innerHTML = `<i class="fas fa-gift" style="color:var(--warning);"></i> ${currentCreditProfile.freeAttempts} Free`;
        badge.title = "Free Contact Unlocks";
        badge.style.background = "#fff3cd";
        badge.style.color = "#856404";
    } else {
        balance.innerHTML = `<i class="fas fa-coins" style="color:#fbc02d;"></i> ${currentCreditProfile.creditPoints} pts`;
        badge.title = "Credit Points Balance";
        badge.style.background = "#fff8e1";
        badge.style.color = "#f57f17";
    }
}

function confirmUnlock(costText, costIcon, costColor, onConfirm) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index: 3000; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(3px); animation:fadeIn 0.2s ease-out;';
    
    const box = document.createElement('div');
    box.style.cssText = 'background:white; border-radius:16px; padding:24px; width:90%; max-width:320px; text-align:center; box-shadow:0 10px 25px rgba(0,0,0,0.2);';
    
    box.innerHTML = `
        <div style="width:64px; height:64px; border-radius:50%; background:${costColor}20; color:${costColor}; display:flex; align-items:center; justify-content:center; font-size:1.8rem; margin:0 auto 16px auto;">
            <i class="fas ${costIcon}"></i>
        </div>
        <h3 style="margin:0 0 10px 0; color:#333; font-size:1.2rem; font-family:'Poppins', sans-serif;">Unlock Contact</h3>
        <p style="margin:0 0 20px 0; color:#666; font-size:0.95rem;">Spend <strong>${costText}</strong> to securely view this farmer's contact number?</p>
        <div style="display:flex; gap:10px;">
            <button id="cancelUnlockBtn" style="flex:1; padding:12px; border:1px solid #ddd; background:white; color:#555; border-radius:10px; font-weight:600; cursor:pointer;">Cancel</button>
            <button id="confirmUnlockBtn" style="flex:1; padding:12px; border:none; background:${costColor}; color:white; border-radius:10px; font-weight:600; cursor:pointer; box-shadow:0 4px 10px ${costColor}40;">Unlock</button>
        </div>
    `;
    
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    
    document.getElementById('cancelUnlockBtn').onclick = () => { overlay.remove(); };
    document.getElementById('confirmUnlockBtn').onclick = () => { overlay.remove(); onConfirm(); };
}

async function handleViewContact(farmerId, contactPhone, whatsappNumber) {
    const user = JSON.parse(localStorage.getItem('bharatfarm_current_user'));
    if (!user) {
        alert("Please login to view seller contact numbers.");
        return;
    }

    if (!currentCreditProfile) return;

    // Determine cost to show in confirmation prompt
    if (currentCreditProfile.freeAttempts > 0) {
        confirmUnlock('1 Free Attempt', 'fa-gift', '#03a9f4', () => submitUnlock(farmerId, contactPhone, whatsappNumber, user));
    } else if (currentCreditProfile.creditPoints >= 20) {
        confirmUnlock('20 Credit Points', 'fa-coins', '#f57f17', () => submitUnlock(farmerId, contactPhone, whatsappNumber, user));
    } else {
        // Not enough points! Show recharge modal instantly
        showRechargeModal();
    }
}

async function submitUnlock(farmerId, contactPhone, whatsappNumber, user) {
    try {
        const btnContainer = document.getElementById(`contact-actions-${farmerId}`);
        const viewBtn = document.getElementById(`view-btn-${farmerId}`);
        if(viewBtn) {
            viewBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Unlocking...';
            viewBtn.disabled = true;
        }

        const response = await fetch(`${CREDITS_API_URL}/api/credits/unlock`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: user.phone, farmerId })
        });
        const data = await response.json();
        
        if (data.success) {
            // Unlocked successfully! Update profile
            currentCreditProfile = data.profile;
            updateCreditBadge();
            
            if (data.bonusGiven) {
                // Show loyalty toast
                showCreditToast("<i class='fas fa-trophy' style='color:#fbc02d'></i> Loyalty Reward! You earned 40 bonus credits!");
            }

            // Replace button with beautiful Call & Chat Links
            if (btnContainer) {
                btnContainer.innerHTML = `
                    <div style="display:flex; flex-direction:column; gap: 8px; width:100%; animation: fadeIn 0.4s ease-out; margin-top: 5px;">
                        <a href="https://wa.me/${whatsappNumber}" target="_blank" style="background: linear-gradient(135deg, #25D366, #128C7E); color: white; border-radius: 12px; padding: 12px; text-decoration: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3);">
                            <i class="fab fa-whatsapp" style="font-size: 1.2rem;"></i> WhatsApp Chat
                        </a>
                        <a href="tel:${contactPhone}" style="background: linear-gradient(135deg, #007bff, #0056b3); color: white; border-radius: 12px; padding: 12px; text-decoration: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);">
                            <i class="fas fa-phone-alt" style="font-size: 1.1rem;"></i> Call Farmer
                        </a>
                    </div>
                `;
            }
        } else if (data.needsRecharge) {
            // Restore button
            if(viewBtn) {
                viewBtn.innerHTML = '<i class="fas fa-eye"></i> View Contact';
                viewBtn.disabled = false;
            }
            // Not enough points -> show Modal
            showRechargeModal();
        } else {
            alert(data.message || data.error);
            if(viewBtn) {
                viewBtn.innerHTML = '<i class="fas fa-eye"></i> View Contact';
                viewBtn.disabled = false;
            }
        }
    } catch (e) {
        console.error(e);
        alert("Failed to connect to server.");
    }
}

function showRechargeModal() {
    const modal = document.getElementById('rechargeModal');
    if (modal) modal.style.display = 'flex';
}

function closeRechargeModal() {
    const modal = document.getElementById('rechargeModal');
    if (modal) modal.style.display = 'none';
}

function showMockPaymentGateway(amount, onSuccess) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index: 10000; display:flex; align-items:center; justify-content:center; flex-direction:column; backdrop-filter:blur(5px); animation:fadeIn 0.3s ease-out;';
    
    const box = document.createElement('div');
    box.style.cssText = 'background:white; border-radius:24px; width:90%; max-width:380px; overflow:hidden; box-shadow:0 15px 35px rgba(0,0,0,0.3); animation:slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); position:relative;';
    
    box.innerHTML = `
        <div style="background:#0F4A6F; color:white; padding:20px; text-align:center; position:relative;">
            <button id="closeGwBtn" style="position:absolute; left:15px; top:15px; background:none; border:none; color:white; font-size:1.2rem; cursor:pointer;"><i class="fas fa-times"></i></button>
            <h3 style="margin:0; font-size:1.1rem; opacity:0.9;">Secure Payment Gate</h3>
            <div style="font-size:2.2rem; font-weight:700; margin-top:10px;">₹${amount}</div>
            <div style="font-size:0.85rem; opacity:0.8; margin-top:5px;">To: BharatFarm Technologies</div>
        </div>
        <div style="padding:24px;" id="gwStage1">
            <p style="margin:0 0 15px 0; color:#555; font-weight:600; font-size:0.95rem;">Select Payment Method</p>
            <div style="display:flex; flex-direction:column; gap:12px;">
                <button class="mock-upi-btn" style="display:flex; align-items:center; gap:15px; padding:15px; border:1px solid #eee; border-radius:12px; background:white; cursor:pointer; text-align:left; transition:background 0.2s, border 0.2s;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" style="width:40px;" alt="UPI">
                    <div style="flex:1;">
                        <h4 style="margin:0; font-size:1rem; color:#333;">Google Pay</h4>
                        <p style="margin:2px 0 0 0; font-size:0.8rem; color:#888;">Pay securely via App</p>
                    </div>
                    <i class="fas fa-chevron-right" style="color:#ccc;"></i>
                </button>
                <button class="mock-upi-btn" style="display:flex; align-items:center; gap:15px; padding:15px; border:1px solid #eee; border-radius:12px; background:white; cursor:pointer; text-align:left; transition:background 0.2s, border 0.2s;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" style="width:40px;" alt="UPI">
                    <div style="flex:1;">
                        <h4 style="margin:0; font-size:1rem; color:#333;">PhonePe</h4>
                        <p style="margin:2px 0 0 0; font-size:0.8rem; color:#888;">Direct Bank Transfer</p>
                    </div>
                    <i class="fas fa-chevron-right" style="color:#ccc;"></i>
                </button>
            </div>
            <div style="margin-top:20px; text-align:center; font-size:0.75rem; color:#aaa;">
                <i class="fas fa-lock"></i> 100% Secure & Encrypted by Razorpay Prototype
            </div>
        </div>
        <div style="padding:40px 20px; text-align:center; display:none;" id="gwStage2">
            <div style="width:60px; height:60px; border:4px solid #f3f3f3; border-top:4px solid #0F4A6F; border-radius:50%; animation:spin 1s linear infinite; margin:0 auto 20px auto;"></div>
            <h3 style="margin:0 0 10px 0; color:#333;">Processing Payment...</h3>
            <p style="margin:0; color:#666; font-size:0.9rem;">Please open your UPI app to complete the transaction.</p>
        </div>
        <div style="padding:40px 20px; text-align:center; display:none;" id="gwStage3">
            <div style="width:70px; height:70px; background:#4CAF50; color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 20px auto; animation:popIn 0.4s ease-out;">
                <i class="fas fa-check"></i>
            </div>
            <h3 style="margin:0 0 10px 0; color:#333;">Payment Successful!</h3>
            <p style="margin:0; color:#666; font-size:0.9rem;">₹${amount} paid to BharatFarm.</p>
        </div>
    `;
    
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes popIn { 0% { transform: scale(0.5); opacity:0; } 80% { transform: scale(1.1); opacity:1; } 100% { transform: scale(1); } }
        .mock-upi-btn:hover { border-color:#0F4A6F!important; background:#f9fbff!important; }
    `;
    overlay.appendChild(style);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    
    const closeBtn = document.getElementById('closeGwBtn');
    closeBtn.onclick = () => {
        overlay.remove();
        // Restore main button if cancelled
        const originalBtn = document.getElementById('buyCreditsBtn');
        if (originalBtn) {
            originalBtn.innerHTML = '<i class="fas fa-bolt"></i> Pay ₹9 via UPI';
            originalBtn.disabled = false;
        }
    };
    
    document.querySelectorAll('.mock-upi-btn').forEach(btn => {
        btn.onclick = () => {
            document.getElementById('gwStage1').style.display = 'none';
            document.getElementById('gwStage2').style.display = 'block';
            
            // Wait 2.5s to show logic
            setTimeout(() => {
                document.getElementById('gwStage2').style.display = 'none';
                document.getElementById('gwStage3').style.display = 'block';
                closeBtn.style.display = 'none'; // Lock close
                
                // Show success for 1.5s
                setTimeout(() => {
                    overlay.remove();
                    onSuccess();
                }, 1500);
            }, 2500);
        };
    });
}

async function purchaseCredits() {
    const user = JSON.parse(localStorage.getItem('bharatfarm_current_user'));
    if (!user) {
        alert("Please login first to recharge.");
        return;
    }
    
    const btn = document.getElementById('buyCreditsBtn');
    if(btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Initializing...';
        btn.disabled = true;
    }

    // Launch Mock Payment Gateway
    showMockPaymentGateway('9', async () => {
        try {
            const response = await fetch(`${CREDITS_API_URL}/api/credits/purchase`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: user.phone, points: 100 })
            });
            const data = await response.json();
            
            if (data.success) {
                // Done points added
                currentCreditProfile = data.profile;
                updateCreditBadge();
                closeRechargeModal();
                showCreditToast("<i class='fas fa-check-circle' style='color:#fff'></i> Successfully added 100 Credit points!");
            } else {
                alert(data.message || data.error);
            }
        } catch (e) {
            console.error(e);
            alert("Network error.");
        } finally {
            if(btn) {
                btn.innerHTML = '<i class="fas fa-bolt"></i> Pay ₹9 via UPI';
                btn.disabled = false;
            }
        }
    });
}

function showCreditToast(messageHTML) {
    const toast = document.createElement('div');
    toast.className = 'mk-toast';
    toast.innerHTML = messageHTML;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

// Intercept Login to initialize credits
const originalShowApp = showApp;
showApp = function() {
    originalShowApp();
    initCredits();
};
