# PACELINE — Developer Community SASTRA (DCS) Web Cluster Frontend Task

A responsive e-commerce & brand website for **PACELINE Running Co.**, an independent running specialty store and community hub established in Glasgow.

Built with **pure semantic HTML5, modern CSS3, and vanilla JavaScript** matching the provided design specifications.

---

## 🌟 Live Demo & Pages

- **Home Page (`index.html`)**:
  - Top announcement banner with multi-currency / store info
  - Sticky header with responsive navigation drawer and dynamic cart badge
  - Hero banner with typography, action buttons, and slide indicators
  - **01 · Shop by Category**: 4-column responsive category cards (Road, Trail, Apparel, Accessories)
  - **02 · Just Landed**: Product cards with interactive category filter pills (*New In*, *Best Sellers*, *Race Day*, *Trail*), wishlist heart toggles, and Quick Add to cart
  - **Our Story Split Banner**: Editorial story section with metrics counters (10+ Years, 40+ Brands, 1 Store)
  - **Explore Section**: Side-by-side banners for Men's & Women's collections
  - **Newsletter Bar**: Subscription input with client-side email validation and toast alerts
  - **Footer**: Categorized site links, brand story, social channels, and legal copyright

- **About Page (`about.html`)**:
  - Breadcrumb navigation (`HOME / ABOUT`)
  - Hero header with high-impact typography and race-start banner
  - **01 · Why We Exist**: Two-column narrative on brand heritage and Glasgow community support
  - **02 · What We Stand For**: 3 core value cards with distinct numeric highlights
  - **03 · Ten Seasons In**: 4-stage historical timeline (2015 - 2026)
  - **04 · Come Say Hi**: Glasgow store locator with opening hours, map visual, and Gait Clinic booking modal
  - **05 · Meet the Founders**: Rae Sinclair & Jamie Roy founder profile cards with experience badges
  - **Ready to Run? CTA**: Neon lime call-to-action banner with modal triggers
  - Shared Newsletter and Footer components

---

## 🚀 Interactive Features

1. **Slide-in Cart Drawer**:
   - Add items via "+ Quick Add" on product cards
   - Live badge counter in header
   - Real-time subtotal calculation
   - Item removal & empty state handling
2. **Product Category Filtering**:
   - Filter between *New In*, *Best Sellers*, *Race Day*, and *Trail* with smooth fade/slide transitions
3. **Wishlist State**:
   - Click the heart icon on any shoe card to toggle wishlist status with toast feedback
4. **Live Search Modal**:
   - Search through catalog products and services with real-time query matching
5. **Gait Clinic Appointment Booking**:
   - Interactive modal on the About page to book a free Saturday gait analysis slot
6. **Mobile Navigation**:
   - Hamburger toggle with full-screen smooth drawer menu

---

## 📂 Project Structure

```text
dcs-frontend/
│
├── index.html              # Main Home Page
├── about.html              # Our Story / About Page
├── styles.css              # Master CSS (Variables, Grid, Flexbox, Responsive)
├── script.js               # Vanilla JavaScript for all interactions & state
├── README.md               # Project documentation & setup instructions
│
└── assets/                 # High-resolution design assets
    ├── Home/
    │   ├── hero_section/image1.png
    │   ├── category_section/image1.png ... image4.png
    │   ├── arrivals_section/image.png
    │   ├── story_section/image.png
    │   └── explore_section/image_female.png, image_male.png
    └── About/
        ├── main_story_section/image_joggers.png
        ├── visit_us_section/map.png
        └── founders_section/image1.png, image2.png
```

---

## 💻 How to Run Locally

### Option 1: Direct Browser Launch
1. Clone or download this repository.
2. Double-click `index.html` to open it in your browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using VS Code Live Server
1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and click **"Open with Live Server"**.

### Option 3: Using Python Local Server
```bash
# In the project directory:
python -m http.server 3000
```
Open `http://localhost:3000` in your web browser.

---

## 🌐 Deployment Instructions

### Deploy to Netlify (Drag & Drop or CLI)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `dcs-frontend` folder directly.
3. Your site will be instantly live with an SSL certificate.

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project folder and follow the prompts.

### Deploy to GitHub Pages
1. Push this repository to GitHub.
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` / `root` and click **Save**.

---

## ♿ Accessibility & Performance Best Practices
- **Semantic HTML5 Elements**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- **Keyboard Navigation**: Accessible buttons, skip links, aria attributes (`aria-label`, `aria-expanded`, `aria-hidden`).
- **Performance Optimized**: Zero external heavy libraries, optimized asset loading with `loading="lazy"`, fast CSS transforms.
- **Cross-Browser Tested**: Compatible with modern Chrome, Firefox, Safari, and Edge.
