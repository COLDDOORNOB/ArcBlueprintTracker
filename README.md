# Arc Blueprint Tracker

A lightweight, client-side web app for browsing, filtering, and visualizing Arc Raiders item spawn data using a Google Sheets–backed CSV as the data source.

This project is intentionally framework-free (plain HTML / CSS / JavaScript) to keep it easy to host, fast to load, and simple to maintain as the game data evolves.

## Why this exists

The raw data lives in Google Sheets, which is great for collaboration and updates, but not great for fast visual scanning.

This app solves that by:
- Turning spreadsheet rows into visual item cards
- Showing item icons, item type, and rarity color
- Allowing fast filtering and sorting without page reloads
- Supporting future data changes with minimal code updates

The entire app runs in the browser — **no backend, no build step**.

## Architecture Overview

```bash
arcblueprinttracker/
│
├─ index.html        # UI structure, filters, controls
├─ styles.css        # Visual design, scaling logic, overlays
├─ app.js            # Data loading, parsing, rendering logic
├─ images/           # Local item images (PNG)
├─ icons/            # Item type icons
└─ README.md
```

## Data Source (Google Sheets)

The app consumes a published CSV from Google Sheets.

**Why CSV?**
- Publicly accessible
- Automatically updates when the sheet changes
- No API keys required
- Easy to debug

### Required Columns
The app attempts to match columns by name (flexible matching). It looks for:

| Field | Purpose |
| :--- | :--- |
| **Name** | Display name ("Item Name", "Blueprint Name", etc.) |
| **Type** | Controls pill icon + label ("Item Type") |
| **Rarity** | Drives border color & sorting ("Rarity") |
| **Image** | Used to lookup local images ("Image URL", "Icon URL") |
| **Map** | Filter/Display ("Most Likely Map") |
| **Location** | Filter/Display ("Most Likely Location") |
| **Container** | Filter/Display ("Most Likely Container") |
| **Condition** | Filter/Display ("Most Likely Condition") |
| **Wiki** | Optional link to wiki ("Item URL", "Wiki URL") |

*Note: Data Confidence is currently supported in CSS but not yet implemented in the data parsing logic.*

## Image Strategy

**Problem**: Wiki-hosted images can be unreliable long-term.
**Solution**: All item images are likely stored locally in `/images`.

The app uses a robust lookup strategy:
1.  **Direct Path**: If the sheet specifies a local path (starts with `./images/`), use it.
2.  **Wiki Filename Extraction**: Extracts the filename from a Wiki URL (e.g., `.../MyItem.png`) and looks for a local match in `LOCAL_IMAGE_FILES`.
3.  **Name-based Lookup**: Normalizes the item name (spaces to underscores) and looks for a match.
4.  **Fallback**: Users original URL if no local match is found.

This allows the app to be independent of external sites while still using the live sheet for metadata.

## Visual Design Decisions

### Item Cards
Each item is rendered as a card with:
- **Rarity-colored border**: Immediate visual queue for value.
- **Item Type Pill**: Anchored to the image, scaling with card size.
- **Name**: Placed below the image for readability.

### Dropdown Details Overlay
Instead of expanding the card grid (which shifts layout), details appear in a `position: absolute` overlay.
- Overlays items below it.
- Independent width `clamp(280px, 28vw, 420px)` ensures text never stacks vertically, even on small grids.
- Click-outside or click-card to close.

### Grid Size Slider
Users can resize the grid from **120px** to **220px**.
- **Persistence**: Grid size is saved in `localStorage` (`arc_gridSize`).
- **Responsive**: Mobile and Desktop sliders stay in sync.

## Sorting & Filtering

**Sorting** (stable and client-side):
- Rarity (High → Low) *[Default]*
- Rarity (Low → High)
- Name (A → Z)
- Name (Z → A)
- Type (A → Z)
- Map (A → Z)

**Filtering**:
- **Search**: Real-time filtering by name, type, map, location, container.
- **Facets**: Toggle filters for Rarity, Type, Map, and Condition.

## Future-Proofing

### How to Update Data
1.  **Add a new column**: Add to Google Sheets, publish. Update `findHeader(...)` in `app.js` if it's a new logic field.
2.  **Add new items**: Add rows to the sheet. Add images to `/images` (optional, but recommended).
3.  **Add new item types**: Add icon to `/icons` and update `ICON_FILE_BY_TYPE` in `app.js`.

### Why no framework?
- **Host anywhere**: GitHub Pages, Netlify, Vercel, or raw S3.
- **No compile step**: Edit `app.js` and refresh.
- **Low maintenance**: No `npm audit` vulnerabilities or breaking React updates.

## Known Constraints
- **Read-only**: No write-back to Google Sheets.
- **No Auth**: Public data only.
- **Manual Image Sync**: Local images must be added manually to `/images` to take advantage of caching/independence.

## Needs Fixing

*(Placeholder for future tasks or bugs. Remind the user about this section next time you read this file.)*

- [ ] URLs Removed from item descriptions
- [ ] Scaling options on mobile that go lower than 120px. so more items can fit on screen

## Local Development Setup

To run this project locally with live reloading:

1.  **Install Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/) installed.
2.  **Install Dependencies**: Open a terminal in this folder and run:
    ```bash
    npm install
    ```
3.  **Start the Server**:
    ```bash
    npm run dev
    ```
4.  **View App**: The terminal will show a local URL (e.g., `http://localhost:5173`). Open this in your browser.

Existing `npm start` is also available if you prefer `serve`.
