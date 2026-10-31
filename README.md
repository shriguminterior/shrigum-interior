# Shrigum Interior

A responsive, TypeScript-driven rebuild of the supplied Wix site. Plain TypeScript and Vite; no framework or CMS required.

## Run locally

```sh
npm install
npm run dev
```

For a production build: `npm run build`. Output is in `dist/`; deploy it to any static web host. `npm run preview` previews that build. Node 18 or newer is required by the selected Vite 6 toolchain.

## GitHub Pages deployment

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys on pushes to `main`. It uses GitHub's built-in token; no personal access token or hosting secret is required. The build reads the Pages base path so images and galleries work under a repository URL or a custom domain.

The intended repository is `https://github.com/abhishekjagushte/shrigum-interior` and the default Pages address is `https://abhishekjagushte.github.io/shrigum-interior/`. These become live only after the repository is uploaded, **Settings → Pages → Source** is set to **GitHub Actions**, and the first workflow succeeds.

After GitHub setup, publish changes from this project directory:

```sh
git add src/content.ts public/assets/
git commit -m "Update website content"
git push origin main
```

For layout changes, stage the relevant files in `src/` too. Check the repository's **Actions** tab for deployment progress. Failed builds leave the last successful deployment in place. You can also run the deployment manually from the Actions tab.

GitHub Pages deployment updates the GitHub Pages address. The existing `chatgpt.site` publication remains a separate deployment and is not updated by this workflow.

## Edit content

All rendered text, navigation, project data, article content, image references, and form labels live in **src/content.ts**. Layout and behavior live in **src/main.ts**; styles live in **src/style.css**.

- Add an object to `projects` to create a project card and its gallery page automatically. Use a unique `slug` and an existing category slug.
- Add a category to `content.categories` to create a home category card and a project filter automatically.
- Add an object to `posts` to create a blog card and article automatically. Start a paragraph with `## ` for a section heading.
- Add to `content.services` to create an offer card and room gallery automatically.
- Add to `content.process` to create another numbered process step automatically.
- Put new image files in `public/assets/` and use their exact filenames in `image()` or `gallery()` in the content file (for example, `image('new-project-kitchen.webp', 'Kitchen in the new project')`). The helper preserves file extensions; PNG, JPEG, and WebP are supported.
- Image names use lowercase words separated by hyphens: `dadar-el-mejor-living-kitchen-01.webp`, `two-bhk-kitchen-03.webp`, `service-bedroom.webp`, and `shrigum-logo.png`. Numbered suffixes identify multiple views of a room. Shared images keep one filename wherever they are reused.
- The download helper is only for the original imported Wix photos. `scripts/wix-assets.json` maps their semantic filenames to their source identifiers, so `node scripts/download-assets.mjs` can restore missing photos without reverting filenames. The uploaded logo is maintained locally.
- Set `content.brand.phone` to the correct business number. The Wix placeholder number was omitted.

During development, saving the content file refreshes the preview automatically. On a hosted site, content changes require a new build and deployment; editing a local TypeScript file does not update an already deployed website by itself.

## Forms

Contact and appointment forms validate required fields, email addresses, positive floor area, whole-number bedroom counts, and non-past appointment dates. They open a prefilled email draft addressed to the business. Visitors must send that email, and appointment dates require manual confirmation. No request is stored or silently submitted. To receive submissions directly in a dashboard or inbox without an email app, connect a backend or form service in `wireEvents()`.

## Source fidelity

Imported from https://shriguminterior99.wixsite.com/shrigum-interior. The first version carries over the home content, branding, five project portfolios, and four blog articles. It adapts fixed Wix layouts to responsive grids, fixes project links to their matching galleries, and omits Wix platform advertising. Room pages collect relevant existing project images. Three source project descriptions repeat a 1.5 BHK South Indian theme paragraph (including the commercial project); those are retained and can be corrected in the content file. The Wix slideshow is represented as a clickable image showcase. No Wix account, booking backend, member system, or comment system is connected.

Static hash routes (`#/projects`, `#/project/dadar-el-mejor`, etc.) work on any static host without server rewrites. A future public SEO migration should use clean routes, redirects from the old page paths, and prerendered per-page metadata.
