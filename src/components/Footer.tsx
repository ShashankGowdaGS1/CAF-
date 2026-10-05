import React, { useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const seeYouRef = useRef<HTMLDivElement>(null);
  const aroundRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const backToTopBtnRef = useRef<HTMLButtonElement>(null);
  const backToTopTextRef = useRef<HTMLSpanElement>(null);
  const backToTopArrowRef = useRef<HTMLSpanElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // ----------------------------------------------------
      // B & C. CLOSING CREDITS TITLE ASSEMBLY
      // ----------------------------------------------------
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 86%',
          toggleActions: 'play none none none',
        },
      });

      // B. SEE YOU: masked entry from below with subtle -3% horizontal placement
      titleTl.fromTo(
        seeYouRef.current,
        { yPercent: 105, xPercent: -3 },
        { yPercent: 0, xPercent: 0, duration: 0.85, ease: 'power3.out' },
        0.1
      );

      // C. AROUND.: sweeps horizontally into place below SEE YOU
      titleTl.fromTo(
        aroundRef.current,
        { clipPath: 'inset(0 100% 0 0)', x: -40 },
        { clipPath: 'inset(0 0% 0 0)', x: 0, duration: 0.9, ease: 'power3.out' },
        0.28
      );

      // E. FOOTER DIVIDER: draws from left to right after title settles
      titleTl.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.75, ease: 'power2.out' },
        0.62
      );

      // F. Column labels first, values ~80-120ms later
      titleTl.fromTo(
        '.footer-col-label',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        0.75
      );

      titleTl.fromTo(
        '.footer-col-value',
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power2.out' },
        0.85
      );

      // G. Back to Top Button
      titleTl.fromTo(
        backToTopBtnRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.88
      );

      titleTl.fromTo(
        backToTopTextRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power2.out' },
        0.92
      );

      titleTl.fromTo(
        backToTopArrowRef.current,
        { y: 4 },
        { y: 0, duration: 0.4, ease: 'power2.out' },
        0.98
      );

      // ----------------------------------------------------
      // D. Responsive matchMedia for Scroll Parallax
      // ----------------------------------------------------
      const mm = gsap.matchMedia();

      // DESKTOP (>= 1024px): Approved kinetic typography tension
      mm.add('(min-width: 1024px)', () => {
        gsap.to(seeYouRef.current, {
          xPercent: -2.5,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 55%',
            end: 'bottom bottom',
            scrub: 1.1,
          },
        });

        gsap.to(aroundRef.current, {
          xPercent: 2.5,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 55%',
            end: 'bottom bottom',
            scrub: 1.1,
          },
        });
      });

      // MOBILE & TABLET (< 1024px): Zero horizontal opposing scroll to avoid off-screen overflow
      mm.add('(max-width: 1023px)', () => {});
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      style={{
        backgroundColor: '#120D0A', // Deep roast background
        color: '#FAF7F2',
        position: 'relative',
        paddingTop: 'clamp(5rem, 10vw, 10rem)',
        paddingBottom: 'clamp(3rem, 5vw, 4.5rem)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Animated Steam Line Accent */}
      <div
        className="footer-steam-accent"
        style={{
          position: 'absolute',
          top: '3rem',
          right: 'clamp(2rem, 8vw, 12rem)',
          width: '160px',
          height: '140px',
          pointerEvents: 'none',
          opacity: 0.35,
        }}
      >
        <svg
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          <path
            d="M30 110C30 90 55 80 50 55C45 30 65 20 60 5"
            stroke="var(--accent-caramel)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="steam-path-1"
          />
          <path
            d="M50 115C50 95 70 85 65 65C60 45 75 35 70 15"
            stroke="var(--accent-caramel)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="steam-path-2"
          />
        </svg>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 var(--container-pad)',
        }}
      >
        {/* Top Eyebrow */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--accent-caramel)',
            }}
          >
            10 / UNTIL TOMORROW MORNING
          </span>
        </div>

        {/* ======================================================== */}
        {/* MASSIVE DISPLAY: SEE YOU AROUND                          */}
        {/* ======================================================== */}
        <div
          className="footer-title-wrap"
          style={{
            marginBottom: 'clamp(3.5rem, 7vw, 6.5rem)',
            position: 'relative',
          }}
        >
          <h2
            className="font-serif select-none footer-heading"
            style={{
              fontSize: 'clamp(5rem, 15vw, 15.5rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em',
              color: '#FAF7F2',
              margin: 0,
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <div ref={seeYouRef} className="footer-line-seeyou" style={{ display: 'inline-block', willChange: 'transform' }}>
                SEE YOU
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div
                ref={aroundRef}
                className="footer-line-around"
                style={{
                  color: 'var(--accent-caramel)',
                  fontStyle: 'italic',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  transform: 'translateX(0.04em)',
                  willChange: 'transform',
                }}
              >
                AROUND.
              </div>
            </div>
          </h2>
        </div>

        {/* E. Animated Line Divider */}
        <div
          ref={dividerRef}
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(250, 247, 242, 0.12)',
            transformOrigin: 'left center',
          }}
        />

        {/* ======================================================== */}
        {/* PRACTICAL INFORMATION                                    */}
        {/* ======================================================== */}
        <div
          className="footer-practical-bar"
          style={{
            paddingTop: 'clamp(2rem, 3.5vw, 3rem)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
            fontSize: '0.9375rem',
          }}
        >
          {/* Location */}
          <div className="footer-item-location">
            <span
              className="footer-col-label"
              style={{
                color: 'rgba(250, 247, 242, 0.5)',
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '0.25rem',
              }}
            >
              LOCATION
            </span>
            <span className="footer-col-value" style={{ color: '#FAF7F2', fontWeight: 500, display: 'block' }}>
              42 Elmwood Ave, Maplewood
            </span>
          </div>

          {/* Hours */}
          <div className="footer-item-hours">
            <span
              className="footer-col-label"
              style={{
                color: 'rgba(250, 247, 242, 0.5)',
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '0.25rem',
              }}
            >
              HOURS
            </span>
            <span className="footer-col-value" style={{ color: '#FAF7F2', fontWeight: 500, display: 'block' }}>
              Mon–Fri 7:30–9:00 • Sat–Sun 8:00–10:00
            </span>
          </div>

          {/* Phone */}
          <div className="footer-item-contact">
            <span
              className="footer-col-label"
              style={{
                color: 'rgba(250, 247, 242, 0.5)',
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '0.25rem',
              }}
            >
              CONTACT
            </span>
            <a
              href="tel:5552348901"
              className="footer-col-value"
              style={{
                color: '#FAF7F2',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'color 0.2s ease',
                minHeight: '44px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-caramel)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#FAF7F2')}
            >
              (555) 234-8901
            </a>
          </div>

          {/* Instagram */}
          <div className="footer-item-social">
            <span
              className="footer-col-label"
              style={{
                color: 'rgba(250, 247, 242, 0.5)',
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '0.25rem',
              }}
            >
              SOCIAL
            </span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-col-value"
              style={{
                color: 'var(--accent-caramel)',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'opacity 0.2s ease',
                minHeight: '44px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              @cornerstone.cafe
            </a>
          </div>

          {/* Back to Top */}
          <div className="footer-item-top">
            <button
              ref={backToTopBtnRef}
              onClick={scrollToTop}
              aria-label="Back to top of page"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#FAF7F2',
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.65rem 1.35rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                cursor: 'pointer',
                minHeight: '44px',
                transition: 'background-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-caramel)';
                e.currentTarget.style.color = '#140E0A';
                if (backToTopArrowRef.current) {
                  backToTopArrowRef.current.style.transform = 'translateY(-3px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = '#FAF7F2';
                if (backToTopArrowRef.current) {
                  backToTopArrowRef.current.style.transform = 'translateY(0)';
                }
              }}
            >
              <span ref={backToTopTextRef} style={{ display: 'inline-block' }}>
                Back to top
              </span>
              <span
                ref={backToTopArrowRef}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'transform 0.22s ease-out',
                }}
              >
                <ArrowUp size={14} />
              </span>
            </button>
          </div>
        </div>

        {/* Minimal Copyright */}
        <div
          style={{
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(250, 247, 242, 0.06)',
            fontSize: '0.75rem',
            color: 'rgba(250, 247, 242, 0.4)',
            letterSpacing: '0.06em',
          }}
        >
          © {CURRENT_YEAR} THE CORNERSTONE CAFÉ • A LIVING NEIGHBORHOOD POSTER
        </div>
      </div>

      <style>{`
        @keyframes steamFloat {
          0%, 100% {
            stroke-dashoffset: 0;
            opacity: 0.3;
          }
          50% {
            stroke-dashoffset: 40;
            opacity: 0.6;
          }
        }
        .steam-path-1 {
          stroke-dasharray: 200;
          animation: steamFloat 6s ease-in-out infinite;
        }
        .steam-path-2 {
          stroke-dasharray: 200;
          animation: steamFloat 7s ease-in-out infinite 1s;
        }

        /* Mobile Footer Hierarchy & Typography Safety */
        @media (max-width: 768px) {
          .footer-heading {
            font-size: clamp(3.2rem, 13.8vw, 6.2rem) !important;
            line-height: 0.88 !important;
          }
          .footer-title-wrap {
            margin-bottom: 2.75rem !important;
          }
          .footer-practical-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
          .footer-steam-accent {
            display: none !important;
          }
          .footer-item-top {
            width: 100% !important;
            margin-top: 0.5rem !important;
          }
          .footer-item-top button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </footer>
  );
};
