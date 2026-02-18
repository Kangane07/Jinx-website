# Repository Review

Date: 2026-02-18

## Scope
This review focuses on the current repository contents, including static web assets (`index.html`, `login.html`, `privacy-policy.html`), release binaries (`.apk`, `.aab`), and documentation (`README.md`).

## Game Mechanism (validated from code)
Yes—the game flow is clear and works as a fully client-side GitHub Pages game:
1. Players enter comma-separated names and start.
2. A random player is selected (without immediate repeat).
3. A random question is assigned for that turn.
4. A coin toss controls reveal/mystery outcome in the modal.
5. Closing the modal advances to the next turn.

## Flow Fixes Implemented
The following gameplay improvements are now applied in `index.html`:
- **README rule alignment fixed:** Heads keeps question hidden; Tails reveals it.
- **Input quality fix:** empty names are filtered out (`"A, ,B"` no longer creates blank players).
- **Question repetition smoothing:** avoids showing the same question in back-to-back turns.
- **Faster UX:** pressing **Enter** in player input now starts the game.

## Remaining Suggestions

### 1) Password gate is client-side only (Medium)
- `login.html` contains a hardcoded password and can be bypassed by anyone inspecting JS.
- Suggestion: keep it as a fun gate (and label it so), or move real auth server-side.

### 2) Privacy policy should explicitly mention analytics (Medium)
- `index.html` loads Google Analytics.
- Suggestion: add explicit disclosure (tool, data type, retention, opt-out/consent details).

### 3) Release artifacts in Git (Low)
- `.apk` and `.aab` binaries are versioned in the repo.
- Suggestion: publish binaries via Releases/artifact storage; keep source-focused Git history.

### 4) Maintainability enhancements (Low)
- CSS/JS are inline and long.
- Suggestion: split to `assets/css` and `assets/js` for easier changes and browser caching.

### 5) Accessibility polish (Low)
- Suggestion: add stronger focus-visible styles and a few ARIA improvements for modal/turn updates.

## Suggested Next Steps (Priority)
1. Keep game rule text and runtime behavior synchronized whenever one changes.
2. Update privacy policy with exact analytics disclosure.
3. Decide whether login is purely playful or real access control.
4. Move release binaries out of repo for cleaner source history.
5. Refactor inline assets and add a lightweight QA checklist.
