import type { PageLoad } from './$types';

export interface ProductDetail {
	id: number;
	title: string;
	price: number;
	description: string;
	longDescription: string;
	mainImage: string;
	images: string[];
	sizes: string[];
	colors: string[];
}

// Mock product data
const mockProducts: ProductDetail[] = [
	{
		id: 1,
		title: 'Minimalist Watch',
		price: 1299,
		description: 'Timeless elegance meets modern design',
		longDescription:
			'Crafted with precision and attention to detail, this minimalist watch embodies the essence of luxury. Featuring a sleek stainless steel case and premium leather strap, it seamlessly blends sophistication with everyday functionality. The minimalist dial design ensures clarity and timeless appeal.',
		mainImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=1200&fit=crop',
			'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=1200&fit=crop'
		],
		sizes: ['S', 'M', 'L'],
		colors: ['Black', 'Silver', 'Gold']
	},
	{
		id: 2,
		title: 'Designer Sunglasses',
		price: 599,
		description: 'Protection meets style',
		longDescription:
			'Premium UV protection combined with cutting-edge design. These sunglasses feature polarized lenses that reduce glare while maintaining crystal-clear vision. The lightweight frame ensures all-day comfort without compromising on durability.',
		mainImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&h=1200&fit=crop'
		],
		sizes: ['One Size'],
		colors: ['Black', 'Tortoise', 'Transparent']
	},
	{
		id: 3,
		title: 'Leather Backpack',
		price: 899,
		description: 'Premium craftsmanship for the modern traveler',
		longDescription:
			'Handcrafted from genuine Italian leather, this backpack combines luxury with functionality. Multiple compartments provide organized storage, while the ergonomic design ensures comfort during extended wear. Perfect for both urban adventures and business travel.',
		mainImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=1200&fit=crop'
		],
		sizes: ['S', 'M', 'L'],
		colors: ['Brown', 'Black', 'Navy']
	},
	{
		id: 4,
		title: 'Premium Headphones',
		price: 799,
		description: 'Immersive sound experience',
		longDescription:
			'Experience audio like never before with our premium headphones. Featuring advanced noise cancellation technology and crystal-clear sound reproduction, these headphones deliver an unparalleled listening experience. The plush ear cushions ensure comfort during extended use.',
		mainImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=1200&fit=crop'
		],
		sizes: ['One Size'],
		colors: ['Black', 'White', 'Silver']
	},
	{
		id: 5,
		title: 'Luxury Perfume',
		price: 129,
		description: 'A scent that defines you',
		longDescription:
			'Crafted by master perfumers, this luxury fragrance captures the essence of sophistication. With notes of bergamot, jasmine, and sandalwood, it creates a lasting impression. The elegant bottle design makes it a statement piece for any collection.',
		mainImage: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&h=1200&fit=crop'
		],
		sizes: ['50ml', '100ml'],
		colors: ['Original']
	},
	{
		id: 6,
		title: 'Artisan Coffee Set',
		price: 249,
		description: 'Elevate your morning ritual',
		longDescription:
			'Hand-selected coffee beans from the finest regions, carefully roasted to perfection. This artisan set includes everything you need to create the perfect cup. The elegant packaging makes it an ideal gift for coffee enthusiasts.',
		mainImage: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=1200&h=1200&fit=crop'
		],
		sizes: ['250g', '500g', '1kg'],
		colors: ['Dark Roast', 'Medium Roast', 'Light Roast']
	},
	{
		id: 7,
		title: 'iPhone 15 Pro',
		price: 49999,
		description: 'The ultimate iPhone experience',
		longDescription:
			'Powered by the A17 Pro chip, the iPhone 15 Pro delivers unprecedented performance and photography capabilities. Featuring a titanium design, ProRAW photography, and Action Button for quick access to your favorite features. Experience the future of mobile technology.',
		mainImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&h=1200&fit=crop'
		],
		sizes: ['128GB', '256GB', '512GB', '1TB'],
		colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
	},
	{
		id: 8,
		title: 'MacBook Pro M3',
		price: 89999,
		description: 'Extreme performance for professionals',
		longDescription:
			'The MacBook Pro with M3 chip redefines what a laptop can do. With up to 22 hours of battery life, stunning Liquid Retina XDR display, and blazing-fast performance, it\'s the ultimate tool for creators, developers, and professionals who demand the best.',
		mainImage: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1200&h=1200&fit=crop'
		],
		sizes: ['14"', '16"'],
		colors: ['Space Gray', 'Silver']
	},
	{
		id: 9,
		title: 'AirPods Pro',
		price: 8999,
		description: 'Active Noise Cancellation reimagined',
		longDescription:
			'Experience immersive sound with Adaptive Audio, Personalized Spatial Audio, and Active Noise Cancellation. The H2 chip delivers breakthrough audio performance, while the new USB-C charging case provides convenience and compatibility.',
		mainImage: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=1200&h=1200&fit=crop'
		],
		sizes: ['One Size'],
		colors: ['White']
	},
	{
		id: 10,
		title: 'iPad Pro',
		price: 39999,
		description: 'The most advanced iPad ever',
		longDescription:
			'Powered by the M2 chip, the iPad Pro delivers desktop-class performance in a portable design. With a stunning Liquid Retina XDR display, support for Apple Pencil, and Magic Keyboard, it transforms into a powerful workstation.',
		mainImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&h=1200&fit=crop'
		],
		sizes: ['11"', '12.9"'],
		colors: ['Space Gray', 'Silver']
	},
	{
		id: 11,
		title: 'Apple Watch Ultra',
		price: 19999,
		description: 'Built for extreme adventures',
		longDescription:
			'The most rugged and capable Apple Watch ever. With a titanium case, precision dual-frequency GPS, and up to 60 hours of battery life, it\'s designed for athletes and adventurers who push the limits.',
		mainImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=1200&fit=crop'
		],
		sizes: ['49mm'],
		colors: ['Titanium']
	},
	{
		id: 12,
		title: 'AirPods Max',
		price: 12999,
		description: 'A perfect balance of exhilarating high-fidelity audio',
		longDescription:
			'Introducing AirPods Max — a perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods. The ultimate personal listening experience is here.',
		mainImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=1200&fit=crop'
		],
		sizes: ['One Size'],
		colors: ['Space Gray', 'Silver', 'Sky Blue', 'Green', 'Pink']
	},
	{
		id: 13,
		title: 'iMac 24"',
		price: 49999,
		description: 'Stunning design meets powerful performance',
		longDescription:
			'The all-in-one for everyone. With the powerful M3 chip, stunning 24-inch 4.5K Retina display, and seven vibrant colors, iMac is a desktop experience unlike any other.',
		mainImage: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1200&h=1200&fit=crop'
		],
		sizes: ['24"'],
		colors: ['Blue', 'Green', 'Pink', 'Silver', 'Yellow', 'Orange', 'Purple']
	},
	{
		id: 14,
		title: 'Magic Keyboard',
		price: 1999,
		description: 'Precision typing, reimagined',
		longDescription:
			'Magic Keyboard features a scissor mechanism beneath each key for stability, precision, and responsiveness. The built-in rechargeable battery powers your keyboard for about a month or more between charges.',
		mainImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&h=1200&fit=crop'
		],
		sizes: ['Standard', 'With Numeric Keypad'],
		colors: ['White', 'Black']
	},
	{
		id: 15,
		title: 'Magic Mouse',
		price: 1299,
		description: 'Multi-Touch on the desktop',
		longDescription:
			'Magic Mouse is wireless and rechargeable, with an optimized foot design that lets it glide smoothly across your desk. The Multi-Touch surface allows you to perform simple gestures such as swiping between web pages and scrolling through documents.',
		mainImage: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1527814050087-3793815479db?w=1200&h=1200&fit=crop'
		],
		sizes: ['One Size'],
		colors: ['White', 'Black']
	},
	{
		id: 16,
		title: 'HomePod Mini',
		price: 2999,
		description: 'Room-filling sound in a compact design',
		longDescription:
			'HomePod mini delivers impressive sound for its size. With Siri built-in, it can help with everyday tasks, control your smart home, and play music throughout your home using AirPlay.',
		mainImage: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&h=1200&fit=crop'
		],
		sizes: ['One Size'],
		colors: ['White', 'Space Gray', 'Yellow', 'Orange', 'Blue']
	},
	{
		id: 17,
		title: 'Apple Pencil',
		price: 3999,
		description: 'Draw, sketch, and write with pixel-perfect precision',
		longDescription:
			'Apple Pencil sets the standard for how drawing, note-taking, and marking up documents should feel. With pixel-perfect precision, tilt and pressure sensitivity, and imperceptible lag, it transforms your iPad into an immersive drawing canvas.',
		mainImage: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=1200&h=1200&fit=crop'
		],
		sizes: ['1st Gen', '2nd Gen'],
		colors: ['White']
	},
	{
		id: 18,
		title: 'Studio Display',
		price: 59999,
		description: 'A stunning 27-inch 5K Retina display',
		longDescription:
			'Studio Display features a 27-inch 5K Retina display with 600 nits of brightness, support for one billion colors, and True Tone technology. With a 12MP Ultra Wide camera, three studio-quality mics, and a six-speaker sound system, it\'s the perfect display for creative professionals.',
		mainImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&h=1200&fit=crop',
		images: [
			'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&h=1200&fit=crop'
		],
		sizes: ['27"'],
		colors: ['Silver']
	}
];

// Default product if ID doesn't exist
const defaultProduct: ProductDetail = mockProducts[0];

export const load: PageLoad = async ({ params }) => {
	const productId = parseInt(params.id);
	const product = mockProducts.find((p) => p.id === productId) || defaultProduct;

	return {
		product
	};
};

