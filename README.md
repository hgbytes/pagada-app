````markdown
# PAGADA - Sports Mentorship Platform

A professional React application connecting athletes with mentors, featuring responsive design, blog system, glass morphism card components, and real-time notifications.

##  Features

- **Responsive Web Design** - Mobile-first approach optimized for all devices
- **Glass Morphism Cards** - Modern UI with animated card components
- **Blog System** - Strapi CMS integration for content management
- **Contact Forms** - Supabase backend with Telegram notifications
- **Modern UI** - Clean, dark theme with professional design
- **Hash-based Routing** - SPA navigation for blogs and pages
- **Styled Components** - Scoped styling with dynamic themes

## Quick Start

### Prerequisites
- Node.js v14+ and npm
- Supabase account
- Strapi Cloud account (optional)

### Installation

1. **Clone and install:**
   ```bash
   git clone <repository>
   cd pagada
   npm install
   ```

2. **Environment Setup:**
   Create `.env` file:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key
   REACT_APP_STRAPI_URL=your_strapi_url
   ```

3. **Start development:**
   ```bash
   npm start
   ```

##  Tech Stack

- **Frontend**: React 18.2.0
- **Styling**: Styled Components 6.1.19
- **Backend**: Supabase (PostgreSQL)
- **CMS**: Strapi 5.29.0
- **UI Components**: Glass Morphism Cards
- **Deployment**: Strapi Cloud

##  Project Structure

```
src/
├── components/
│   ├── Navbar.js
│   ├── Card.js (Glass morphism cards)
│   ├── Blogs.js
│   ├── BlogDetail.js
│   ├── Footer.js
│   └── ContactPopup.js
├── services/
│   ├── strapiService.js
│   └── contactService.js
├── assets/
│   └── Artboard 4.svg (Card images)
├── App.js
└── styles.css
```

## 🔧 Configuration

### Supabase Setup
```sql
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(25),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow inserts" ON contacts FOR INSERT WITH CHECK (true);
```

### Strapi Setup
1. Deploy to Strapi Cloud
2. Create Blog content type with fields: Title, slug, author, content, excerpt
3. Set public permissions for Blog content type

##  Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: ≤767px

## Components

### Card Component
Modern glass morphism card component with:
- Animated hover effects
- Collective hover behavior for card groups
- Image support
- Responsive sizing
- Smooth transitions

### Navbar
Professional navigation with:
- Dark theme styling
- Dropdown menus
- Mobile-responsive hamburger menu
- Contact button integration

### Contact Popup
Modal form with:
- Form validation
- Supabase integration
- Telegram notifications
- Success/Error messaging

## Deployment

### Frontend
```bash
npm run build
# Deploy build/ folder to your hosting provider
```

### Backend
- Supabase: Already hosted
- Strapi: Deploy to Strapi Cloud

## License

MIT License - Created by PAGADA Team


````

