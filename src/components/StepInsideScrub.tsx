import React from 'react';
import { CanvasScrub } from './CanvasScrub';

export const StepInsideScrub: React.FC = () => {
  const getPhaseOpacity = (progress: number, start: number, peak: number, end: number) => {
    if (progress < start || progress > end) return 0;
    if (progress <= peak) {
      return (progress - start) / (peak - start);
    }
    return 1 - (progress - peak) / (end - peak);
  };

  return (
    <section id="inside" className="relative w-full overflow-hidden bg-[#181310]" style={{ margin: 0, padding: 0 }}>
      <CanvasScrub
        frameCount={120}
        framePath={(index) =>
          `/assets/frames/cafe-entry/frame_${String(index).padStart(3, '0')}.jpg`
        }
        scrollLength="280vh"
        ariaLabel="Cinematic fly-through stepping into the café from the street to interior"
        overlayGradient="radial-gradient(ellipse at center, rgba(16, 12, 10, 0.0) 0%, rgba(16, 12, 10, 0.32) 100%)"
      >
        {(progress) => {
          // Opacities for the 3 natural phases in negative space
          const phase1Opacity = getPhaseOpacity(progress, 0.02, 0.12, 0.28);
          const phase2Opacity = getPhaseOpacity(progress, 0.35, 0.50, 0.65);
          const phase3Opacity = Math.max(0, Math.min(1, (progress - 0.72) / 0.18));

          return (
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                pointerEvents: 'none',
                overflow: 'hidden',
                margin: 0,
                padding: 0,
              }}
            >
              {/* Subtle top indicator in negative space */}
              <div
                style={{
                  position: 'absolute',
                  top: 'clamp(1.5rem, 3.5vh, 2.5rem)',
                  left: 'var(--container-pad)',
                  color: 'rgba(250, 247, 242, 0.75)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  textShadow: '0 2px 10px rgba(0,0,0,0.6)',
                }}
              >
                03 / STEP INSIDE
              </div>

              {/* STATE 01: A PLACE AROUND THE CORNER. */}
              <div
                className="step-state-01"
                style={{
                  position: 'absolute',
                  top: '38%',
                  left: 'var(--container-pad)',
                  maxWidth: '680px',
                  opacity: phase1Opacity,
                  transform: `translateY(${(1 - phase1Opacity) * 20}px)`,
                  transition: 'transform 0.1s ease-out',
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-caramel)',
                    display: 'block',
                    marginBottom: '0.5rem',
                    textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                  }}
                >
                  THE NEIGHBORHOOD
                </span>
                <h2
                  className="font-serif step-title"
                  style={{
                    fontSize: 'clamp(2.75rem, 6vw, 5rem)',
                    color: '#FAF7F2',
                    letterSpacing: '-0.025em',
                    textShadow: '0 4px 28px rgba(0, 0, 0, 0.85)',
                    lineHeight: 1.05,
                  }}
                >
                  A place around <br />
                  the corner.
                </h2>
              </div>

              {/* STATE 02: THE DOOR IS OPEN. */}
              <div
                className="step-state-02"
                style={{
                  position: 'absolute',
                  bottom: '26%',
                  right: 'var(--container-pad)',
                  textAlign: 'right',
                  maxWidth: '540px',
                  opacity: phase2Opacity,
                  transform: `translateY(${(1 - phase2Opacity) * 20}px)`,
                  transition: 'transform 0.1s ease-out',
                  pointerEvents: 'none',
                }}
              >
                <h2
                  className="font-serif step-title"
                  style={{
                    fontSize: 'clamp(2.75rem, 6vw, 5.25rem)',
                    color: '#FAF7F2',
                    letterSpacing: '-0.025em',
                    textShadow: '0 4px 28px rgba(0, 0, 0, 0.85)',
                    lineHeight: 1.05,
                  }}
                >
                  The door is open.
                </h2>
                <p
                  className="step-sub"
                  style={{
                    color: 'rgba(250, 247, 242, 0.9)',
                    fontSize: '1.05rem',
                    marginTop: '0.5rem',
                    textShadow: '0 2px 14px rgba(0, 0, 0, 0.85)',
                  }}
                >
                  Propped wide from 6:30 every morning.
                </p>
              </div>

              {/* STATE 03: COME IN. */}
              <div
                className="step-state-03"
                style={{
                  position: 'absolute',
                  top: '36%',
                  left: 'var(--container-pad)',
                  maxWidth: '580px',
                  opacity: phase3Opacity,
                  transform: `translateY(${(1 - phase3Opacity) * 20}px)`,
                  transition: 'transform 0.1s ease-out',
                  pointerEvents: 'none',
                }}
              >
                <h2
                  className="font-serif step-title"
                  style={{
                    fontSize: 'clamp(3.25rem, 7vw, 6rem)',
                    color: '#FAF7F2',
                    fontStyle: 'italic',
                    letterSpacing: '-0.025em',
                    textShadow: '0 4px 28px rgba(0, 0, 0, 0.85)',
                    lineHeight: 1.05,
                    marginBottom: '0.75rem',
                  }}
                >
                  Come in.
                </h2>
                <p
                  className="step-sub"
                  style={{
                    color: 'rgba(250, 247, 242, 0.9)',
                    fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
                    lineHeight: 1.6,
                    textShadow: '0 2px 14px rgba(0, 0, 0, 0.85)',
                  }}
                >
                  Find a table by the window, breathe in the fresh grind, and step up to the counter.
                </p>
              </div>

              {/* Bottom Subtle Scrub Progress Line */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 'clamp(1.5rem, 3.5vh, 2.5rem)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '120px',
                  height: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
          );
        }}
      </CanvasScrub>

      <style>{`
        @media (max-width: 768px) {
          .step-state-01 {
            top: 28% !important;
            left: 1.25rem !important;
            right: 1.25rem !important;
            max-width: 86vw !important;
          }
          .step-state-02 {
            bottom: 22% !important;
            right: 1.25rem !important;
            left: auto !important;
            max-width: 86vw !important;
          }
          .step-state-03 {
            top: 26% !important;
            left: 1.25rem !important;
            right: 1.25rem !important;
            max-width: 88vw !important;
          }
          .step-title {
            font-size: clamp(2.15rem, 8.5vw, 3.4rem) !important;
            line-height: 1.08 !important;
          }
          .step-sub {
            font-size: 0.9375rem !important;
            line-height: 1.5 !important;
          }
        }
      `}</style>
    </section>
  );
};
