<script lang="ts">
	let { label, type = 'text', id, value = $bindable(''), placeholder = '' } = $props();
	
	let isFocused = $state(false);
	let hasValue = $derived(value.length > 0);
	let shouldFloat = $derived(isFocused || hasValue);
</script>

<div class="relative w-full">
	<input
		{type}
		{id}
		bind:value
		onfocus={() => (isFocused = true)}
		onblur={() => (isFocused = false)}
		class="w-full bg-transparent border-b-2 border-[#0A0A0A]/20 py-4 text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-300"
		placeholder=" "
	/>
	<label
		for={id}
		class="absolute left-0 transition-all duration-300 pointer-events-none {shouldFloat
			? '-top-2 text-xs text-[#0A0A0A]'
			: 'top-4 text-base text-[#0A0A0A]/60'}"
	>
		{label}
	</label>
</div>

