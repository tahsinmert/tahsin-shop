<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let wrapperRef: HTMLElement;
	let trackRef: HTMLElement;

	const lookbookItems = [
		{
			type: 'image',
			url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=1800&fit=crop&q=90',
			alt: 'Fashion Look 1'
		},
		{
			type: 'text',
			title: 'FALL COLLECTION',
			subtitle: '2024'
		},
		{
			type: 'image',
			url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&h=1800&fit=crop&q=90',
			alt: 'Fashion Look 2'
		},
		{
			type: 'text',
			title: 'LIMITED EDITION',
			subtitle: 'Exclusive Designs'
		},
		{
			type: 'image',
			url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&h=1800&fit=crop&q=90',
			alt: 'Fashion Look 3'
		},
		{
			type: 'image',
			url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1400&h=1800&fit=crop&q=90',
			alt: 'Fashion Look 4'
		},
		{
			type: 'text',
			title: 'NEW SEASON',
			subtitle: 'Discover More'
		},
		{
			type: 'image',
			url: 'https://images.unsplash.com/photo-1506629905607-4c8a0c2c5c3a?w=1400&h=1800&fit=crop&q=90',
			alt: 'Fashion Look 5'
		},
		{
			type: 'image',
			url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&h=1800&fit=crop&q=90',
			alt: 'Fashion Look 6'
		},
		{
			type: 'image',
			url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1400&h=1800&fit=crop&q=90',
			alt: 'Fashion Look 7'
		},
		{
			type: 'text',
			title: 'ESSENTIALS',
			subtitle: 'Timeless Pieces'
		},
		{
			type: 'image',
			url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&h=1800&fit=crop&q=90',
			alt: 'Fashion Look 8'
		},
		{
			type: 'image',
			url: 'https://images.unsplash.com/photo-1551698618-1dfe5f97aeef?w=1400&h=1800&fit=crop&q=90',
			alt: 'Fashion Look 9'
		}
	];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const mm = gsap.matchMedia();

		// Horizontal scroll only on desktop
		mm.add('(min-width: 768px)', () => {
			if (wrapperRef && trackRef) {
				const sections = trackRef.children;
				// Calculate total width: each section is 12.5% of 800% = 100% of viewport
				// We need to move (sections.length - 1) * 100% to show all sections
				const totalSections = sections.length;
				const moveDistance = (totalSections - 1) * 100;

				// Create horizontal scroll animation
				ScrollTrigger.create({
					trigger: wrapperRef,
					pin: true,
					scrub: 1,
					end: '+=7000',
					anticipatePin: 1,
					onUpdate: (self) => {
						const progress = self.progress;
						gsap.set(trackRef, {
							xPercent: -progress * moveDistance
						});
					}
				});

				// Parallax effect for images - move faster than track
				Array.from(sections).forEach((section) => {
					const img = section.querySelector('img');
					if (img) {
						ScrollTrigger.create({
							trigger: wrapperRef,
							start: 'top top',
							end: '+=7000',
							scrub: 1,
							onUpdate: (self) => {
								const progress = self.progress;
								// Images move slightly faster for depth
								gsap.set(img, {
									y: progress * 30,
									scale: 1 + progress * 0.05
								});
							}
						});
					}
				});
			}
		});

		// Mobile: Fade in animation for stacked items
		mm.add('(max-width: 767px)', () => {
			if (trackRef) {
				const items = trackRef.querySelectorAll('.lookbook-item');
				gsap.fromTo(
					items,
					{
						opacity: 0,
						y: 50
					},
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						stagger: 0.2,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: trackRef,
							start: 'top 80%',
							toggleActions: 'play none none none'
						}
					}
				);
			}
		});

		return () => {
			mm.revert();
		};
	});
</script>

<div class="min-h-screen bg-[#F5F5F5]">
	<!-- Hero Section -->
	<section class="h-screen flex items-center justify-center px-4">
		<div class="text-center">
			<h1 class="text-5xl md:text-8xl font-bold text-[#0A0A0A] mb-6 leading-[0.9] tracking-tight">
				Lookbook
			</h1>
			<p class="text-lg md:text-xl text-[#0A0A0A]/60 font-light">
				Explore our curated collection
			</p>
		</div>
	</section>

	<!-- Horizontal Scroll Gallery -->
	<section
		bind:this={wrapperRef}
		class="h-screen overflow-hidden bg-[#0A0A0A]"
	>
		<div
			bind:this={trackRef}
			class="flex md:flex-row flex-col h-full md:w-[1300%] w-full"
		>
			{#each lookbookItems as item, index (index)}
				{#if item.type === 'image'}
					<div class="lookbook-item md:w-[7.69%] w-full h-screen flex-shrink-0 relative overflow-hidden">
						<img
							src={item.url}
							alt={item.alt}
							class="w-full h-full object-cover"
							loading="lazy"
						/>
					</div>
				{:else}
					<div class="lookbook-item md:w-[7.69%] w-full h-screen flex-shrink-0 flex items-center justify-center px-8 md:px-16 bg-[#0A0A0A]">
						<div class="text-center">
							<h2 class="text-4xl md:text-7xl lg:text-9xl font-bold text-[#F5F5F5] mb-4 leading-[0.9] tracking-tight">
								{item.title}
							</h2>
							<p class="text-lg md:text-xl text-[#F5F5F5]/60 font-light uppercase tracking-wider">
								{item.subtitle}
							</p>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</section>

	<!-- Closing Section -->
	<section class="h-screen flex items-center justify-center px-4 bg-[#F5F5F5]">
		<div class="text-center max-w-2xl">
			<h2 class="text-4xl md:text-6xl font-bold text-[#0A0A0A] mb-6">
				Shop the Collection
			</h2>
			<a
				href="/#products"
				class="inline-block px-8 py-4 bg-[#0A0A0A] text-[#F5F5F5] text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
				data-cursor-text="SHOP"
			>
				View Products
			</a>
		</div>
	</section>
</div>

