# Texongo Web - Developer Documentation

Welcome to the Texongo Web project! This document serves as a guide for new developers to understand the project structure, technology stack, and how to get started.

## 🚀 Tech Stack

This project is built using modern web technologies:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **E-Commerce Backend**: [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- **Animations & Smooth Scrolling**: 
  - [GSAP](https://gsap.com/)
  - [Framer Motion](https://www.framer.com/motion/)
  - [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll)
- **Emails**: [Resend](https://resend.com/) & [Nodemailer](https://nodemailer.com/)

## 📂 Project Structure

The project follows a standard Next.js App Router structure with some custom directories:

```
texongo-web/
├── app/                  # Next.js App Router entry points (pages, layouts, api routes)
│   ├── api/              # API Routes
│   ├── (various pages)   # e.g., about-us, cart, collections, fabrics, orders
│   └── layout.tsx & page.tsx # Root layout and home page
├── components/           # Reusable React components
│   ├── providers/        # React Context providers
│   ├── sections/         # Large page sections
│   └── ui/               # Reusable UI elements (buttons, inputs, etc.)
├── lib/                  # Utility functions, helpers, and configurations (e.g., Shopify client)
├── public/               # Static assets (images, fonts, videos)
└── ...config files       # package.json, next.config.ts, tailwind/postcss configs
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Ensure you have a `.env.local` file in the root directory. You will need variables for:
   - Shopify Storefront API keys
   - Resend API keys (for emails)
   - Any other integrations

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to find and fix problems in the code.

## 🎨 Styling & Assets

- **Tailwind CSS** is used for styling.
- External images from `images.unsplash.com`, `texongo.com`, and `cdn.shopify.com` are allowed via `next.config.ts`.
- Complex animations are handled via GSAP and Framer Motion. Check components like `scroll-morph-hero.tsx` or `category-slider.tsx` for examples.

## 🛒 Shopify Integration

We use `@shopify/storefront-api-client` to interact with our Shopify store. Ensure your `.env.local` contains the correct public Storefront API token and store domain to fetch products, collections, and handle the cart.

## 💡 Best Practices

1. **Components**: Keep components modular in the `components/ui` or `components/sections` folders.
2. **State**: Use Zustand for global state (like Cart state) and React context for scoped states.
3. **Animations**: When adding new scroll animations, leverage the existing Lenis setup for a smooth experience.

---
*Happy Coding! If you have any questions, refer to the official docs of the respective libraries.*
