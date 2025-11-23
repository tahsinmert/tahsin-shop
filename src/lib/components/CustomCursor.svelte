<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let cursorRef: HTMLDivElement;
  let cursorInnerRef: HTMLDivElement;
  let hoverTextRef: HTMLDivElement;
  let mouseX = $state(0);
  let mouseY = $state(0);
  let cursorX = $state(0);
  let cursorY = $state(0);
  let isHovering = $state(false);
  let hoverText = $state('');

  onMount(() => {
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth cursor follow animation
    let rafId: number;
    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      if (cursorRef) {
        gsap.set(cursorRef, {
          x: cursorX,
          y: cursorY,
          xPercent: -50,
          yPercent: -50
        });
      }
      
      if (hoverTextRef && isHovering) {
        gsap.set(hoverTextRef, {
          x: cursorX,
          y: cursorY,
          xPercent: -50,
          yPercent: -50
        });
      }
      
      rafId = requestAnimationFrame(updateCursor);
    };

    // Handle interactive elements
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor-text]');
      
      if (interactive) {
        isHovering = true;
        hoverText = interactive.getAttribute('data-cursor-text') || 'VIEW';
        gsap.to(cursorRef, {
          scale: 2.5,
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(cursorInnerRef, {
          scale: 0.4,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor-text]');
      
      if (interactive) {
        isHovering = false;
        hoverText = '';
        gsap.to(cursorRef, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(cursorInnerRef, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    
    updateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      cancelAnimationFrame(rafId);
    };
  });
</script>

<div
  bind:this={cursorRef}
  class="fixed top-0 left-0 w-6 h-6 rounded-full bg-[#0A0A0A] pointer-events-none z-[9999] mix-blend-difference hidden md:block"
  style="transform: translate(-50%, -50%)"
>
  <div
    bind:this={cursorInnerRef}
    class="absolute inset-0 rounded-full bg-[#F5F5F5] scale-100"
  ></div>
</div>

{#if isHovering && hoverText}
  <div
    bind:this={hoverTextRef}
    class="fixed top-0 left-0 pointer-events-none z-[9999] text-[#0A0A0A] text-xs font-medium uppercase tracking-wider whitespace-nowrap hidden md:block"
    style="transform: translate(-50%, -50%)"
  >
    {hoverText}
  </div>
{/if}

