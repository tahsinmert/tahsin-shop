<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { goto } from '$app/navigation';
	import { cart } from '$lib/stores/cart.svelte';
	import FloatingInput from '$lib/components/ui/FloatingInput.svelte';

	let email = $state('');
	let firstName = $state('');
	let lastName = $state('');
	let address = $state('');
	let city = $state('');
	let zipCode = $state('');
	let country = $state('Turkey');
	let cardNumber = $state('');
	let cardName = $state('');
	let expiryDate = $state('');
	let cvv = $state('');
	let isProcessing = $state(false);

	let formRef: HTMLElement;
	let summaryRef: HTMLElement;

	function formatPrice(price: number): string {
		return new Intl.NumberFormat('tr-TR', {
			style: 'currency',
			currency: 'TRY',
			minimumFractionDigits: 0
		}).format(price);
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (isProcessing) return;

		isProcessing = true;

		// Simulate payment processing
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// Clear cart
		cart.clearCart();

		// Redirect to success page
		goto('/checkout/success');
	}

	onMount(() => {
		// Stagger fade-in animation for form fields
		const formFields = formRef?.querySelectorAll('.form-field');
		if (formFields) {
			gsap.fromTo(
				formFields,
				{
					opacity: 0,
					y: 20
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					stagger: 0.1,
					ease: 'power3.out',
					delay: 0.2
				}
			);
		}

		// Fade-in order summary
		if (summaryRef) {
			gsap.fromTo(
				summaryRef,
				{
					opacity: 0,
					x: 20
				},
				{
					opacity: 1,
					x: 0,
					duration: 0.8,
					ease: 'power3.out',
					delay: 0.3
				}
			);
		}
	});
</script>

<div class="min-h-screen bg-[#F5F5F5] py-8 md:py-16">
	<div class="max-w-7xl mx-auto px-4 md:px-8">
		<h1 class="text-4xl md:text-6xl font-bold text-[#0A0A0A] mb-8 md:mb-12">Checkout</h1>

		<div class="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-16">
			<!-- Left Column: Form -->
			<form
				bind:this={formRef}
				onsubmit={handleSubmit}
				class="space-y-8"
			>
				<!-- Contact Info -->
				<section class="form-field space-y-6">
					<h2 class="text-2xl font-bold text-[#0A0A0A] mb-6">Contact Information</h2>
					<FloatingInput
						id="email"
						label="Email"
						type="email"
						bind:value={email}
					/>
				</section>

				<!-- Shipping Address -->
				<section class="form-field space-y-6">
					<h2 class="text-2xl font-bold text-[#0A0A0A] mb-6">Shipping Address</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<FloatingInput
							id="firstName"
							label="First Name"
							bind:value={firstName}
						/>
						<FloatingInput
							id="lastName"
							label="Last Name"
							bind:value={lastName}
						/>
					</div>
					<FloatingInput
						id="address"
						label="Address"
						bind:value={address}
					/>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<FloatingInput
							id="city"
							label="City"
							bind:value={city}
						/>
						<FloatingInput
							id="zipCode"
							label="ZIP Code"
							bind:value={zipCode}
						/>
					</div>
					<FloatingInput
						id="country"
						label="Country"
						bind:value={country}
					/>
				</section>

				<!-- Payment -->
				<section class="form-field space-y-6">
					<h2 class="text-2xl font-bold text-[#0A0A0A] mb-6">Payment</h2>
					<FloatingInput
						id="cardNumber"
						label="Card Number"
						type="text"
						bind:value={cardNumber}
						placeholder="1234 5678 9012 3456"
					/>
					<FloatingInput
						id="cardName"
						label="Cardholder Name"
						bind:value={cardName}
					/>
					<div class="grid grid-cols-2 gap-6">
						<FloatingInput
							id="expiryDate"
							label="Expiry Date"
							type="text"
							bind:value={expiryDate}
							placeholder="MM/YY"
						/>
						<FloatingInput
							id="cvv"
							label="CVV"
							type="text"
							bind:value={cvv}
							placeholder="123"
						/>
					</div>
				</section>

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={isProcessing || cart.items.length === 0}
					class="w-full py-5 bg-[#0A0A0A] text-[#F5F5F5] text-sm font-medium uppercase tracking-wider hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
				>
					{isProcessing ? 'Processing...' : `Pay ${formatPrice(cart.totalPrice)}`}
				</button>
			</form>

			<!-- Right Column: Order Summary (Sticky) -->
			<aside
				bind:this={summaryRef}
				class="lg:sticky lg:top-10 h-fit"
			>
				<div class="bg-[#0A0A0A] text-[#F5F5F5] p-6 md:p-8 rounded-sm">
					<h2 class="text-2xl font-bold mb-6">Order Summary</h2>

					{#if cart.items.length === 0}
						<p class="text-[#F5F5F5]/60">Your cart is empty</p>
					{:else}
						<div class="space-y-4 mb-6">
							{#each cart.items as item (item.id)}
								<div class="flex gap-4 pb-4 border-b border-[#F5F5F5]/10 last:border-0">
									<div class="w-16 h-16 flex-shrink-0 bg-[#F5F5F5]/10 rounded-sm overflow-hidden">
										<img
											src={item.image}
											alt={item.title}
											class="w-full h-full object-cover"
										/>
									</div>
									<div class="flex-1 min-w-0">
										<h3 class="text-sm font-medium text-[#F5F5F5] mb-1 truncate">
											{item.title}
										</h3>
										<p class="text-xs text-[#F5F5F5]/60">
											{formatPrice(item.price)} × {item.quantity}
										</p>
									</div>
								</div>
							{/each}
						</div>

						<div class="pt-4 border-t border-[#F5F5F5]/10">
							<div class="flex items-center justify-between mb-4">
								<span class="text-[#F5F5F5]/60">Subtotal</span>
								<span class="text-[#F5F5F5]">{formatPrice(cart.totalPrice)}</span>
							</div>
							<div class="flex items-center justify-between mb-4">
								<span class="text-[#F5F5F5]/60">Shipping</span>
								<span class="text-[#F5F5F5]">Free</span>
							</div>
							<div class="flex items-center justify-between text-xl font-bold pt-4 border-t border-[#F5F5F5]/10">
								<span>Total</span>
								<span>{formatPrice(cart.totalPrice)}</span>
							</div>
						</div>
					{/if}
				</div>
			</aside>
		</div>
	</div>
</div>

