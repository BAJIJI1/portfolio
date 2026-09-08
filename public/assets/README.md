# Assets

Replace these placeholders with real files, keeping the same filenames/paths (or update the paths in `src/data/profile.js`):

- `profile-photo.jpg` — your photo, referenced in Hero and About
- `projects/*.png` — screenshots per project (see `src/data/profile.js` → `projects[].images`, an array). Each project currently lists 3 slots (e.g. `agrioptima-1.png`, `agrioptima-2.png`, `agrioptima-3.png`) — add, remove, or rename entries in that array to change how many screenshots a project's modal carousel shows. The card thumbnail always uses the first entry.
- `testimonials/*.jpg` — headshots for each testimonial (see `src/data/profile.js` → `testimonials[].photo`)

Until real files exist, the site gracefully falls back to styled placeholders (initials / "screenshot placeholder" text) — nothing breaks.
