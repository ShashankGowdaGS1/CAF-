# The Cornerstone Café ☕

> **A Warm, Human Neighborhood Coffee House Experience**  
> Built with React 19, TypeScript, Vite, GSAP ScrollTrigger, Lenis Smooth Scroll, and High-Performance Canvas Scrubbing.

---

## 🚀 Overview

The Cornerstone Café is a modern editorial-grade website crafted with smooth physics-based interactions, cinematic scroll-driven video and canvas frame sequences, and an interactive drink showcase.

### Key Highlights
- **Cinematic Canvas Scrubbing**: 60fps high-DPI canvas-based scrubbed sequences with frame-caching and subpixel jitter suppression.
- **Lenis Smooth Scroll & GSAP ScrollTrigger**: Silky smooth scrolling physics synchronized with GSAP timelines.
- **Interactive Drink Explorer**: Pinned horizontal flavor & ingredient stage for signature beverages.
- **Accessible & Performance-Optimized**: Automatic reduced-motion detection (`prefers-reduced-motion: reduce`), lazy image decoding, and clean semantic structure.
- **Zero Build Errors & Warnings**: Fully typed with TypeScript 6.0 and linted with Oxlint.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 8](https://vite.dev/)
- **Animations**: [GSAP](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scrolling**: [@studio-freight/lenis](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Check for Lint Issues & Type Errors
```bash
npm run lint
```

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deploying to Vercel

The project includes an optimized [`vercel.json`](./vercel.json) configured with Single-Page Application (SPA) rewrites and high-performance immutable asset caching headers.

### Method 1: Deploy via GitHub (Recommended)

1. **Initialize Git & Push to GitHub**:
   ```bash
   git init -b main
   git add .
   git commit -m "feat: complete cornerstone cafe experience"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Push your repository:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
4. Go to the [Vercel Dashboard](https://vercel.com/new) and click **"Add New Project"**.
5. Select your GitHub repository.
6. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
7. Click **"Deploy"**!

### Method 2: Deploy using Vercel CLI

```bash
# Log in to your Vercel account
npx vercel login

# Deploy directly to preview
npx vercel

# Deploy directly to production
npx vercel --prod
```

---

## 📁 Project Structure

```
├── public/
│   ├── assets/
│   │   ├── frames/         # Frame sequences for CanvasScrub
│   │   ├── images/         # Drink and café photography
│   │   └── video/          # Ambient hero & background video
│   ├── favicon.svg         # Branded vector favicon
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── CanvasScrub.tsx       # 60fps canvas scroll scrubber
│   │   ├── CoffeeCraftScrub.tsx  # Barista craft storytelling section
│   │   ├── DrinkExplorer.tsx     # Pinned drink showcase
│   │   ├── Footer.tsx            # Neighborhood poster closing section
│   │   ├── Hero.tsx              # Cinematic hero section
│   │   ├── HouseFavourites.tsx   # Curated menu highlight cards
│   │   ├── MenuSection.tsx       # Full expandable menu drawer
│   │   ├── Navbar.tsx            # Floating glassmorphic header
│   │   ├── OurStory.tsx          # Centered origin philosophy
│   │   ├── Preloader.tsx         # Asset warm-up loader
│   │   ├── QuickIntro.tsx        # Everyday rituals trio
│   │   ├── ScrollScrubVideo.tsx  # Video scrubbing fallback
│   │   ├── StayAWhile.tsx        # Ambient right-bleeding atmosphere
│   │   ├── StepInsideScrub.tsx   # Entry scrub experience
│   │   └── VisitUs.tsx           # Hours, location & contact
│   ├── App.tsx             # Root layout & Lenis-GSAP synchronization
│   ├── App.css
│   ├── index.css           # Global typography & CSS tokens
│   └── main.tsx
├── vercel.json             # Vercel deployment configuration
├── vite.config.ts          # Vite configuration
└── package.json
```
