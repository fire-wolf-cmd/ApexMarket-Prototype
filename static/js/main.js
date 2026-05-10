// ApexMarket Core Logic

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initMobileNav();
    initSearch();
    updateCartCount();
});

// Countdown Timer
function initCountdown() {
    let timeLeft = 3600 * 2.5; // 2.5 hours
    const countdownEl = document.getElementById('countdown');
    
    const timer = setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        countdownEl.innerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        if (timeLeft <= 0) clearInterval(timer);
        timeLeft--;
    }, 1000);
}

// Mobile Navigation
function initMobileNav() {
    const openBtn = document.getElementById('open-nav');
    const closeBtn = document.getElementById('close-nav');
    const nav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('drawer-overlay');

    openBtn.addEventListener('click', () => {
        nav.classList.add('active');
        overlay.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        nav.classList.remove('active');
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', () => {
        nav.classList.remove('active');
        overlay.style.display = 'none';
    });
}

// Predictive Search
function initSearch() {
    const input = document.getElementById('search-input');
    const resultsDiv = document.getElementById('search-results');

    input.addEventListener('input', async (e) => {
        const query = e.target.value.trim();
        if (query.length < 2) {
            resultsDiv.style.display = 'none';
            return;
        }

        const response = await fetch(`/api/search?q=${query}`);
        const data = await response.json();

        if (data.length > 0) {
            resultsDiv.innerHTML = data.map(p => {
                const catPath = p.category.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_');
                return `
                    <a href="/product/${p.id}" style="display:flex; align-items:center; gap:15px; padding:10px 20px; border-bottom:1px solid #eee;">
                        <img src="/static/img/products/${catPath}/${p.img}" style="width:40px; height:40px; object-fit:contain;">
                        <div>
                            <div style="font-weight:600; font-size:0.9rem;">${p.name}</div>
                            <div style="color:var(--ruby-pink); font-size:0.8rem;">₹${p.price}</div>
                        </div>
                    </a>
                `;
            }).join('');
            resultsDiv.style.display = 'block';
        } else {
            resultsDiv.style.display = 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !resultsDiv.contains(e.target)) {
            resultsDiv.style.display = 'none';
        }
    });
}

// Login Simulation
function openLogin() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.style.display = 'flex';
}

function closeLogin() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.style.display = 'none';
}

function sendOTP() {
    const phone = document.getElementById('phone-input').value;
    if (phone.length === 10) {
        document.getElementById('login-step-1').style.display = 'none';
        document.getElementById('login-step-2').style.display = 'block';
    } else {
        alert("Please enter a valid 10-digit mobile number (0123456789)");
    }
}

function verifyOTP() {
    // Simulate successful login
    alert("Welcome back! You have successfully signed in.");
    closeLogin();
    localStorage.setItem('apex_auth', 'true');
    window.location.href = '/';
}

function logout() {
    localStorage.removeItem('apex_auth');
    alert("Logged out successfully.");
    window.location.href = '/login';
}

// Cart Logic
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    document.getElementById('cart-count').innerText = cart.length;
}

function addToCart(btn, productId, name, price, img, category) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ id: productId, name, price, img, category });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Feedback
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Added';
    btn.style.background = '#28a745';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
    }, 2000);
}

// Wishlist Logic
document.addEventListener('click', (e) => {
    // Wishlist toggle
    if (e.target.classList.contains('wishlist-heart')) {
        e.target.classList.toggle('fas');
        e.target.classList.toggle('far');
        e.target.style.color = e.target.classList.contains('fas') ? 'var(--ruby-pink)' : '#ccc';
        
        if (e.target.classList.contains('fas')) {
            showToast('Added to Wishlist! ❤️');
        }
    }
    
    // Size Selection
    if (e.target.classList.contains('size-btn')) {
        const parent = e.target.parentElement;
        parent.querySelectorAll('.size-btn').forEach(btn => {
            btn.style.background = 'white';
            btn.style.color = 'var(--dark-text)';
            btn.style.borderColor = 'var(--accent-pink)';
        });
        e.target.style.background = 'var(--ruby-pink)';
        e.target.style.color = 'white';
        e.target.style.borderColor = 'var(--ruby-pink)';
    }
});

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.style.cssText = `position:fixed; bottom:30px; left:50%; transform:translateX(-50%); background:${type === 'success' ? 'var(--ruby-pink)' : '#333'}; color:white; padding:12px 35px; border-radius:30px; z-index:5000; box-shadow:0 10px 30px rgba(0,0,0,0.2); font-weight:600; font-family:Inter, sans-serif; transition: all 0.3s ease;`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

function topUpWallet() {
    const amount = prompt("Enter amount to top up (₹):", "500");
    if (amount) {
        showToast("Payment Successful! ₹" + amount + " added to wallet.");
        // Simulate wallet balance update if we had one
    }
}
