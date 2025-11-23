<script lang="ts">
	// Noise overlay component - adds subtle film grain texture
</script>

<div
	class="fixed inset-0 w-full h-full z-[9999] pointer-events-none opacity-[0.04] mix-blend-overlay"
	style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E'); background-size: 200px 200px; animation: noise 0.3s steps(10) infinite;"
	aria-hidden="true"
></div>

<style>
	@keyframes noise {
		0% {
			background-position: 0 0;
		}
		10% {
			background-position: -20px -20px;
		}
		20% {
			background-position: 20px -40px;
		}
		30% {
			background-position: -40px 20px;
		}
		40% {
			background-position: 40px 40px;
		}
		50% {
			background-position: -60px -20px;
		}
		60% {
			background-position: 60px -60px;
		}
		70% {
			background-position: -80px 40px;
		}
		80% {
			background-position: 80px 80px;
		}
		90% {
			background-position: -100px -40px;
		}
		100% {
			background-position: 100px -100px;
		}
	}
</style>

