import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface CanvasScrubProps {
  frameCount: number;
  framePath: (index: number) => string;
  scrollLength?: string;
  className?: string;
  children?: (progress: number) => React.ReactNode;
  id?: string;
  ariaLabel?: string;
  overlayGradient?: string;
}

export const CanvasScrub: React.FC<CanvasScrubProps> = ({
  frameCount,
  framePath,
  scrollLength = '280vh',
  className = '',
  children,
  id,
  ariaLabel = 'Interactive scrub video',
  overlayGradient = 'radial-gradient(ellipse at center, rgba(16, 12, 10, 0.0) 0%, rgba(16, 12, 10, 0.35) 100%)',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentRenderedFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const lastProgressRef = useRef<number>(0);

  const [currentProgress, setCurrentProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  // Check reduced motion changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Render a specific frame onto canvas with cover aspect ratio
  const drawFrame = useCallback((frameIndex: number, force = false) => {
    // Prevent redundant canvas painting of identical frame
    if (!force && lastDrawnFrameRef.current === frameIndex) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    if (cw === 0 || ch === 0 || iw === 0 || ih === 0) return;

    // Direct Cover scale formula specified:
    // scale = Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight)
    const scale = Math.max(cw / iw, ch / ih);
    // Add 2px safety padding to completely cover subpixel canvas edges
    const renderW = Math.ceil(iw * scale) + 2;
    const renderH = Math.ceil(ih * scale) + 2;
    const offsetX = Math.floor((cw - renderW) / 2);
    const offsetY = Math.floor((ch - renderH) / 2);

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    lastDrawnFrameRef.current = frameIndex;
  }, []);

  // Preload and decode frames efficiently
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = framePath(i);
      
      // Decode asynchronously where supported to prevent main thread hitches during scrub
      if ('decode' in img) {
        img.decode().catch(() => {
          // Fallback if browser decode errors or aborts
        });
      }

      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          drawFrame(0, true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, [frameCount, framePath, drawFrame]);

  // Helper to parse scroll length into physical pixel distance with responsive scaling
  const getScrubDistance = (length?: string | number): number => {
    let base = window.innerHeight * 2.5;
    if (typeof length === 'number') {
      base = window.innerHeight * length;
    } else if (typeof length === 'string' && length.endsWith('vh')) {
      base = window.innerHeight * (parseFloat(length) / 100);
    }

    // Breakpoint-specific distance scaling:
    // Desktop (>= 1280px): 100% locked approved behaviour
    // Tablet (768px - 1279px): ~80%
    // Mobile (< 768px): ~60%
    if (window.innerWidth < 768) {
      return base * 0.6;
    }
    if (window.innerWidth < 1280) {
      return base * 0.8;
    }
    return base;
  };

  const getNavHeight = (): number => {
    if (typeof document === 'undefined') return 0;
    const header = document.querySelector('header') || document.querySelector('.navbar-header');
    return header ? Math.round(header.getBoundingClientRect().height) : 0;
  };

  // Handle canvas sizing for high DPI screens without redundant clears
  // Caps DPR to 1.5 on mobile (< 768px) to conserve GPU memory while keeping retina fidelity
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const stage = pinRef.current;
    if (!canvas || !stage) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    const navH = getNavHeight();
    const w = stage.clientWidth || window.innerWidth;
    const h = stage.clientHeight || Math.ceil(window.innerHeight - navH);

    const targetW = Math.round(w * dpr);
    const targetH = Math.round(h * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      drawFrame(currentRenderedFrameRef.current, true);
    }
  }, [drawFrame]);

  // Keep stage height matched to viewport minus navbar
  useEffect(() => {
    const updateStageHeight = () => {
      if (pinRef.current) {
        const navH = getNavHeight();
        const availableH = Math.ceil(window.innerHeight - navH);
        pinRef.current.style.height = `${availableH}px`;
        pinRef.current.style.minHeight = `${availableH}px`;
        pinRef.current.style.maxHeight = `${availableH}px`;
        resizeCanvas();
      }
    };

    updateStageHeight();

    let debounceTimer: ReturnType<typeof setTimeout>;
    const onResizeDebounced = () => {
      updateStageHeight();
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        updateStageHeight();
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', onResizeDebounced);
    window.addEventListener('orientationchange', onResizeDebounced);
    return () => {
      clearTimeout(debounceTimer);
      window.removeEventListener('resize', onResizeDebounced);
      window.removeEventListener('orientationchange', onResizeDebounced);
    };
  }, [resizeCanvas]);

  // GSAP ScrollTrigger Setup: Pin scrub stage directly under navbar with single source of truth
  useEffect(() => {
    if (prefersReducedMotion) return;

    const stage = pinRef.current;
    if (!stage) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stage,
        start: () => `top top+=${getNavHeight()}`,
        end: () => `+=${getScrubDistance(scrollLength)}`,
        pin: stage,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          currentRenderedFrameRef.current = 0;
          drawFrame(0, true);
        },
        onLeaveBack: () => {
          currentRenderedFrameRef.current = 0;
          drawFrame(0, true);
          setCurrentProgress(0);
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const velocity = self.getVelocity();
          const prevProgress = lastProgressRef.current;
          const progressDelta = progress - prevProgress;
          const absDelta = Math.abs(progressDelta);
          const absVelocity = Math.abs(velocity);

          // 1. IGNORE MICRO SCROLL MOVEMENT (Subpixel float jitter filter)
          if (absDelta < 0.0005 && absVelocity < 8) {
            return;
          }

          lastProgressRef.current = progress;

          const maxFrame = frameCount - 1;
          const rawFrame = progress * maxFrame;
          const currentFrame = currentRenderedFrameRef.current;

          let targetFrame = currentFrame;

          // Absolute boundary snapping
          if (progress <= 0.001) {
            targetFrame = 0;
          } else if (progress >= 0.999) {
            targetFrame = maxFrame;
          } else {
            // 2. FRAME HYSTERESIS / DEAD-ZONE LOGIC
            if (progressDelta > 0) {
              if (rawFrame >= currentFrame + 0.65) {
                targetFrame = Math.min(Math.floor(rawFrame), maxFrame);
              }
            } else if (progressDelta < 0) {
              if (rawFrame <= currentFrame - 0.65) {
                targetFrame = Math.max(Math.ceil(rawFrame), 0);
              }
            }
          }

          // 3. IDEMPOTENT DRAW GUARD: Don't redraw identical frame
          if (targetFrame !== currentRenderedFrameRef.current) {
            currentRenderedFrameRef.current = targetFrame;
            drawFrame(targetFrame);
          }

          // Update child text state
          setCurrentProgress(progress);
        },
      });
    }, stage);

    return () => ctx.revert();
  }, [frameCount, drawFrame, prefersReducedMotion, scrollLength]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`canvas-scrub-container relative w-full ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        margin: 0,
        padding: 0,
        backgroundColor: 'inherit',
      }}
    >
      <div
        ref={pinRef}
        className="canvas-scrub-pin scrub-stage w-full overflow-hidden flex items-center justify-center"
        style={{
          height: 'calc(100svh - var(--nav-height, 0px))',
          minHeight: 'calc(100svh - var(--nav-height, 0px))',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
          backgroundColor: 'inherit',
        }}
      >
        <canvas
          ref={canvasRef}
          aria-label={ariaLabel}
          className="scrub-media"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            margin: 0,
            padding: 0,
          }}
        />

        {/* Cinematic Subtle Vignette - Preserves natural footage warmth */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: overlayGradient,
            pointerEvents: 'none',
          }}
        />

        {/* Dynamic children (overlays in negative space) */}
        {children && (
          <div
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
