# ARC Loot Browser

Static site (no build) that reads your published Google Sheets CSV and shows a clean, filterable gallery:
- Rarity-colored frame + rarity tab
- Item type icon (from ARC Raiders Wiki UI icon files)
- Filters: rarity, type, map, condition
- Click an item to expand details (map, location, container, condition)

## Grid size
Use the **Grid size** slider to shrink/enlarge cards. The setting is saved in your browser.

## Item type icons (why some might be missing)
The app tries to auto-map your **Item Type** text to a UI icon, but if your type labels don’t match the built-in patterns, the icon may fall back to a generic one.

### Best fix (recommended)
Add a column to your Google Sheet named **Type Icon File** (or **Type Icon URL**).

- If you put a **filename** (example: `Mods Muzzle.png`), the app will load it via ARC Raiders Wiki `Special:FilePath`.
- If you put a **full URL**, the app will use that directly.

This gives you perfect control and keeps working as the game updates.

## Configure
`app.js` already points at your CSV, but you can override per deployment:

`index.html?csv=<urlencoded_csv_link>`

## Deploy (GitHub Pages)
1. Create a new GitHub repo
2. Upload: `index.html`, `app.js`, `styles.css`
3. Repo Settings → Pages → Deploy from branch → `main` / root
4. Open the Pages URL
