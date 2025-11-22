# Navigation + Coverage Research

This note captures references and decisions used to restructure the M2 installer into a guided, multi-step experience.

## References consulted
- [Material Design Steppers](https://m3.material.io/components/steppers/overview) — showed how to chunk complex tasks into steps with a persistent sidebar indicator.
- [Baymard Institute form design tips](https://baymard.com/blog/multi-page-form-ux) — emphasized breaking long forms into digestible chunks and providing clear “Back/Next” controls.
- [Smashing Magazine on progressive disclosure](https://www.smashingmagazine.com/2021/05/best-practices-multi-step-forms/) — reinforced keeping only contextually relevant inputs visible per step.
- [FileBrowser docs](https://filebrowser.org/features) — lightweight web file manager to fill gaps for general file types.
- [Navidrome project](https://www.navidrome.org/docs/getting-started/docker/) — music streaming server suited for audio formats.

## Layout choices
- Replace the single scrolling page with a **sidebar stepper** plus one focused panel per step. Each panel ends with back/next actions so users always know how to proceed.
- Keep the hero at the top, but make the main content a two-column layout: navigation on the left, content on the right.
- Use persistent previews for `.env` and `compose` in their own steps to reduce cognitive load while editing.

## File-type coverage guide
- Add a dedicated step that maps common file families (movies, TV, photos, documents, audio) to the services that can handle them.
- Selecting a file family will suggest/auto-toggle the needed apps (e.g., movies -> Jellyfin + Radarr). A badge shows missing coverage.
- Introduce **FileBrowser** (general-purpose viewer) and **Navidrome** (audio server) so every listed file type has a corresponding app in the stack.

## Implementation notes
- Step navigation is driven by data attributes; panels remain in the DOM for quick preview updates.
- Coverage summary reacts to both file-type selections and catalog toggles so users can see gaps immediately.
- All changes remain client-side and require no build tooling.
