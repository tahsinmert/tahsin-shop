<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let footerRef: HTMLElement;
	let textRef: HTMLElement;
	let ctaButtonRef: HTMLButtonElement;
	let mouseX = $state(0);
	let mouseY = $state(0);
	let buttonX = $state(0);
	let buttonY = $state(0);

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const mm = gsap.matchMedia();

		// Subtle horizontal drift animation for text - only on desktop
		mm.add('(min-width: 768px)', () => {
			if (textRef) {
				gsap.to(textRef, {
					x: '-10%',
					duration: 15,
					repeat: -1,
					yoyo: true,
					ease: 'sine.inOut'
				});
			}

			// Subtle scale pulse for text
			if (textRef) {
				gsap.to(textRef, {
					scale: 1.02,
					duration: 4,
					repeat: -1,
					yoyo: true,
					ease: 'sine.inOut'
				});
			}
		});

		// Magnetic button effect - only on desktop (hover devices)
		mm.add('(hover: hover)', () => {
			const handleMouseMove = (e: MouseEvent) => {
				mouseX = e.clientX;
				mouseY = e.clientY;

				if (ctaButtonRef) {
					const rect = ctaButtonRef.getBoundingClientRect();
					const centerX = rect.left + rect.width / 2;
					const centerY = rect.top + rect.height / 2;

					const deltaX = mouseX - centerX;
					const deltaY = mouseY - centerY;
					const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

					// Magnetic effect: stronger when closer (200px radius)
					if (distance < 200) {
						const strength = (200 - distance) / 200;
						const moveX = deltaX * strength * 0.15;
						const moveY = deltaY * strength * 0.15;

						gsap.to(ctaButtonRef, {
							x: moveX,
							y: moveY,
							duration: 0.4,
							ease: 'power2.out'
						});
					} else {
						// Return to center when far
						gsap.to(ctaButtonRef, {
							x: 0,
							y: 0,
							duration: 0.6,
							ease: 'power2.out'
						});
					}
				}
			};

			window.addEventListener('mousemove', handleMouseMove);

			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
			};
		});
	});
</script>

<footer
	bind:this={footerRef}
	class="relative w-full min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex items-center justify-center overflow-hidden py-24"
>
	<div class="w-full min-h-screen flex flex-col items-center justify-center px-8 py-24">
		<!-- Massive Typography -->
		<div
			bind:this={textRef}
			class="text-[clamp(3rem,15vw,12rem)] md:text-[clamp(6rem,20vw,15rem)] font-bold uppercase tracking-tighter whitespace-nowrap text-center text-[#F5F5F5] px-4"
			style="transform: translateX(0%)"
		>
			SHOP THE COLLECTION
		</div>

		<!-- Magnetic CTA Button -->
		<button
			bind:this={ctaButtonRef}
			class="mt-8 md:mt-16 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#F5F5F5] text-[#0A0A0A] text-xs md:text-sm font-medium uppercase tracking-wider hover:opacity-90 active:opacity-70 transition-opacity flex items-center justify-center"
			data-cursor-text="CONTACT"
		>
			Contact Us
		</button>

		<!-- Additional Footer Info -->
		<div class="mt-24 text-center space-y-4 text-sm text-[#F5F5F5]/60">
			<p class="uppercase tracking-wider">Tahsin Shop</p>
			<p class="text-xs">© 2025 All rights reserved</p>
		</div>
	</div>
</footer>

