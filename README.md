# 🌻 Sunflower Scrollytelling

An immersive, scroll-driven storytelling website depicting the lifecycle of a sunflower — from seed to bloom to dust.

## Getting Started

### Prerequisites
- Node.js v18+ (LTS)

### Installation & Run

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

```
NewIosProject/
├── public/
│   ├── index.html              # 7 full-screen scenes
│   ├── images/                 # Scene background images
│   ├── styles/
│   │   └── main.css            # GPU-optimized styles
│   └── scripts/
│       ├── main.js             # App orchestrator
│       └── scenes.js           # GSAP ScrollTrigger animations
├── server/
│   └── app.js                  # Express static server
├── package.json
└── README.md
```

## Phases

- **Phase 1** ✅ Base layout + 7 scenes + GSAP scroll animations
- **Phase 2** 🔜 Sunflower growth animation (canvas)
- **Phase 3** 🔜 Parallax system
- **Phase 4** 🔜 Bee mouse-following interaction
- **Phase 5** 🔜 Audio system (Web Audio API)
- **Phase 6** 🔜 Three.js 3D integration

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6)
- **Animation**: GSAP 3.12 + ScrollTrigger
- **Backend**: Node.js + Express

## Deployment

This project is configured for automatic deployment with GitHub Pages.

### GitHub Pages Setup

After each push to the `main` branch:
1. GitHub Actions packages the `public/` folder
2. GitHub Pages publishes the latest build
3. View the deployment status in the **Actions** tab on GitHub

**Live Link**: [View Deployed Project](https://anuragshimpi17.github.io/JAVASCRIPT/)
- **Performance**: GPU-accelerated transforms & opacity only
