# 🛒 Shopily - Premium E-commerce Website (React)

A modern, responsive one-page e-commerce website built with **React** and **Vite** for tech products featuring a stunning blue and white design theme.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?logo=vite)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?logo=github)

## ✨ Features

### ⚛️ React Architecture
- **Component-Based** - Modular, reusable React components
- **Hooks** - Modern React hooks (useState, useEffect, useContext)
- **Context API** - Global state management for shopping cart
- **CSS Modules** - Scoped styling for each component
- **Vite** - Lightning-fast development and builds

### 🎨 Design
- **Modern Blue & White Theme** - Professional color palette with gradients
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Smooth Animations** - Micro-interactions and hover effects
- **Glassmorphism Effects** - Premium visual aesthetics
- **Custom Typography** - Google Fonts (Inter & Outfit)

### 🛍️ E-commerce Functionality
- **Shopping Cart** - Add products with live cart counter (Context API)
- **Product Filtering** - Filter by category (Laptops, Gaming PCs, Accessories)
- **Live Search** - Real-time product search
- **Product Cards** - Beautiful cards with images, prices, and CTAs
- **Notifications** - Toast notifications for user actions

### 🚀 Performance
- **Lazy Loading** - Optimized image loading
- **Code Splitting** - Vite automatic code splitting
- **Fast Refresh** - Instant HMR during development
- **Optimized Build** - Production-ready builds

### 🔍 SEO Optimized
- **Meta Tags** - Complete SEO meta tags
- **Open Graph** - Social media sharing optimization
- **Semantic HTML** - Proper HTML5 structure
- **Alt Text** - All images have descriptive alt text

## 📁 Project Structure

```
Ecommerce/
├── public/
│   └── assets/
│       └── images/          # Product images
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.module.css
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   └── Hero.module.css
│   │   ├── Products/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Products.jsx
│   │   │   └── Products.module.css
│   │   ├── Categories/
│   │   │   ├── Categories.jsx
│   │   │   └── Categories.module.css
│   │   ├── Features/
│   │   │   ├── Features.jsx
│   │   │   └── Features.module.css
│   │   ├── Testimonials/
│   │   │   ├── Testimonials.jsx
│   │   │   └── Testimonials.module.css
│   │   ├── Newsletter/
│   │   │   ├── Newsletter.jsx
│   │   │   └── Newsletter.module.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.module.css
│   │   └── Notification/
│   │       ├── Notification.jsx
│   │       └── Notification.module.css
│   ├── context/
│   │   └── CartContext.jsx    # Cart state management
│   ├── data/
│   │   └── products.js        # Product data
│   ├── styles/
│   │   └── global.css         # Global styles & design tokens
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions for auto-deploy
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Ecommerce.git

# Navigate to project directory
cd Ecommerce

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000/Ecommerce/`

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## 🌐 GitHub Pages Deployment

### Automatic Deployment (Recommended)

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/Ecommerce.git
git push -u origin main
```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - The workflow will automatically deploy on push to main

3. **Access Your Site**:
   - URL: `https://yourusername.github.io/Ecommerce/`

### Manual Deployment

```bash
npm run build
npm run deploy
```

## 🎯 Components

### Header
- Sticky navigation with scroll effect
- Mobile menu toggle
- Live search bar
- Shopping cart icon with badge

### Hero
- Gradient background with grid pattern
- Animated title and subtitle
- Call-to-action buttons

### Products
- Product grid with filtering
- Category filter buttons
- Search functionality
- Add to cart feature

### Categories
- Category cards with icons
- Click to filter products
- Gradient overlays

### Features
- Benefits grid
- Icon badges
- Hover animations

### Testimonials
- Auto-rotating carousel
- Manual navigation dots
- Glassmorphism effect

### Newsletter
- Email subscription form
- Email validation
- Success notifications

### Footer
- Multi-column layout
- Social media links
- Contact information

### Notification
- Toast notifications
- Auto-dismiss
- Success/error states

## 🛠️ Technologies Used

- **React 18.3.1** - UI library
- **Vite 6.0.3** - Build tool and dev server
- **CSS Modules** - Scoped component styling
- **Context API** - State management
- **Google Fonts** - Inter & Outfit fonts
- **GitHub Actions** - CI/CD pipeline

## 🎨 Customization

### Change Colors

Edit CSS custom properties in `src/styles/global.css`:

```css
:root {
  --color-primary: #1E88E5;
  --color-primary-dark: #0D47A1;
  --gradient-primary: linear-gradient(135deg, #1E88E5 0%, #1565C0 100%);
}
```

### Add Products

Edit the products array in `src/data/products.js`:

```javascript
export const products = [
  {
    id: 1,
    name: 'Product Name',
    description: 'Product description',
    price: 99.99,
    image: '/assets/images/product.jpg',
    category: 'laptops',
    badge: 'New'
  }
];
```

### Modify Components

Each component is in its own folder with:
- `.jsx` file - Component logic
- `.module.css` file - Component styles

## 🔧 Configuration

### Vite Config

Update `vite.config.js` for your repository:

```javascript
export default defineConfig({
  base: '/YourRepositoryName/',  // Change this
  plugins: [react()],
})
```

### GitHub Actions

The workflow in `.github/workflows/deploy.yml` automatically:
- Builds the app on push to main
- Deploys to GitHub Pages
- No manual intervention needed

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1440px
- **Large Desktop**: > 1440px

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📊 Performance

- ⚡ Fast load times with Vite
- 🖼️ Lazy loading images
- 💨 Smooth animations
- 📱 Mobile-optimized
- 🎯 SEO-friendly

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Author

Created with ❤️ using React and Vite

## 🙏 Acknowledgments

