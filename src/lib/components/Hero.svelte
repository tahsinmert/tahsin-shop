<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let heroRef: HTMLElement;
  let titleRef: HTMLElement;
  let imageRef: HTMLElement;
  
  const title = 'TAHSIN SHOP';
  const titleChars = title.split('');

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Wait for preloader to complete before starting hero animations
    const startAnimations = () => {
      // Character-by-character reveal animation
      const chars = titleRef?.querySelectorAll('.char');
      if (chars) {
        gsap.fromTo(
          chars,
          {
            clipPath: 'inset(100% 0 0 0)',
            y: 50,
            opacity: 0
          },
          {
            clipPath: 'inset(0% 0 0 0)',
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: {
              amount: 1.2,
              from: 'start'
            },
            ease: 'power3.out',
            delay: 0.3
          }
        );
      }
    };

    // Check if preloader already completed
    const preloaderComplete = sessionStorage.getItem('preloader-complete');
    if (preloaderComplete) {
      startAnimations();
    } else {
      // Listen for preloader completion event
      window.addEventListener('preloader-complete', () => {
        sessionStorage.setItem('preloader-complete', 'true');
        startAnimations();
      }, { once: true });
    }

    // Parallax image effect - only on desktop
    const mm = gsap.matchMedia();
    
    mm.add('(min-width: 768px)', () => {
      if (imageRef) {
        ScrollTrigger.create({
          trigger: heroRef,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(imageRef, {
              y: progress * 100,
              scale: 1 + progress * 0.1,
              opacity: 1 - progress * 0.3
            });
          }
        });
      }
    });
  });
</script>

<section
  bind:this={heroRef}
  class="relative h-screen w-full flex items-center justify-center overflow-hidden"
>
  <!-- Parallax Background Image -->
  <div
    bind:this={imageRef}
    class="absolute inset-0 w-full h-full opacity-30"
  >
    <div class="w-full h-full bg-gradient-to-b from-[#0A0A0A]/5 to-transparent"></div>
  </div>

  <!-- Main Title -->
  <div class="relative z-10 px-8">
    <h1
      bind:this={titleRef}
      class="text-[clamp(4rem,15vw,12rem)] font-bold text-[#0A0A0A] leading-[0.9] tracking-tight text-center"
    >
      {#each titleChars as char, i}
        <span class="char inline-block" style="clip-path: inset(100% 0 0 0);">
          {char === ' ' ? '\u00A0' : char}
        </span>
      {/each}
    </h1>
    
    <p class="text-lg md:text-xl text-[#0A0A0A]/60 mt-8 text-center font-light tracking-wider uppercase">
      New Gen E-commerce
    </p>
  </div>

  <!-- Scroll Indicator -->
  <div class="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
    <span class="text-xs text-[#0A0A0A]/40 uppercase tracking-widest">Scroll</span>
    <div class="w-px h-12 bg-[#0A0A0A]/20">
      <div class="w-full h-8 bg-[#0A0A0A] animate-pulse"></div>
    </div>
  </div>
</section>

<style>
  .char {
    display: inline-block;
  }
</style>

