import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DrinkItem {
  number: string;
  name: string;
  shortName: string;
  price: string;
  description: string;
  descriptors: string;
  image: string;
  bgTone: string;
  textColor: string;
  secondaryColor: string;
  accentColor: string;
  mutedColor: string;
  isDark: boolean;
  targetHeight: string;
  offsetX: string;
  offsetY: string;
  scale: number;
  glowColor: string;
}

const FEATURED_DRINKS: DrinkItem[] = [
  {
    number: '01',
    name: 'Morning Cappuccino',
    shortName: 'CAPPUCCINO',
    price: '$4.75',
    description: 'Double espresso, silky textured whole milk, and a soft pillow of foam dusted with toasted cacao.',
    descriptors: 'CREAMY  •  TOASTED COCOA  •  VELVETY',
    image: '/assets/images/counter-cappuccino-obj.png',
    bgTone: '#FAF5EE', // warm ivory / soft cocoa
    textColor: '#231C18',
    secondaryColor: '#584D44',
    accentColor: '#C47D3B',
    mutedColor: 'rgba(35, 28, 24, 0.4)',
    isDark: false,
    targetHeight: 'clamp(375px, 52vh, 575px)',
    offsetX: '16px', // center-right
    offsetY: '0px',
    scale: 1.0,
    glowColor: 'rgba(196, 125, 59, 0.08)',
  },
  {
    number: '02',
    name: 'The House Latte',
    shortName: 'LATTE',
    price: '$5.25',
    description: 'Freshly pulled espresso folded with sweet steamed milk and delicate pouring rosetta art.',
    descriptors: 'SMOOTH  •  SWEET CARAMEL  •  MELLOW',
    image: '/assets/images/counter-latte-obj.png',
    bgTone: '#F4EDE1', // lighter oat / cream
    textColor: '#231C18',
    secondaryColor: '#5C5046',
    accentColor: '#B87232',
    mutedColor: 'rgba(35, 28, 24, 0.4)',
    isDark: false,
    targetHeight: 'clamp(395px, 55vh, 610px)', // slightly taller composition
    offsetX: '0px',
    offsetY: '-14px', // slightly higher
    scale: 1.03,
    glowColor: 'rgba(184, 114, 50, 0.07)',
  },
  {
    number: '03',
    name: 'Double Espresso',
    shortName: 'ESPRESSO',
    price: '$3.75',
    description: 'A concentrated double ristretto extraction crowned with thick, glossy hazelnut-amber crema.',
    descriptors: 'BOLD  •  DARK CHOCOLATE  •  MOLASSES',
    image: '/assets/images/counter-espresso-obj.png',
    bgTone: '#18110D', // deep roast brown
    textColor: '#FAF7F2', // warm ivory
    secondaryColor: '#BCB2A7',
    accentColor: '#E5AF78', // muted caramel
    mutedColor: 'rgba(250, 247, 242, 0.45)',
    isDark: true,
    targetHeight: 'clamp(410px, 57vh, 635px)', // center and visually scaled up dramatically
    offsetX: '0px',
    offsetY: '2px',
    scale: 1.15,
    glowColor: 'rgba(229, 175, 120, 0.12)',
  },
  {
    number: '04',
    name: 'Slow Batch Filter',
    shortName: 'FILTER',
    price: '$4.25',
    description: 'Rotating seasonal single-origin drip served in heat-retaining glass carafes with tasting cup.',
    descriptors: 'CLEAN  •  STONE FRUIT  •  FLORAL',
    image: '/assets/images/counter-filter-obj.png',
    bgTone: '#F7F1E5', // light honey / pale amber
    textColor: '#231C18',
    secondaryColor: '#5A4F44',
    accentColor: '#C67B34',
    mutedColor: 'rgba(35, 28, 24, 0.4)',
    isDark: false,
    targetHeight: 'clamp(375px, 52vh, 575px)',
    offsetX: '-10px', // wider composition using carafe + cup
    offsetY: '0px',
    scale: 1.05,
    glowColor: 'rgba(198, 123, 52, 0.08)',
  },
  {
    number: '05',
    name: 'Spiced Masala Chai',
    shortName: 'CHAI',
    price: '$5.00',
    description: 'Assam black tea slowly simmered with cracked green cardamom, whole cinnamon bark, and crushed clove.',
    descriptors: 'WARMING  •  SPICED  •  COZY',
    image: '/assets/images/counter-chai-obj.png',
    bgTone: '#EFE3D5', // soft cinnamon / muted terracotta
    textColor: '#231C18',
    secondaryColor: '#5C4C42',
    accentColor: '#B96649',
    mutedColor: 'rgba(35, 28, 24, 0.4)',
    isDark: false,
    targetHeight: 'clamp(365px, 50vh, 555px)', // large warm ceramic cup
    offsetX: '12px', // slightly lower/right
    offsetY: '14px',
    scale: 1.02,
    glowColor: 'rgba(185, 102, 73, 0.08)',
  },
];

