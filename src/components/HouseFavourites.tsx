import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FavouriteItem {
  number: string;
  meta: string;
  name: string;
  price: string;
  description: string;
  profile: string;
  image: string;
  alt: string;
  aspectRatio: string;
}

const FAVOURITES: FavouriteItem[] = [
  {
    number: '01 / 03',
    meta: 'MORNING FAVOURITE',
    name: 'The Morning Cappuccino',
    price: '$4.75',
    description:
      'Double espresso pulled through Colombia Huila beans, sweet glossy microfoam, and a soft dusting of Peruvian cacao.',
    profile: 'PROFILE / TOFFEE · CRISP RED APPLE · SILK VELVET',
    image: '/assets/images/cappuccino.jpg',
    alt: 'Morning Cappuccino in ceramic cup with cacao dusting',
    aspectRatio: '16 / 11',
  },
  {
    number: '02 / 03',
    meta: 'ALL-DAY CLASSIC',
    name: 'The House Latte',
    price: '$5.25',
    description:
      'Balanced double shot folded into steamed oat or organic whole milk with pouring rosetta art. Smooth, gentle, and rounded.',
    profile: 'MILK / OAT · ALMOND · ORGANIC WHOLE',
    image: '/assets/images/latte.jpg',
    alt: 'House Latte with pouring art',
    aspectRatio: '16 / 10',
  },
  {
    number: '03 / 03',
    meta: 'SLOW POUR',
    name: 'Slow Batch Filter',
    price: '$4.25',
    description:
      'Rotating single-origin batch brewed on Kalita wave. Clean, fragrant, and tea-like clarity from first sip to cold.',
    profile: 'ORIGIN / ETHIOPIA YIRGACHEFFE · JASMINE & PEACH',
    image: '/assets/images/filter-coffee.jpg',
    alt: 'Glass carafe with single-origin filter coffee',
    aspectRatio: '16 / 10',
  },
];

