import React, { useRef, useEffect } from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const VisitUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftTypeRef = useRef<HTMLDivElement>(null);
  const rightTypeRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Wordmark lines
  const wordComeRef = useRef<HTMLDivElement>(null);
  const wordVisitRef = useRef<HTMLDivElement>(null);
  const wordUsRef = useRef<HTMLDivElement>(null);

  // Hours elements
  const todayDotRef = useRef<HTMLSpanElement>(null);
  const todayLabelRef = useRef<HTMLSpanElement>(null);
  const timeOpenRef = useRef<HTMLSpanElement>(null);
  const timeDashRef = useRef<HTMLSpanElement>(null);
  const timeCloseRef = useRef<HTMLSpanElement>(null);
  const hoursSubRef = useRef<HTMLDivElement>(null);

  // Address lines
  const addrLine1Ref = useRef<HTMLDivElement>(null);
  const addrLine2Ref = useRef<HTMLDivElement>(null);
  const addrLine3Ref = useRef<HTMLParagraphElement>(null);

  // Action links
  const directionsUnderlineRef = useRef<HTMLSpanElement>(null);
  const directionsTextRef = useRef<HTMLSpanElement>(null);
  const directionsArrowRef = useRef<SVGSVGElement>(null);
  const callUnderlineRef = useRef<HTMLSpanElement>(null);
  const callTextRef = useRef<HTMLSpanElement>(null);

  // Exterior band
  const exteriorBandRef = useRef<HTMLDivElement>(null);
  const exteriorImgRef = useRef<HTMLImageElement>(null);
  const exteriorBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // ----------------------------------------------------
      // A. SECTION LABEL: subtle clipPath + letter-spacing settle
      // ----------------------------------------------------
      gsap.fromTo(
        labelRef.current,
        { letterSpacing: '0.14em', clipPath: 'inset(0 100% 0 0)' },
        {
          letterSpacing: '0.22em',
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ----------------------------------------------------
      // B. COME / VISIT / US. - Signage Alignment Assembly
      // ----------------------------------------------------
      const wordmarkTl = gsap.timeline({
        scrollTrigger: {
          trigger: leftTypeRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });

      wordmarkTl.fromTo(
        wordComeRef.current,
        { xPercent: -18 },
        { xPercent: 0, duration: 0.75, ease: 'power3.out' },
        0.05
      );

      wordmarkTl.fromTo(
        wordVisitRef.current,
        { xPercent: -10, yPercent: 60 },
        { xPercent: 0, yPercent: 0, duration: 0.85, ease: 'power3.out' },
        0.18
      );

      wordmarkTl.fromTo(
        wordUsRef.current,
        { yPercent: 105 },
        { yPercent: 0, duration: 0.8, ease: 'power3.out' },
        0.32
      );

      // ----------------------------------------------------
      // Responsive matchMedia for Scroll Parallax
      // ----------------------------------------------------
      const mm = gsap.matchMedia();

      // DESKTOP (>= 900px): Approved kinetic poster scroll parallax
      mm.add('(min-width: 900px)', () => {
        gsap.to(wordComeRef.current, {
          x: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            end: 'bottom 20%',
            scrub: 1.1,
          },
        });

        gsap.to(wordVisitRef.current, {
          x: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            end: 'bottom 20%',
            scrub: 1.1,
          },
        });

        gsap.to(wordUsRef.current, {
          x: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            end: 'bottom 20%',
            scrub: 1.1,
          },
        });
      });

      // MOBILE & TABLET (< 900px): Clean lock without horizontal displacement
      mm.add('(max-width: 899px)', () => {});

      // ----------------------------------------------------
      // D & E & F & G. RIGHT COLUMN: Information Alignment
      // ----------------------------------------------------
      const rightInfoTl = gsap.timeline({
        scrollTrigger: {
          trigger: rightTypeRef.current,
          start: 'top 76%',
          toggleActions: 'play none none none',
        },
      });

      // E. Today Status
      rightInfoTl.fromTo(
        todayDotRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.45, ease: 'back.out(1.7)' },
        0.1
      );

      rightInfoTl.fromTo(
        todayLabelRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.55, ease: 'power2.out' },
        0.15
      );

      // D. Opening Hours
      rightInfoTl.fromTo(
        timeOpenRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.7, ease: 'power3.out' },
        0.22
      );

      rightInfoTl.fromTo(
        timeDashRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: 'power2.out' },
        0.3
      );

      rightInfoTl.fromTo(
        timeCloseRef.current,
        { yPercent: -100 },
        { yPercent: 0, duration: 0.7, ease: 'power3.out' },
        0.28
      );

      rightInfoTl.fromTo(
        hoursSubRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power2.out' },
        0.42
      );

      // F. Sequential Address Block Masking
      rightInfoTl.fromTo(
        addrLine1Ref.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.65, ease: 'power3.out' },
        0.46
      );

      rightInfoTl.fromTo(
        addrLine2Ref.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.65, ease: 'power3.out' },
        0.56
      );

      rightInfoTl.fromTo(
        addrLine3Ref.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.65, ease: 'power3.out' },
        0.66
      );

      // G. Action Links
      rightInfoTl.fromTo(
        [directionsUnderlineRef.current, callUnderlineRef.current],
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out' },
        0.72
      );

      rightInfoTl.fromTo(
        [directionsTextRef.current, callTextRef.current],
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        0.75
      );

      rightInfoTl.fromTo(
        directionsArrowRef.current,
        { x: -4 },
        { x: 0, duration: 0.4, ease: 'power2.out' },
        0.85
      );

      // ----------------------------------------------------
      // H. LARGE LOCATION IMAGE: Center Double-Door Cinema Reveal
      // ----------------------------------------------------
      const exteriorTl = gsap.timeline({
        scrollTrigger: {
          trigger: exteriorBandRef.current,
          start: 'top 85%',
          end: 'top 32%',
          scrub: 1.0,
        },
      });

      exteriorTl.fromTo(
        exteriorBandRef.current,
        { clipPath: 'inset(0 50% 0 50%)' },
        { clipPath: 'inset(0 0% 0 0%)', ease: 'power2.inOut' },
        0
      );

      exteriorTl.fromTo(
        exteriorImgRef.current,
        { scale: 1.08 },
        { scale: 1.0, ease: 'power2.inOut' },
        0
      );

      // I. Address Badge
      gsap.fromTo(
        exteriorBadgeRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exteriorBandRef.current,
            start: 'top 46%',
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
      id="visit"
      style={{
        backgroundColor: '#F5EFE6', // Sun-washed limestone tone
        position: 'relative',
        paddingTop: 'clamp(4.5rem, 9vw, 9rem)',
        paddingBottom: 'clamp(4.5rem, 9vw, 9rem)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 var(--container-pad)',
        }}
      >
        {/* ======================================================== */}
        {/* SIGNAGE SPLIT COMPOSITION                                */}
        {/* ======================================================== */}
        <div
          className="visit-signage-split"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(320px, 1fr)',
            columnGap: 'clamp(3rem, 7vw, 7rem)',
            rowGap: 'clamp(2.5rem, 5vw, 4rem)',
            alignItems: 'start',
            marginBottom: 'clamp(3rem, 6vw, 5.5rem)',
          }}
        >
          {/* ------------------------------------------------------ */}
          {/* LEFT: Massive Signage Wordmark                          */}
          {/* ------------------------------------------------------ */}
          <div ref={leftTypeRef} className="visit-left-col">
            <span
              ref={labelRef}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--accent-caramel)',
                display: 'inline-block',
                marginBottom: '1.25rem',
              }}
            >
              09 / SIGNPOST & VISITING
            </span>

            <h2
              className="font-serif select-none visit-wordmark"
              style={{
                fontSize: 'clamp(4.25rem, 9.5vw, 9rem)',
                lineHeight: 0.86,
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <div ref={wordComeRef} style={{ display: 'inline-block', willChange: 'transform' }}>
                  COME
                </div>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div
                  ref={wordVisitRef}
                  style={{
                    color: 'var(--accent-terracotta)',
                    fontStyle: 'italic',
                    marginLeft: '0.08em',
                    display: 'inline-block',
                    willChange: 'transform',
                  }}
                >
                  VISIT
                </div>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div ref={wordUsRef} style={{ display: 'inline-block', willChange: 'transform' }}>
                  US.
                </div>
              </div>
            </h2>
          </div>

          {/* ------------------------------------------------------ */}
          {/* RIGHT: High-Clarity Practical Signage Information      */}
          {/* ------------------------------------------------------ */}
          <div
            ref={rightTypeRef}
            className="visit-right-col"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(1.75rem, 3.5vw, 3rem)',
              paddingTop: 'clamp(0.5rem, 1.5vw, 2rem)',
            }}
          >
            {/* Opening Time Signage */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  marginBottom: '0.5rem',
                }}
              >
                <span
                  ref={todayDotRef}
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-olive)',
                    boxShadow: '0 0 10px rgba(85, 99, 70, 0.6)',
                    display: 'inline-block',
                  }}
                />
                <span
                  ref={todayLabelRef}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-olive)',
                    display: 'inline-block',
                  }}
                >
                  TODAY
                </span>
              </div>

              <div
                className="font-serif visit-hours-display"
                style={{
                  fontSize: 'clamp(2.75rem, 5.5vw, 4.75rem)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.3em',
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <span ref={timeOpenRef} style={{ display: 'inline-block' }}>
                    7:30
                  </span>
                </div>
                <span
                  ref={timeDashRef}
                  style={{
                    display: 'inline-block',
                    transformOrigin: 'left center',
                  }}
                >
                  —
                </span>
                <div style={{ overflow: 'hidden' }}>
                  <span ref={timeCloseRef} style={{ display: 'inline-block' }}>
                    9:00
                  </span>
                </div>
              </div>

              <div ref={hoursSubRef} style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Weekdays 7:30 AM – 9:00 PM • Weekends 8:00 AM – 10:00 PM
              </div>
            </div>

            {/* Address Block */}
            <div style={{ borderTop: '1px solid rgba(45, 33, 24, 0.12)', paddingTop: '1.5rem' }}>
              <div style={{ overflow: 'hidden' }}>
                <div
                  ref={addrLine1Ref}
                  style={{
                    fontSize: 'clamp(1.25rem, 1.8vw, 1.65rem)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                    marginBottom: '0.35rem',
                  }}
                >
                  42 Elmwood Avenue
                </div>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div
                  ref={addrLine2Ref}
                  style={{
                    fontSize: 'clamp(1.1rem, 1.4vw, 1.3rem)',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    marginBottom: '0.5rem',
                  }}
                >
                  Maplewood District
                </div>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <p
                  ref={addrLine3Ref}
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Opposite Maplewood Library • 2 min walk from Metro • Bicycle rack outside
                </p>
              </div>
            </div>

            {/* Action Links / Buttons */}
            <div
              className="visit-action-group"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'clamp(1.25rem, 2.5vw, 2.5rem)',
                alignItems: 'center',
                paddingTop: '0.5rem',
              }}
            >
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="visit-action-link visit-directions-btn"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  paddingBottom: '0.25rem',
                  minHeight: '44px',
                  transition: 'color 0.2s ease',
                }}
              >
                <span ref={directionsTextRef}>Get Directions</span>
                <ArrowUpRight ref={directionsArrowRef} size={17} color="var(--accent-caramel)" />
                <span
                  ref={directionsUnderlineRef}
                  className="desktop-underline"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--accent-caramel)',
                    transformOrigin: 'left',
                  }}
                />
              </a>

              <a
                href="tel:5552348901"
                className="visit-action-link visit-call-btn"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  paddingBottom: '0.25rem',
                  minHeight: '44px',
                  transition: 'color 0.2s ease',
                }}
              >
                <Phone size={15} color="var(--accent-caramel)" />
                <span ref={callTextRef}>Call Us (555) 234-8901</span>
                <span
                  ref={callUnderlineRef}
                  className="desktop-underline"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    backgroundColor: 'rgba(45, 33, 24, 0.2)',
                    transformOrigin: 'left',
                  }}
                />
              </a>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CAFÉ EXTERIOR BAND BENEATH                               */}
        {/* ======================================================== */}
        <div
          ref={exteriorBandRef}
          className="visit-exterior-band"
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(280px, 40vh, 460px)',
            borderRadius: 'clamp(24px, 4vw, 44px)',
            overflow: 'hidden',
            boxShadow: '0 24px 60px -15px rgba(45, 33, 24, 0.14)',
            backgroundColor: '#1E1713',
          }}
        >
          <img
            ref={exteriorImgRef}
            src="/assets/images/cafe-exterior.jpg"
            alt="The Cornerstone cafe exterior with open oak doors, sidewalk bench, and sunny morning light"
            loading="lazy"
            style={{
              width: '100%',
              height: '120%',
              objectFit: 'cover',
              objectPosition: 'center 45%',
              display: 'block',
              willChange: 'transform',
            }}
          />

          {/* Vignette lighting overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(20, 15, 12, 0.1) 0%, rgba(20, 15, 12, 0) 50%, rgba(20, 15, 12, 0.45) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Exterior Corner Badge */}
          <div
            ref={exteriorBadgeRef}
            className="visit-exterior-badge"
            style={{
              position: 'absolute',
              bottom: '1.75rem',
              left: 'clamp(1.5rem, 3vw, 2.5rem)',
              backgroundColor: 'rgba(250, 247, 242, 0.94)',
              backdropFilter: 'blur(10px)',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          >
            42 ELMWOOD AVENUE • CORNERSTONE CAFÉ
          </div>
        </div>
      </div>

      <style>{`
        /* Mobile Signage Prioritization & Touch Action Styling */
        @media (max-width: 900px) {
          .visit-signage-split {
            grid-template-columns: 1fr !important;
            row-gap: 2.5rem !important;
            margin-bottom: 2.75rem !important;
          }
          .visit-wordmark {
            font-size: clamp(3.5rem, 13vw, 5.5rem) !important;
            line-height: 0.9 !important;
          }
          .visit-hours-display {
            font-size: clamp(2.4rem, 8vw, 3.6rem) !important;
          }
          .visit-action-group {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.85rem !important;
          }
          .visit-directions-btn {
            background-color: var(--accent-caramel) !important;
            color: #FFFFFF !important;
            justify-content: center !important;
            padding: 0.95rem 1.5rem !important;
            border-radius: var(--radius-full) !important;
            min-height: 48px !important;
            box-shadow: 0 4px 16px rgba(196, 125, 59, 0.25) !important;
          }
          .visit-directions-btn svg {
            color: #FFFFFF !important;
          }
          .visit-directions-btn .desktop-underline {
            display: none !important;
          }
          .visit-call-btn {
            background-color: rgba(35, 28, 24, 0.06) !important;
            color: var(--text-primary) !important;
            border: 1px solid var(--border-medium) !important;
            justify-content: center !important;
            padding: 0.95rem 1.5rem !important;
            border-radius: var(--radius-full) !important;
            min-height: 48px !important;
          }
          .visit-call-btn .desktop-underline {
            display: none !important;
          }
          /* Storefront photo gets a taller, more inviting crop on mobile */
          .visit-exterior-band {
            height: clamp(320px, 45vh, 440px) !important;
            border-radius: clamp(20px, 4vw, 32px) !important;
          }
          .visit-exterior-band img {
            object-position: center 40% !important;
          }
          .visit-exterior-badge {
            bottom: 1.25rem !important;
            left: 1.25rem !important;
            font-size: 0.7rem !important;
            padding: 0.5rem 0.9rem !important;
            max-width: calc(100% - 2.5rem) !important;
          }
        }
      `}</style>
    </section>
  );
};