const FULL_MENU_DATA = [
  {
    category: 'Coffee & Espresso',
    items: [
      { name: 'Double Espresso', price: '$3.75', desc: 'Ristretto extraction with thick crema' },
      { name: 'Americano', price: '$4.00', desc: 'Espresso over hot filtered water' },
      { name: 'Morning Cappuccino', price: '$4.75', desc: 'Equal parts espresso, milk & foam' },
      { name: 'The House Latte', price: '$5.25', desc: 'Silky microfoam with latte art' },
      { name: 'Artisan Flat White', price: '$5.00', desc: 'Double ristretto with velvety texture' },
      { name: 'Slow Batch Filter', price: '$4.25', desc: 'Rotating seasonal single-origin drip' },
      { name: 'Cold Brew Shakerato', price: '$5.25', desc: '18-hour steep shaken over ice' },
    ],
  },
  {
    category: 'Tea & Warm Drinks',
    items: [
      { name: 'Spiced Masala Chai', price: '$5.00', desc: 'House-simmered whole spices & Assam tea' },
      { name: 'Ceremonial Matcha Latte', price: '$5.50', desc: 'First harvest stone-ground Uji matcha' },
      { name: 'Dark Stone Chocolate', price: '$4.95', desc: '70% melted single-origin chocolate' },
      { name: 'London Fog', price: '$5.00', desc: 'Earl Grey, steamed milk & vanilla bean' },
      { name: 'Organic Herbal Teas', price: '$4.25', desc: 'Chamomile blossom, peppermint, sencha' },
    ],
  },
  {
    category: 'Bakery & Morning Pairings',
    items: [
      { name: 'Butter Croissant', price: '$4.50', desc: '100% French butter, flaky & golden' },
      { name: 'Pain au Chocolat', price: '$4.95', desc: 'Valrhona chocolate batons' },
      { name: 'Almond Frangipane', price: '$5.25', desc: 'Twice-baked with toasted almond flakes' },
      { name: 'Cinnamon Morning Bun', price: '$4.75', desc: 'Cardamom sugar & caramelized bottom' },
    ],
  },
];

