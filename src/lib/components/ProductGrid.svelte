<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { cart } from '$lib/stores/cart.svelte';
  import { goto } from '$app/navigation';

  interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
  }

  const products: Product[] = [
    {
      id: 1,
      title: 'Minimalist Watch',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop'
    },
    {
      id: 2,
      title: 'Designer Sunglasses',
      price: 599,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop'
    },
    {
      id: 3,
      title: 'Leather Backpack',
      price: 899,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop'
    },
    {
      id: 4,
      title: 'Premium Headphones',
      price: 799,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop'
    },
    {
      id: 5,
      title: 'Luxury Perfume',
      price: 129,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop'
    },
    {
      id: 6,
      title: 'Artisan Coffee Set',
      price: 249,
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=800&fit=crop'
    },
    {
      id: 7,
      title: 'iPhone 15 Pro',
      price: 49999,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop'
    },
    {
      id: 8,
      title: 'MacBook Pro M3',
      price: 89999,
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop'
    },
    {
      id: 9,
      title: 'AirPods Pro',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=800&fit=crop'
    },
    {
      id: 10,
      title: 'iPad Pro',
      price: 39999,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop'
    },
    {
      id: 11,
      title: 'Apple Watch Ultra',
      price: 19999,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop'
    },
    {
      id: 12,
      title: 'AirPods Max',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop'
    },
    {
      id: 13,
      title: 'iMac 24"',
      price: 49999,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop'
    },
    {
      id: 14,
      title: 'Magic Keyboard',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop'
    },
    {
      id: 15,
      title: 'Magic Mouse',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop'
    },
    {
      id: 16,
      title: 'HomePod Mini',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop'
    },
    {
      id: 17,
      title: 'Apple Pencil',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=800&fit=crop'
    },
    {
      id: 18,
      title: 'Studio Display',
      price: 59999,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop'
    }
  ];

  let gridRef: HTMLElement;
  let cardRefs: HTMLElement[] = $state([]);

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Stagger animation for cards on scroll
    cardRefs.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            y: 80,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });
  });

  function handleCardHover(e: MouseEvent, card: HTMLElement) {
    // Only on hover-capable devices
    if (window.matchMedia('(hover: hover)').matches) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(card.querySelector('.product-image'), {
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.out'
      });

      gsap.to(card, {
        y: -10,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }

  function handleCardLeave(card: HTMLElement) {
    // Only on hover-capable devices
    if (window.matchMedia('(hover: hover)').matches) {
      gsap.to(card.querySelector('.product-image'), {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });

      gsap.to(card, {
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }

  function formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0
    }).format(price);
  }
</script>

<section
  id="products"
  bind:this={gridRef}
  class="py-16 md:py-32 px-4 md:px-8 max-w-7xl mx-auto"
>
  <h2 class="text-4xl md:text-6xl lg:text-8xl font-bold text-[#0A0A0A] mb-12 md:mb-20 text-center">
    Products
  </h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
    {#each products as product, index (product.id)}
      <article
        bind:this={cardRefs[index]}
        class="group"
        onmouseenter={(e) => handleCardHover(e, cardRefs[index])}
        onmouseleave={() => handleCardLeave(cardRefs[index])}
      >
        <a
          href="/product/{product.id}"
          class="block"
          data-cursor-text="VIEW"
        >
          <div class="relative overflow-hidden mb-6 aspect-square bg-[#0A0A0A]/5 rounded-sm">
            <img
              src={product.image}
              alt={product.title}
              class="product-image w-full h-full object-cover transition-transform duration-400"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
          </div>
        </a>
        
        <div class="space-y-2">
          <a
            href="/product/{product.id}"
            class="block"
            data-cursor-text="VIEW"
          >
            <h3 class="text-xl font-medium text-[#0A0A0A] tracking-tight hover:opacity-60 transition-opacity">
              {product.title}
            </h3>
          </a>
          <p class="text-lg text-[#0A0A0A]/60 font-light">
            {formatPrice(product.price)}
          </p>
        </div>
        
        <!-- Add to Cart Button -->
        <button
          onclick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            cart.addItem(product);
            cart.openCart();
          }}
          class="mt-4 w-full px-6 py-3 bg-[#0A0A0A] text-[#F5F5F5] text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
          data-cursor-text="ADD"
        >
          Add to Cart
        </button>
      </article>
    {/each}
  </div>
</section>

