# Add the Three Verified Portfolio Projects

## Scope
- Preserve the existing portfolio outside the Projects section.
- Keep Adnan Pizza Burger Point and add Dastan-e-Nysa and Farooq Saharan as projects 02 and 03.
- Remove any stale Orbit AI or Beyond Limits references and render exactly these three verified projects from one typed configuration array.

## Project presentation
- Extend the current sticky editorial sequence rather than introducing another scrolling model.
- Keep a large artwork and readable project information for every entry, with a distinct original CSS composition:
  - Adnan Pizza Burger Point: espresso, amber, cream, menu and cart details.
  - Dastan-e-Nysa: cream textile space, maroon accents, verified collection names, shopping and size-guide details.
  - Farooq Saharan: wood brown, parchment, aged gold, carved geometry, legacy and craft details.
- Label every artwork as an original project preview so it cannot be mistaken for a screenshot.
- Preserve restrained desktop tilt, layered parallax, light sweep, scroll reveal, focus treatment, press response, and touch/reduced-motion fallbacks.

## Details and links
- Reuse one accessible dialog driven by the selected project data.
- Show each project’s exact title, category, description, tags, verified feature summary, themed visual, and safe external “Visit live site ↗” link.
- Keep close control, Escape, outside-click, focus handling, keyboard access, and mobile viewport sizing.

## Technical details
- Add `visualTheme` to the project type and use it to select shared stage/dialog styling and the correct artwork renderer.
- Remove restaurant-only hardcoded location and heading copy from the shared project stage; render only verified per-project data.
- Keep one markup path for desktop and mobile, with stable project IDs and no duplicated datasets.

## Verification
- Confirm exactly three projects render and both placeholder names are absent from source and rendered UI.
- Test every details dialog and live URL, including Escape, outside-click, keyboard focus, and new-tab attributes.
- Check 320, 375, 390, 768, 1024, and 1440 widths for overflow, readable artwork, and usable 44px controls.
- Run the project TypeScript check and confirm the unchanged hero, navigation, 3D scene, ticker, contact, and footer still render.
