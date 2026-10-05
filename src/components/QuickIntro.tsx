import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const QuickIntro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const imgTallRef = useRef<HTMLDivElement>(null);
  const captionTallRef = useRef<HTMLDivElement>(null);

  const imgCenterRef = useRef<HTMLDivElement>(null);
  const captionCenterRef = useRef<HTMLDivElement>(null);

  const imgWideRef = useRef<HTMLDivElement>(null);
  const captionWideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const eyebrow = eyebrowRef.current;
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;

    const imgTall = imgTallRef.current;
    const captionTall = captionTallRef.current;
    const imgCenter = imgCenterRef.current;
    const captionCenter = captionCenterRef.current;
    const imgWide = imgWideRef.current;
    const captionWide = captionWideRef.current;

    if (!section || !headline || !imgTall || !imgCenter || !imgWide) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Headline Entrance (triggers as upper section enters viewport)
      const headTl = gsap.timeline({
        scrollTrigger: {
          trigger: headline,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power2.out' },
      });

      if (eyebrow) {
        headTl.fromTo(eyebrow, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75 });
      }
      if (heading) {
        headTl.fromTo(heading, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, '-=0.55');
      }
      if (paragraph) {
        headTl.fromTo(paragraph, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.55');
      }

      // 2. Responsive Animation via matchMedia
      const mm = gsap.matchMedia();

      // DESKTOP (>= 900px): Approved locked 100-unit editorial scrub choreography
      mm.add('(min-width: 900px)', () => {
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // PHOTO 01: FIRST CAPPUCCINO
        mainTl.fromTo(
          imgTall,
          { y: 110, scale: 0.95, opacity: 0.85 },
          { y: 0, scale: 1, opacity: 1, ease: 'power1.out', duration: 26 },
          8
        );

        if (captionTall) {
          mainTl.fromTo(
            captionTall,
            { y: 8, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power1.out', duration: 8 },
            27
          );
        }

        mainTl.to(imgTall, { y: -25, ease: 'none', duration: 58 }, 34);

        // PHOTO 02: CROISSANT
        mainTl.fromTo(
          imgCenter,
          { x: 45, y: 150, scale: 0.92, rotation: 1.5, opacity: 0 },
          { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, ease: 'power1.out', duration: 28 },
          20
        );

        if (captionCenter) {
          mainTl.fromTo(
            captionCenter,
            { y: 8, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power1.out', duration: 8 },
            42
          );
        }

        mainTl.to(imgCenter, { y: -45, ease: 'none', duration: 44 }, 48);

        // PHOTO 03: STAY A LITTLE LONGER
        mainTl.fromTo(
          imgWide,
          { x: 75, y: 180, scale: 0.95, opacity: 0 },
          { x: 0, y: 0, scale: 1, opacity: 1, ease: 'power1.out', duration: 32 },
          36
        );

        if (captionWide) {
          mainTl.fromTo(
            captionWide,
            { y: 8, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power1.out', duration: 8 },
            60
          );
        }

        mainTl.to(imgWide, { x: -15, y: -30, ease: 'none', duration: 24 }, 68);

        // Section transition exit
        mainTl.to(imgTall, { y: -35, ease: 'none', duration: 8 }, 92);
        mainTl.to(imgCenter, { y: -58, ease: 'none', duration: 8 }, 92);
        mainTl.to(imgWide, { y: -42, ease: 'none', duration: 8 }, 92);
      });

      // MOBILE & TABLET PORTRAIT (< 900px): Asymmetric vertical editorial sequence
      mm.add('(max-width: 899px)', () => {
        const moments = [
          { el: imgTall, cap: captionTall },
          { el: imgCenter, cap: captionCenter },
          { el: imgWide, cap: captionWide },
        ];

        moments.forEach(({ el, cap }) => {
          gsap.fromTo(
            el,
            { y: 35, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
              },
            }
          );

          if (cap) {
            gsap.fromTo(
              cap,
              { y: 6, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.45,
                delay: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                },
              }
            );
          }
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="rituals"
      className="rituals-section"
      style={{
        position: 'relative',
        backgroundColor: '#F5EFE6', // Tonal shift: sun-washed beige
        minHeight: 'clamp(145vh, 160vh, 175vh)', // Ample vertical breathing room for desktop
        overflow: 'hidden',
        paddingTop: 'clamp(6rem, 10vh, 9rem)',
        paddingBottom: 'clamp(6rem, 10vh, 9rem)',
      }}
    >
      <div className="container" style={{ position: 'relative' }}>
        {/* Anchored Section Headline */}
        <div
          ref={headlineRef}
          className="rituals-headline-wrap"
          style={{
            maxWidth: '680px',
            marginBottom: 'clamp(3rem, 6vh, 5rem)',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <span
            ref={eyebrowRef}
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--accent-olive)',
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            NEIGHBORHOOD RITUALS
          </span>

          <h2
            ref={headingRef}
            className="font-serif rituals-headline-h2"
            style={{
              fontSize: 'clamp(2.75rem, 5.5vw, 4.75rem)',
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              letterSpacing: '-0.025em',
              marginBottom: '1rem',
            }}
          >
            Everyday, <br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent-caramel)' }}>
              around the corner.
            </span>
          </h2>

          <p
            ref={paragraphRef}
            className="rituals-headline-p"
            style={{
              fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: '520px',
            }}
          >
            The quiet comfort of a familiar table. A warm cup passed across the counter when you need it most.
          </p>
        </div>

        {/* Moving Photo Composition: 3 Variable-Size Moments */}
        <div
          className="rituals-moving-stage"
          style={{
            position: 'relative',
            minHeight: 'clamp(720px, 78vh, 940px)',
            width: '100%',
          }}
        >
          {/* MOMENT 01: Tall Image Touching Left Viewport Edge (Grounded Anchor) */}
          <div
            ref={imgTallRef}
            className="ritual-moment moment-tall"
            style={{
              position: 'absolute',
              left: 'clamp(0px, 2vw, 2.5rem)',
              top: '20px',
              width: 'clamp(270px, 32vw, 420px)',
              aspectRatio: '3 / 4',
              borderRadius: '24px',
              boxShadow: '0 24px 60px -15px rgba(35, 26, 20, 0.18)',
              backgroundColor: 'var(--bg-surface)',
              zIndex: 2,
            }}
          >
            <div className="ritual-moment-inner">
              <img
                src="/assets/images/cappuccino.jpg"
                alt="First cappuccino of the morning on warm wooden table"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Editorial Marginalia Label */}
              <div
                ref={captionTallRef}
                className="ritual-caption"
                style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '1.25rem',
                  right: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  color: '#FAF7F2',
                  textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                <span>7:42 AM</span>
                <span>FIRST CAPPUCCINO</span>
              </div>
            </div>
          </div>

          {/* MOMENT 02: Small Floating Crop Crossing Center (Playful Second Beat) */}
          <div
            ref={imgCenterRef}
            className="ritual-moment moment-crop"
            style={{
              position: 'absolute',
              left: '42%',
              top: '90px',
              width: 'clamp(210px, 24vw, 320px)',
              aspectRatio: '4 / 3.2',
              borderRadius: '20px',
              boxShadow: '0 32px 70px -10px rgba(35, 26, 20, 0.28)',
              backgroundColor: 'var(--bg-surface)',
              zIndex: 4,
            }}
          >
            <div className="ritual-moment-inner">
              <img
                src="/assets/images/pastry-croissant.jpg"
                alt="Flaky buttery morning croissant fresh from the oven"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Editorial Marginalia Label */}
              <div
                ref={captionCenterRef}
                className="ritual-caption"
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  right: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  color: '#FAF7F2',
                  textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                <span>11:18 AM</span>
                <span>ONE MORE CROISSANT</span>
              </div>
            </div>
          </div>

          {/* MOMENT 03: Wide Lifestyle Composition on Right (Final Payoff) */}
          <div
            ref={imgWideRef}
            className="ritual-moment moment-wide"
            style={{
              position: 'absolute',
              right: 'clamp(0px, 2vw, 2.5rem)',
              top: '220px',
              width: 'clamp(320px, 46vw, 600px)',
              aspectRatio: '16 / 10',
              borderRadius: '28px',
              boxShadow: '0 28px 70px -15px rgba(35, 26, 20, 0.2)',
              backgroundColor: 'var(--bg-surface)',
              zIndex: 3,
            }}
          >
            <div className="ritual-moment-inner">
              <img
                src="/assets/images/cafe-sunlight.jpg"
                alt="Warm afternoon sunlight across timber cafe tables"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Editorial Marginalia Label */}
              <div
                ref={captionWideRef}
                className="ritual-caption"
                style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  color: '#FAF7F2',
                  textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                <span>4:36 PM</span>
                <span>STAY A LITTLE LONGER</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ritual-moment {
          will-change: transform, opacity;
        }

        .ritual-moment-inner {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: inherit;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (hover: hover) and (pointer: fine) {
          .ritual-moment:hover .ritual-moment-inner {
            transform: scale(1.015);
            box-shadow: 0 36px 85px -12px rgba(35, 26, 20, 0.32);
          }
          .ritual-moment:hover .ritual-caption {
            opacity: 1 !important;
          }
        }

        /* Mobile & Tablet Editorial Asymmetric Vertical Sequence */
        @media (max-width: 899px) {
          .rituals-section {
            min-height: auto !important;
            padding-top: clamp(4rem, 8vh, 6rem) !important;
            padding-bottom: clamp(4rem, 8vh, 6rem) !important;
          }
          .rituals-headline-wrap {
            margin-bottom: 2.5rem !important;
          }
          .rituals-headline-h2 {
            font-size: clamp(2.35rem, 8vw, 3.5rem) !important;
          }
          .rituals-moving-stage {
            min-height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 2rem !important;
          }
          .ritual-moment {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            transform: none !important;
          }
          /* Image 01: Largest / Full Width Feature */
          .moment-tall {
            width: 100% !important;
            max-width: 540px !important;
            margin: 0 auto !important;
            aspect-ratio: 4 / 4.8 !important;
          }
          /* Image 02: Slightly narrower / offset right */
          .moment-crop {
            width: 88% !important;
            max-width: 460px !important;
            margin-left: auto !important;
            margin-right: 0 !important;
            aspect-ratio: 4 / 3.1 !important;
          }
          /* Image 03: Near full-width / offset left */
          .moment-wide {
            width: 96% !important;
            max-width: 520px !important;
            margin-left: 0 !important;
            margin-right: auto !important;
            aspect-ratio: 16 / 10.5 !important;
          }
        }

        @media (max-width: 480px) {
          .moment-crop {
            width: 92% !important;
          }
          .moment-wide {
            width: 100% !important;
          }
          .rituals-moving-stage {
            gap: 1.75rem !important;
          }
        }
      `}</style>
    </section>
  );
};
