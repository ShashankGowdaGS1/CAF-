import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickIntro } from './components/QuickIntro';
import { StepInsideScrub } from './components/StepInsideScrub';
import { DrinkExplorer } from './components/DrinkExplorer';
import { CoffeeCraftScrub } from './components/CoffeeCraftScrub';
import { HouseFavourites } from './components/HouseFavourites';
import { StayAWhile } from './components/StayAWhile';
import { OurStory } from './components/OurStory';
import { VisitUs } from './components/VisitUs';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    // Initialize smooth scroll with Lenis
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after DOM has settled
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timeout);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="cafe-app-container min-h-screen">
      <Preloader />
      <Navbar />

      <main>
        {/* 01 — HERO / COFFEE (Video 01: coffee-hero.mp4) */}
        <Hero />

        {/* 02 — QUICK CAFÉ INTRO (Asymmetric Everyday Rituals) */}
        <QuickIntro />

        {/* 03 — STEP INSIDE SCRUB (Video 02: cafe-entry.mp4 via CanvasScrub) */}
        <StepInsideScrub />

        {/* 04 — WHAT WE’RE POURING (GSAP Pinned Drink Explorer) */}
        <DrinkExplorer />

        {/* 05 — MADE BY HAND SCRUB (Video 03: coffee-craft.mp4 via CanvasScrub) */}
        <CoffeeCraftScrub />

        {/* 06 — HOUSE FAVOURITES (Asymmetric Editorial Trio) */}
        <HouseFavourites />

        {/* 07 — STAY A WHILE (Video 04: cafe-life.mp4 Right-Bleeding Ambient) */}
        <StayAWhile />

        {/* 08 — BUILT FOR THE NEIGHBORHOOD (Centered Story Statement & Wide Visual) */}
        <OurStory />

        {/* 09 — COME VISIT US (Radically Simplified Direct Hours & Location) */}
        <VisitUs />
      </main>

      {/* 10 — FOOTER (Dominant Typography & Clean Sign-Off) */}
      <Footer />
    </div>
  );
}

export default App;
