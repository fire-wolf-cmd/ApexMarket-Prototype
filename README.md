# ApexMarket — High-Fidelity E-Commerce UX/UI Prototype

## Overview

ApexMarket is a mobile-first, pastel-themed, conversion-optimized E-Commerce platform inspired by Amazon, Myntra, Meesho, and Flipkart.

The platform architecture prioritizes:

* High conversion rates
* Information density without clutter
* WCAG 2.1 accessibility compliance
* Responsive UX
* Emotional feminine visual design
* Fast interaction patterns
* Interactive UI components
* Fully functional navigation & buttons

---

# 1. DESIGN SYSTEM

## Typography

### Primary Font

* Inter
* Fallback: sans-serif

### Type Scale

| Usage               | Size | Weight |
| ------------------- | ---- | ------ |
| Hero Heading        | 48px | 700    |
| Product Price       | 32px | 700    |
| Section Heading     | 24px | 600    |
| Product Title       | 16px | 500    |
| Product Description | 14px | 400    |
| Caption             | 12px | 400    |

---

## Color Palette

### Primary Feminine Pastel Palette

| Token         | Value   |
| ------------- | ------- |
| Blush Pink    | #F8C8DC |
| Rose Quartz   | #F4B6C2 |
| Lavender Mist | #E8DFF5 |
| Soft Peach    | #FFE5D4 |
| Cloud White   | #FFF9FB |
| Deep Plum     | #5C375B |
| Slate Text    | #4B4453 |
| Mint Accent   | #CFF5E7 |
| Danger Pink   | #FF6B9A |

---

## Grid & Spacing

### Desktop

* 12-column responsive grid
* 1440px container
* 24px gutter

### Mobile First

* 375x812 viewport optimized
* 16px outer padding
* 8px spacing scale

### Radius System

* Cards: 20px
* Buttons: 14px
* Inputs: 12px

### Shadows

```css
box-shadow: 0 6px 24px rgba(0,0,0,0.08);
```

---

# 2. INFORMATION ARCHITECTURE

## Main Navigation

* Home
* Electronics
* Fashion
* Home & Kitchen
* Budget Finds
* Rewards
* Orders
* Cart
* Profile

---

# 3. APPLICATION STRUCTURE

```bash
src/
 ├── components/
 │    ├── Header.js
 │    ├── HeroCarousel.js
 │    ├── DealTimer.js
 │    ├── ProductCard.js
 │    ├── Filters.js
 │    ├── CartDrawer.js
 │    ├── CheckoutAccordion.js
 │    ├── WishlistButton.js
 │    ├── RewardsBar.js
 │    └── SearchBar.js
 │
 ├── pages/
 │    ├── Home.js
 │    ├── Electronics.js
 │    ├── Fashion.js
 │    ├── Budget.js
 │    ├── ProductDetail.js
 │    ├── Cart.js
 │    └── Checkout.js
 │
 ├── data/
 │    └── products.js
 │
 ├── assets/
 │    ├── skincare/
 │    ├── electronics/
 │    ├── kitchen/
 │    └── fashion/
 │
 ├── App.js
 ├── main.js
 └── styles.css
```

---

# 4. PRODUCT DATA STRUCTURE

```javascript
export const products = [
  {
    id: 1,
    category: "Skincare",
    subCategory: "Hair Oil",
    title: "Botanical Hair Repair Oil",
    price: 799,
    mrp: 1499,
    stock: 20,
    image: "/assets/skincare/hair-oil.jpg",
    badge: "Best Seller",
    rating: 4.7
  }
]
```

---

# 5. GLOBAL HEADER

## Features

* Predictive search
* Working cart icon
* Location picker dropdown
* OTP login modal
* Hamburger mobile drawer
* Sticky countdown deals bar

## Interaction Design

### Hover States

```css
.primary-btn:hover {
  transform: translateY(-2px);
  background: #f4b6c2;
  transition: 0.3s ease;
}
```

