# PAGADA - Sports Mentorship Platform

A professional React website with responsive design, Supabase backend integration, and Telegram notifications for contact form submissions.

## 🎯 Features

- **Responsive Web Design** - Mobile-first approach with optimized layouts for all screen sizes
- **Contact Form** - Secure form submission to Supabase database
- **Telegram Notifications** - Real-time contact alerts via Telegram bot (backend-secured)
- **Modern UI** - Clean, professional design with smooth animations
- **Sports Mentorship Focus** - Dedicated landing page with team profiles and conversations

## 🏗️ Architecture

```
Frontend (React)
    ↓
Supabase Database (contacts table)
    ↓
Supabase Edge Function (teleaira)
    ↓
Telegram Bot API
    ↓
Your Telegram Chat
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ and npm
- Supabase account (free at https://supabase.com)
- Telegram account with a bot token

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd pagada
   npm install @supabase/supabase-js
   ```

2. **Create `.env.local` file** (copy from `.env.example`):
   ```bash
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   TELEGRAM_BOT_TOKEN=your_bot_token
   TELEGRAM_CHAT_ID=your_chat_id
   ```

3. **Set up Supabase Database:**
   - Go to Supabase Dashboard → SQL Editor
   - Run the SQL script below to create the `contacts` table

   ```sql
   CREATE TABLE contacts (
     id BIGSERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL CHECK (LENGTH(name) > 0),
     email VARCHAR(255) NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
     mobile VARCHAR(25) CHECK (mobile ~ '^[+0-9 -]{7,25}$'),
     message TEXT NOT NULL CHECK (LENGTH(message) > 0),
     created_at TIMESTAMPTZ DEFAULT timezone('Asia/Kolkata', now()),
     updated_at TIMESTAMPTZ DEFAULT timezone('Asia/Kolkata', now())
   );

   ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Allow anonymous inserts" ON contacts
     FOR INSERT WITH CHECK (true);

   CREATE POLICY "Allow authenticated reads" ON contacts
     FOR SELECT USING (auth.role() = 'authenticated');
   ```

4. **Start development server:**
   ```bash
   npm start
   ```

## 📱 Responsive Design

### Breakpoints
- **1200px+**: Desktop layout with full features
- **769px - 1199px**: Tablet layout with adjusted spacing
- **641px - 768px**: Tablet portrait mode
- **481px - 640px**: Large mobile devices
- **≤480px**: Mobile devices
- **<360px**: Extra small devices

### Key Features
- Flexible navigation with hamburger menu on mobile
- Responsive typography and spacing
- Touch-friendly buttons and forms
- Optimized image loading

## 🔧 Configuration

### Environment Variables

Create `.env.local` with:

```env
# Supabase
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here

# Telegram (Edge Function Secrets)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

**Note:** `.env.local` is gitignored and should never be committed.

### Create Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/start` and follow instructions to create a bot
3. Copy the **HTTP API Token**
4. Send a message to your bot, then visit:
   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```
5. Copy the `"chat":{"id":XXXXXXX}` value (your chat ID)

### Deploy Edge Function

The Edge Function `teleaira` needs to be deployed in Supabase:

1. Go to Supabase Dashboard → **Functions**
2. Create new function or update existing `teleaira`
3. Copy code from `supabase/functions/send-to-telegram/index.ts`
4. In function settings, add secrets:
   - `TELEGRAM_BOT_TOKEN` = your bot token
   - `TELEGRAM_CHAT_ID` = your chat ID
5. Deploy the function

## 📁 Project Structure

```
pagada/
├── public/
│   └── index.html                (HTML template with viewport meta)
├── src/
│   ├── components/
│   │   ├── Navbar.js             (Navigation with mobile menu)
│   │   ├── ContactPopup.js        (Contact form with submission)
│   │   └── Logo.js               (Logo component)
│   ├── services/
│   │   ├── contactService.js      (Supabase + Telegram submission)
│   │   └── sendToTelegram.js      (Edge Function caller)
│   ├── App.js                     (Main app component)
│   ├── index.js                   (React entry point)
│   ├── styles.css                 (All styling with media queries)
│   └── supabaseClient.js          (Supabase initialization)
├── supabase/
│   └── functions/
│       ├── _shared/
│       │   └── cors.ts            (CORS headers)
│       └── send-to-telegram/
│           └── index.ts           (Telegram notification function)
├── .env.example                   (Environment template)
├── .env.local                     (Local secrets - gitignored)
└── README.md                      (This file)
```

## 🔐 Security

- ✅ **Bot token stored in Supabase secrets** - Never exposed to frontend
- ✅ **RLS policies** - Only authenticated users can read contacts
- ✅ **Input validation** - Email format, required fields checked
- ✅ **HTML escaping** - Prevents Telegram injection attacks
- ✅ **Environment variables** - Secrets not committed to git

## 📊 Form Submission Flow

1. User fills contact form in popup
2. Validates required fields (name, email, message)
3. Submits to Supabase `contacts` table
4. Simultaneously calls Edge Function `teleaira`
5. Edge Function retrieves secrets and sends Telegram message
6. User sees success/error message
7. Form resets and popup closes after 2 seconds

## 🎨 Styling

All styling is in `src/styles.css` with:
- CSS Grid and Flexbox layouts
- Mobile-first responsive design
- Smooth animations and transitions
- Dark theme with white text
- Gradient backgrounds and overlays

## 📦 Dependencies

- **React 18.2.0** - UI framework
- **@supabase/supabase-js** - Backend & database client
- **react-scripts** - Build tools

## 🧪 Testing

Test the contact form end-to-end:

1. Open app: `http://localhost:3000`
2. Click **EXPLORE** button
3. Fill form with test data
4. Click **Send Message**
5. Check:
   - Supabase Dashboard → `contacts` table for data
   - Your Telegram chat for the notification message

## 🐛 Troubleshooting

### Contact form not submitting?
- Check browser console for errors
- Verify `.env.local` has correct Supabase credentials
- Check Supabase RLS policies are enabled

### Not receiving Telegram messages?
- Verify Edge Function `teleaira` is deployed
- Check function secrets are set correctly
- Look at function logs in Supabase Dashboard

### 404 on Edge Function call?
- Function name should be `teleaira` (not `send-to-telegram`)
- Verify Authorization header is sent with request
- Check function is deployed in Supabase

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [React Documentation](https://react.dev)

## 📝 License

This project is created for demonstration purposes.

## 👤 Author

PAGADA Team - Sports Mentorship Platform

