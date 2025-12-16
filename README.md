# ARC Loot Browser

Static site (no build) that reads your published Google Sheets CSV and shows a clean, filterable gallery:
- Rarity-colored frame + rarity tab
- Item type icon (from ARC Raiders Wiki UI icon files)
- Filters: rarity, type, map, condition
- Click an item to expand details (map, location, container, condition)

## Configure
`app.js` already points at your CSV, but you can override per deployment:

`index.html?csv=<urlencoded_csv_link>`

## Deploy (GitHub Pages)
1. Create a new GitHub repo
2. Upload: `index.html`, `app.js`, `styles.css`
3. Repo Settings → Pages → Deploy from branch → `main` / root
4. Open the Pages URL
