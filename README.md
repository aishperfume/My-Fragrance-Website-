# Khawaja Haute Parfumerie — Digital Vitrine

A bespoke luxury fragrance web application built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**, featuring **Lenis inertial smooth scrolling**, brutalist architectural typography, interactive olfactory filtering, cart management, and full PKR pricing.

---

## Cloudflare Pages Deployment Settings

When connecting this repository to **Cloudflare Pages**, configure the build settings as follows:

| Setting Field | Value |
| :--- | :--- |
| **Framework preset** | `Vite` (or `None`) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (leave empty / default) |
| **Node.js Version** | `20` (automatically picked up from `.node-version`) |

### Environment Variables (Optional)
- `NODE_VERSION`: `20`

---

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Architecture & Features
- **Haute Parfumerie Design System**: DM Sans typography, architectural hairlines, high-contrast monochrome palettes with bio-amber and cobalt highlights.
- **Lenis Smooth Scroll Engine**: Silky trackpad/mousewheel inertia and instant route transitions.
- **Selection Matrix & Vitrine**: Curated flagship best-sellers with real-time olfactive accord filtering.
- **Mobile Responsive Drawer & Morphing Navigation**: Animated 3-line hamburger morphing cleanly into a luxury close icon.
- **Cloudflare Edge Optimized**: Included `_redirects` for SPA client-side routing and `_headers` for immutable asset caching.
