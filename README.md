# 🏐 Volleyball Trainer - Complete Learning System

A comprehensive Progressive Web App (PWA) for learning volleyball rules, rotations, and tracking the NCAA 2025 Women's Volleyball Tournament.

## 🌟 Features

### 🎮 **4 Integrated Modes**

1. **Simulator Mode**
   - Interactive court visualization with 5-1, 6-2, and 4-2 offensive systems
   - Attack zones, blocking rules, and defensive formations
   - Rotation preview with animated arrows
   - Interactive scenario-based learning with 8 common violations

2. **Play-Along Mode**
   - Follow a complete volleyball set point-by-point
   - Learn rules through 25 realistic rally scenarios
   - See rotations change based on who wins each point
   - Rule highlights explain key situations

3. **Rules Hub**
   - 20 comprehensive rules organized by category
   - Progress tracking system
   - 30-question quiz bank with explanations
   - Visual guide demonstrations
   - Personalized study recommendations

4. **NCAA 2025 Tournament**
   - Live tournament bracket tracking
   - Kansas Jayhawks path highlights
   - 16 host site locations
   - Sweet 16 & Elite 8 regional results
   - Official referee signals guide
   - Complete tournament results

## 🚀 Live Demo

**[View Live App](https://YOUR-USERNAME.github.io/volleyball-trainer/)** *(Update after deployment)*

## 📱 Progressive Web App

This app works as a PWA, meaning:
- ✅ Install on any device (iOS, Android, Desktop)
- ✅ Works offline after first visit
- ✅ No app store required
- ✅ Automatic updates
- ✅ Fast loading with service worker caching

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Babel Standalone** - JSX compilation
- **Service Workers** - Offline functionality
- **Web Manifest** - PWA capabilities
- **Lucide Icons** - Icon library
- **Google Fonts** - Space Mono & Bebas Neue

## 📦 Installation & Setup

### Quick Deploy to GitHub Pages

1. **Fork or clone this repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/volleyball-trainer.git
   cd volleyball-trainer
   ```

2. **Create the icons folder** (see [Creating Icons](#creating-icons) below)

3. **Commit and push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/root`
   - Click Save

5. **Your app will be live at:**
   ```
   https://YOUR-USERNAME.github.io/volleyball-trainer/
   ```

## 🎨 Creating Icons

The app requires icons in the `/icons` folder. You have two options:

### Option A: Generate from Logo (Recommended)

1. Create a 512x512px volleyball-themed logo (blue/crimson KU colors)
2. Use [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator):
   ```bash
   npx pwa-asset-generator logo.png ./icons -m ./manifest.json
   ```

### Option B: Use Placeholder Icons

1. Use [Favicon.io](https://favicon.io/favicon-generator/) to create basic icons
2. Generate these sizes: 16, 32, 72, 96, 128, 144, 152, 192, 384, 512
3. Save to `/icons` folder

Required icon files:
```
icons/
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

## 📁 Project Structure

```
volleyball-trainer/
├── index.html              # Main app (standalone HTML)
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline
├── README.md              # This file
├── .gitignore             # Git ignore rules
├── icons/                 # App icons (create this)
│   ├── icon-*.png
│   └── ...
└── screenshots/           # Optional: App screenshots
    ├── simulator.png
    └── tournament.png
```

## 🔧 Development

### Local Testing

Simply open `index.html` in your browser. No build process required!

For testing PWA features locally:
```bash
# Use a local server (required for service workers)
python -m http.server 8000
# Or
npx serve
```

Then visit: `http://localhost:8000`

### Updating Tournament Results

Edit `index.html` and find the tournament data sections:
- First Round: Line ~3610
- Second Round: Line ~3650
- Sweet 16: Line ~3690
- Elite 8: Line ~3700

Update the game objects with new scores and winners.

## 🎯 Key Features Implementation

### Rotation Simulator
- 6 court positions with visual player markers
- Real-time rotation logic following FIVB rules
- Color-coded roles (Setter, Outside, Middle, Opposite)
- Attack zone overlays showing legal attack areas

### Rule Learning
- Interactive scenarios with instant feedback
- Quiz system with randomized questions
- Progress tracking with localStorage
- Category-based organization

### Tournament Tracking
- Kansas Jayhawks special highlighting (🎯 emoji + crimson border)
- Multi-tab interface for easy navigation
- Regional bracket visualization
- Automatic score formatting

## 🏀 Kansas Jayhawks Colors

- **Blue**: `#0051BA` - Primary brand color
- **Crimson**: `#E8000D` - Accent color
- **Light Blue**: `#85C1E9` - Highlights

## 📄 License

MIT License - Feel free to use, modify, and distribute!

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🐛 Known Issues

- ESPN API currently returns 403 errors (tournament data updated manually)
- Service worker cache needs manual version bump for major updates

## 💡 Future Enhancements

- [ ] Push notifications for tournament updates
- [ ] Team comparison charts
- [ ] Video demonstrations
- [ ] Multiplayer quiz mode
- [ ] Export quiz results

## 👏 Credits

- **Rules Content**: Based on NCAA/FIVB official volleyball rules
- **Tournament Data**: NCAA.com and ESPN
- **Design**: Custom KU Jayhawks-themed interface

## 📧 Contact

Questions or feedback? Open an issue on GitHub!

---

**Rock Chalk Jayhawk! 🏐💙**