export const HouseFavourites: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leadCardRef = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const leadNoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP (>= 980px): Approved locked entrance and differential scrub
      mm.add('(min-width: 980px)', () => {
        gsap.fromTo(
          [leadCardRef.current, leadNoteRef.current, card2Ref.current, card3Ref.current],
          {
            y: 40,
            opacity: 0,
            scale: 0.985,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.to(card2Ref.current, {
          y: -24,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        });

        gsap.to(card3Ref.current, {
          y: -44,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.3,
          },
        });
      });

      // MOBILE & TABLET (< 980px): Natural subtle reveal per card without horizontal drift
      mm.add('(max-width: 979px)', () => {
        [leadCardRef.current, card2Ref.current, card3Ref.current].forEach((card) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { y: 30, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.75,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="favourites"
      style={{
        backgroundColor: '#F8F4EC', // Sun-washed warm editorial paper tone
        position: 'relative',
        paddingTop: 'clamp(3.5rem, 5vw, 5rem)',
        paddingBottom: 'clamp(2.5rem, 4vw, 3.75rem)',
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
        {/* Magazine Editorial Spread Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            marginBottom: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            borderBottom: '1px solid rgba(45, 33, 24, 0.12)',
            paddingBottom: '1.5rem',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent-caramel)',
                display: 'block',
                marginBottom: '0.6rem',
              }}
            >
              06 / MAGAZINE SPREAD
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(2.25rem, 4.8vw, 4.25rem)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              HOUSE FAVOURITES.
            </h2>
          </div>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
              color: 'var(--text-secondary)',
              maxWidth: '380px',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            The three cups requested by name from early morning regulars until afternoon wrap.
          </p>
        </div>

        {/* ======================================================== */}
        {/* ASYMMETRICAL 12-COLUMN EDITORIAL MAGAZINE GRID           */}
        {/* Left: 7 Columns (Feature 01 + Roaster Note)              */}
        {/* Right: 5 Columns (Stacked Cards 02 & 03)                 */}
        {/* ======================================================== */}
        <div
          className="magazine-spread-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            columnGap: 'clamp(2rem, 4vw, 3.5rem)',
            rowGap: 'clamp(2.5rem, 4vw, 3.5rem)',
            alignItems: 'start',
            position: 'relative',
          }}
        >
          {/* ------------------------------------------------------ */}
          {/* LEFT COLUMN: Lead Feature 01 (Columns 1 to 7)          */}
          {/* ------------------------------------------------------ */}
          <div
            className="magazine-col-lead"
            style={{
              gridColumn: '1 / span 7',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(1.25rem, 2vw, 1.75rem)',
            }}
          >
            {/* Card 01: Lead Hero Editorial Block */}
            <div
              ref={leadCardRef}
              className="favourite-card-box lead-card-box"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Photo Box with Hover Scale & Editorial Framing */}
              <div
                className="favourite-image-wrapper"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: FAVOURITES[0].aspectRatio,
                  overflow: 'hidden',
                  borderRadius: '2px',
                  boxShadow: '0 20px 50px -15px rgba(45, 33, 24, 0.12)',
                  backgroundColor: '#ECE4D8',
                }}
              >
                <img
                  src={FAVOURITES[0].image}
                  alt={FAVOURITES[0].alt}
                  loading="lazy"
                  className="favourite-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>

              {/* Editorial Typography & Metadata */}
              <div style={{ marginTop: '1.25rem', position: 'relative' }}>
                {/* Meta Tag & Functional Index */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-caramel)',
                    }}
                  >
                    {FAVOURITES[0].meta}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {FAVOURITES[0].number}
                  </span>
                </div>

                {/* Name & Price Baseline Connection */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '1rem',
                    borderBottom: '1px solid rgba(45, 33, 24, 0.08)',
                    paddingBottom: '0.45rem',
                    marginBottom: '0.65rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <h3
                      className="font-serif favourite-card-title"
                      style={{
                        fontSize: 'clamp(1.75rem, 2.5vw, 2.35rem)',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.02em',
                        margin: 0,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {FAVOURITES[0].name}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="favourite-card-arrow"
                      style={{
                        color: 'var(--accent-caramel)',
                        opacity: 0,
                        transform: 'translate(-4px, 4px)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                  <span
                    className="font-serif"
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      color: 'var(--accent-caramel)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {FAVOURITES[0].price}
                  </span>
                </div>

                {/* Compact Description */}
                <p
                  style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    margin: '0 0 0.65rem 0',
                    maxWidth: '560px',
                  }}
                >
                  {FAVOURITES[0].description}
                </p>

                {/* Tasting Profile Line */}
                <div
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                  }}
                >
                  {FAVOURITES[0].profile}
                </div>
              </div>
            </div>

            {/* Editorial Companion Tasting Note */}
            <div
              ref={leadNoteRef}
              style={{
                backgroundColor: 'rgba(235, 226, 214, 0.45)',
                borderLeft: '2px solid var(--accent-caramel)',
                padding: '0.75rem 1.15rem',
                borderRadius: '0 2px 2px 0',
              }}
            >
              <p
                className="font-serif"
                style={{
                  fontSize: 'clamp(0.92rem, 1.05vw, 1.02rem)',
                  fontStyle: 'italic',
                  color: 'var(--text-primary)',
                  lineHeight: 1.45,
                  margin: '0 0 0.3rem 0',
                }}
              >
                “Beans rotate fortnightly between two single-estates; sweet dense microfoam never shifts.”
              </p>
              <span
                style={{
                  fontSize: '0.66rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-caramel)',
                }}
              >
                BARISTA LOG · MORNING BAR REFLECTION
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------ */}
          {/* RIGHT COLUMN: Secondary Cards 02 & 03 (Columns 8 to 12) */}
          {/* ------------------------------------------------------ */}
          <div
            className="magazine-col-secondary"
            style={{
              gridColumn: '8 / span 5',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(1.75rem, 3vw, 2.5rem)',
            }}
          >
            {/* Card 02: The House Latte */}
            <div
              ref={card2Ref}
              className="favourite-card-box card-box-02"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Photo Box */}
              <div
                className="favourite-image-wrapper"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: FAVOURITES[1].aspectRatio,
                  overflow: 'hidden',
                  borderRadius: '2px',
                  boxShadow: '0 18px 45px -12px rgba(45, 33, 24, 0.1)',
                  backgroundColor: '#ECE4D8',
                }}
              >
                <img
                  src={FAVOURITES[1].image}
                  alt={FAVOURITES[1].alt}
                  loading="lazy"
                  className="favourite-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>

              {/* Typography */}
              <div style={{ marginTop: '1.25rem', position: 'relative' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-caramel)',
                    }}
                  >
                    {FAVOURITES[1].meta}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {FAVOURITES[1].number}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '1rem',
                    borderBottom: '1px solid rgba(45, 33, 24, 0.08)',
                    paddingBottom: '0.45rem',
                    marginBottom: '0.65rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <h3
                      className="font-serif favourite-card-title"
                      style={{
                        fontSize: 'clamp(1.4rem, 1.85vw, 1.75rem)',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.02em',
                        margin: 0,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {FAVOURITES[1].name}
                    </h3>
                    <ArrowUpRight
                      size={16}
                      className="favourite-card-arrow"
                      style={{
                        color: 'var(--accent-caramel)',
                        opacity: 0,
                        transform: 'translate(-4px, 4px)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                  <span
                    className="font-serif"
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--accent-caramel)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {FAVOURITES[1].price}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    margin: '0 0 0.75rem 0',
                  }}
                >
                  {FAVOURITES[1].description}
                </p>

                <div
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                  }}
                >
                  {FAVOURITES[1].profile}
                </div>
              </div>
            </div>

            {/* Card 03: Slow Batch Filter */}
            <div
              ref={card3Ref}
              className="favourite-card-box card-box-03"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Photo Box */}
              <div
                className="favourite-image-wrapper"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: FAVOURITES[2].aspectRatio,
                  overflow: 'hidden',
                  borderRadius: '2px',
                  boxShadow: '0 18px 45px -12px rgba(45, 33, 24, 0.1)',
                  backgroundColor: '#ECE4D8',
                }}
              >
                <img
                  src={FAVOURITES[2].image}
                  alt={FAVOURITES[2].alt}
                  loading="lazy"
                  className="favourite-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>

              {/* Typography */}
              <div style={{ marginTop: '1.25rem', position: 'relative' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-caramel)',
                    }}
                  >
                    {FAVOURITES[2].meta}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {FAVOURITES[2].number}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '1rem',
                    borderBottom: '1px solid rgba(45, 33, 24, 0.08)',
                    paddingBottom: '0.45rem',
                    marginBottom: '0.65rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <h3
                      className="font-serif favourite-card-title"
                      style={{
                        fontSize: 'clamp(1.4rem, 1.85vw, 1.75rem)',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.02em',
                        margin: 0,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {FAVOURITES[2].name}
                    </h3>
                    <ArrowUpRight
                      size={16}
                      className="favourite-card-arrow"
                      style={{
                        color: 'var(--accent-caramel)',
                        opacity: 0,
                        transform: 'translate(-4px, 4px)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                  <span
                    className="font-serif"
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--accent-caramel)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {FAVOURITES[2].price}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    margin: '0 0 0.75rem 0',
                  }}
                >
                  {FAVOURITES[2].description}
                </p>

                <div
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                  }}
                >
                  {FAVOURITES[2].profile}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Hover Micro-Interactions */
        .favourite-card-box {
          cursor: pointer;
        }
        .favourite-card-box:hover .favourite-img {
          transform: scale(1.04);
        }
        .favourite-card-box:hover .favourite-card-title {
          color: var(--accent-caramel);
        }
        .favourite-card-box:hover .favourite-card-arrow {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
        }

        /* Mobile & Tablet Editorial Asymmetric Sequence */
        @media (max-width: 980px) {
          .magazine-spread-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 3.25rem !important;
          }
          .magazine-col-lead {
            width: 100% !important;
          }
          .magazine-col-secondary {
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 3rem !important;
          }
          /* Card 01: Full width */
          .lead-card-box {
            width: 100% !important;
          }
          /* Card 02: 88% width aligned right */
          .card-box-02 {
            width: 88% !important;
            margin-left: auto !important;
            margin-right: 0 !important;
          }
          /* Card 03: 92% width aligned left */
          .card-box-03 {
            width: 92% !important;
            margin-left: 0 !important;
            margin-right: auto !important;
          }
        }

        @media (max-width: 480px) {
          .card-box-02 {
            width: 92% !important;
          }
          .card-box-03 {
            width: 96% !important;
          }
        }
      `}</style>
    </section>
  );
};
