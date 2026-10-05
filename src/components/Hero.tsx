import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLVideoElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const goodWordRef = useRef<HTMLDivElement>(null);
  const coffeeWordRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Refined load reveal timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Eyebrow metadata reveal
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.85 }
      )
        // GOOD: clip reveal from bottom
        .fromTo(
          goodWordRef.current,
          { y: 55, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1 },
          '-=0.55'
        )
        // coffee.: slightly delayed reveal + 24px vertical movement
        .fromTo(
          coffeeWordRef.current,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1 },
          '-=0.85'
        )
        // Compact statement: GOOD COMPANY — NO RUSH.
        .fromTo(
          statementRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.65'
        )
        // Supporting copy
        .fromTo(
          copyRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        // CTAs
        .fromTo(
          ctaRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.55'
        );

      // 2. Responsive Scroll Exit via matchMedia:
      // Desktop (>= 1280px) is locked to exact approved drift
      // Tablet uses reduced drift
      // Mobile (< 768px) keeps typography stable without side-drift
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1280px)', () => {
        gsap.to(goodWordRef.current, {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to(coffeeWordRef.current, {
          yPercent: -32,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      mm.add('(min-width: 768px) and (max-width: 1279px)', () => {
        gsap.to(goodWordRef.current, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to(coffeeWordRef.current, {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      mm.add('(max-width: 767px)', () => {
        // Mobile stays visually locked and readable without drift
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-canvas)',
        overflow: 'hidden',
        isolation: 'isolate',
        paddingTop: 'clamp(5.5rem, 11vh, 7.5rem)',
        paddingBottom: 'clamp(2.5rem, 5vh, 4rem)',
      }}
    >
      {/* ======================================================== */}
      {/* 1. CONTAINED BACKGROUND MEDIA LAYER (Zero Layout Shift)   */}
      {/* ======================================================== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Desktop: Calming cinematic looping video (unreduced opacity) */}
        <video
          ref={mediaRef}
          src="/assets/video/coffee-hero.mp4"
          poster="/assets/video/coffee-hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="hero-bg-video"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 50%',
            display: 'block',
          }}
        />

        {/* Mobile / Tablet / Reduced Motion Fallback Static Poster */}
        <div
          className="hero-bg-poster"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/assets/video/coffee-hero-poster.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 50%',
            display: 'none',
          }}
        />
      </div>

      {/* ======================================================== */}
      {/* 2. DIRECTIONAL READABILITY SCRIM (Rich Video on Right)   */}
      {/* ======================================================== */}
      <div className="hero-scrim-overlay" />

      {/* ======================================================== */}
      {/* 3. FOREGROUND EDITORIAL POSTER CONTENT (Z-Index 2)       */}
      {/* ======================================================== */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          width: '100%',
        }}
      >
        {/* Top: Simple Editorial Metadata (NO white pill card) */}
        <div
          ref={eyebrowRef}
          className="hero-eyebrow"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            marginBottom: 'clamp(1.5rem, 4vh, 4rem)',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#4B6B40',
                boxShadow: '0 0 8px rgba(75, 107, 64, 0.6)',
              }}
            />
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>OPEN FROM 6:30</span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.14em' }}>
            42 ELMWOOD AVE • MAPLEWOOD
          </div>
        </div>

        {/* Middle: Modern Editorial Poster Typography Lockup */}
        <div
          className="hero-poster-lockup"
          style={{
            position: 'relative',
            maxWidth: 'clamp(380px, 52vw, 760px)',
            marginBottom: 'clamp(1.75rem, 4vh, 4.5rem)',
          }}
        >
          {/* Primary Graphic Word: GOOD in Contemporary Bold Grotesk */}
          <div
            ref={goodWordRef}
            className="hero-word-good"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(4.5rem, 13vw, 11.5rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.045em',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            GOOD
          </div>

          {/* Secondary Contrasting Word: coffee. in Expressive Editorial Serif */}
          <div
            ref={coffeeWordRef}
            className="hero-word-coffee font-serif"
            style={{
              fontSize: 'clamp(2.5rem, 5.8vw, 5.2rem)',
              lineHeight: 1.0,
              color: 'var(--accent-caramel)',
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
              marginLeft: 'clamp(3rem, 9.5vw, 8.5rem)',
              marginTop: 'clamp(-0.8rem, -2.2vw, -1.8rem)',
              position: 'relative',
              zIndex: 3,
              userSelect: 'none',
            }}
          >
            coffee.
          </div>
        </div>

        {/* Bottom Left: Compact Statement, Short Copy & Refined CTAs */}
        <div
          style={{
            maxWidth: 'clamp(340px, 44vw, 500px)',
          }}
        >
          {/* Compact Secondary Typographic Statement */}
          <div
            ref={statementRef}
            className="hero-compact-statement"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.05rem, 1.55vw, 1.4rem)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              marginBottom: 'clamp(0.85rem, 1.8vh, 1.25rem)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
            }}
          >
            <span>GOOD COMPANY</span>
            <span style={{ color: 'var(--accent-caramel)', fontWeight: 400 }}>—</span>
            <span>
              NO RUSH<span style={{ color: 'var(--accent-caramel)' }}>.</span>
            </span>
          </div>

          {/* Short Supporting Copy (Modern Sans, 2-3 lines max) */}
          <p
            ref={copyRef}
            className="hero-support-copy"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              margin: '0 0 clamp(1.5rem, 3vh, 2.5rem) 0',
            }}
          >
            Roasted fresh each week, poured with care by steady hands, and warm oak tables waiting whenever you wander in.
          </p>

          {/* Refined CTAs: 16px radius Primary + Text Action Secondary */}
          <div
            ref={ctaRef}
            className="hero-cta-group"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 'clamp(1.25rem, 2.5vw, 2.25rem)',
            }}
          >
            <a
              href="#menu"
              className="hero-primary-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: 'var(--accent-caramel)',
                color: '#FFFFFF',
                fontSize: '0.9375rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                padding: '0.95rem 2.1rem',
                borderRadius: '16px',
                textDecoration: 'none',
                boxShadow: '0 6px 20px -4px rgba(196, 125, 59, 0.32)',
                transition: 'all 0.25s ease',
              }}
            >
              <span>Explore Daily Menu</span>
              <ArrowDownRight size={17} strokeWidth={2.2} />
            </a>

            <a
              href="#visit"
              className="hero-text-action"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: '#1A1411',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '0.5rem 0.2rem',
              }}
            >
              <span>Find Our Table</span>
              <span className="hero-action-arrow" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <ArrowDownRight size={16} strokeWidth={2.4} color="var(--accent-caramel)" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero-Scoped Responsive & Micro-Styling */}
      <style>{`
        /* Directional readability scrim: Left coverage for text, clear video on right */
        .hero-scrim-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: 
            linear-gradient(180deg, rgba(250, 247, 242, 0) 84%, rgba(250, 247, 242, 0.22) 100%),
            linear-gradient(
              90deg,
              rgba(250, 247, 242, 0.95) 0%,
              rgba(250, 247, 242, 0.88) 22%,
              rgba(250, 247, 242, 0.65) 34%,
              rgba(250, 247, 242, 0.32) 46%,
              rgba(250, 247, 242, 0.08) 58%,
              rgba(250, 247, 242, 0.01) 68%,
              rgba(250, 247, 242, 0) 74%,
              rgba(250, 247, 242, 0) 100%
            );
        }

        .hero-primary-btn:hover {
          background-color: #b06e30 !important;
          transform: translateY(-1.5px);
          box-shadow: 0 8px 24px -4px rgba(196, 125, 59, 0.42) !important;
        }

        .hero-primary-btn:active {
          transform: scale(0.98);
        }

        .hero-text-action {
          position: relative;
          color: #1A1411;
          transition: color 0.25s ease;
        }

        .hero-text-action::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 0%;
          height: 1.5px;
          background-color: var(--accent-caramel);
          transition: width 0.3s var(--ease-editorial);
        }

        .hero-text-action .hero-action-arrow {
          display: inline-flex;
          align-items: center;
          transition: transform 0.25s var(--ease-editorial);
        }

        .hero-text-action:hover {
          color: var(--accent-caramel) !important;
        }

        .hero-text-action:hover::after {
          width: 100%;
        }

        .hero-text-action:hover .hero-action-arrow {
          transform: translate(3px, 3px);
        }

        @media (max-width: 900px) {
          .hero-scrim-overlay {
            background: linear-gradient(
              180deg,
              rgba(250, 247, 242, 0.95) 0%,
              rgba(250, 247, 242, 0.88) 46%,
              rgba(250, 247, 242, 0.62) 75%,
              rgba(250, 247, 242, 0.25) 100%
            ) !important;
          }
        }

        @media (max-width: 768px) {
          #hero {
            min-height: clamp(560px, 92svh, 850px) !important;
            padding-top: calc(var(--nav-height, 65px) + 1.25rem) !important;
            padding-bottom: 2rem !important;
          }
          .hero-bg-video {
            display: none !important;
          }
          .hero-bg-poster {
            display: block !important;
            background-position: center 32% !important;
          }
          .hero-word-good {
            font-size: clamp(4.25rem, 19vw, 8rem) !important;
            line-height: 0.84 !important;
          }
          .hero-word-coffee {
            font-size: clamp(2.35rem, 10vw, 3.8rem) !important;
            margin-left: 0 !important;
            margin-top: 0.25rem !important;
            display: block !important;
          }
          .hero-compact-statement {
            font-size: clamp(0.92rem, 3.8vw, 1.15rem) !important;
            gap: 0.45rem !important;
            margin-bottom: 0.85rem !important;
          }
          .hero-primary-btn {
            padding: 0.85rem 1.65rem !important;
            min-height: 48px !important;
            font-size: 0.875rem !important;
          }
          .hero-text-action {
            min-height: 44px !important;
            padding: 0.6rem 0.25rem !important;
          }
        }

        @media (max-width: 420px) {
          .hero-word-good {
            font-size: clamp(3.85rem, 19.5vw, 5.2rem) !important;
          }
          .hero-compact-statement {
            flex-wrap: wrap !important;
            gap: 0.35rem !important;
          }
          .hero-cta-group {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.85rem !important;
          }
          .hero-primary-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-bg-video {
            display: none !important;
          }
          .hero-bg-poster {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
};
