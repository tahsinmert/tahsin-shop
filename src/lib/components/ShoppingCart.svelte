<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { goto } from '$app/navigation';
  import { cart } from '$lib/stores/cart.svelte';

  let cartRef: HTMLElement;
  let overlayRef: HTMLElement;

  $effect(() => {
    if (cart.isOpen) {
      // Open animation with power3.out easing for smooth luxury feel
      gsap.fromTo(
        cartRef,
        {
          x: '100%'
        },
        {
          x: 0,
          duration: 0.8,
          ease: 'power3.out'
        }
      );

      // Backdrop blur overlay fade in
      gsap.fromTo(
        overlayRef,
        {
          opacity: 0,
          backdropFilter: 'blur(0px)'
        },
        {
          opacity: 1,
          backdropFilter: 'blur(8px)',
          duration: 0.5,
          ease: 'power2.out'
        }
      );
    } else {
      // Close animation
      gsap.to(cartRef, {
        x: '100%',
        duration: 0.6,
        ease: 'power3.in'
      });

      gsap.to(overlayRef, {
        opacity: 0,
        backdropFilter: 'blur(0px)',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  });

  function formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0
    }).format(price);
  }

  function handleOverlayClick() {
    cart.closeCart();
  }
</script>

<!-- Overlay -->
{#if cart.isOpen}
  <div
    bind:this={overlayRef}
    class="fixed inset-0 bg-[#0A0A0A]/40 backdrop-blur-sm z-[100]"
    onclick={handleOverlayClick}
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key === 'Escape' && cart.closeCart()}
  ></div>
{/if}

<!-- Cart Panel -->
<aside
  bind:this={cartRef}
  class="fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#F5F5F5] z-[101] shadow-2xl overflow-y-auto"
  style="transform: translateX(100%)"
>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <header class="flex items-center justify-between p-8 border-b border-[#0A0A0A]/10">
      <h2 class="text-2xl font-bold text-[#0A0A0A]">Cart ({cart.totalItems})</h2>
      <button
        onclick={() => cart.closeCart()}
        class="text-[#0A0A0A] hover:opacity-60 transition-opacity"
        data-cursor-text="CLOSE"
        aria-label="Close cart"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </header>

    <!-- Cart Items -->
    <div class="flex-1 overflow-y-auto p-8">
      {#if cart.items.length === 0}
        <div class="flex flex-col items-center justify-center h-full text-center">
          <p class="text-[#0A0A0A]/60 text-lg mb-4">Your cart is empty</p>
          <button
            onclick={() => cart.closeCart()}
            class="text-sm text-[#0A0A0A] underline hover:opacity-60 transition-opacity"
            data-cursor-text="SHOP"
          >
            Continue Shopping
          </button>
        </div>
      {:else}
        <div class="space-y-6">
          {#each cart.items as item (item.id)}
            <div class="flex gap-4 pb-6 border-b border-[#0A0A0A]/10 last:border-0">
              <div class="w-24 h-24 flex-shrink-0 bg-[#0A0A0A]/5 rounded-sm overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  class="w-full h-full object-cover"
                />
              </div>
              
              <div class="flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="text-sm font-medium text-[#0A0A0A] mb-1">{item.title}</h3>
                  <p class="text-sm text-[#0A0A0A]/60">{formatPrice(item.price)}</p>
                </div>
                
                <div class="flex items-center gap-4 mt-2">
                  <div class="flex items-center gap-2">
                    <button
                      onclick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                      class="w-8 h-8 flex items-center justify-center border border-[#0A0A0A]/20 hover:bg-[#0A0A0A] hover:text-[#F5F5F5] transition-colors"
                      data-cursor-text="-"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span class="text-sm font-medium text-[#0A0A0A] w-8 text-center">{item.quantity}</span>
                    <button
                      onclick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                      class="w-8 h-8 flex items-center justify-center border border-[#0A0A0A]/20 hover:bg-[#0A0A0A] hover:text-[#F5F5F5] transition-colors"
                      data-cursor-text="+"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onclick={() => cart.removeItem(item.id)}
                    class="text-xs text-[#0A0A0A]/60 hover:text-[#0A0A0A] underline transition-colors ml-auto"
                    data-cursor-text="REMOVE"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Footer -->
    {#if cart.items.length > 0}
      <footer class="p-8 border-t border-[#0A0A0A]/10 space-y-4">
        <div class="flex items-center justify-between text-lg">
          <span class="text-[#0A0A0A]/60">Total</span>
          <span class="text-2xl font-bold text-[#0A0A0A]">{formatPrice(cart.totalPrice)}</span>
        </div>
        
        <button
          onclick={() => {
            cart.closeCart();
            goto('/checkout');
          }}
          class="w-full py-4 bg-[#0A0A0A] text-[#F5F5F5] font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
          data-cursor-text="CHECKOUT"
        >
          Checkout
        </button>
        
        <button
          onclick={() => cart.clearCart()}
          class="w-full py-2 text-sm text-[#0A0A0A]/60 hover:text-[#0A0A0A] underline transition-colors"
          data-cursor-text="CLEAR"
        >
          Clear Cart
        </button>
      </footer>
    {/if}
  </div>
</aside>

