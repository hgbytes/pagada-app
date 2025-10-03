# Arcadica Website

A professional React website with a responsive navigation bar, built to match the provided design specifications.

## Features

- **Responsive Navigation Bar**: Clean, professional navbar with all specified menu items
- **Mobile-First Design**: Responsive design that works on all device sizes
- **Interactive Elements**: Hover effects, smooth transitions, and mobile hamburger menu
- **Modern Styling**: Contemporary design with proper spacing and typography
- **Smooth Scrolling**: Navigation links smoothly scroll to page sections

## Navigation Menu Items

- HOME
- SERVICES
- MENTORS
- PARTNERS
- ABOUT
- BLOG
- CONTACT (Call-to-action button)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd /home/hg/arcadica
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Main navigation component
│   └── Navbar.css         # Navbar-specific styles
├── App.js                 # Main application component
├── App.css                # Application-wide styles
├── index.js               # React entry point
└── index.css              # Global styles
```

## Features Implemented

### Desktop Navigation
- Clean horizontal navigation bar
- Logo on the left
- Menu items in the center
- Contact button on the right
- Hover effects and smooth transitions

### Mobile Navigation
- Hamburger menu toggle
- Full-screen mobile menu
- Contact button integrated into mobile menu
- Smooth animations and transitions

### Responsive Design
- Breakpoints at 768px and 480px
- Mobile-first approach
- Optimized for all screen sizes

## Customization

### Colors
The website uses a clean color palette:
- Primary text: `#333`
- Black accents: `#000`
- Light backgrounds: `#fff`, `#fafafa`
- Button hover: `#333`

### Typography
- Primary font: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', etc.)
- Font weights: 400, 500, 600, 700
- Responsive font sizes

## Available Scripts

- `npm start` - Runs the development server
- `npm build` - Creates a production build
- `npm test` - Runs tests
- `npm eject` - Ejects from Create React App (irreversible)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for demonstration purposes.