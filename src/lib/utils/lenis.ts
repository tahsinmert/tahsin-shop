import Lenis from 'lenis';

let lenis: Lenis | null = null;

export function initLenis() {
  if (typeof window === 'undefined') return;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Integrate with GSAP ScrollTrigger
  const setupScrollTrigger = async () => {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }
  };
  
  setupScrollTrigger();

  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
}

export function getLenis() {
  return lenis;
}

