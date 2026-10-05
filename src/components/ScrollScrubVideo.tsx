import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollScrubVideoProps {
  src: string;
  poster?: string;
  scrollLength?: string; // e.g. '280vh'
  className?: string;
  children?: (progress: number) => React.ReactNode;
  onProgress?: (progress: number) => void;
  ariaLabel?: string;
  id?: string;
}

export const ScrollScrubVideo: React.FC<ScrollScrubVideoProps> = ({
  src,
  poster,
  scrollLength = '280vh',
  className = '',
  children,
  onProgress,
  ariaLabel = 'Interactive video presentation',
  id,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  // References for smooth frame seeking
  const targetTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const updateVideoFrameRef = useRef<() => void>(() => {});

  // Check for reduced motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Update video frame safely using requestAnimationFrame to prevent choppy playback
  const updateVideoFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video || !durationRef.current) return;

    const diff = targetTimeRef.current - video.currentTime;

    // Only update if difference is noticeable
    if (Math.abs(diff) > 0.02) {
      try {
        if ('fastSeek' in video && typeof (video as any).fastSeek === 'function' && Math.abs(diff) > 0.5) {
          (video as any).fastSeek(targetTimeRef.current);
        } else {
          video.currentTime = targetTimeRef.current;
        }
      } catch {
        video.currentTime = targetTimeRef.current;
      }
    }

    rafIdRef.current = requestAnimationFrame(() => {
      updateVideoFrameRef.current();
    });
  }, []);

  useEffect(() => {
    updateVideoFrameRef.current = updateVideoFrame;
  }, [updateVideoFrame]);

  // Video metadata loaded
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;

    durationRef.current = video.duration || 10;
    setIsLoaded(true);

    try {
      video.currentTime = 0.01;
    } catch {
      // Ignore initial seek exception
    }

    ScrollTrigger.refresh();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 1) {
      durationRef.current = video.duration;
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const pinEl = pinRef.current;
    const video = videoRef.current;

    if (!container || !pinEl || !video) return;

    rafIdRef.current = requestAnimationFrame(updateVideoFrame);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinEl,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setCurrentProgress(progress);
          if (onProgress) onProgress(progress);

          if (durationRef.current > 0) {
            targetTimeRef.current = Math.min(
              Math.max(progress * durationRef.current, 0.01),
              durationRef.current - 0.05
            );
          }
        },
      });
    }, container);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      ctx.revert();
    };
  }, [isLoaded, prefersReducedMotion, onProgress, updateVideoFrame]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`scroll-scrub-container relative ${className}`}
      style={{
        height: prefersReducedMotion ? '100vh' : scrollLength,
        position: 'relative',
      }}
    >
      <div
        ref={pinRef}
        className="scroll-scrub-pin w-full h-screen overflow-hidden flex items-center justify-center"
        style={{
          height: '100vh',
          width: '100%',
          position: prefersReducedMotion ? 'relative' : 'sticky',
          top: 0,
          left: 0,
        }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          playsInline
          muted
          preload="metadata"
          aria-label={ariaLabel}
          onLoadedMetadata={handleLoadedMetadata}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Ambient Dark Overlay Gradient for text readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, rgba(30, 24, 20, 0.15) 0%, rgba(30, 24, 20, 0.55) 100%)',
          }}
        />

        {/* Dynamic Children Content (Overlay text & titles) */}
        {children && (
          <div
            className="scroll-scrub-content relative z-10 w-full h-full flex flex-col justify-center items-center pointer-events-none"
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            {children(currentProgress)}
          </div>
        )}
      </div>
    </div>
  );
};
