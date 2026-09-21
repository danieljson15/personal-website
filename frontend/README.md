# Daniel Son — portfolio

The homepage is a full-screen Babylon.js ruins scene based on the supplied reference: https://playground.babylonjs.com/#DR9MT2#77. Portfolio navigation is available immediately. There is no intro dialog, Enter gate, or session-dependent homepage.

Projects, Experience, Hobbies, and Contact retain the original separate-page and card-based organization and factual content. The existing Capybara text-art page is still linked in the footer and mobile navigation.

## Run

```sh
npm ci --legacy-peer-deps
npm run dev
# http://localhost:3000/personal-website/

npm run typecheck
npm run build
npm run preview
# http://127.0.0.1:3100/personal-website/

npm run test:e2e
```

Tests use installed Google Chrome through Playwright. Run the production build first. The Python 3 preview server reproduces the GitHub Pages base path. Directory-style exports avoid collisions between page URLs and public asset folders.

Production builds use `.next`; development uses `.next-dev`, so an open development server cannot overwrite production build metadata. Static files are exported to `out`.

## Landing implementation

- `app/page.tsx`: server-rendered name, factual introduction, project/experience links, social links, and asset credits.
- `components/ruins/ruins-scene.tsx`: lazy client initialization, loading/fallback state, pause and reset controls, cleanup.
- `components/ruins/create-ruins-scene.ts`: environment loading, textured PBR materials, warm spotlight, desktop shadows, procedural cloudy sky, emissive animated fireflies, subtle glow, constrained drag/parallax, portrait camera framing.
- `public/scene/`: locally hosted optimized models and rendered poster fallbacks. Both models together are about 1.9 MB. No scene asset depends on a third-party server at runtime.
- `app/globals.css`: landing composition, the original content-page structure, responsive navigation, light/dark tokens through the existing `next-themes` provider.

## Asset attribution

The ruins are **Ancient ruins by fedorzabelin**, and the insects are **Lowpoly Firefly by Caledhril**, both under Creative Commons Attribution 4.0. Their original animations and textured geometry are retained. Texture compression, material adjustments, lighting, framing, and scripted flight paths are adaptations. The sky shader and UI are original.

Full links and modifications are in [`public/scene/CREDITS.md`](public/scene/CREDITS.md) and the visible “Scene credits” control on the landing page. The poster images are captures of the adapted scene.

## Access and performance

The scene loads after the server-rendered UI. Real-time rendering replaces a static scene poster when ready. Asset failure, unavailable WebGL, and context loss leave navigation and the poster usable; JavaScript-free visitors can navigate to every primary content page from the homepage.

The renderer caps desktop DPR at 1.5 and touch-device DPR at 1. Touch devices use fewer animated insects and particles, a smaller glow buffer, no shadow map, and approximately 30 FPS. Rendering pauses in hidden tabs. Navigating away aborts pending fetches and disposes the engine, scene, models, materials, textures, animations, resize observer, and input listeners.

Reduced-motion users begin with animations paused. A native button can pause or resume animation, and another resets the view. Drag is bounded; wheel zoom and panning are disabled. Navigation and content use normal links, native details for coursework, and existing Radix tabs/dialogs. Themes apply to the content pages; the landing retains its dusk lighting.

## Verification

The browser suite checks scene loading, pause/reset, direct navigation and return visits, original content routes and assets, coursework, hobby tabs, light/dark accessibility, reduced motion, mobile navigation, asset/WebGL failure, and JavaScript-free access. Physical-device and Safari testing remain outside the automated Chrome checks.
