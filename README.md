# Arc Blueprint Tracker

A visual companion app for Arc Raiders to browse, filter, and track collected blueprints, powered by community Google Sheets data.

## Key Features

- **Visual Browsing**: Grid view of all items with rarity borders and local images.
- **Collection Tracking**: Mark items as collected.
  - **Cloud Sync**: Sign in with Google (Firebase) to save your collection across devices.
  - **Offline Support**: Progress works offline via `localStorage` if not signed in.
  - **Visual Indicators**: Green checkmarks and glow overlays on collected items in the main grid.
- **Advanced Filtering**:
  - Filter by Rarity, Item Type, Map, Condition, and Data Confidence.
  - **Smart Defaults**: "Collection Status" defaults to showing *All* items.
  - **Persistence**: Remembers your filter settings between sessions.
- **Zero-Config Data**: Fetches live data from a published Google Sheet CSV.

## Tech Stack & Architecture

- **Frontend**: Vanilla HTML / CSS / JavaScript (ES Modules).
- **Build Tool**: [Vite](https://vitejs.dev/) for fast local development and optimized production builds.
- **Auth & Database**: Firebase Authentication (Google Sign-In) + Firestore (User data).
- **Styling**: Tailwind CSS (via CDN) + Custom CSS variables.
- **Animations**: `motion` library for smooth card entrances and interactions.

```bash
arcblueprinttracker/
│
├─ index.html        # App entry, UI structure
├─ styles.css        # Visual styles, variable definitions
├─ app.js            # Core logic: State management, Rendering, Auth, Filters
├─ firebase-config.js # Firebase initialization
├─ images/           # Local assets
└─ icons/            # Type icons
```

## Data Source

The app consumes a CSV published from Google Sheets without requiring a backend API.

| Field | Purpose |
| :--- | :--- |
| **Name** | Display name |
| **Type** | Icon categorization |
| **Rarity** | Card border color & sort order |
| **Image** | Local file lookup or URL |
| **Condition/Map** | Faceted filtering |
| **Confidence** | Data verification flag |

## Local Development

1.  **Install**:
    ```bash
    npm install
    ```
2.  **Run**:
    ```bash
    npm run dev
    ```
    Opens locally at `http://localhost:5173`.

## Needs Fixing


