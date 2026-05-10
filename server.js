const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Mock Data
const PRODUCTS = {
    "electronics": [
        {"id": "e1", "name": "Pro Drone X4", "price": 45000, "old_price": 55000, "img": "drone.png", "specs": "4K Camera, 30min Flight Time", "category": "Electronics"},
        {"id": "e2", "name": "Studio Headphones", "price": 12000, "old_price": 15000, "img": "headphones.png", "specs": "Noise Cancelling, 40h Battery", "category": "Electronics"},
        {"id": "e3", "name": "ZenBook Laptop", "price": 85000, "old_price": 95000, "img": "laptop.png", "specs": "16GB RAM, 512GB SSD", "category": "Electronics"},
        {"id": "e4", "name": "Phone 15 Pro", "price": 120000, "old_price": 130000, "img": "mobile phone.png", "specs": "A17 Pro Chip, OLED Display", "category": "Electronics"},
    ],
    "fashion": [
        {"id": "f1", "name": "Classic Men's Suit", "price": 8000, "old_price": 12000, "img": "Suit M.png", "category": "Fashion", "gender": "Men"},
        {"id": "f2", "name": "Chic Floral Dress", "price": 2500, "old_price": 3500, "img": "chic dress W.png", "category": "Fashion", "gender": "Women"},
        {"id": "f3", "name": "Urban Denim Jacket", "price": 1800, "old_price": 2800, "img": "denim jacket M.png", "category": "Fashion", "gender": "Men"},
        {"id": "f4", "name": "Premium Leather Jacket", "price": 4500, "old_price": 6000, "img": "leather jacket M.png", "category": "Fashion", "gender": "Men"},
        {"id": "f5", "name": "Elegant Maxi Skirt", "price": 1500, "old_price": 2200, "img": "maxi skirt W.png", "category": "Fashion", "gender": "Women"},
        {"id": "f6", "name": "Streetwear Hoodie", "price": 1200, "old_price": 2000, "img": "street ware W.png", "category": "Fashion", "gender": "Women"},
        {"id": "f7", "name": "Professional Work Blazer", "price": 3200, "old_price": 4500, "img": "work blazer W.png", "category": "Fashion", "gender": "Women"},
    ],
    "home_kitchen": [
        {"id": "hk1", "name": "Digital Air Fryer", "price": 6000, "old_price": 8000, "img": "air frier.png", "category": "Home & Kitchen"},
        {"id": "hk2", "name": "Power Juicer", "price": 3500, "old_price": 5000, "img": "jucier.png", "category": "Home & Kitchen"},
        {"id": "hk3", "name": "Convection Oven", "price": 15000, "old_price": 18000, "img": "oven.png", "category": "Home & Kitchen"},
        {"id": "hk4", "name": "Smart Refrigerator", "price": 45000, "old_price": 55000, "img": "refregirator .png", "category": "Home & Kitchen"},
        {"id": "hk5", "name": "Retro Toaster", "price": 2500, "old_price": 3500, "img": "toster.png", "category": "Home & Kitchen"},
        {"id": "hk6", "name": "Stick Vacuum Cleaner", "price": 8000, "old_price": 11000, "img": "vacuum cleaner .png", "category": "Home & Kitchen"},
        {"id": "hk7", "name": "Front Load Washing Machine", "price": 32000, "old_price": 40000, "img": "washing machine.png", "category": "Home & Kitchen"},
    ],
    "skincare_beauty": [
        {"id": "sb1", "name": "Herbal Hair Oil", "price": 450, "old_price": 600, "img": "hair oil.png", "category": "Skincare & Beauty"},
        {"id": "sb2", "name": "Matte Lipstick", "price": 800, "old_price": 1200, "img": "lipstick.png", "category": "Skincare & Beauty"},
        {"id": "sb3", "name": "Vitamin C Serum", "price": 1500, "old_price": 2000, "img": "serum.png", "category": "Skincare & Beauty"},
    ]
};

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'static')));

// Enforce Auth Middleware (Simple JS check)
app.use((req, res, next) => {
    // In a real app we'd check cookies/session, for this prototype we'll let the frontend handle redirection
    next();
});

app.get('/', (req, res) => {
    const featured = [...PRODUCTS.electronics.slice(0, 2), ...PRODUCTS.fashion.slice(0, 2)];
    res.render('index', { featured });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/category/:cat_id', (req, res) => {
    const cat_key = req.params.cat_id.replace(/-/g, '_');
    if (PRODUCTS[cat_key]) {
        res.render('category', { category: cat_key, products: PRODUCTS[cat_key] });
    } else {
        res.status(404).send('Category not found');
    }
});

// Direct category access like /electronics
app.get('/:cat_id', (req, res, next) => {
    const cat_key = req.params.cat_id.replace(/-/g, '_');
    if (PRODUCTS[cat_key]) {
        res.render('category', { category: cat_key, products: PRODUCTS[cat_key] });
    } else {
        next();
    }
});

app.get('/product/:prod_id', (req, res) => {
    let product = null;
    Object.values(PRODUCTS).forEach(cat => {
        cat.forEach(p => {
            if (p.id === req.params.prod_id) product = p;
        });
    });
    if (product) {
        res.render('pdp', { product });
    } else {
        res.status(404).send('Product not found');
    }
});

app.get('/cart', (req, res) => {
    res.render('cart');
});

app.get('/checkout', (req, res) => {
    res.render('checkout');
});

app.get('/api/search', (req, res) => {
    const query = (req.query.q || '').toLowerCase();
    const results = [];
    if (query) {
        Object.values(PRODUCTS).forEach(cat => {
            cat.forEach(p => {
                if (p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)) {
                    results.push(p);
                }
            });
        });
    }
    res.json(results.slice(0, 5));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
