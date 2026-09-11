# Samar Dev Portfolio

## Overview
Build a single, responsive creative-developer portfolio at `/` using the supplied avatar as a prominent hero asset. The experience will use a warm editorial canvas, strong graphite type, vermilion accents, technical linework, and restrained motion.

## Page structure
- Floating pill navigation with anchor links, active-section feedback, and a compact mobile menu.
- Full-viewport hero featuring “Samar Dev,” a rotating role phrase, the supplied 3D avatar, peach glow, perspective wireframe room, orbit nodes, crosshairs, and signal details.
- Continuous vermilion ticker separating the hero from the content.
- About section with concise biography, capability highlights, and technical motifs.
- Projects section with two large editorial case studies: Orbit AI SaaS and Beyond Limits 3D Experience. Each opens a detailed accessible modal with responsibilities, outcomes, and stack.
- Services list with strong typographic rows and interactive states.
- Experience timeline with role, organization, dates, and concise impact notes.
- Scroll-linked Process timeline whose progress line responds to reading position.
- Availability band with a live status indicator and clear contact action.
- Contact form with name, email, project type, budget, and message fields; client-side validation, inline errors, loading, success, and reset states.
- Minimal footer with contact and social links.

## Visual and interaction direction
- Warm cream background `#F6F5F2`, graphite text `#161616`, vermilion `#F04A24`, and a soft peach atmospheric glow, expressed through semantic theme tokens.
- Editorial display typography paired with a clean sans-serif for supporting text.
- Thin perspective wireframe geometry and small technical symbols built with CSS and inline decorative markup.
- Subtle avatar float, rotating role copy, ticker motion, modal transitions, and scroll-progress effects, all disabled or simplified for reduced-motion preferences.
- Fully responsive composition with deliberate mobile ordering, safe text wrapping, touch-friendly controls, and no overlaps.

## Technical details
- Keep the experience within the existing TanStack React/TypeScript app and use the established UI controls for buttons, dialogs, and fields.
- Upload the provided avatar through the project asset system and render it with meaningful alternative text.
- Use React state and browser observers for role rotation, active navigation, project dialogs, process progress, and contact states; no backend is required because no delivery destination was provided.
- Add route-specific title, description, Open Graph, and Twitter metadata.
- Verify the final page at desktop and mobile sizes, including navigation, both project dialogs, form validation, reduced-motion behavior, and browser console cleanliness.
