# 🚀 Deployment Guide

Step-by-step instructions to deploy your Volleyball Trainer PWA to GitHub Pages.

---

## ✅ Prerequisites

- GitHub account
- Git installed on your computer
- Basic terminal/command line knowledge

---

## 📋 Step-by-Step Deployment

### 1. Create Icons

**You MUST create icons before deploying!** The app won't work properly without them.

#### Option A: Quick Placeholder Icons (5 minutes)

1. Go to [Favicon.io](https://favicon.io/favicon-generator/)
2. Settings:
   - Text: `VB` (or volleyball emoji 🏐)
   - Background: `#0051BA` (KU Blue)
   - Font: Bebas Neue (or similar bold font)
   - Font Color: `#FFFFFF`
3. Click "Download"
4. Create `/icons` folder in your project
5. Generate and save these sizes:
   - 16x16, 32x32, 72x72, 96x96, 128x128
   - 144x144, 152x152, 192x192, 384x384, 512x512

#### Option B: Custom Logo (20 minutes)

1. Create a 512x512px volleyball-themed logo in Canva/Photoshop/Figma
2. Use KU colors: Blue `#0051BA` and Crimson `#E8000D`
3. Install PWA Asset Generator:
   ```bash
   npm install -g pwa-asset-generator
   ```
4. Generate all icons:
   ```bash
   npx pwa-asset-generator logo.png ./icons --manifest ./manifest.json
   ```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **+** icon → **New repository**
3. Repository details:
   - Name: `volleyball-trainer`
   - Description: "Complete volleyball training PWA with NCAA 2025 tournament tracker"
   - Public repository
   - ✅ Add README (we already have one)
4. Click **Create repository**

### 3. Upload Files to GitHub

#### Option A: Using GitHub Web Interface (Easiest)

1. In your new repository, click **Add file** → **Upload files**
2. Drag and drop ALL files:
   - `index.html`
   - `manifest.json`
   - `service-worker.js`
   - `README.md`
   - `.gitignore`
   - `/icons/` folder (with all icon files)
3. Add commit message: "Initial commit - Volleyball Trainer PWA"
4. Click **Commit changes**

#### Option B: Using Git Command Line

```bash
# Navigate to your project folder
cd /path/to/volleyball-trainer

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Volleyball Trainer PWA"

# Add remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/volleyball-trainer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages

1. In your repository, click **Settings** (gear icon)
2. Scroll down to **Pages** in left sidebar
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** → **/ (root)**
   - Click **Save**
4. Wait 2-3 minutes for deployment

### 5. Test Your Live App

Your app will be available at:
```
https://YOUR-USERNAME.github.io/volleyball-trainer/
```

**Test checklist:**
- [ ] App loads without errors
- [ ] All 4 modes work (Simulator, Play-Along, Rules Hub, NCAA)
- [ ] Icons display correctly
- [ ] PWA install prompt appears (mobile)
- [ ] Offline mode works (disable WiFi and reload)

---

## 🔄 Updating the App

### Quick Updates (Scores, Text Changes)

1. Click the file in GitHub web interface
2. Click pencil icon (Edit)
3. Make changes
4. Scroll down → Commit changes
5. Wait 2-3 minutes for redeployment

### Major Updates (Local Git)

```bash
# Make changes to files
# Then:
git add .
git commit -m "Updated Elite 8 results"
git push origin main
```

**Important:** Update the service worker cache version in `service-worker.js`:
```javascript
const CACHE_NAME = 'volleyball-trainer-v1.0.1'; // Increment version
```

---

## 📱 Installing on Devices

### iOS (iPhone/iPad)

1. Open the app in Safari
2. Tap the Share button (square with arrow)
3. Scroll down → "Add to Home Screen"
4. Name it, tap "Add"
5. App appears as icon on home screen!

### Android

1. Open the app in Chrome
2. Tap the menu (three dots)
3. Select "Install app" or "Add to Home screen"
4. Follow prompts
5. App appears in app drawer!

### Desktop (Chrome/Edge)

1. Open the app
2. Look for install icon in address bar (or three dots menu)
3. Click "Install"
4. App opens in its own window!

---

## 🐛 Troubleshooting

### Icons Not Showing
- **Check:** `/icons` folder uploaded correctly
- **Check:** Icon filenames match manifest.json exactly
- **Fix:** Clear browser cache, hard reload (Ctrl+Shift+R)

### PWA Not Installing
- **Check:** Must use HTTPS (GitHub Pages provides this automatically)
- **Check:** manifest.json in root directory
- **Check:** Service worker registered successfully (check browser console)

### App Not Updating
- **Update:** service-worker.js cache version
- **Clear:** Browser cache and service worker
  - Chrome: DevTools → Application → Service Workers → Unregister
  - Then reload page

### 404 Error on GitHub Pages
- **Wait:** GitHub Pages takes 2-3 minutes to deploy
- **Check:** Repository Settings → Pages shows "Your site is published at..."
- **Check:** Branch is set to `main` and `/root`

---

## 🎨 Customization

### Change Colors

Edit in `index.html` near line 13:
```javascript
background: linear-gradient(135deg, #0051BA 0%, #001A57 100%); // Main gradient
color: '#E8000D' // Accent color
```

### Update Tournament Data

Find tournament sections in `index.html`:
- First Round: ~line 3610
- Second Round: ~line 3650
- Sweet 16: ~line 3690
- Elite 8: ~line 3700

### Modify Rules Content

Rules array starts ~line 250:
```javascript
const rulesData = [
  { id: 1, category: 'Scoring', title: 'Rally Scoring', content: '...', difficulty: 'Basic' },
  // Add more rules here
]
```

---

## ✅ Post-Deployment Checklist

- [ ] Repository is public
- [ ] All files uploaded (especially /icons folder)
- [ ] GitHub Pages enabled in Settings
- [ ] App loads at https://YOUR-USERNAME.github.io/volleyball-trainer/
- [ ] PWA installs on mobile device
- [ ] README.md updated with live link
- [ ] Service worker caching works (check Network tab)
- [ ] Tested on multiple devices/browsers

---

## 🆘 Need Help?

1. Check browser console for errors (F12 → Console)
2. Verify all files uploaded correctly
3. Ensure icon filenames match manifest.json
4. Wait full 3-5 minutes for GitHub Pages deployment
5. Try incognito/private browsing mode
6. Clear browser cache completely

---

## 🎉 Success!

Your volleyball trainer PWA is now live and installable on any device!

Share the link:
```
https://YOUR-USERNAME.github.io/volleyball-trainer/
```

**Rock Chalk Jayhawk! 🏐**
