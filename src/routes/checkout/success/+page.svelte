<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let titleRef: HTMLElement;
	let messageRef: HTMLElement;
	let buttonRef: HTMLElement;

	onMount(() => {
		// Celebration animation - scale up and fade in
		if (titleRef) {
			gsap.fromTo(
				titleRef,
				{
					scale: 0.5,
					opacity: 0,
					y: 50
				},
				{
					scale: 1,
					opacity: 1,
					y: 0,
					duration: 1,
					ease: 'back.out(1.7)',
					delay: 0.2
				}
			);
		}

		if (messageRef) {
			gsap.fromTo(
				messageRef,
				{
					opacity: 0,
					y: 20
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: 'power3.out',
					delay: 0.6
				}
			);
		}

		if (buttonRef) {
			gsap.fromTo(
				buttonRef,
				{
					opacity: 0,
					y: 20
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: 'power3.out',
					delay: 0.9
				}
			);
		}

		// Confetti-like effect with multiple elements
		for (let i = 0; i < 20; i++) {
			const confetti = document.createElement('div');
			confetti.className = 'fixed w-2 h-2 bg-[#0A0A0A] rounded-full pointer-events-none z-[9999]';
			confetti.style.left = Math.random() * 100 + '%';
			confetti.style.top = '-10px';
			document.body.appendChild(confetti);

			gsap.to(confetti, {
				y: window.innerHeight + 100,
				x: (Math.random() - 0.5) * 200,
				rotation: Math.random() * 360,
				opacity: 0,
				duration: 2 + Math.random(),
				ease: 'power2.out',
				delay: Math.random() * 0.5,
				onComplete: () => {
					confetti.remove();
				}
			});
		}
	});
</script>

<div class="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
	<div class="text-center max-w-2xl">
		<h1
			bind:this={titleRef}
			class="text-6xl md:text-9xl font-bold text-[#0A0A0A] mb-8 leading-[0.9] tracking-tight"
		>
			THANK YOU
		</h1>

		<p
			bind:this={messageRef}
			class="text-xl md:text-2xl text-[#0A0A0A]/60 mb-12 font-light"
		>
			Your order is on its way.
		</p>

		<a
			bind:this={buttonRef}
			href="/"
			class="inline-block px-8 py-4 bg-[#0A0A0A] text-[#F5F5F5] text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
		>
			Back to Shop
		</a>
	</div>
</div>