### Mobile Drawer Animation

```css
.drawer {
  transform: translateX(-100%);
  transition: transform 0.4s ease;
}

.drawer.active {
  transform: translateX(0);
}
```

---

# 6. HOMEPAGE EXPERIENCE

## Hero Carousel

Slides:

* Summer Fashion Sale
* Electronics Mega Drop
* Budget Beauty Essentials
* Home Upgrade Festival

### CTA Buttons

* Shop Now
* Explore Deals
* View Collection

All buttons route dynamically.

---

## Deal of the Day Timer

### Sticky Bar Component

```javascript
const [timeLeft, setTimeLeft] = useState(86400)
```

Displays:

* Hours
* Minutes
* Seconds

Auto updates every second.

---

## Category Grid

### Categories

#### Electronics

* Drone
* Headphones
* Laptop
* Mobile Phone

#### Skincare

* Hair Oil
* Serum
* Lipstick

#### Home & Kitchen

* Air Fryer
* Juicer
* Oven
* Refrigerator
* Toaster
* Vacuum Cleaner
* Washing Machine

#### Fashion Women

* Chic Dress
* Maxi Skirt
* Work Blazer
* Street Wear

#### Fashion Men

* Suit
* Denim Jacket
* Leather Jacket

---

# 7. ELECTRONICS PAGE

## Layout

### Left Sidebar Filters

* Brand
* Price
* RAM
* Storage
* Ratings
* Sponsored

### Product List View

Includes:

* Product image
* Tech specs
* Ratings
* Delivery date
* Stock bar
* Sponsored badge

### Stock Running Out Widget

```javascript
<div className="stock-bar">
  <div style={{width:'30%'}}></div>
</div>
```

---

# 8. FASHION PAGE

## UX Features

* Visual-heavy masonry grid
* Hover wishlist heart
* Size filters
* Complete-the-look bundles
* Quick preview modal

## Wishlist Hover

```css
.card:hover .wishlist {
  opacity: 1;
}
```

---

# 9. BUDGET FINDS PAGE

## Core Conversion Elements

* Reseller pricing labels
* Share-to-earn CTA
* WhatsApp share
* Instagram share
* Telegram share

### Share Button Example

```javascript
navigator.share({
 title: product.title,
 url: window.location.href
})
```

---

# 10. PRODUCT DETAIL PAGE

## Image Gallery

* Multi-image carousel
* Zoom on hover
* 360-view icon
* Swipe gestures on mobile

---

## Pricing Widget

Displays:

* MRP strike-through
* Discount percentage
* Live offer badge
* EMI text
* Bank offers accordion

### Accordion Logic

```javascript
const [open, setOpen] = useState(false)
```

---

## Social Proof Ticker

```text
🔥 500 people bought this in the last 24 hours
```

Animated marquee effect.

---

# 11. CART EXPERIENCE

## Features

* Quantity selector
* Remove item
* Move to wishlist
* Delivery estimate
* Frequently bought together widget

---

# 12. CHECKOUT EXPERIENCE

## Single Page Accordion Checkout

### Steps

1. Login
2. Address
3. Payment
4. Review

---

## Secure Purchase Trust Signals

* Secure transaction badge
* Delivery timeline
* Shipment tracking preview
* COD availability

---

# 13. REWARDS SYSTEM

## Loyalty Progress Bar

```javascript
const progress = 70
```

Displays:

* Current points
* Tier badge
* Progress to next reward

---

# 14. ACCESSIBILITY (WCAG 2.1)

## Compliance Features

* 4.5:1 contrast ratio
* Keyboard navigation
* Focus states
* Semantic HTML
* ARIA labels
* Screen reader support
* Large tap targets

### Example

```html
<button aria-label="Add product to cart">
```

---

# 15. COMPLETE REACT + JAVASCRIPT APP FOUNDATION

## App.js

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Electronics from './pages/Electronics'
import Fashion from './pages/Fashion'
import Budget from './pages/Budget'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

