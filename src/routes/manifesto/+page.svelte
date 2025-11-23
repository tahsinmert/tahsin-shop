<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let heroRef: HTMLElement;
	let storyRef: HTMLElement;
	let signatureRef: HTMLElement;

	const manifestoText = [
		'We do not sell products.',
		'We sell feelings. We curate moments. We craft experiences that transcend the ordinary.',
		'In a world saturated with noise, we choose silence. In a marketplace of excess, we embrace minimalism.',
		'Every item in our collection is a statement. A declaration of intent. A piece of a larger narrative.',
		'We believe in the power of design to transform not just spaces, but lives. To elevate not just aesthetics, but consciousness.',
		'This is not commerce. This is culture. This is the future of how we connect with the things that matter.'
	];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Hero: Words fly in from random directions
		if (heroRef) {
			const words = heroRef.querySelectorAll('.word');
			words.forEach((word, index) => {
				const randomX = (Math.random() - 0.5) * 2000;
				const randomY = (Math.random() - 0.5) * 2000;
				const randomRotation = (Math.random() - 0.5) * 360;

				gsap.fromTo(
					word,
					{
						x: randomX,
						y: randomY,
						rotation: randomRotation,
						opacity: 0,
						scale: 0
					},
					{
						x: 0,
						y: 0,
						rotation: 0,
						opacity: 1,
						scale: 1,
						duration: 1.2,
						delay: index * 0.1,
						ease: 'back.out(1.7)'
					}
				);
			});
		}

		// Story: Text reveal on scroll
		if (storyRef) {
			const textBlocks = storyRef.querySelectorAll('.text-block');
			
			textBlocks.forEach((block) => {
				ScrollTrigger.create({
					trigger: block,
					start: 'top 70%',
					end: 'top 30%',
					scrub: 1,
					onEnter: () => {
						gsap.to(block, {
							opacity: 1,
							filter: 'blur(0px)',
							color: '#ffffff',
							duration: 0.8,
							ease: 'power2.out'
						});
					},
					onLeave: () => {
						gsap.to(block, {
							opacity: 0.2,
							filter: 'blur(4px)',
							color: '#666666',
							duration: 0.8,
							ease: 'power2.out'
						});
					},
					onEnterBack: () => {
						gsap.to(block, {
							opacity: 1,
							filter: 'blur(0px)',
							color: '#ffffff',
							duration: 0.8,
							ease: 'power2.out'
						});
					},
					onLeaveBack: () => {
						gsap.to(block, {
							opacity: 0.2,
							filter: 'blur(4px)',
							color: '#666666',
							duration: 0.8,
							ease: 'power2.out'
						});
					}
				});
			});
		}

		// Signature: Fade in on scroll
		if (signatureRef) {
			ScrollTrigger.create({
				trigger: signatureRef,
				start: 'top 80%',
				toggleActions: 'play none none none',
				onEnter: () => {
					gsap.fromTo(
						signatureRef,
						{
							opacity: 0,
							y: 50
						},
						{
							opacity: 1,
							y: 0,
							duration: 1,
							ease: 'power3.out'
						}
					);
				}
			});
		}
	});
</script>

<div class="min-h-screen bg-[#000000] text-[#ffffff]">
	<!-- Hero Section -->
	<section
		bind:this={heroRef}
		class="h-screen flex items-center justify-center px-4"
	>
		<h1 class="text-5xl md:text-7xl lg:text-9xl font-bold text-center leading-[1.1] tracking-tight">
			{#each manifestoText[0].split(' ') as word, i (i)}
				<span class="word inline-block">{word}</span>
				{#if i < manifestoText[0].split(' ').length - 1}
					<span class="word inline-block">&nbsp;</span>
				{/if}
			{/each}
		</h1>
	</section>

	<!-- Story Section -->
	<section
		bind:this={storyRef}
		class="py-32 md:py-48 px-4"
	>
		<div class="max-w-3xl mx-auto space-y-16 md:space-y-24">
			{#each manifestoText.slice(1) as paragraph, i (i)}
				<p
					class="text-block text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed"
					style="opacity: 0.2; filter: blur(4px); color: #666666;"
				>
					{paragraph}
				</p>
			{/each}
		</div>
	</section>

	<!-- Signature Section -->
	<section
		bind:this={signatureRef}
		class="min-h-screen flex items-center justify-center px-4"
	>
		<a
			href="/#products"
			class="group relative inline-block px-12 md:px-24 py-8 md:py-12 text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tight transition-all duration-500 overflow-hidden border-2 border-[#ffffff]"
			data-cursor-text="JOIN"
		>
			<span class="relative z-10 block transition-colors duration-500 text-[#ffffff] group-hover:text-[#000000]">
				JOIN THE MOVEMENT
			</span>
			<span
				class="absolute inset-0 bg-[#ffffff] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0"
			></span>
		</a>
	</section>
</div>

