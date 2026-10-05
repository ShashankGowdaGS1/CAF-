import React, { useState, useEffect } from 'react';
import { Coffee, Menu as MenuIcon, X, ArrowUpRight, Phone, Clock, MapPin } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 120px threshold per design specification
      const scrolled = window.scrollY > 120;
      setIsScrolled(scrolled);
      const header = document.querySelector('header');
      if (header) {
        document.documentElement.style.setProperty(
          '--nav-height',
          `${Math.round(header.getBoundingClientRect().height)}px`
        );
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className="navbar-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: isScrolled ? '0.75rem 2rem' : '1.35rem 2rem',
          transition: 'all 0.35s var(--ease-editorial)',
          backgroundColor: isScrolled || mobileMenuOpen ? 'rgba(250, 247, 242, 0.96)' : 'transparent',
          backdropFilter: isScrolled || mobileMenuOpen ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(56, 42, 32, 0.08)' : '1px solid transparent',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1360px',
            margin: '0 auto',
            padding: 0,
          }}
        >
          {/* Brand Logo */}
          <a
            href="#"
            onClick={closeMenu}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              color: 'var(--text-primary)',
              minHeight: '44px',
            }}
            aria-label="The Cornerstone Cafe Home"
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-caramel)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                transition: 'transform 0.25s ease',
                flexShrink: 0,
              }}
              className="logo-mark"
            >
              <Coffee size={16} strokeWidth={2.2} />
            </div>
            <span
              className="font-serif"
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              The Cornerstone
            </span>
          </a>

          {/* Simplified 3-Link Desktop Navigation with underline grow from left */}
          <nav
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
            }}
          >
            <a
              href="#menu"
              style={{
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                opacity: 0.85,
              }}
              className="nav-link"
            >
              Menu
            </a>
            <a
              href="#inside"
              style={{
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                opacity: 0.85,
              }}
              className="nav-link"
            >
              Our Café
            </a>
            <a
              href="#visit"
              style={{
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                opacity: 0.85,
              }}
              className="nav-link"
            >
              Visit
            </a>
          </nav>

          {/* Primary Action Button & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href="#visit"
              className="btn btn-primary nav-desktop-btn"
              style={{
                fontSize: '0.875rem',
                padding: isScrolled ? '0.55rem 1.35rem' : '0.75rem 1.6rem',
                transition: 'all 0.25s ease',
              }}
            >
              <span>Visit Us</span>
            </a>

            {/* Mobile Toggle with comfortable 44x44px touch target */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-panel"
              style={{
                display: 'none',
                minWidth: '44px',
                minHeight: '44px',
                padding: '0.5rem',
                color: 'var(--text-primary)',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
              }}
            >
              {mobileMenuOpen ? <X size={26} /> : <MenuIcon size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Warm Ivory Mobile Menu Sheet with Clip Reveal */}
      <div
        id="mobile-navigation-panel"
        aria-hidden={!mobileMenuOpen}
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'is-open' : ''}`}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--bg-canvas)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'calc(var(--nav-height, 70px) + 1.5rem) 1.75rem 2.5rem',
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Main Nav Links */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            paddingTop: '0.5rem',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent-caramel)',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            NAVIGATION
          </span>

          {[
            { label: 'Menu', href: '#menu', sub: 'What we’re pouring & fresh roasts' },
            { label: 'Our Café', href: '#inside', sub: 'Step inside & experience the atmosphere' },
            { label: 'Craft', href: '#craft', sub: 'Beans, milk & steady hands' },
            { label: 'Visit', href: '#visit', sub: 'Hours, address & direct routes' },
          ].map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="font-serif mobile-nav-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.9rem',
                textDecoration: 'none',
                transition: 'transform 0.2s ease, color 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: 'clamp(1.85rem, 7vw, 2.5rem)',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    color: 'var(--accent-caramel)',
                    letterSpacing: '0.12em',
                  }}
                >
                  0{idx + 1}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                  marginTop: '0.2rem',
                }}
              >
                {item.sub}
              </span>
            </a>
          ))}
        </nav>

        {/* Quick Practical Utility Section */}
        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-medium)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {/* Quick Info Badges */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Clock size={16} color="var(--accent-caramel)" />
              <span>Open today until 9:00 PM</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <MapPin size={16} color="var(--accent-caramel)" />
              <span>42 Elmwood Ave, Maplewood</span>
            </div>
          </div>

          {/* Quick Actions Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              marginTop: '0.5rem',
            }}
          >
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="btn btn-secondary"
              style={{
                fontSize: '0.875rem',
                padding: '0.75rem 1rem',
                minHeight: '44px',
                textAlign: 'center',
                gap: '0.4rem',
              }}
            >
              <span>Directions</span>
              <ArrowUpRight size={15} />
            </a>

            <a
              href="tel:5552348901"
              onClick={closeMenu}
              className="btn btn-secondary"
              style={{
                fontSize: '0.875rem',
                padding: '0.75rem 1rem',
                minHeight: '44px',
                textAlign: 'center',
                gap: '0.4rem',
              }}
            >
              <Phone size={14} />
              <span>Call</span>
            </a>
          </div>

          <a
            href="#visit"
            onClick={closeMenu}
            className="btn btn-primary"
            style={{
              width: '100%',
              minHeight: '48px',
              fontSize: '0.9375rem',
              fontWeight: 600,
              marginTop: '0.25rem',
            }}
          >
            <span>Find Our Table</span>
          </a>
        </div>
      </div>

      <style>{`
        /* Desktop & Breakpoint Rules */
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: inline-flex !important;
          }
        }

        @media (max-width: 580px) {
          .nav-desktop-btn {
            display: none !important;
          }
          .navbar-header {
            padding: 0.85rem 1.25rem !important;
          }
        }

        /* Full Screen Sheet Animation with Vertical Clip Reveal */
        .mobile-menu-overlay {
          clip-path: inset(0% 0% 100% 0%);
          opacity: 0;
          transition: clip-path 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }

        .mobile-menu-overlay.is-open {
          clip-path: inset(0% 0% 0% 0%);
          opacity: 1;
        }

        .mobile-nav-item:active {
          transform: translateX(4px);
        }

        /* Micro-interactions: Underline grows from left */
        .nav-link {
          position: relative;
          padding-bottom: 3px;
          transition: color 0.25s ease, opacity 0.25s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1.5px;
          background-color: var(--accent-caramel);
          transition: width 0.25s var(--ease-editorial);
        }

        .nav-link:hover {
          opacity: 1 !important;
          color: var(--text-primary) !important;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .logo-mark:hover {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
};