---

# 16. OTP AUTHENTICATION FLOW

## Demo OTP Logic

```javascript
const validOTP = '0123456789'

function verifyOTP(input) {
 return input === validOTP
}
```

## Authentication Flow

1. Enter mobile number
2. Generate OTP
3. Validate OTP
4. Login success modal

---

# 17. SEARCH SYSTEM

## Predictive Search Logic

```javascript
const filteredProducts = products.filter(product =>
 product.title.toLowerCase().includes(search.toLowerCase())
)
```

### Features

* Real-time filtering
* Suggested products
* Recent searches
* Category tags

---

# 18. RESPONSIVE STRATEGY

## Mobile First

### Mobile

* Bottom navigation
* Swipe gestures
* Slide drawer
* Sticky add-to-cart

### Desktop

* Mega menus
* Hover interactions
* Dense comparison layout

---

# 19. PERFORMANCE OPTIMIZATION

## Strategies

* Lazy image loading
* Code splitting
* Skeleton loaders
* Optimized assets
* Memoized components
* Intersection observers

---

# 20. MICRO INTERACTIONS

## Included Interactions

* Wishlist pop animation
* Cart shake feedback
* Hover elevation
* Smooth accordions
* Fade transitions
* Slide-up modals

---

# 21. RECOMMENDED TECH STACK

| Layer     | Technology         |
| --------- | ------------------ |
| Frontend  | React + JavaScript |
| Styling   | Tailwind CSS       |
| Routing   | React Router       |
| State     | Context API        |
| Animation | Framer Motion      |
| Icons     | Lucide React       |
| Carousel  | Swiper.js          |
| Forms     | React Hook Form    |

---

# 22. GITHUB README

# ApexMarket

ApexMarket is a high-fidelity, mobile-first E-Commerce platform prototype inspired by Amazon, Myntra, Meesho, and Flipkart.

The platform focuses on:

* High conversion UX
* Interactive shopping flows
* Feminine pastel aesthetics
* Fully functional JavaScript interactions
* Responsive design
* Accessibility compliance
* Modern React architecture

---

## Features

### Authentication

* OTP login system
* User profile management
* Rewards progress tracker

### Shopping Experience

* Predictive search
* Dynamic hero carousel
* Wishlist system
* Share-to-earn features
* Sponsored product badges
* Stock urgency indicators
* Frequently bought together suggestions

### Product Categories

#### Skincare

* Hair Oil
* Serum
* Lipstick

#### Electronics

* Drone
* Headphones
* Laptop
* Mobile Phone

#### Home & Kitchen

* Air Fryer
* Juicer
* Oven
* Refrigerator
* Toaster
* Vacuum Cleaner
* Washing Machine

#### Fashion

Women:

* Chic Dress
* Maxi Skirt
* Work Blazer
* Street Wear

Men:

* Suit
* Denim Jacket
* Leather Jacket

---

## Tech Stack

```bash
React
JavaScript
Tailwind CSS
Framer Motion
React Router
Swiper.js
Lucide React
```

---

## Installation

```bash
git clone https://github.com/yourusername/apexmarket.git

cd apexmarket

npm install

npm run dev
```

---

## Folder Structure

```bash
src/
 ├── assets/
 ├── components/
 ├── pages/
 ├── data/
 ├── styles/
 └── App.js
```

---

## Accessibility

ApexMarket follows WCAG 2.1 standards:

* Keyboard navigation
* Accessible labels
* Color contrast optimization
* Responsive touch targets
* Semantic HTML

---

## Performance Features

* Lazy loading
* Optimized images
* Code splitting
* Responsive rendering
* Fast search filtering

---

## Future Enhancements

* AI product recommendations
* Voice commerce
* AR try-on
* Live shopping
* Dynamic pricing engine
* Regional language support
* Creator storefronts

---

## License

MIT License

---

## Created For

High-conversion modern E-Commerce UX/UI experimentation and scalable frontend architecture. 
