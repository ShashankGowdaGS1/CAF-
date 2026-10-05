import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const OurStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subheadTextRef = useRef<HTMLSpanElement>(null);
  const subheadAccentRef = useRef<HTMLSpanElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const stripImgRef = useRef<HTMLImageElement>(null);
  const founderBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // ----------------------------------------------------
      // A & B & D. EDITORIAL TYPE ASSEMBLY (Main Reveal Timeline)
      // ----------------------------------------------------
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      // A. Small Section Label (Horizontal Mask Reveal)
      titleTl.fromTo(
        labelRef.current,
        { clipPath: 'inset(0 100% 0 0)', x: -12 },
        { clipPath: 'inset(0 0% 0 0)', x: 0, duration: 0.65, ease: 'power2.out' },
        0
      );

      // B. Headline Lines (Masked Type Placement Sequence)
      titleTl.fromTo(
        line1Ref.current,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.82, ease: 'power3.out' },
        0.1
      );

      titleTl.fromTo(
        line2Ref.current,
        { yPercent: 120 },
        { yPercent: 0, duration: 0.82, ease: 'power3.out' },
        0.22
      );

      titleTl.fromTo(
        line3Ref.current,
        { yPercent: 110, xPercent: -4 },
        { yPercent: 0, xPercent: 0, duration: 0.88, ease: 'power3.out' },
        0.34
      );

      // D. Subhead Reveal (Normal text, then italic 'performance' ~120ms later)
      titleTl.fromTo(
        subheadTextRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.72, ease: 'power2.out' },
        0.48
      );

      titleTl.fromTo(
        subheadAccentRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.82, ease: 'power2.out' },
        0.60
      );

      // ----------------------------------------------------
      // Responsive matchMedia for Scroll Parallax
      // ----------------------------------------------------
      const mm = gsap.matchMedia();

      // DESKTOP (>= 900px): Approved differential horizontal text motion
      mm.add('(min-width: 900px)', () => {
        gsap.to(line1Ref.current, {
          x: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 45%',
            end: 'bottom 20%',
            scrub: 1.1,
          },
        });

        gsap.to(line2Ref.current, {
          x: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 45%',
            end: 'bottom 20%',
            scrub: 1.1,
          },
        });

        gsap.to(line3Ref.current, {
          x: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 45%',
            end: 'bottom 20%',
            scrub: 1.1,
          },
        });
      });

      // MOBILE & TABLET (< 900px): Zero horizontal scrub to eliminate touch side-scroll
      mm.add('(max-width: 899px)', () => {});

      // ----------------------------------------------------
      // E. CINEMATIC WINDOW REVEAL (Expanding Framing & Inner Settle)
      // ----------------------------------------------------
      const imageRevealTl = gsap.timeline({
        scrollTrigger: {
          trigger: imgWrapperRef.current,
          start: 'top 86%',
          end: 'top 32%',
          scrub: 1.0,
        },
      });

      imageRevealTl.fromTo(
        imgWrapperRef.current,
        { clipPath: 'inset(10% 7% 12% 7%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' },
        0
      );

      imageRevealTl.fromTo(
        stripImgRef.current,
        { scale: 1.07, y: 25 },
        { scale: 1.0, y: 0, ease: 'power2.inOut' },
        0
      );

      // ----------------------------------------------------
      // F. INNER IMAGE PARALLAX (Subtle edge-safe bleed)
      // ----------------------------------------------------
      gsap.fromTo(
        stripImgRef.current,
        { yPercent: -3 },
        {
          yPercent: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: imgWrapperRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      // ----------------------------------------------------
      // G. FOUNDER LABEL (Reveals near end of photo reveal)
      // ----------------------------------------------------
      gsap.fromTo(
        founderBadgeRef.current,
        { clipPath: 'inset(0 0 0 100%)', x: 18 },
        {
          clipPath: 'inset(0 0 0 0)',
          x: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imgWrapperRef.current,
            start: 'top 48%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      style={{
        backgroundColor: '#FAF7F2',
        position: 'relative',
        paddingTop: 'clamp(3rem, 5vw, 4.5rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        overflow: 'hidden',
      }}
    >
      {/* Editorial Interlude Statement */}
      <div
        ref={headlineRef}
        className="story-headline-wrap"
        style={{
          maxWidth: '920px',
          margin: '0 auto clamp(2.5rem, 4.5vw, 3.5rem) auto',
          textAlign: 'center',
          padding: '0 var(--container-pad)',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent-olive)',
            display: 'inline-block',
            marginBottom: '1.25rem',
          }}
        >
          08 / THE NEIGHBORHOOD
        </span>

        <h2
          className="font-serif select-none story-title"
          style={{
            fontSize: 'clamp(3rem, 6.5vw, 6rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.035em',
            color: 'var(--text-primary)',
            margin: '0 0 1.75rem 0',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <div ref={line1Ref} style={{ display: 'inline-block', willChange: 'transform' }}>
              BUILT FOR
            </div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div ref={line2Ref} style={{ display: 'inline-block', willChange: 'transform' }}>
              THE
            </div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div ref={line3Ref} style={{ display: 'inline-block', willChange: 'transform' }}>
              NEIGHBORHOOD.
            </div>
          </div>
        </h2>

        <p
          className="font-serif story-subhead"
          style={{
            fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.45,
            margin: 0,
          }}
        >
          <span ref={subheadTextRef} style={{ display: 'inline-block' }}>
            Good coffee without the{' '}
          </span>
          <span
            ref={subheadAccentRef}
            style={{
              display: 'inline-block',
              fontStyle: 'italic',
              color: 'var(--accent-caramel)',
            }}
          >
            performance
          </span>
          <span>.</span>
        </p>
      </div>

      {/* Wide Edge-to-Edge Lifestyle Image Strip with Cinematic Window Reveal */}
      <div
        ref={imgWrapperRef}
        className="story-strip-wrapper"
        style={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          height: 'clamp(360px, 48vh, 580px)',
          overflow: 'hidden',
          backgroundColor: '#1E1713',
        }}
      >
        <img
          ref={stripImgRef}
          src="/assets/images/cafe-sunlight.jpg"
          alt="The Cornerstone sunlit interior with wooden tables and morning coffee regulars"
          loading="lazy"
          style={{
            width: '100%',
            height: '124%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            display: 'block',
            willChange: 'transform',
          }}
        />

        {/* Soft edge-to-edge vignette / lighting blend */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(250, 247, 242, 0.4) 0%, rgba(20, 15, 12, 0.1) 40%, rgba(20, 15, 12, 0.4) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Small founder signature in corner of strip */}
        <div
          ref={founderBadgeRef}
          className="story-founder-badge"
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: 'var(--container-pad)',
            backgroundColor: 'rgba(250, 247, 242, 0.92)',
            backdropFilter: 'blur(10px)',
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.65rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}
        >
          <span
            className="font-serif"
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            Maya & Julian
          </span>
          <span
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              fontWeight: 600,
            }}
          >
            FOUNDERS • 2024
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .story-title {
            font-size: clamp(2.35rem, 9.2vw, 3.8rem) !important;
            line-height: 0.96 !important;
            margin-bottom: 1.25rem !important;
          }
          .story-subhead {
            font-size: clamp(1.05rem, 4vw, 1.25rem) !important;
          }
          .story-strip-wrapper {
            height: clamp(280px, 38vh, 420px) !important;
          }
          .story-founder-badge {
            bottom: 1.25rem !important;
            right: 1.25rem !important;
            padding: 0.5rem 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};
