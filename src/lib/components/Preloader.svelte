<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let preloaderRef: HTMLElement;
	let counterRef: HTMLElement;
	let textRef: HTMLElement;
	let percentage = $state(0);

	onMount(() => {
		// Prevent scrolling during preloader
		document.body.style.overflow = 'hidden';

		// Step 1: Animate counter from 0 to 100
		const counterObj = { value: 0 };
		gsap.to(counterObj, {
			value: 100,
			duration: 2,
			ease: 'power2.out',
			onUpdate: () => {
				percentage = Math.round(counterObj.value);
			},
			onComplete: () => {
				// Step 2: Exit animation
				// Fade out text and counter
				gsap.to([counterRef, textRef], {
					opacity: 0,
					duration: 0.3,
					ease: 'power2.in'
				});

				// Slide background up
				gsap.to(preloaderRef, {
					yPercent: -100,
					duration: 1.2,
					ease: 'expo.inOut',
					onComplete: () => {
						// Re-enable scrolling
						document.body.style.overflow = '';
						// Remove preloader from DOM
						if (preloaderRef) {
							preloaderRef.style.display = 'none';
						}
						// Dispatch event to trigger hero animations
						window.dispatchEvent(new CustomEvent('preloader-complete'));
					}
				});
			}
		});
	});
</script>

<div
	bind:this={preloaderRef}
	class="fixed inset-0 bg-[#0A0A0A] z-[99999] flex flex-col items-center justify-center"
>
	<!-- Percentage Counter -->
	<div
		bind:this={counterRef}
		class="text-[clamp(4rem,15vw,12rem)] font-bold text-[#ffffff] leading-none tracking-tight"
	>
		{percentage}%
	</div>

	<!-- Loading Text -->
	<div
		bind:this={textRef}
		class="absolute bottom-12 right-12 text-sm md:text-base text-[#ffffff]/60 uppercase tracking-widest"
	>
		Loading Experience...
	</div>
</div>

