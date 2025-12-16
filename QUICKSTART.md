# ⚡ Quick Start Guide

Get your Volleyball Trainer PWA live in 10 minutes!

---

## 🚀 The Fastest Path to Deployment

### Step 1: Generate Icons (2 minutes)

**Choose ONE method:**

#### Option A: Python (Recommended - Works everywhere)
```bash
pip install Pillow
python generate_icons.py
```

#### Option B: Bash + ImageMagick (Mac/Linux)
```bash
brew install imagemagick  # or sudo apt-get install imagemagick
./generate-icons.sh
```

#### Option C: Manual Download
1. Go to [Favicon.io](https://favicon.io/favicon-generator/)
2. Text: `VB`, Background: `#0051BA`, Download
3. Create `/icons` folder, add all PNG files

### Step 2: Upload to GitHub (3 minutes)

1. Create new repository at [github.com/new](https://github.com/new)
   - Name: `volleyball-trainer`
   - Public repository
2. Upload these files:
   - `index.html`
   - `manifest.json`
   - `service-worker.js`
   - `README.md`
   - `.gitignore`
   - `/icons/` folder (all PNG files)

### Step 3: Enable GitHub Pages (2 minutes)

1. Go to repository **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** → **/ (root)**
4. Click **Save**

### Step 4: Done! (3 minutes wait time)

Your app will be live at:
```
https://YOUR-USERNAME.github.io/volleyball-trainer/
```

---

## ✅ Verify It Works

1. Open the URL in your browser
2. All 4 modes should work:
   - ✅ Simulator
   - ✅ Play-Along
   - ✅ Rules Hub
   - ✅ NCAA 2025
3. Try installing as PWA on your phone

---

## 📱 Install on Your Device

### iPhone
Safari → Share → Add to Home Screen

### Android
Chrome → Menu (⋮) → Install app

### Desktop
Click install icon in browser address bar

---

## 🔄 Making Updates

### Update Tournament Scores
1. Edit `index.html` on GitHub
2. Find Elite 8 section (~line 3700)
3. Update game winner and score
4. Commit changes
5. Wait 2-3 minutes for redeployment

### Update Service Worker (Important!)
After making changes, update cache version in `service-worker.js`:
```javascript
const CACHE_NAME = 'volleyball-trainer-v1.0.1'; // Change version
```

---

## 🆘 Troubleshooting

### Icons Not Showing?
- Check `/icons` folder was uploaded
- Filenames must match manifest.json exactly
- Hard reload: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### PWA Won't Install?
- Wait 5 minutes after deployment
- Must be HTTPS (GitHub Pages is HTTPS automatically)
- Try incognito/private mode

### App Not Updating?
1. Update service worker version
2. Clear browser cache
3. Unregister old service worker (DevTools → Application → Service Workers)

---

## 📚 Need More Details?

- **Full instructions:** See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Customization:** See [README.md](README.md)
- **Issues:** Check browser console (F12)

---

## 🎉 That's It!

You now have a live, installable volleyball training PWA!

**Share it:**
```
https://YOUR-USERNAME.github.io/volleyball-trainer/
```

**Rock Chalk Jayhawk! 🏐💙**
