# Strapi CMS Setup Guide for PAGADA

## Overview
Strapi is a headless CMS that will manage your blog content. The React frontend fetches blogs from the Strapi API.

---

## Step 1: Navigate to Strapi Project

```bash
cd /home/hg/pagada/pagada-strapi
```

---

## Step 2: Create Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

**Edit the `.env` file** with these values:

```bash
HOST=0.0.0.0
PORT=1337
APP_KEYS="key1,key2,key3,key4"
API_TOKEN_SALT=your-random-salt
ADMIN_JWT_SECRET=your-random-secret
TRANSFER_TOKEN_SALT=your-random-salt
JWT_SECRET=your-random-secret
ENCRYPTION_KEY=your-random-key
```

**Generate random values** (use Node.js):
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

**Quick .env template:**
```bash
HOST=0.0.0.0
PORT=1337
APP_KEYS="$(node -e 'console.log(require("crypto").randomBytes(16).toString("base64"))')"
API_TOKEN_SALT=$(node -e 'console.log(require("crypto").randomBytes(16).toString("base64"))')
ADMIN_JWT_SECRET=$(node -e 'console.log(require("crypto").randomBytes(16).toString("base64"))')
TRANSFER_TOKEN_SALT=$(node -e 'console.log(require("crypto").randomBytes(16).toString("base64"))')
JWT_SECRET=$(node -e 'console.log(require("crypto").randomBytes(16).toString("base64"))')
ENCRYPTION_KEY=$(node -e 'console.log(require("crypto").randomBytes(24).toString("base64"))')
```

---

## Step 3: Install Dependencies

```bash
npm install
```

This will install Strapi and all required packages.

---

## Step 4: Start Strapi Development Server

```bash
npm run develop
```

**Expected output:**
```
✓ Strapi server running at http://localhost:1337
✓ Admin panel available at http://localhost:1337/admin
```

---

## Step 5: Create Admin Account

1. Open browser: http://localhost:1337/admin
2. Fill in the registration form:
   - **Email**: your-email@example.com
   - **Password**: strong-password
   - **First Name**: Your Name
   - **Last Name**: Your Name
3. Click "Let's Start"

You're now in the Strapi admin panel!

---

## Step 6: Create Content Type for Blogs

### 6.1 Navigate to Content Types Builder
- Click **"Content-Type Builder"** in the left sidebar
- Click **"Create new collection type"**

### 6.2 Create "Blog" Collection
- **Display name**: `Blog`
- **Singular name**: `blog`
- **Plural name**: `blogs`
- Click **"Continue"**

### 6.3 Add Fields to Blog

Click **"Add another field"** and add these fields:

| Field Name | Field Type | Required | Default |
|-----------|-----------|----------|---------|
| title | Text | ✓ | - |
| slug | Text (UID) | ✓ | Auto-generate from title |
| excerpt | Text (Long Text) | ✓ | - |
| content | Rich Text | ✓ | - |
| image | Media (Single) | - | - |
| author | Text | - | PAGADA |
| publishedAt | Date | - | Today's date |

**Steps to add each field:**
1. Click **"+ Add another field"**
2. Select field type
3. Enter field name
4. Configure options (Required, Default value, etc.)
5. Click **"Add field"**

### 6.4 Save Content Type
- Click **"Save"** button
- Strapi will restart

---

## Step 7: Create Blog Content

1. Navigate to **Content Manager** → **Blogs**
2. Click **"+ Create new entry"**
3. Fill in the blog details:
   - **Title**: "Getting Started with PAGADA"
   - **Slug**: "getting-started-with-pagada" (auto-generated)
   - **Excerpt**: "Learn how to use PAGADA for sports management..."
   - **Content**: Write your blog content
   - **Author**: "PAGADA Team"
   - **Image**: Upload a featured image
4. Click **"Publish"** (top-right)

---

## Step 8: Set Permissions for API

1. Go to **Settings** → **Users & Permissions** → **Roles**
2. Click **"Public"**
3. Under **Permissions**, find **Blog** section
4. Check these permissions:
   - ✓ `find` (list all blogs)
   - ✓ `findOne` (get single blog)
5. Click **"Save"**

---

## Step 9: Test API Endpoint

### Using curl:
```bash
curl http://localhost:1337/api/blogs
```

### Expected response:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Getting Started with PAGADA",
      "slug": "getting-started-with-pagada",
      "excerpt": "Learn how to use PAGADA...",
      "author": "PAGADA Team",
      "publishedAt": "2025-10-26T00:00:00.000Z",
      "createdAt": "2025-10-26T12:00:00.000Z"
    }
  ]
}
```

---

## Step 10: Configure React Frontend

Your Blogs component is already configured to fetch from Strapi!

**Frontend API endpoint** (in `src/services/strapiService.js`):
```javascript
const STRAPI_API_URL = 'http://localhost:1337/api';
```

**Make sure your Strapi server is running before loading blogs page.**

---

## Step 11: Deploy Strapi to Production

### Option A: Deploy to Strapi Cloud (Recommended)
```bash
npm run deploy
```

### Option B: Deploy to Heroku
```bash
# Install Heroku CLI, then:
heroku login
heroku create your-pagada-strapi
git push heroku main
```

### Option C: Deploy to Railway, Render, or DigitalOcean
- Update `STRAPI_API_URL` in frontend with production URL
- Update database connection in production

---

## Troubleshooting

### Issue: Port 1337 already in use
```bash
# Kill the process
lsof -i :1337
kill -9 <PID>

# Or use a different port
PORT=3001 npm run develop
```

### Issue: Blog entries not showing in frontend
1. Check Strapi API response: `http://localhost:1337/api/blogs`
2. Verify permissions are set correctly (Step 8)
3. Check browser console for errors
4. Make sure Strapi server is running

### Issue: Image upload not working
1. Go to **Settings** → **Files Upload**
2. Configure allowed file types and max size
3. Ensure `/public/uploads` directory exists

---

## Quick Commands

| Command | Purpose |
|---------|---------|
| `npm run develop` | Start dev server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run console` | Open Strapi console |

---

## File Structure

```
pagada-strapi/
├── src/
│   ├── api/              # API endpoints (auto-generated)
│   ├── admin/            # Admin customization
│   ├── extensions/       # Plugin extensions
│   └── index.ts          # Entry point
├── config/
│   ├── api.ts            # API configuration
│   ├── database.ts       # Database config
│   ├── server.ts         # Server config
│   └── plugins.ts        # Plugin config
├── database/
│   └── migrations/       # Database migrations
├── public/
│   └── uploads/          # User uploads directory
├── package.json
├── .env                  # Environment variables
└── tsconfig.json
```

---

## Next: Connect Production Strapi URL

Once deployed, update your React app:

**File**: `src/services/strapiService.js`

```javascript
const STRAPI_API_URL = 'https://your-production-strapi-url.com/api';
```

Then rebuild and deploy your React app.

---

**You're all set! Happy blogging with PAGADA! 🚀**
