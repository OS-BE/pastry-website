# LINA.Pastry — pastry consulting & venue experiences

A responsive English / Simplified Chinese website for Angelina Shipikhina, working as LINA.Pastry. Content is grounded in her supplied CV, portfolio, service brief and photography. Shanghai-based, available for projects across China.

## Deploy to Vercel

1. Extract this ZIP. Upload the contents of this directory to the root of `OS-BE/pastry-website` (so `index.html` is at the repository root).
2. Import the repository in Vercel. Choose **Other** as the framework preset. Leave the build command empty and use `.` as the output directory. The included `vercel.json` provides these settings.
3. Deploy. No dependencies, environment variables or backend are required.

Any static web host can serve this folder. To preview locally, open `index.html` or run `python3 -m http.server 8000` from this directory and visit http://localhost:8000.

## Included

- Responsive website, accessible navigation, English/Chinese toggle with a saved preference, and keyboard-accessible gallery (Escape closes the lightbox; arrow keys browse images).
- Three detailed services: dessert menu consulting and kitchen training; sweet tables and venue celebrations; pastry masterclasses.
- A filtered collection of creations, a dedicated chef profile, three service pages, qualifications and practical FAQs. The navigation includes a Services submenu; visitors explore content directly on the website rather than downloading documents.
- 33 additional studio photographs with smaller responsive versions, selected portfolio photographs and a 10-second preparation film. The film plays silently in a seamless loop when visible, with a discreet pause control and support for reduced-motion preferences.
- An enquiry form that opens an email draft, plus a copyable brief for WeChat. It does not submit to a server or send a message automatically.
- All 22 supplied photographs, preserved unchanged in `originals/`.
- Optimized WebP copies of all 22 photographs in `assets/images/`.
- Both supplied PDFs, preserved unchanged in `assets/documents/`.

## Editing

Text and translations are in the HTML pages, marked with `data-en` and `data-zh`. Update both values and the visible English text. Shared appearance is in `styles.css` and `subpages.css`; the home page uses `script.js`, and subpages use `subpages.js` plus their page-specific files. Photo numbers map to the original filenames in `asset-manifest.json`.

Contact information is taken from the supplied CV: lina.shipihina@gmail.com, +86 188 1779 3912, Instagram @desserts.by.flour. Credentials, experience, the two-day consulting programme, 10-day event enquiry lead time, and 12-person minimum for venue masterclasses are based on supplied documents. Specific dates, prices and availability are agreed by enquiry. No analytics or external font services are used.

The original photographs are included for preservation and are not loaded by the site. If the entire directory is published, those originals are publicly accessible too. The site itself uses the optimized images.

The additional camera RAW files and the original media archive are retained separately, outside this deployment directory. Web-ready versions of the additional photographs are included here. Both PDFs retain their original contact details, as authorized for public publication.
