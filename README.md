# Angelina Shipikhina — pastry website

A rebuilt, responsive English / Simplified Chinese static portfolio, based on the supplied CV, portfolio PDF, photographs and the available summary of the earlier website conversation. This is a fresh implementation, not a recovered copy of the previous build.

## Deploy to Vercel

1. Extract this ZIP. Upload the contents of this directory to the root of `OS-BE/pastry-website` (so `index.html` is at the repository root).
2. Import the repository in Vercel. Choose **Other** as the framework preset. Leave the build command empty and use `.` as the output directory. The included `vercel.json` provides these settings.
3. Deploy. No dependencies, environment variables or backend are required.

Any static web host can serve this folder. To preview locally, open `index.html` or run `python3 -m http.server 8000` from this directory and visit http://localhost:8000.

## Included

- Responsive website, accessible navigation, English/Chinese toggle with a saved preference, and keyboard-accessible image lightbox (Escape closes it).
- Contact links, portfolio and CV downloads, service / workshop / process sections.
- All 22 supplied photographs, preserved unchanged in `originals/`.
- Optimized WebP copies of all 22 photographs in `assets/images/`.
- Both supplied PDFs, preserved unchanged in `assets/documents/`.

## Editing

Text and translations are in `index.html`, marked with `data-en` and `data-zh`. Update both values and the visible English text. Appearance is in `styles.css`; interactions are in `script.js`. Photo numbers map to the original filenames in `asset-manifest.json`.

Contact information is taken from the supplied CV: lina.shipihina@gmail.com, +86 188 1779 3912, Instagram @desserts.by.flour. Credentials and experience are based on the supplied documents. Availability, prices and future event dates are intentionally not asserted. Workshops and collaborations are enquiry-based. No form submissions, analytics or external font services are used.

The original photographs are included for preservation and are not loaded by the site. If the entire directory is published, those originals are publicly accessible too. The site itself uses the optimized images.
