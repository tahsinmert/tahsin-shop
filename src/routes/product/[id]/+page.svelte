<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { PageData } from './$types';
	import { cart } from '$lib/stores/cart.svelte';
	import { page } from '$app/stores';

	let { data }: { data: PageData } = $props();

	let product = $derived(data.product);
	let selectedSize = $state(product.sizes[0] || 'M');
	let buttonText = $state('Add to Cart');
	let imageRef: HTMLDivElement;
	let titleRef: HTMLElement;
	let priceRef: HTMLElement;
	let descRef: HTMLElement;
	let controlsRef: HTMLElement;
	let addToCartButtonRef: HTMLButtonElement;

	function formatPrice(price: number): string {
		return new Intl.NumberFormat('tr-TR', {
			style: 'currency',
			currency: 'TRY',
			minimumFractionDigits: 0
		}).format(price);
	}

	function handleAddToCart() {
		// Tactile "squish" animation for physical feedback
		gsap.to(addToCartButtonRef, {
			scaleX: 1.1,
			scaleY: 0.9,
			duration: 0.15,
			ease: 'power2.out',
			yoyo: true,
			repeat: 1,
			onComplete: () => {
				// Bounce back to normal
				gsap.to(addToCartButtonRef, {
					scaleX: 1,
					scaleY: 1,
					duration: 0.2,
					ease: 'elastic.out(1, 0.5)'
				});
			}
		});

		// Add to cart
		cart.addItem({
			id: product.id,
			title: product.title,
			price: product.price,
			image: product.mainImage
		});

		// Change button text to "Added!" for 2 seconds
		buttonText = 'Added!';
		setTimeout(() => {
			buttonText = 'Add to Cart';
		}, 2000);

		// Open cart drawer after a slight delay for smooth UX
		setTimeout(() => {
			cart.openCart();
		}, 400);
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Image scale-in animation
		if (imageRef) {
			gsap.fromTo(
				imageRef,
				{
					scale: 1.1,
					opacity: 0
				},
				{
					scale: 1,
					opacity: 1,
					duration: 1.2,
					ease: 'power3.out',
					delay: 0.2
				}
			);
		}

		// Stagger text animations
		const textElements = [titleRef, priceRef, descRef, controlsRef].filter(Boolean);

		gsap.fromTo(
			textElements,
			{
				y: 40,
				opacity: 0
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.15,
				ease: 'power3.out',
				delay: 0.4
			}
		);
	});
</script>

<div class="min-h-screen bg-[#F5F5F5]">
	<div class="flex flex-col lg:grid lg:grid-cols-[60%_40%] gap-0">
		<!-- Left Column: Sticky Image (60%) - Only sticky on desktop -->
		<div class="lg:sticky lg:top-0 h-[60vh] lg:h-screen lg:overflow-hidden">
			<div
				bind:this={imageRef}
				class="w-full h-full flex items-center justify-center bg-[#0A0A0A]/5"
			>
				<img
					src={product.mainImage}
					alt={product.title}
					class="w-full h-full object-cover"
				/>
			</div>
		</div>

		<!-- Right Column: Product Details (40%) -->
		<div class="px-4 md:px-8 lg:px-24 py-8 md:py-16 lg:py-24 flex flex-col justify-center min-h-screen">
			<div class="max-w-2xl">
				<!-- Title -->
				<h1
					bind:this={titleRef}
					class="text-5xl md:text-7xl lg:text-8xl font-bold text-[#0A0A0A] mb-6 leading-[0.9] tracking-tight"
				>
					{product.title}
				</h1>

				<!-- Price -->
				<div
					bind:this={priceRef}
					class="text-3xl md:text-4xl font-light text-[#0A0A0A] mb-8"
				>
					{formatPrice(product.price)}
				</div>

				<!-- Description -->
				<div bind:this={descRef} class="space-y-6 mb-12">
					<p class="text-lg text-[#0A0A0A]/80 leading-relaxed">
						{product.description}
					</p>
					<p class="text-base text-[#0A0A0A]/60 leading-relaxed">
						{product.longDescription}
					</p>
				</div>

				<!-- Controls -->
				<div bind:this={controlsRef} class="space-y-8">
					<!-- Size Selector -->
					{#if product.sizes.length > 0}
						<div class="space-y-4">
							<label class="text-sm font-medium text-[#0A0A0A] uppercase tracking-wider">
								Size
							</label>
							<div class="flex flex-wrap gap-3">
								{#each product.sizes as size}
									<button
										onclick={() => (selectedSize = size)}
										class="px-6 py-3 border-2 border-[#0A0A0A] text-sm font-medium uppercase tracking-wider transition-all duration-300 {selectedSize ===
										size
											? 'bg-[#0A0A0A] text-[#F5F5F5]'
											: 'bg-transparent text-[#0A0A0A] hover:bg-[#0A0A0A]/10'}"
										data-cursor-text="SELECT"
									>
										{size}
									</button>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Add to Cart Button -->
					<button
						bind:this={addToCartButtonRef}
						onclick={handleAddToCart}
						class="w-full py-5 bg-[#0A0A0A] text-[#F5F5F5] text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
						data-cursor-text="ADD"
					>
						{buttonText}
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

