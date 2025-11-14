# Loopy - Landing Page

## Project Overview
Loopy is a modern landing page for an AI-powered customer service platform. The website showcases a complete multi-channel customer service solution with artificial intelligence capabilities.

**Current State:** Fully functional React landing page running in Replit environment.

## Recent Changes
- **2025-11-14:** Initial Replit setup
  - Configured Create React App to run on port 5000 with host 0.0.0.0
  - Set up workflow for development server
  - Removed unnecessary script tag from index.html
  - Updated .gitignore for Replit environment

## Project Architecture

### Tech Stack
- **Framework:** React 19.2.0
- **Build Tool:** Create React App (react-scripts 5.0.1)
- **Styling:** Tailwind CSS 3.4.17 + Custom CSS
- **Icons:** Font Awesome 7.0.1
- **Animations:** ScrollReveal 4.0.9 + Intersection Observer API

### Project Structure
```
├── public/
│   ├── img/              # Image assets
│   ├── index.html        # HTML template
│   └── manifest.json     # PWA manifest
├── src/
│   ├── components/       # React components
│   │   ├── NavbarHandler.js        # Navigation logic and scroll effects
│   │   ├── PlanoPersonalizado.js   # Pricing plans component
│   │   └── ...utility files
│   ├── styles/          # CSS modules
│   │   ├── styles.css   # Main stylesheet (imports all others)
│   │   ├── header.css
│   │   ├── home.css
│   │   ├── function.css
│   │   ├── planos.css
│   │   ├── testimonials.css
│   │   └── footer.css
│   ├── App.js           # Main application component
│   └── index.js         # Application entry point
```

### Key Features
1. **Responsive Navigation:** Mobile-friendly navbar with smooth scroll
2. **Scroll Animations:** Intersection Observer for section animations
3. **Scroll Spy:** Active navigation item tracking based on scroll position
4. **Sections:**
   - Home/Hero section with CTA
   - Funcionalidades (Features grid)
   - Planos (Pricing plans)
   - Depoimentos (Testimonials)
   - Footer with contact info

## Development

### Running Locally
The dev server is configured to run on:
- **Port:** 5000
- **Host:** 0.0.0.0 (for Replit proxy compatibility)
- **Command:** `npm start`

### Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Environment Configuration
The project uses environment variables in package.json to configure the dev server:
- `PORT=5000` - Binds to port 5000
- `HOST=0.0.0.0` - Allows Replit proxy access
- `DANGEROUSLY_DISABLE_HOST_CHECK=true` - Disables host header verification for Replit iframe

## Deployment
Ready for deployment via Replit's publish feature using the configured deployment settings.

## Notes
- Language: Portuguese (Brazil)
- No backend required - frontend only
- Uses CDN for Font Awesome icons
- Some social media links are placeholder (empty href attributes)
