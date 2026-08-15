# jeonck.metacog.co.kr

Personal site for CK Jeon (Chang Kook Jeon), platform engineering and cloud
infrastructure. Served by GitHub Pages from the `main` branch root.

## Stack

No build step, no dependencies. Three files do the work:

| File | Purpose |
| --- | --- |
| `index.html` | All content and structured data (schema.org `Person`) |
| `styles.css` | Design tokens, layout, light and dark themes |
| `CNAME` | Custom domain binding for GitHub Pages |
| `resume-source.html` | Print stylesheet that renders `CK-Jeon-Resume.pdf` |

Assets: `fonts/` holds the self-hosted Geist variable fonts (SIL OFL), and
`img/` holds real screenshots of the live sites plus the social card.

Scroll reveal runs on the CSS view timeline (`animation-timeline: view()`), so
the page carries no JavaScript. Browsers without support render everything
visible rather than blank.

## Local preview

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321.

## Editing

- **Numbers and claims** live in the `.metrics` block in `index.html`.
- **Screenshots** are captured at 1280x820, cropped to 1280x800, resized to
  1100px wide, and encoded as WebP at quality 76.
- **Accent colour** is a single token, `--accent`, defined once per theme in
  `styles.css`. Change it there and the whole page follows.

## Regenerating the resume PDF

Edit `resume-source.html`, then re-render. It is tuned to land on exactly two
Letter pages; if content grows, adjust `line-height` and `@page` margins rather
than cutting bullets.

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer --allow-file-access-from-files --virtual-time-budget=8000 --print-to-pdf=CK-Jeon-Resume.pdf resume-source.html
```

The PDF deliberately omits the phone number, matching the site. Add it to the
`.contact` block in `resume-source.html` if a given application needs it.

## Regenerating a screenshot

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=10000 --window-size=1280,820 --screenshot=/tmp/shot.png https://example.metacog.co.kr/
```

Then crop, resize, and convert:

```bash
sips -c 800 1280 --resampleWidth 1100 /tmp/shot.png --out /tmp/shot_r.png && cwebp -q 76 /tmp/shot_r.png -o img/shot.webp
```
