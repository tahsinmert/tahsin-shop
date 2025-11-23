<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import Preloader from '$lib/components/Preloader.svelte';
	import CustomCursor from '$lib/components/CustomCursor.svelte';
	import SmartHeader from '$lib/components/SmartHeader.svelte';
	import ShoppingCart from '$lib/components/ShoppingCart.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import NoiseOverlay from '$lib/components/NoiseOverlay.svelte';
	import { initLenis } from '$lib/utils/lenis';

	let { children } = $props();

	onMount(() => {
		// Wait a bit before initializing Lenis to ensure preloader has time
		setTimeout(() => {
			initLenis();
		}, 500);
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/favicon.png" />
	<title>Tahsin Shop - New Gen E-commerce</title>
</svelte:head>

<Preloader />
<PageTransition />
<CustomCursor />
<SmartHeader />
<ShoppingCart />
<NoiseOverlay />

<main class="relative z-10 bg-[#F5F5F5]">
	{@render children()}
</main>