- React team for the amazing library
- Vite team for the blazing-fast tooling
- Google Fonts for typography
- Design inspired by modern e-commerce best practices

## 📞 Support

For questions or issues:
- 📧 Email: support@shopily.com
- 📞 Phone: +1-800-SHOPILY

## 🎉 Enjoy Shopping!

Visit the live site and explore all the features. Happy shopping! 🛒✨


![Shopily](https://img.shields.io/badge/Status-Complete-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🎨 Design
- **Modern Blue & White Theme** - Professional color palette with gradients
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Smooth Animations** - Micro-interactions and hover effects
- **Glassmorphism Effects** - Premium visual aesthetics
- **Custom Typography** - Google Fonts (Inter & Outfit)

### 🛍️ E-commerce Functionality
- **Shopping Cart** - Add products with live cart counter
- **Product Filtering** - Filter by category (Laptops, Gaming PCs, Accessories)
- **Live Search** - Real-time product search
- **Product Cards** - Beautiful cards with images, prices, and CTAs
- **Notifications** - Toast notifications for user actions

### 🚀 Performance
- **Lazy Loading** - Optimized image loading
- **Smooth Scrolling** - Enhanced navigation experience
- **Debounced Search** - Optimized search performance
- **Intersection Observer** - Efficient scroll animations
- **Mobile-First** - Optimized for all devices

### 🔍 SEO Optimized
- **Meta Tags** - Complete SEO meta tags
- **Open Graph** - Social media sharing optimization
- **Structured Data** - JSON-LD schema markup
- **Semantic HTML** - Proper HTML5 structure
- **Alt Text** - All images have descriptive alt text

### ♿ Accessibility
- **ARIA Labels** - Screen reader friendly
- **Keyboard Navigation** - Full keyboard support
- **Semantic HTML** - Proper heading hierarchy
- **Color Contrast** - WCAG compliant
- **Focus States** - Clear focus indicators

## 📁 Project Structure

```
Ecommerce/
├── index.html          # Main HTML file
├── index.css           # Complete design system
├── script.js           # Interactive functionality
├── README.md           # This file
└── assets/
    └── images/
        ├── laptop-1.jpg
        ├── gaming-pc.jpg
        ├── laptop-2.jpg
        ├── lifestyle-1.jpg
        └── lifestyle-2.jpg
```

## 🚀 Quick Start

### Option 1: Using http-server (Recommended)
```bash
# Install http-server globally (if not already installed)
npm install -g http-server

# Navigate to project directory
cd d:/AntigravityProjects/Ecommerce

# Start server
http-server -p 8080 -o
```

### Option 2: Using Python
```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

### Option 3: Using VS Code
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: Direct Open
Simply open `index.html` in your browser (some features may be limited)

## 🎯 Sections

1. **Navigation Header** - Sticky header with search and cart
2. **Hero Section** - Eye-catching banner with CTAs
3. **Featured Products** - Product grid with filtering and search
4. **Categories** - Quick category navigation
5. **Why Choose Us** - Key benefits and features
6. **Testimonials** - Customer reviews carousel
7. **Newsletter** - Email subscription form
8. **Footer** - Links, contact info, and social media

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript (ES6+)** - Interactive functionality
- **Google Fonts** - Inter & Outfit fonts
- **SVG Icons** - Scalable vector graphics

## 🎨 Color Palette

```css
Primary Blue:   #1E88E5
Dark Blue:      #0D47A1
Light Blue:     #42A5F5
White:          #FFFFFF
Gray Shades:    #F8F9FA to #212529
```

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1440px
- **Large Desktop**: > 1440px

## 🔧 Interactive Features

### Shopping Cart
```javascript
// Add product to cart
addToCart(productName, price)

// Get cart total
getCartTotal()

// Clear cart
clearCart()
```

### Product Filtering
- Click category buttons to filter products
- "All Products" shows everything
- Smooth animations on filter

### Search
- Type in search bar to filter products
- Searches titles and descriptions
- Real-time results

### Testimonials
- Auto-rotates every 5 seconds
- Click dots to navigate manually
- Smooth fade transitions

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📊 Performance

- ⚡ Fast load times
- 🖼️ Optimized images
- 💨 Smooth animations
- 📱 Mobile-optimized
- 🎯 SEO-friendly

## 🔐 Security

- ✅ No external dependencies (except Google Fonts)
- ✅ No sensitive data storage
- ✅ Client-side only (no backend)
- ✅ Safe for deployment

## 📝 Customization

### Change Colors
Edit CSS custom properties in `index.css`:
```css
:root {
  --color-primary: #1E88E5;
  --color-primary-dark: #0D47A1;
  /* ... */
}
```

### Add Products
Edit the products grid in `index.html`:
```html
<article class="card product-card" data-category="laptops">
  <!-- Product content -->
</article>
```

### Modify Testimonials
Edit the testimonials array in `script.js`:
```javascript
const testimonials = [
  { text: "...", author: "...", avatar: "...", role: "..." }
];
```

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings > Pages
3. Select branch and folder
4. Save and deploy

### Netlify
1. Drag and drop folder to Netlify
2. Or connect GitHub repository
3. Deploy automatically

### Vercel
```bash
vercel --prod
```

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Author

Created with ❤️ by Antigravity AI

## 🙏 Acknowledgments

- Product images provided by user
- Icons from SVG inline code
- Fonts from Google Fonts
- Design inspired by modern e-commerce best practices

## 📞 Support

For questions or issues:
- 📧 Email: support@shopily.com
- 📞 Phone: +1-800-SHOPILY

## 🎉 Enjoy Shopping!

Visit the live site and explore all the features. Happy shopping! 🛒✨
