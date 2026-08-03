# dantilsley.com

Static home for Dan Tilsley's Apple-platform apps.

## Current Scope

- App-first homepage for Heard, Teachin' Time, Rock the Fox, and future projects
- Product pages at `/heard/`, `/teachin-time/`, and `/rock-the-fox/`
- Shared support hub at `/support/`
- Shared privacy hub at `/privacy/`
- App-specific support and privacy pages for Teachin' Time and Rock the Fox
- Heard currently links through to its existing standalone site while the main domain becomes the app hub

## Tech

Plain HTML, CSS, and JavaScript. No framework, package manager, or build step.

## Running Locally

Serve from the project root:

```bash
PYTHONHASHSEED=0 python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

Opening `index.html` directly works for the homepage, but local routing is more accurate when checking nested product, support, and privacy pages.

## Deployment

No production host is configured in this repository yet. The site is intended to remain deployable as static files on GitHub Pages, Hover-backed hosting, or another static host.
