import React from 'react';
import { CanvasScrub } from './CanvasScrub';

export const CoffeeCraftScrub: React.FC = () => {
  const getPhaseOpacity = (progress: number, start: number, peak: number, end: number) => {
    if (progress < start || progress > end) return 0;
    if (progress <= peak) {
      return (progress - start) / (peak - start);
    }
    return 1 - (progress - peak) / (end - peak);
  };

  return (
    <section id="craft" className="relative w-full overflow-hidden bg-[#120D0A]" style={{ margin: 0, padding: 0 }}>
      <CanvasScrub
        frameCount={120}
        framePath={(index) =>
          `/assets/frames/coffee-craft/frame_${String(index).padStart(3, '0')}.jpg`
        }
        scrollLength="270vh"
        ariaLabel="Cinematic barista craft preparing espresso and pouring latte art"
        overlayGradient="radial-gradient(ellipse at center, rgba(18, 13, 10, 0.0) 0%, rgba(18, 13, 10, 0.35) 100%)"
      >
        {(progress) => {
          // Dynamic opacities for the 3 graphic type phases
          // Phase 1: GOOD BEANS (0.04 -> 0.30)
          const phase1Opacity = getPhaseOpacity(progress, 0.03, 0.12, 0.30);
          // Phase 2: GOOD MILK (0.33 -> 0.63)
          const phase2Opacity = getPhaseOpacity(progress, 0.33, 0.46, 0.63);
          // Phase 3: STEADY HANDS (0.65 -> 0.94)
          const phase3Opacity = getPhaseOpacity(progress, 0.65, 0.77, 0.94);
          // Final latte moment sign-off: MADE HERE. EVERY DAY. (0.80 -> 1.0)
          const signoffOpacity = Math.max(0, Math.min(1, (progress - 0.80) / 0.14));

          return (
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                pointerEvents: 'none',
                overflow: 'hidden',
              }}
            >
              {/* Minimal Top Brand Anchor */}
              <div
                style={{
                  position: 'absolute',
                  top: 'clamp(1.5rem, 3.5vh, 2.5rem)',
                  left: 'var(--container-pad)',
                  color: 'rgba(250, 247, 242, 0.75)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                  zIndex: 10,
                }}
              >
                05 / THE CRAFT
              </div>

              {/* ---------------------------------------------------- */}
              {/* PHASE 01: GOOD BEANS — Graphic type on upper-left    */}
              {/* ---------------------------------------------------- */}
              <div
                className="craft-phase-01"
                style={{
                  position: 'absolute',
                  top: '8%',
                  left: 'calc(var(--container-pad) - 1vw)',
                  opacity: phase1Opacity,
                  transform: `translate3d(${(1 - phase1Opacity) * -30}px, 0, 0)`,
                  transition: 'transform 0.12s ease-out',
                  zIndex: 5,
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '-20% -30%',
                    background:
                      'radial-gradient(ellipse at center, rgba(16, 12, 9, 0.55) 0%, rgba(16, 12, 9, 0) 70%)',
                    filter: 'blur(16px)',
                    zIndex: -1,
                  }}
                />
                <div
                  className="font-serif select-none craft-display-type"
                  style={{
                    fontSize: 'clamp(4.5rem, 16vw, 15rem)',
                    lineHeight: 0.82,
                    letterSpacing: '-0.04em',
                    color: '#FAF7F2',
                    textShadow: '0 8px 40px rgba(0,0,0,0.85)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div>GOOD</div>
                  <div style={{ color: 'var(--accent-caramel)', fontStyle: 'italic', marginLeft: '0.2em' }}>
                    BEANS.
                  </div>
                </div>
                <div
                  className="craft-sub-meta"
                  style={{
                    marginTop: '1.25rem',
                    fontSize: '0.8125rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(250, 247, 242, 0.8)',
                    paddingLeft: '0.5rem',
                    textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                  }}
                >
                  Dialed in daily • Single origin & house blend
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* PHASE 02: GOOD MILK — Graphic type along right edge  */}
              {/* ---------------------------------------------------- */}
              <div
                className="craft-phase-02"
                style={{
                  position: 'absolute',
                  top: '18%',
                  right: 'clamp(1rem, 3vw, 4rem)',
                  textAlign: 'right',
                  opacity: phase2Opacity,
                  transform: `translate3d(${(1 - phase2Opacity) * 30}px, 0, 0)`,
                  transition: 'transform 0.12s ease-out',
                  zIndex: 5,
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '-20% -30%',
                    background:
                      'radial-gradient(ellipse at center, rgba(16, 12, 9, 0.6) 0%, rgba(16, 12, 9, 0) 70%)',
                    filter: 'blur(16px)',
                    zIndex: -1,
                  }}
                />
                <div
                  className="font-serif select-none craft-display-type"
                  style={{
                    fontSize: 'clamp(4.5rem, 16vw, 15rem)',
                    lineHeight: 0.82,
                    letterSpacing: '-0.04em',
                    color: '#FAF7F2',
                    textShadow: '0 8px 40px rgba(0,0,0,0.85)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div>GOOD</div>
                  <div style={{ color: '#F3E5D4', fontStyle: 'italic' }}>
                    MILK.
                  </div>
                </div>
                <div
                  className="craft-sub-meta"
                  style={{
                    marginTop: '1.25rem',
                    fontSize: '0.8125rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(250, 247, 242, 0.8)',
                    textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                  }}
                >
                  Silky microfoam • Whole, oat & almond
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* PHASE 03: STEADY HANDS — Graphic type lower edge     */}
              {/* ---------------------------------------------------- */}
              <div
                className="craft-phase-03"
                style={{
                  position: 'absolute',
                  bottom: '12%',
                  left: 'calc(var(--container-pad) - 0.5vw)',
                  opacity: phase3Opacity,
                  transform: `translate3d(0, ${(1 - phase3Opacity) * 30}px, 0)`,
                  transition: 'transform 0.12s ease-out',
                  zIndex: 5,
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '-20% -30%',
                    background:
                      'radial-gradient(ellipse at center, rgba(16, 12, 9, 0.6) 0%, rgba(16, 12, 9, 0) 70%)',
                    filter: 'blur(16px)',
                    zIndex: -1,
                  }}
                />
                <div
                  className="font-serif select-none craft-display-type"
                  style={{
                    fontSize: 'clamp(4.5rem, 16vw, 15rem)',
                    lineHeight: 0.82,
                    letterSpacing: '-0.04em',
                    color: '#FAF7F2',
                    textShadow: '0 8px 40px rgba(0,0,0,0.85)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div>STEADY</div>
                  <div style={{ color: 'var(--accent-caramel)', fontStyle: 'italic', marginLeft: '0.15em' }}>
                    HANDS.
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* FINAL LATTE MOMENT: MADE HERE. EVERY DAY. Signoff    */}
              {/* ---------------------------------------------------- */}
              <div
                className="craft-signoff"
                style={{
                  position: 'absolute',
                  bottom: '5.5rem',
                  right: 'var(--container-pad)',
                  opacity: signoffOpacity,
                  transform: `translate3d(0, ${(1 - signoffOpacity) * 15}px, 0)`,
                  transition: 'transform 0.15s ease-out',
                  zIndex: 8,
                  pointerEvents: 'none',
                  textAlign: 'right',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-caramel)',
                      boxShadow: '0 0 10px var(--accent-caramel)',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-caramel)',
                      fontWeight: 600,
                    }}
                  >
                    POURED TO ORDER
                  </span>
                </div>
                <div
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                    color: '#FAF7F2',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    textShadow: '0 2px 16px rgba(0,0,0,0.9)',
                  }}
                >
                  MADE HERE.<br />
                  EVERY DAY.
                </div>
              </div>

              {/* Bottom Subtle Progress Line (Numeric percentage removed) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 'clamp(1.5rem, 3.5vh, 2.5rem)',
                  right: 'var(--container-pad)',
                  display: 'flex',
                  alignItems: 'center',
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    width: '120px',
                    height: '2px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${progress * 100}%`,
                      height: '100%',
                      backgroundColor: 'var(--accent-caramel)',
                      transition: 'width 0.08s linear',
                    }}
                  />
                </div>
              </div>
            </div>
          );
        }}
      </CanvasScrub>

      <style>{`
        @media (max-width: 768px) {
          .craft-display-type {
            font-size: clamp(2.75rem, 11vw, 4.5rem) !important;
            line-height: 0.88 !important;
          }
          .craft-phase-01 {
            top: 14% !important;
            left: 1.25rem !important;
          }
          .craft-phase-02 {
            top: 18% !important;
            right: 1.25rem !important;
          }
          .craft-phase-03 {
            bottom: 15% !important;
            left: 1.25rem !important;
          }
          .craft-signoff {
            bottom: 4rem !important;
            right: 1.25rem !important;
          }
          .craft-sub-meta {
            font-size: 0.75rem !important;
            margin-top: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
};
