import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StayAWhile: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP (>= 960px): Locked approved motion
      mm.add('(min-width: 960px)', () => {
        gsap.fromTo(
          headlineRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );

        gsap.fromTo(
          videoWrapperRef.current,
          { x: 80, opacity: 0.8 },
          {
            x: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );

        if (linesRef.current) {
          const lineElements = linesRef.current.children;
          gsap.fromTo(
            lineElements,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.0,
              stagger: 0.22,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: linesRef.current,
                start: 'top 82%',
              },
            }
          );
        }
      });

      // MOBILE & TABLET PORTRAIT (< 960px): Pure vertical entrance with zero horizontal overflow
      mm.add('(max-width: 959px)', () => {
        gsap.fromTo(
          headlineRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 85%',
            },
          }
        );

        if (linesRef.current) {
          gsap.fromTo(
            linesRef.current.children,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: linesRef.current,
                start: 'top 85%',
              },
            }
          );
        }

        gsap.fromTo(
          videoWrapperRef.current,
          { y: 35, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: videoWrapperRef.current,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lifestyle"
      className="stay-section"
      style={{
        backgroundColor: '#F3EDE3', // Sun-washed beige tonal shift
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'clamp(3rem, 5vw, 4.5rem)',
        paddingBottom: 'clamp(3rem, 5vw, 4.5rem)',
      }}
    >
      {/* Editorial Section Anchor */}
      <div
        className="stay-anchor"
        style={{
          paddingLeft: 'var(--container-pad)',
          marginBottom: '2rem',
        }}
      >
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent-olive)',
            display: 'block',
          }}
        >
          07 / THE LIVING ROOM
        </span>
      </div>

      {/* Main Composition */}
      <div
        className="stay-composition"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1fr) minmax(480px, 2.4fr)',
          alignItems: 'center',
          columnGap: 'clamp(2rem, 4vw, 4.5rem)',
          width: '100%',
        }}
      >
        {/* Left Negative Space: STAY A WHILE + 4 Quiet Lines */}
        <div
          className="stay-text-block"
          style={{
            paddingLeft: 'var(--container-pad)',
            zIndex: 2,
          }}
        >
          <div ref={headlineRef} style={{ marginBottom: 'clamp(1.75rem, 4vw, 3rem)' }}>
            <h2
              className="font-serif stay-headline"
              style={{
                fontSize: 'clamp(3.5rem, 7.5vw, 6.75rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.035em',
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              <div>STAY</div>
              <div style={{ color: 'var(--accent-olive)', fontStyle: 'italic', marginLeft: '0.15em' }}>
                A WHILE.
              </div>
            </h2>
          </div>

          {/* 4 Quiet Human Lines */}
          <div
            ref={linesRef}
            className="stay-lines"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.1rem',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.15rem, 1.8vw, 1.65rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.35,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <span style={{ width: '18px', height: '1px', backgroundColor: 'var(--accent-caramel)' }} />
              <span>Meet a friend.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <span style={{ width: '18px', height: '1px', backgroundColor: 'var(--accent-caramel)' }} />
              <span>Open the laptop.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <span style={{ width: '18px', height: '1px', backgroundColor: 'var(--accent-caramel)' }} />
              <span>Read a chapter.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <span style={{ width: '18px', height: '1px', backgroundColor: 'var(--accent-caramel)' }} />
              <span>Have another cup.</span>
            </div>
          </div>
        </div>

        {/* Right: Immersive Ambient Video */}
        <div
          ref={videoWrapperRef}
          className="stay-video-wrapper"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            borderRadius: 'clamp(32px, 5vw, 60px) 0 0 clamp(32px, 5vw, 60px)',
            overflow: 'hidden',
            backgroundColor: '#1E1713',
            boxShadow: '-20px 24px 70px -15px rgba(45, 33, 24, 0.18)',
          }}
        >
          <video
            src="/assets/video/cafe-life.mp4"
            poster="/assets/video/cafe-life-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Warm neighborhood café interior with customers chatting and reading"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Soft architectural gradient blend on the leading edge */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(243, 237, 227, 0.3) 0%, rgba(20, 15, 12, 0) 25%, rgba(20, 15, 12, 0.2) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 959px) {
          .stay-composition {
            display: flex !important;
            flex-direction: column !important;
            gap: 2.5rem !important;
          }
          .stay-text-block {
            padding-left: var(--container-pad) !important;
            padding-right: var(--container-pad) !important;
            width: 100% !important;
          }
          .stay-headline {
            font-size: clamp(2.75rem, 11vw, 4.25rem) !important;
          }
          .stay-lines {
            font-size: clamp(1.1rem, 4vw, 1.35rem) !important;
            gap: 0.85rem !important;
          }
          .stay-video-wrapper {
            width: calc(100% - (var(--container-pad) * 2)) !important;
            margin: 0 auto !important;
            border-radius: clamp(20px, 4vw, 32px) !important;
          }
        }
      `}</style>
    </section>
  );
};
