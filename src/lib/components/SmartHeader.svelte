<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { getLenis } from '$lib/utils/lenis';
  import { cart } from '$lib/stores/cart.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let headerRef: HTMLElement;
  let mobileMenuRef: HTMLElement;
  let lastScrollY = $state(0);
  let isScrollingDown = $state(false);
  let isMobileMenuOpen = $state(false);

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Blur effect on scroll
    ScrollTrigger.create({
      start: 'top -100',
      end: 'bottom bottom',
      onEnter: () => {
        gsap.to(headerRef, {
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          duration: 0.5,
          ease: 'power2.out'
        });
      },
      onLeaveBack: () => {
        gsap.to(headerRef, {
          backdropFilter: 'blur(0px)',
          backgroundColor: 'rgba(245, 245, 245, 0)',
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });

    // Hide/show on scroll direction (works with Lenis)
    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', ({ scroll }: { scroll: number }) => {
        const currentScrollY = scroll;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down
          if (!isScrollingDown) {
            isScrollingDown = true;
            gsap.to(headerRef, {
              y: -100,
              duration: 0.5,
              ease: 'power2.inOut'
            });
          }
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          if (isScrollingDown) {
            isScrollingDown = false;
            gsap.to(headerRef, {
              y: 0,
              duration: 0.5,
              ease: 'power2.inOut'
            });
          }
        }
        
        lastScrollY = currentScrollY;
      });
    } else {
      // Fallback for non-Lenis scroll
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          if (!isScrollingDown) {
            isScrollingDown = true;
            gsap.to(headerRef, {
              y: -100,
              duration: 0.5,
              ease: 'power2.inOut'
            });
          }
        } else if (currentScrollY < lastScrollY) {
          if (isScrollingDown) {
            isScrollingDown = false;
            gsap.to(headerRef, {
              y: 0,
              duration: 0.5,
              ease: 'power2.inOut'
            });
          }
        }
        
        lastScrollY = currentScrollY;
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  });

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    if (mobileMenuRef) {
      if (isMobileMenuOpen) {
        // Show menu
        gsap.set(mobileMenuRef, { display: 'flex' });
        gsap.fromTo(
          mobileMenuRef,
          {
            opacity: 0,
            x: '100%'
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'power3.out'
          }
        );
      } else {
        // Hide menu
        gsap.to(mobileMenuRef, {
          opacity: 0,
          x: '100%',
          duration: 0.3,
          ease: 'power3.in',
          onComplete: () => {
            gsap.set(mobileMenuRef, { display: 'none' });
          }
        });
      }
    }
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
    if (mobileMenuRef) {
      gsap.to(mobileMenuRef, {
        opacity: 0,
        x: '100%',
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(mobileMenuRef, { display: 'none' });
        }
      });
    }
  }
</script>

<header
  bind:this={headerRef}
  class="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6 transition-all duration-500"
>
  <nav class="flex items-center justify-between max-w-7xl mx-auto">
    <a
      href="/"
      class="text-xl md:text-2xl font-bold text-[#0A0A0A] tracking-tight"
      data-cursor-text="HOME"
      onclick={() => closeMobileMenu()}
    >
      TAHSIN
    </a>
    
    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center gap-8">
      <button
        onclick={async () => {
          if ($page.url.pathname === '/') {
            // Already on home page, scroll to products
            const productsSection = document.getElementById('products');
            if (productsSection) {
              productsSection.scrollIntoView({ behavior: 'smooth' });
            }
          } else {
            // Navigate to home page first
            await goto('/');
            // Wait for page to load, then scroll to products
            setTimeout(() => {
              const productsSection = document.getElementById('products');
              if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          }
        }}
        class="text-sm font-medium text-[#0A0A0A] uppercase tracking-wider hover:opacity-60 transition-opacity bg-transparent border-none cursor-pointer"
        data-cursor-text="SHOP"
      >
        Shop
      </button>
      <a
        href="/lookbook"
        class="text-sm font-medium text-[#0A0A0A] uppercase tracking-wider hover:opacity-60 transition-opacity"
        data-cursor-text="LOOKBOOK"
      >
        Lookbook
      </a>
      <a
        href="/manifesto"
        class="text-sm font-medium text-[#0A0A0A] uppercase tracking-wider hover:opacity-60 transition-opacity"
        data-cursor-text="MANIFESTO"
      >
        Manifesto
      </a>
      <button
        onclick={() => cart.openCart()}
        class="text-sm font-medium text-[#0A0A0A] uppercase tracking-wider hover:opacity-60 transition-opacity"
        data-cursor-text="CART"
      >
        Cart ({cart.totalItems})
      </button>
    </div>

    <!-- Mobile Menu Button -->
    <button
      onclick={toggleMobileMenu}
      class="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
      aria-label="Toggle menu"
    >
      <span class="w-full h-0.5 bg-[#0A0A0A] transition-all {isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}"></span>
      <span class="w-full h-0.5 bg-[#0A0A0A] transition-all {isMobileMenuOpen ? 'opacity-0' : ''}"></span>
      <span class="w-full h-0.5 bg-[#0A0A0A] transition-all {isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
    </button>
  </nav>

  <!-- Mobile Menu Overlay -->
  <div
    bind:this={mobileMenuRef}
    class="fixed inset-0 bg-[#F5F5F5] z-[60] md:hidden"
    style="display: none; opacity: 0; transform: translateX(100%)"
  >
    <div class="w-full h-full flex flex-col items-center justify-center gap-12 relative">
      <button
        onclick={async () => {
          closeMobileMenu();
          if ($page.url.pathname === '/') {
            // Already on home page, scroll to products
            setTimeout(() => {
              const productsSection = document.getElementById('products');
              if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }, 300);
          } else {
            // Navigate to home page first
            await goto('/');
            // Wait for page to load, then scroll to products
            setTimeout(() => {
              const productsSection = document.getElementById('products');
              if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          }
        }}
        class="text-4xl font-bold text-[#0A0A0A] uppercase tracking-tight hover:opacity-60 active:opacity-60 transition-opacity bg-transparent border-none cursor-pointer"
      >
        Shop
      </button>
      <a
        href="/lookbook"
        onclick={closeMobileMenu}
        class="text-4xl font-bold text-[#0A0A0A] uppercase tracking-tight hover:opacity-60 active:opacity-60 transition-opacity"
      >
        Lookbook
      </a>
      <a
        href="/manifesto"
        onclick={closeMobileMenu}
        class="text-4xl font-bold text-[#0A0A0A] uppercase tracking-tight hover:opacity-60 active:opacity-60 transition-opacity"
      >
        Manifesto
      </a>
      <button
        onclick={() => {
          cart.openCart();
          closeMobileMenu();
        }}
        class="text-4xl font-bold text-[#0A0A0A] uppercase tracking-tight hover:opacity-60 active:opacity-60 transition-opacity bg-transparent border-none cursor-pointer"
      >
        Cart ({cart.totalItems})
      </button>
      <button
        onclick={closeMobileMenu}
        class="absolute top-8 right-8 text-2xl font-bold text-[#0A0A0A] hover:opacity-60 active:opacity-60 transition-opacity w-12 h-12 flex items-center justify-center"
        aria-label="Close menu"
      >
        ×
      </button>
    </div>
  </div>
</header>

