import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Coffee } from 'lucide-react';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const dismissedRef = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setIsFading(true);
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  useEffect(() => {
    // 1. Absolute fail-safe: Never block user beyond 4 seconds
    const failSafeTimer = setTimeout(dismiss, 4000);

    // 2. Asset-driven readiness check for critical above-the-fold content:
    // - Hero background video/poster
    // - First visible image / initial frames
    // - Document readiness
    const checkAssets = () => {
      let heroVideoReady = false;
      const heroVideo = document.querySelector('video') as HTMLVideoElement | null;
      if (!heroVideo || heroVideo.readyState >= 2) {
        heroVideoReady = true;
      }

      // Check initial scrub frame
      const testImg = new Image();
      testImg.src = '/assets/frames/cafe-entry/frame_001.jpg';
      const onFrameReady = () => {
        if (heroVideoReady || document.readyState === 'complete') {
          dismiss();
        }
      };

      if (testImg.complete && testImg.naturalWidth > 0) {
        onFrameReady();
      } else {
        testImg.onload = onFrameReady;
        testImg.onerror = onFrameReady;
      }

      // Video event listener if video is not yet ready
      if (heroVideo && heroVideo.readyState < 2) {
        const onVideoReady = () => {
          heroVideoReady = true;
          dismiss();
        };
        heroVideo.addEventListener('loadeddata', onVideoReady, { once: true });
        heroVideo.addEventListener('canplay', onVideoReady, { once: true });
      }

      // Also listen to document load
      if (document.readyState === 'complete') {
        dismiss();
      } else {
        window.addEventListener('load', dismiss, { once: true });
      }
    };

    const mountCheckTimer = setTimeout(checkAssets, 80);

    return () => {
      clearTimeout(failSafeTimer);
      clearTimeout(mountCheckTimer);
    };
  }, [dismiss]);

  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#FAF7F2',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFading ? 0 : 1,
        visibility: isFading ? 'hidden' : 'visible',
        transition: 'opacity 0.4s ease-out, visibility 0.4s ease-out',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#C47D3B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFF',
          boxShadow: '0 8px 24px rgba(196, 125, 59, 0.3)',
          marginBottom: '1rem',
          animation: 'gentle-pulse 1.4s ease-in-out infinite alternate',
        }}
      >
        <Coffee size={26} strokeWidth={2} />
      </div>

      <span
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.25rem',
          color: '#261E19',
          letterSpacing: '-0.01em',
          marginBottom: '0.25rem',
        }}
      >
        The Cornerstone
      </span>

      <span
        style={{
          fontSize: '0.8125rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#8E8379',
        }}
      >
        Brewing your morning...
      </span>

      <style>{`
        @keyframes gentle-pulse {
          from {
            transform: scale(0.96);
          }
          to {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};
