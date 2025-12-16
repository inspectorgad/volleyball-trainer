# 📦 Volleyball Trainer PWA - Complete GitHub Package

**Ready-to-deploy Progressive Web App for GitHub Pages**

---

## 📋 What You're Getting

This is a **complete, production-ready PWA package** with everything needed to deploy to GitHub Pages.

### ✅ Included Files

| File | Purpose | Required |
|------|---------|----------|
| **index.html** | Main app (124 KB) - Complete standalone React app | ✅ YES |
| **manifest.json** | PWA configuration - Makes app installable | ✅ YES |
| **service-worker.js** | Offline functionality - Enables PWA features | ✅ YES |
| **README.md** | GitHub documentation - Project overview | ✅ YES |
| **.gitignore** | Git ignore rules - Keeps repo clean | ✅ YES |
| **QUICKSTART.md** | 10-minute deployment guide | 📖 Guide |
| **DEPLOYMENT.md** | Detailed deployment instructions | 📖 Guide |
| **generate_icons.py** | Python icon generator (easy!) | 🛠️ Tool |
| **generate-icons.sh** | Bash icon generator (Mac/Linux) | 🛠️ Tool |

### ⚠️ You Need to Create

| Item | Why | How |
|------|-----|-----|
| **/icons/** folder | PWA install icons | Run `python generate_icons.py` |

---

## 🚀 Quick Deploy (10 Minutes)

### 1️⃣ Generate Icons
```bash
pip install Pillow
python generate_icons.py
```
This creates `/icons/` folder with all required icon sizes.

### 2️⃣ Upload to GitHub
1. Create repository: [github.com/new](https://github.com/new)
2. Upload ALL files (including `/icons/` folder)
3. Name it: `volleyball-trainer`

### 3️⃣ Enable GitHub Pages
- Settings → Pages → Deploy from branch `main`
- Wait 2-3 minutes

### 4️⃣ Done!
Visit: `https://YOUR-USERNAME.github.io/volleyball-trainer/`

---

## 📱 What This App Does

### 4 Integrated Modes

1. **🎮 Simulator** - Interactive volleyball court with rotations
   - 5-1, 6-2, 4-2 offensive systems
   - Attack zones, blocking rules, defense formations
   - 8 interactive violation scenarios

2. **🎯 Play-Along** - Follow a real volleyball set
   - 25 realistic rally scenarios
   - Learn rules through gameplay
   - See rotations change in real-time

3. **📚 Rules Hub** - Complete rules reference
   - 20 categorized rules
   - 30-question quiz bank
   - Progress tracking
   - Visual demonstrations

4. **🏆 NCAA 2025** - Tournament tracker
   - Kansas Jayhawks path (highlighted)
   - Complete bracket with all results
   - 16 host sites
   - Elite 8 results through Dec 14, 2024

---

## 🎨 Features

### Progressive Web App
- ✅ Install on any device (no app store)
- ✅ Works offline after first visit
- ✅ Fast loading with caching
- ✅ Automatic updates
- ✅ Native app experience

### Kansas Jayhawks Themed
- 🎨 Official KU colors (Blue #0051BA, Crimson #E8000D)
- 🎯 Kansas games specially highlighted
- 🏐 Complete Kansas tournament journey

### Mobile-First Design
- 📱 Responsive on all screen sizes
- 👆 Touch-friendly controls
- 🌗 Dark theme for comfortable viewing

---

## 🛠️ Technical Details

### Stack
- **React 18** - Modern UI framework
- **Babel Standalone** - No build process needed
- **Service Workers** - PWA offline functionality
- **Web Manifest** - Installability

### File Structure
```
volleyball-trainer/
├── index.html              # 124 KB standalone app
├── manifest.json           # 2 KB PWA config
├── service-worker.js       # 3 KB offline handler
├── README.md              # Project documentation
├── .gitignore             # Git ignore rules
└── icons/                 # YOU CREATE THIS
    ├── icon-16x16.png
    ├── icon-32x32.png
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

### No Build Required!
- Pure HTML/CSS/JavaScript
- Everything in one file (index.html)
- Works by just opening in browser
- Perfect for GitHub Pages

---

## 📖 Documentation Guide

Choose your path:

### 🏃 **In a Rush?**
Read: **QUICKSTART.md** - 10-minute deployment

### 🎓 **Want Details?**
Read: **DEPLOYMENT.md** - Step-by-step with troubleshooting

### 🔧 **Developer?**
Read: **README.md** - Technical details and customization

---

## 🔄 Updating Content

### Tournament Scores
Edit `index.html`:
- Line ~3610: First Round
- Line ~3650: Second Round  
- Line ~3690: Sweet 16
- Line ~3700: Elite 8

Update game objects with new `winner` and `score` values.

### Rules Content
Edit `index.html` around line 250:
```javascript
const rulesData = [...]
```

### Colors/Styling
Edit inline styles in `index.html` (search for color codes)

---

## ⚠️ Important Notes

### Must Update Service Worker Version
Every time you change `index.html`, update `service-worker.js`:
```javascript
const CACHE_NAME = 'volleyball-trainer-v1.0.1'; // Increment this!
```
Otherwise users won't see your updates (they'll keep seeing cached version).

### Icons Are Required
The PWA won't install without icons. Must create `/icons/` folder!

### GitHub Pages Takes Time
After enabling GitHub Pages, wait 2-3 minutes before checking the URL.

---

## ✅ Pre-Deployment Checklist

Before uploading to GitHub:

- [ ] Generated icons using `generate_icons.py`
- [ ] Have `/icons/` folder with all 10 PNG files
- [ ] Verified `index.html` opens correctly in browser
- [ ] Updated README.md with your GitHub username (optional)
- [ ] Have GitHub account ready

After uploading:

- [ ] All files uploaded (check `/icons/` folder is there!)
- [ ] GitHub Pages enabled in Settings
- [ ] Waited 3-5 minutes for deployment
- [ ] Tested URL: `https://YOUR-USERNAME.github.io/volleyball-trainer/`
- [ ] PWA installs on mobile device
- [ ] Offline mode works (disable WiFi, reload page)

---

## 🎯 Success Criteria

Your deployment is successful when:

1. ✅ App loads at your GitHub Pages URL
2. ✅ All 4 modes work (Simulator, Play-Along, Rules, NCAA)
3. ✅ PWA install prompt appears on mobile
4. ✅ App works offline (after first visit)
5. ✅ Icons display correctly in browser and on home screen
6. ✅ Kansas tournament data shows correctly

---

## 🆘 Getting Help

### Check These First
1. Browser console (F12 → Console) for errors
2. `/icons/` folder uploaded with all files
3. Waited full 3-5 minutes after enabling GitHub Pages
4. Tried hard reload: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Common Issues

**Icons Not Showing**
- Create icons folder: `python generate_icons.py`
- Verify all 10 PNG files exist
- Check filenames match manifest.json

**PWA Won't Install**
- Must be HTTPS (GitHub Pages is automatic)
- Needs manifest.json and service-worker.js
- Try different browser (Chrome works best)

**App Not Updating**
- Update service worker cache version
- Clear browser cache and service worker
- Try incognito/private browsing

---

## 🎉 You're All Set!

This package contains everything you need to deploy a professional PWA to GitHub Pages.

**Next Step:** Read **QUICKSTART.md** and deploy in 10 minutes!

**Questions?** Check **DEPLOYMENT.md** for detailed instructions.

---

**Rock Chalk Jayhawk! 🏐💙**

Made with ❤️ for volleyball fans
