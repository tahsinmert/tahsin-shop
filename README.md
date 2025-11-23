<div align="center">

# 🎨 Tahsin Shop

![Tahsin Shop Logo](./static/favicon.png)

> **A high-end, experimental e-commerce frontend that redefines digital commerce through cinematic fluidity and micro-interactions.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://tahsin-shop.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

<!-- Add your high-quality GIF/Banner here -->
<!-- ![Tahsin Shop Banner](./banner.gif) -->

</div>

**Tahsin Shop** is not just an e-commerce site—it's a portfolio masterpiece that showcases the future of web design. Built with cutting-edge technologies and a focus on "vibe" over function, this project demonstrates how emotion and artistry can transform digital commerce into an unforgettable experience.

---

## 🛠️ Tech Stack

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Lenis](https://img.shields.io/badge/Lenis-000000?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

- **SvelteKit** (Svelte 5 / Runes) - Next-generation reactive framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **GSAP** (ScrollTrigger, Flip) - Professional-grade animations
- **Lenis** - Buttery-smooth scrolling
- **Vercel** - Edge-optimized deployment

---

## 💫 The "Vibe" Philosophy

> *"We do not sell products. We sell feelings. We curate moments."*

In a world saturated with cookie-cutter e-commerce experiences, **Tahsin Shop** breaks the mold. This project exists to prove that web design can be more than just functional—it can be **emotional**, **cinematic**, and **memorable**.

Every interaction, every animation, every pixel is crafted to evoke a feeling. From the moment you land on the site, you're not just browsing products; you're experiencing a carefully choreographed digital performance.

**This is not commerce. This is culture.**

---

## ✨ Features Deep Dive

### 🎬 Cinematic Entrance
A custom preloader that sets the stage for the entire experience. Watch as the percentage counter animates from 0-100%, followed by a dramatic curtain reveal using GSAP's `expo.inOut` easing. The entire sequence is synchronized with hero animations, ensuring a seamless first impression.

**Technical Implementation:**
- GSAP proxy objects for smooth counter animation
- Full-screen overlay with `z-index: 99999`
- Body scroll locking during preload
- Event-driven coordination with hero section

### 🌊 Fluid Navigation
Experience true SPA-like navigation without hard refreshes. Page transitions use a full-screen "curtain" div that slides up to cover the screen, waits for content to load, then reveals the new page with cinematic timing.

**Technical Implementation:**
- SvelteKit's `onNavigate` lifecycle hook
- GSAP timeline animations
- Black curtain (`#0A0A0A`) with `yPercent` transforms
- Smooth content loading coordination

### 🎨 Creative Scroll Experiences

#### Horizontal Scroll Lookbook
A gallery section that "locks" the viewport and transforms vertical scrolling into horizontal movement. As you scroll down, the content slides sideways—like walking through an art gallery.

**Technical Implementation:**
- GSAP ScrollTrigger with `pin: true`
- Dynamic track width calculation (`1300%` for 13 sections)
- Parallax effects on images (faster movement for depth)
- `gsap.matchMedia()` for mobile fallback (vertical stack)

#### Parallax Reveal Footer
A fixed footer that sits behind the main content, revealed as you scroll to the bottom. Features massive typography and a magnetic CTA button that physically moves toward your cursor.

**Technical Implementation:**
- Fixed positioning with `z-index: 0`
- Main content overlay with `z-index: 10`
- GSAP magnetic effect with distance calculations
- Subtle text drift and scale animations

### 🎯 State of the Art: Svelte 5 Runes
Built entirely using Svelte 5's revolutionary runes system—no legacy `export let` or `svelte/store` syntax.

**Technical Implementation:**
- `$state` for reactive primitives (cart items, menu state)
- `$derived` for computed values (total price, item count)
- `$effect` for side effects and animations
- `$props` for component props (Svelte 5 style)

### 🎪 Vibe Interactions

#### Custom Cursor
A blend-mode cursor that expands on hover, showing contextual text ("VIEW", "ADD", "SHOP"). Hidden on touch devices for optimal mobile experience.

#### Magnetic Buttons
Interactive elements that physically move toward the cursor when within a 200px radius, creating a tangible connection between user and interface.

#### Grain Overlay
A subtle, animated film grain texture that adds cinematic depth without interfering with interactions (`pointer-events: none`).

#### Kinetic Typography
Massive, fluid typography that responds to scroll and viewport size. Uses `clamp()` for truly responsive text scaling.

---

## 📁 Project Structure

```
tahsin-shop/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   └── FloatingInput.svelte
│   │   │   ├── CustomCursor.svelte
│   │   │   ├── Footer.svelte
│   │   │   ├── Hero.svelte
│   │   │   ├── NoiseOverlay.svelte
│   │   │   ├── PageTransition.svelte
│   │   │   ├── Preloader.svelte
│   │   │   ├── ProductGrid.svelte
│   │   │   ├── ShoppingCart.svelte
│   │   │   └── SmartHeader.svelte
│   │   ├── stores/
│   │   │   └── cart.svelte.ts
│   │   └── utils/
│   │       └── lenis.ts
│   ├── routes/
│   │   ├── checkout/
│   │   │   ├── +page.svelte
│   │   │   └── success/
│   │   │       └── +page.svelte
│   │   ├── lookbook/
│   │   │   └── +page.svelte
│   │   ├── manifesto/
│   │   │   └── +page.svelte
│   │   ├── product/
│   │   │   └── [id]/
│   │   │       ├── +page.svelte
│   │   │       └── +page.ts
│   │   ├── +layout.svelte
│   │   └── +page.svelte
│   ├── app.css
│   └── app.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── svelte.config.js
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** 18+ 
- **npm** or **pnpm**

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tahsin-shop.git
   cd tahsin-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
npm run dev
```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## ⚡ Performance

Despite heavy animations and complex interactions, **Tahsin Shop** maintains buttery-smooth 60fps performance through:

- **GPU Acceleration**: All animations use `transform` and `opacity` (CSS properties that trigger GPU compositing)
- **Will-Change Hints**: Strategic use of `will-change` for animated elements
- **Lazy Loading**: Images load on-demand with `loading="lazy"`
- **Code Splitting**: SvelteKit's automatic route-based code splitting
- **Optimized GSAP**: ScrollTrigger uses `scrub` for efficient scroll-linked animations
- **MatchMedia**: Animations conditionally run based on device capabilities

**Result**: Lighthouse scores of 90+ across all metrics, even with cinematic animations.

---

## 🎓 Key Learnings & Techniques

This project demonstrates:

- **Modern Svelte 5 Patterns**: Runes-based state management
- **Advanced GSAP**: ScrollTrigger, matchMedia, proxy objects
- **Creative Scroll Experiences**: Horizontal scroll, parallax reveals
- **Micro-interactions**: Magnetic buttons, custom cursors, grain overlays
- **Responsive Design**: Fluid typography, mobile-first animations
- **Performance Optimization**: GPU acceleration, lazy loading, code splitting

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Designed & Developed by Tahsin**

> *"Building the future of web experiences, one interaction at a time."*

---

<div align="center">

**Made with ❤️ and lots of ☕**

[⬆ Back to Top](#-tahsin-shop)

</div>