export const DrinkExplorer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullMenuOpen, setFullMenuOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const getNavHeight = (): number => {
    if (typeof document === 'undefined') return 0;
    const header = document.querySelector('header') || document.querySelector('.navbar-header');
    return header ? Math.round(header.getBoundingClientRect().height) : 0;
  };

  // Keep stage height matched to viewport minus navbar
  useEffect(() => {
    const updateStageHeight = () => {
      if (pinRef.current) {
        const navH = getNavHeight();
        const availableH = Math.round(window.innerHeight - navH);
        pinRef.current.style.height = `${availableH}px`;
        pinRef.current.style.minHeight = `${availableH}px`;
        pinRef.current.style.maxHeight = `${availableH}px`;
      }
    };
    updateStageHeight();
    window.addEventListener('resize', updateStageHeight);
    window.addEventListener('scroll', updateStageHeight, { passive: true });
    return () => {
      window.removeEventListener('resize', updateStageHeight);
      window.removeEventListener('scroll', updateStageHeight);
    };
  }, []);

  // GSAP ScrollTrigger for pinned drink counter with responsive end scroll length
  useEffect(() => {
    if (prefersReducedMotion) return;

    const stage = pinRef.current;
    if (!stage) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const scrollMultiplier = isMobile ? 2.2 : 3.0;

      ScrollTrigger.create({
        id: 'drink-explorer-trigger',
        trigger: stage,
        start: () => `top top+=${getNavHeight()}`,
        end: () => `+=${window.innerHeight * scrollMultiplier}`,
        pin: stage,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => setActiveIndex(0),
        onLeaveBack: () => setActiveIndex(0),
        onUpdate: (self) => {
          const progress = self.progress;
          // Equal scroll window per product:
          // 0.00-0.20 Cappuccino, 0.20-0.40 Latte, 0.40-0.60 Espresso, 0.60-0.80 Filter, 0.80-1.00 Chai
          const index = Math.min(
            Math.floor(progress * FEATURED_DRINKS.length),
            FEATURED_DRINKS.length - 1
          );
          setActiveIndex(index);
        },
      });
    }, stage);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Clickable product rail smooth navigation
  const scrollToDrink = useCallback((index: number) => {
    const trigger = ScrollTrigger.getById('drink-explorer-trigger');
    if (!trigger) return;

    const start = trigger.start;
    const end = trigger.end;
    const targetScroll = start + (end - start) * ((index + 0.5) / FEATURED_DRINKS.length);

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, []);

  const currentDrink = FEATURED_DRINKS[activeIndex];

  return (
    <section
      id="menu"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        margin: 0,
        padding: 0,
        backgroundColor: currentDrink.bgTone,
        color: currentDrink.textColor,
        transition:
          'background-color 0.55s cubic-bezier(0.16, 1, 0.3, 1), color 0.55s ease',
      }}
    >
      {/* Pinned Counter Screen */}
      <div
        ref={pinRef}
        style={{
          width: '100%',
          height: 'calc(100svh - var(--nav-height, 0px))',
          minHeight: 'calc(100svh - var(--nav-height, 0px))',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(0.75rem, 1.6vh, 2rem) 0',
          overflow: 'hidden',
          margin: 0,
          backgroundColor: currentDrink.bgTone,
        }}
      >
        <div className="container" style={{ position: 'relative' }}>
          {/* Top Bar: Header Divider */}
          <div
            className="counter-header-bar"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderBottom: currentDrink.isDark
                ? '1px solid rgba(250, 247, 242, 0.12)'
                : '1px solid rgba(56, 42, 32, 0.1)',
              paddingBottom: '0.85rem',
              marginBottom: 'clamp(0.85rem, 1.8vh, 1.75rem)',
              transition: 'border-color 0.4s ease',
            }}
          >
            {/* Signature Edge Wordmark */}
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: currentDrink.accentColor,
                  display: 'block',
                  marginBottom: '0.2rem',
                  transition: 'color 0.4s ease',
                }}
              >
                WHAT WE’RE POURING
              </span>
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.6rem)',
                  color: currentDrink.textColor,
                  letterSpacing: '-0.03em',
                  margin: 0,
                  lineHeight: 1,
                  transition: 'color 0.4s ease',
                }}
              >
                THE COUNTER.
              </h2>
            </div>

            {/* Understated Full Menu Link */}
            <button
              onClick={() => setFullMenuOpen(true)}
              className="counter-full-menu-btn"
              style={{
                background: 'none',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: currentDrink.textColor,
                cursor: 'pointer',
                padding: '0.4rem 0',
                minHeight: '44px',
                transition: 'color 0.3s ease',
              }}
            >
              <span className="full-menu-label">Full Menu</span>
              <ArrowRight size={15} className="full-menu-arrow" />
            </button>
          </div>

          {/* Master Counter Presentation Stage: 3-Zone Architecture on Desktop, Responsive Split on Mobile */}
          <div
            className="counter-stage-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(260px, 32fr) minmax(380px, 50fr) minmax(130px, 18fr)',
              gap: 'clamp(1rem, 2.2vw, 2rem)',
              alignItems: 'center',
              position: 'relative',
              minHeight: 'clamp(460px, 60vh, 680px)',
            }}
          >
            {/* ZONE 1 (LEFT ~32% on desktop): Editorial Information */}
            <div className="counter-info-zone" style={{ maxWidth: '420px', zIndex: 10 }}>
              {/* Head Block: Index, Title, Price */}
              <div className="counter-info-head">
                {/* Functional Small Index: 01 / 05 */}
                <div
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    color: currentDrink.accentColor,
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.4s ease',
                  }}
                >
                  <span>{currentDrink.number}</span>
                  <span style={{ opacity: 0.35 }}>/</span>
                  <span style={{ opacity: 0.5 }}>05</span>
                </div>

                {/* Title with Physical Menu-Board Overflow Reveal */}
                <div style={{ overflow: 'hidden', minHeight: 'clamp(2.5rem, 4.5vw, 4.25rem)' }}>
                  <h3
                    key={`title-${currentDrink.name}`}
                    className="font-serif menu-title-animate counter-item-name"
                    style={{
                      fontSize: 'clamp(2.25rem, 3.8vw, 3.4rem)',
                      color: currentDrink.textColor,
                      letterSpacing: '-0.025em',
                      lineHeight: 1.08,
                      margin: 0,
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {currentDrink.name}
                  </h3>
                </div>

                {/* Price Line Reveal */}
                <div style={{ overflow: 'hidden', margin: '0.25rem 0 0.85rem' }}>
                  <div
                    key={`price-${currentDrink.price}`}
                    className="font-serif menu-price-animate counter-item-price"
                    style={{
                      fontSize: 'clamp(1.75rem, 2.4vw, 2.2rem)',
                      fontWeight: 600,
                      color: currentDrink.accentColor,
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {currentDrink.price}
                  </div>
                </div>
              </div>

              {/* Body Block: Description, Tasting notes */}
              <div className="counter-info-body">
                {/* One-Line Casual Description with Menu-Board Reveal */}
                <div style={{ overflow: 'hidden', marginBottom: '1.25rem' }}>
                  <p
                    key={`desc-${currentDrink.description}`}
                    className="menu-desc-animate counter-item-desc"
                    style={{
                      fontSize: 'clamp(1rem, 1.15vw, 1.125rem)',
                      color: currentDrink.secondaryColor,
                      lineHeight: 1.6,
                      margin: 0,
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {currentDrink.description}
                  </p>
                </div>

                {/* Spaced Tasting Notes */}
                <div
                  key={`tasting-${currentDrink.descriptors}`}
                  className="menu-tasting-animate counter-item-tasting"
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    color: currentDrink.accentColor,
                    opacity: 0.9,
                    transition: 'color 0.4s ease',
                  }}
                >
                  {currentDrink.descriptors}
                </div>
              </div>
            </div>

            {/* ZONE 2 (CENTER ~50% on desktop): Frameless Hero Beverage Object on Counter */}
            <div
              className="counter-drink-presentation"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: 'clamp(440px, 58vh, 660px)',
              }}
            >
              {/* Beverage Object Container */}
              <div
                key={`drink-container-${currentDrink.name}`}
                className="drink-stage-animate"
                style={{
                  position: 'relative',
                  zIndex: 3,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `translate(${currentDrink.offsetX}, ${currentDrink.offsetY})`,
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <img
                  src={currentDrink.image}
                  alt={currentDrink.name}
                  className={`counter-drink-object ${currentDrink.isDark ? 'is-dark' : ''}`}
                  style={{
                    height: currentDrink.targetHeight,
                    width: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    transform: `scale(${currentDrink.scale})`,
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>
            </div>

            {/* ZONE 3 (RIGHT ~20% on desktop, Bottom horizontal selector on tablet & mobile) */}
            <div
              className="counter-product-rail"
              role="tablist"
              aria-label="Featured drink navigation"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: '1.15rem',
                zIndex: 10,
                paddingLeft: '1.25rem',
                borderLeft: currentDrink.isDark
                  ? '1px solid rgba(250, 247, 242, 0.12)'
                  : '1px solid rgba(56, 42, 32, 0.1)',
                transition: 'border-color 0.4s ease',
              }}
            >
              {FEATURED_DRINKS.map((drink, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={drink.number}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={0}
                    onClick={() => scrollToDrink(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        scrollToDrink(i);
                      }
                    }}
                    aria-label={`Jump to drink ${drink.number}: ${drink.name}`}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0.35rem 0',
                      fontSize: '0.75rem',
                      fontWeight: isActive ? 700 : 500,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: isActive
                        ? currentDrink.accentColor
                        : currentDrink.mutedColor,
                      opacity: isActive ? 1 : 0.4,
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transform: isActive ? 'translateX(4px)' : 'none',
                    }}
                  >
                    {/* Active Thin Indicator Line */}
                    {isActive ? (
                      <span
                        className="counter-rail-indicator"
                        style={{
                          display: 'inline-block',
                          width: '18px',
                          height: '1.5px',
                          backgroundColor: currentDrink.accentColor,
                          borderRadius: '1px',
                          marginRight: '0.1rem',
                        }}
                      />
                    ) : null}
                    <span className="counter-rail-num">{drink.number}</span>
                    <span className="counter-rail-name" style={{ fontSize: '0.6875rem' }}>
                      {drink.shortName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out Full Menu Modal Drawer */}
      {fullMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(26, 20, 17, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 200,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={() => setFullMenuOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '620px',
              height: '100%',
              backgroundColor: 'var(--bg-canvas)',
              overflowY: 'auto',
              padding: 'clamp(1.75rem, 5vw, 3.5rem)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.2)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '1.25rem',
                marginBottom: '2.5rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'var(--accent-caramel)',
                    display: 'block',
                  }}
                >
                  FULL CAFÉ MENU
                </span>
                <h3
                  className="font-serif"
                  style={{
                    fontSize: '1.75rem',
                    color: 'var(--text-primary)',
                    margin: 0,
                  }}
                >
                  The Cornerstone
                </h3>
              </div>

              <button
                onClick={() => setFullMenuOpen(false)}
                aria-label="Close menu drawer"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Categories */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', flex: 1 }}>
              {FULL_MENU_DATA.map((section) => (
                <div key={section.category}>
                  <h4
                    className="font-serif"
                    style={{
                      fontSize: '1.25rem',
                      color: 'var(--accent-caramel)',
                      marginBottom: '1rem',
                      borderBottom: '1px solid var(--border-subtle)',
                      paddingBottom: '0.5rem',
                    }}
                  >
                    {section.category}
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {section.items.map((item) => (
                      <div
                        key={item.name}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                        }}
                      >
                        <div>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>
                            {item.name}
                          </span>
                          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
                            {item.desc}
                          </p>
                        </div>
                        <span
                          className="font-serif"
                          style={{
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            fontSize: '1.05rem',
                            marginLeft: '1rem',
                          }}
                        >
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Note */}
            <div
              style={{
                marginTop: '3rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}
            >
              Complimentary oat, almond, and organic dairy milk options on all drinks. Whole beans roasted fresh weekly available by the bag at the counter.
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Full Menu Link Underline Extension & Arrow Shift */
        .counter-full-menu-btn {
          position: relative;
        }
        .counter-full-menu-btn .full-menu-label {
          position: relative;
        }
        .counter-full-menu-btn .full-menu-label::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1.5px;
          background-color: currentColor;
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .counter-full-menu-btn:hover .full-menu-label::after {
          transform: scaleX(1.18);
        }
        .counter-full-menu-btn .full-menu-arrow {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .counter-full-menu-btn:hover .full-menu-arrow {
          transform: translateX(4px);
        }

        /* Product Beverage Object: Realistic Soft Contact Shadow */
        .counter-drink-object {
          filter: drop-shadow(0 26px 40px rgba(35, 24, 18, 0.28)) drop-shadow(0 8px 16px rgba(35, 24, 18, 0.14));
          will-change: transform, opacity;
        }
        .counter-drink-object.is-dark {
          filter: drop-shadow(0 32px 50px rgba(0, 0, 0, 0.85)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.6));
        }

        /* Physical Menu-Board Line Reveal Animations */
        .menu-title-animate {
          animation: title-board-reveal 0.52s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .menu-price-animate {
          animation: price-board-reveal 0.48s cubic-bezier(0.16, 1, 0.3, 1) 0.04s forwards;
        }
        .menu-desc-animate {
          animation: desc-board-reveal 0.48s cubic-bezier(0.16, 1, 0.3, 1) 0.08s forwards;
        }
        .menu-tasting-animate {
          animation: tasting-board-reveal 0.45s ease 0.12s forwards;
        }
        .drink-stage-animate {
          animation: drink-object-enter 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes title-board-reveal {
          from {
            opacity: 0;
            transform: translateY(110%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes price-board-reveal {
          from {
            opacity: 0;
            transform: translateY(85%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes desc-board-reveal {
          from {
            opacity: 0;
            transform: translateY(60%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes tasting-board-reveal {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 0.92;
            transform: translateY(0);
          }
        }

        @keyframes drink-object-enter {
          from {
            opacity: 0;
            transform: translateY(55px) scale(1.04);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Tablet Presentation (768px - 1023px): 2 Column + Bottom Rail */
        @media (min-width: 768px) and (max-width: 1023px) {
          .counter-stage-grid {
            grid-template-columns: minmax(280px, 1fr) minmax(320px, 1.2fr) !important;
            gap: 1.5rem !important;
            min-height: auto !important;
          }
          .counter-drink-presentation {
            min-height: clamp(340px, 48vh, 480px) !important;
          }
          .counter-drink-object {
            height: clamp(320px, 45vh, 440px) !important;
          }
          .counter-product-rail {
            grid-column: 1 / -1 !important;
            flex-direction: row !important;
            border-left: none !important;
            border-top: 1px solid rgba(56, 42, 32, 0.1) !important;
            padding-left: 0 !important;
            padding-top: 0.85rem !important;
            width: 100% !important;
            justify-content: space-around !important;
          }
        }

        /* Mobile Native Pinned Presentation (< 768px):
           Top: Name & Price -> Center: Drink Visual (~45-60vw) -> Below: Desc & Notes -> Bottom: Horizontal Selector
        */
        @media (max-width: 767px) {
          .counter-header-bar {
            padding-bottom: 0.5rem !important;
            margin-bottom: 0.5rem !important;
          }
          .counter-stage-grid {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 0.5rem !important;
            min-height: auto !important;
            text-align: center !important;
          }
          .counter-info-zone {
            display: contents !important;
          }
          .counter-info-head {
            order: 1 !important;
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          .counter-item-name {
            font-size: clamp(1.6rem, 6.5vw, 2.2rem) !important;
            line-height: 1.1 !important;
          }
          .counter-item-price {
            font-size: clamp(1.3rem, 5vw, 1.7rem) !important;
          }
          .counter-drink-presentation {
            order: 2 !important;
            min-height: clamp(190px, 28vh, 280px) !important;
            height: clamp(190px, 28vh, 280px) !important;
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .counter-drink-object {
            height: clamp(180px, 27vh, 260px) !important;
            max-width: 78vw !important;
          }
          .counter-info-body {
            order: 3 !important;
            width: 100% !important;
            max-width: 380px !important;
            margin: 0 auto !important;
          }
          .counter-item-desc {
            font-size: 0.85rem !important;
            line-height: 1.4 !important;
            margin-bottom: 0.4rem !important;
          }
          .counter-item-tasting {
            font-size: 0.7rem !important;
            letter-spacing: 0.14em !important;
          }
          .counter-product-rail {
            order: 4 !important;
            flex-direction: row !important;
            border-left: none !important;
            border-top: 1px solid rgba(56, 42, 32, 0.1) !important;
            padding-left: 0 !important;
            padding-top: 0.5rem !important;
            width: 100% !important;
            justify-content: space-around !important;
            gap: 0.2rem !important;
          }
          .counter-product-rail button {
            min-height: 44px !important;
            min-width: 44px !important;
            justify-content: center !important;
            padding: 0.35rem 0.2rem !important;
            transform: none !important;
          }
          .counter-rail-name {
            display: none !important;
          }
          .counter-rail-indicator {
            display: none !important;
          }
          .counter-rail-num {
            font-size: 0.875rem !important;
            font-weight: 700 !important;
          }
        }
      `}</style>
    </section>
  );
};
