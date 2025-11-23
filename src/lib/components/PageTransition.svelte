<script lang="ts">
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { gsap } from 'gsap';

	let curtainRef: HTMLDivElement;
	let isTransitioning = $state(false);

	onMount(() => {
		// Set initial state - curtain should be hidden at the bottom
		if (curtainRef) {
			gsap.set(curtainRef, {
				y: '100%'
			});
		}
	});

	onNavigate((navigation) => {
		// Only animate if navigating to a different page
		if (!navigation.to || !navigation.to.url) return;
		if (navigation.to.url.pathname === navigation.from?.url.pathname) return;

		isTransitioning = true;

		// Create timeline for smooth sequencing
		const tl = gsap.timeline({
			onComplete: () => {
				isTransitioning = false;
			}
		});

		// On Leave: Curtain slides UP from the bottom (covering the screen)
		tl.to(curtainRef, {
			y: '0%',
			duration: 0.6,
			ease: 'power4.inOut'
		});

		// Wait for navigation to complete
		// The navigation happens automatically, we just wait
		tl.to({}, {
			duration: 0.1
		});

		// On Enter: Curtain slides UP away (revealing new page)
		tl.to(curtainRef, {
			y: '-100%',
			duration: 0.6,
			ease: 'power4.inOut'
		});
	});
</script>

<!-- Full-screen curtain for page transitions -->
<div
	bind:this={curtainRef}
	class="fixed inset-0 bg-[#0A0A0A] z-[9999] pointer-events-none"
	style="transform: translateY(100%)"
	aria-hidden="true"
></div>

