
const CSV_URL_DEFAULT = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUbvNSaRrEWnR67yD6RVyG3ypoeWJaJG9eBZ-f_cw7kOu4ZFSIBSHP4geWdtfQ_8zRzZTTi5h5Cw2d/pub?gid=1016263653&single=true&output=csv";

const GRID = {
  min: 120,
  max: 220,
  step: 10,
  default: 220,
  storageKey: "arc_gridSize",
};

const RARITY = {
  Common: { color: "#717471", rank: 1 },
  Uncommon: { color: "#41EB6A", rank: 2 },
  Rare: { color: "#1ECBFC", rank: 3 },
  Epic: { color: "#D8299B", rank: 4 },
  Legendary: { color: "#FBC700", rank: 5 },
};

// Item Type → local icon filename mapping.
// You provided these files:
//   ItemCategory_Misc.png
//   ItemCategory_Material.png
//   ItemCategory_Grenade.png
//   ItemCategory_Weapon.png
//   ItemCategory_QuickUse.png
//   ItemCategory_Mod.png
//   ItemCategory_Augment.png
// Store them in: ./icons/
const ICON_FILE_BY_TYPE = [
  { re: /weapon/i, file: "ItemCategory_Weapon.png" },
  { re: /grenade/i, file: "ItemCategory_Grenade.png" },
  { re: /quick\s*use|quickuse|consumable|med|healing|vita|tool|utility/i, file: "ItemCategory_QuickUse.png" },
  { re: /augment/i, file: "ItemCategory_Augment.png" },
  { re: /mod|attachment|barrel|muzzle|brake|choke|silencer|stock|grip|mag/i, file: "ItemCategory_Mod.png" },
  { re: /material|parts|craft|component/i, file: "ItemCategory_Material.png" },
  { re: /misc|key|trinket|other/i, file: "ItemCategory_Misc.png" },
];

// Local type icons (self-hosted)
// Place your icon files in: arcblueprinttracker/icons/
// and ensure they're served at: ./icons/<filename>
function localIconPath(fileName) {
  return "icons/" + encodeURIComponent(fileName);
}

function setGridSize(px) {
  const val = Math.max(GRID.min, Math.min(GRID.max, Number(px) || GRID.default));
  document.documentElement.style.setProperty("--cardSize", `${val}px`);
  // Also set inline style as a fallback in case CSS isn't loading/cached.
  const grid = document.getElementById("grid");
  if (grid) {
    grid.style.gridTemplateColumns = `repeat(auto-fill, minmax(${val}px, 1fr))`;
  }
  try { localStorage.setItem(GRID.storageKey, String(val)); } catch {}
  const l1 = document.getElementById("gridSizeLabel");
  const l2 = document.getElementById("gridSizeLabelMobile");
  if (l1) l1.textContent = `${val}px`;
  if (l2) l2.textContent = `${val}px`;
}

function loadGridSize() {
  try {
    const v = localStorage.getItem(GRID.storageKey);
    return v ? Number(v) : GRID.default;
  } catch {
    return GRID.default;
  }
}

function detectIconForType(typeText) {
  const t = (typeText || "").toString().trim();
  const k = t.toLowerCase().replace(/\s+/g, "");

  // First try exact-ish matches (best for clean sheets)
  if (k === "weapon") return localIconPath("ItemCategory_Weapon.png");
  if (k === "grenade") return localIconPath("ItemCategory_Grenade.png");
  if (k === "quickuse") return localIconPath("ItemCategory_QuickUse.png");
  if (k === "mod") return localIconPath("ItemCategory_Mod.png");
  if (k === "augment") return localIconPath("ItemCategory_Augment.png");
  if (k === "material") return localIconPath("ItemCategory_Material.png");
  if (k === "misc") return localIconPath("ItemCategory_Misc.png");

  // Then fall back to regex classification
  for (const entry of ICON_FILE_BY_TYPE) {
    if (entry.re.test(t)) return localIconPath(entry.file);
  }
  return localIconPath("ItemCategory_Misc.png");
}

// If the sheet provides a custom icon value, use it.
// - If value starts with http(s), treat as a direct URL.
// - Otherwise treat as a local filename under ./icons/
function iconFromCellValue(v) {
  const raw = norm(v);
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  return localIconPath(raw);
}

function norm(s) { return (s ?? "").toString().trim(); }
function normKey(s) { return norm(s).toLowerCase(); }

function findHeader(headers, candidates) {
  const lower = headers.map(h => normKey(h));
  for (const c of candidates) {
    const idx = lower.indexOf(normKey(c));
    if (idx !== -1) return headers[idx];
  }
  for (const c of candidates) {
    const needle = normKey(c);
    const idx = lower.findIndex(h => h.includes(needle));
    if (idx !== -1) return headers[idx];
  }
  return null;
}

function parseRarity(val) {
  const v = norm(val);
  if (!v) return "";
  const fixed = v[0].toUpperCase() + v.slice(1).toLowerCase();
  if (RARITY[fixed]) return fixed;
  const map = { "Legend": "Legendary", "Leg": "Legendary" };
  if (map[fixed]) return map[fixed];
  return fixed;
}

function rarityColor(r) { return (RARITY[r]?.color) || "#3f3f46"; }
function rarityRank(r) { return (RARITY[r]?.rank) || 0; }

const state = {
  all: [],
  filtered: [],
  columns: {},
  filters: {
    rarities: new Set(),
    types: new Set(),
    maps: new Set(),
    conds: new Set(),
    search: "",
    sort: "name_asc",
  },
  facets: {
    rarities: [],
    types: [],
    maps: [],
    conds: [],
  },
};

function getCsvUrl() {
  const u = new URL(window.location.href);
  return u.searchParams.get("csv") || CSV_URL_DEFAULT;
}

function setMetaLine(text) {
  const el = document.getElementById("metaLine");
  const elM = document.getElementById("metaLineMobile");
  if (el) el.textContent = text;
  if (elM) elM.textContent = text;
}

function initUI() {
  const drawer = document.getElementById("drawer");
  const openBtn = document.getElementById("openFiltersBtn");
  const closeBtn = document.getElementById("closeFiltersBtn");
  const backdrop = document.getElementById("drawerBackdrop");
  function openDrawer() { drawer.classList.remove("hidden"); }
  function closeDrawer() { drawer.classList.add("hidden"); }
  if (openBtn) openBtn.onclick = openDrawer;
  if (closeBtn) closeBtn.onclick = closeDrawer;
  if (backdrop) backdrop.onclick = closeDrawer;

  const s1 = document.getElementById("searchInput");
  const s2 = document.getElementById("searchInputMobile");
  const onSearch = (v) => { state.filters.search = v; applyFilters(); };
  if (s1) s1.addEventListener("input", (e) => onSearch(e.target.value));
  if (s2) s2.addEventListener("input", (e) => { onSearch(e.target.value); if (s1) s1.value = e.target.value; });

  const sort1 = document.getElementById("sortSelect");
  const sort2 = document.getElementById("sortSelectMobile");
  const onSort = (v) => {
    state.filters.sort = v;
    if (sort1) sort1.value = v;
    if (sort2) sort2.value = v;
    applyFilters();
  };
  if (sort1) sort1.onchange = (e) => onSort(e.target.value);
  if (sort2) sort2.onchange = (e) => onSort(e.target.value);

  const resetAll = () => {
    state.filters.rarities.clear();
    state.filters.types.clear();
    state.filters.maps.clear();
    state.filters.conds.clear();
    state.filters.search = "";
    state.filters.sort = "name_asc";
    if (s1) s1.value = "";
    if (s2) s2.value = "";
    if (sort1) sort1.value = "name_asc";
    if (sort2) sort2.value = "name_asc";
    applyFilters();
    renderFacets();
  };
  ["resetBtn","resetBtn2","resetBtnMobile"].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.onclick = resetAll;
  });

  const bindAll = (id, set) => {
    const b = document.getElementById(id);
    if (b) b.onclick = () => { set.clear(); applyFilters(); renderFacets(); };
  };
  bindAll("rarityAllBtn", state.filters.rarities);
  bindAll("typeAllBtn", state.filters.types);
  bindAll("mapAllBtn", state.filters.maps);
  bindAll("condAllBtn", state.filters.conds);
  bindAll("rarityAllBtnMobile", state.filters.rarities);
  bindAll("typeAllBtnMobile", state.filters.types);
  bindAll("mapAllBtnMobile", state.filters.maps);
  bindAll("condAllBtnMobile", state.filters.conds);

  // Grid size slider (desktop + mobile), persisted in localStorage
  const gs1 = document.getElementById("gridSize");
  const gs2 = document.getElementById("gridSizeMobile");
  const initial = loadGridSize();
  setGridSize(initial);
  if (gs1) {
    gs1.min = String(GRID.min); gs1.max = String(GRID.max); gs1.step = String(GRID.step);
    gs1.value = String(initial);
    gs1.addEventListener("input", (e) => {
      const v = e.target.value;
      if (gs2) gs2.value = v;
      setGridSize(v);
    });
  }
  if (gs2) {
    gs2.min = String(GRID.min); gs2.max = String(GRID.max); gs2.step = String(GRID.step);
    gs2.value = String(initial);
    gs2.addEventListener("input", (e) => {
      const v = e.target.value;
      if (gs1) gs1.value = v;
      setGridSize(v);
    });
  }
}

function loadData() {
  setMetaLine("Fetching sheet…");
  const url = getCsvUrl();

  Papa.parse(url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: (res) => {
      const rows = res.data || [];
      const headers = res.meta?.fields || Object.keys(rows[0] || {});

      const colName = findHeader(headers, ["Blueprint Name","Item Name","Name","Item"]);
      const colType = findHeader(headers, ["Item Type","Type"]);
      const colTypeIcon = findHeader(headers, [
        "Item Type Icon",
        "Type Icon",
        "Item Type Icon URL",
        "Type Icon URL",
        "Item Type Icon File",
        "Type Icon File",
      ]);
      const colMap = findHeader(headers, ["Most Likely Map","Map"]);
      const colCond = findHeader(headers, ["Most Likely Condition","Condition"]);
      const colLoc = findHeader(headers, ["Most Likely Location","Location"]);
      const colCont = findHeader(headers, ["Most Likely Container","Container"]);
      const colImg = findHeader(headers, ["Image URL","ImageURL","Icon URL","Thumbnail","Image"]);
      const colRarity = findHeader(headers, ["Rarity","Item Rarity"]);
      const colWiki = findHeader(headers, ["Item URL","Wiki URL","URL","Link"]);

      state.columns = { name: colName, type: colType, typeIcon: colTypeIcon, map: colMap, cond: colCond, loc: colLoc, cont: colCont, img: colImg, rarity: colRarity, wiki: colWiki };

      const items = [];
      for (const r of rows) {
        const name = norm(r[colName]);
        if (!name) continue;

        const type = norm(r[colType]);
        const map = norm(r[colMap]);
        const cond = norm(r[colCond]);
        const loc = norm(r[colLoc]);
        const cont = norm(r[colCont]);
        const img = norm(r[colImg]);
        const rarity = parseRarity(r[colRarity]);
        const wiki = norm(r[colWiki]);

        const iconFromSheet = colTypeIcon ? iconFromCellValue(r[colTypeIcon]) : "";
        const typeIcon = iconFromSheet || detectIconForType(type);
        items.push({ name, type, map, cond, loc, cont, img, rarity, wiki, typeIcon });
      }

      state.all = items;
      buildFacets();
      initUI();
      applyFilters();
      renderFacets();
      setMetaLine(`${items.length} items • live from Sheets`);
    },
    error: (err) => {
      console.error(err);
      setMetaLine("Failed to load CSV. Check your published link.");
    }
  });
}

function uniqSorted(values) {
  const set = new Set(values.filter(v => norm(v)));
  return Array.from(set).sort((a,b) => a.localeCompare(b));
}

function buildFacets() {
  state.facets.rarities = uniqSorted(state.all.map(i => i.rarity)).sort((a,b)=>rarityRank(b)-rarityRank(a));
  state.facets.types = uniqSorted(state.all.map(i => i.type));
  state.facets.maps = uniqSorted(state.all.map(i => i.map));
  state.facets.conds = uniqSorted(state.all.map(i => i.cond));
}

function toggleInSet(set, val) { set.has(val) ? set.delete(val) : set.add(val); }

function chip(text, active, onClick) {
  const b = document.createElement("button");
  b.className = "chip " + (active ? "chip-active" : "");
  b.textContent = text;
  b.onclick = onClick;
  return b;
}

function renderFacets() {
  const targets = {
    rarity: [document.getElementById("rarityFilters"), document.getElementById("rarityFiltersMobile")],
    type: [document.getElementById("typeFilters"), document.getElementById("typeFiltersMobile")],
    map: [document.getElementById("mapFilters"), document.getElementById("mapFiltersMobile")],
    cond: [document.getElementById("condFilters"), document.getElementById("condFiltersMobile")],
  };

  for (const el of targets.rarity) {
    if (!el) continue;
    el.innerHTML = "";
    for (const r of state.facets.rarities) {
      const active = state.filters.rarities.has(r);
      const c = rarityColor(r);
      const btn = document.createElement("button");
      btn.className = "flex items-center gap-2 px-3 py-2 rounded-xl border text-xs hover:bg-zinc-800";
      btn.style.borderColor = active ? c : "rgb(39 39 42)";
      btn.style.background = active ? "rgba(255,255,255,0.04)" : "rgb(24 24 27)";
      btn.onclick = () => { toggleInSet(state.filters.rarities, r); applyFilters(); renderFacets(); };
      const dot = document.createElement("span");
      dot.className = "inline-block w-2.5 h-2.5 rounded-full";
      dot.style.background = c;
      const label = document.createElement("span");
      label.textContent = r;
      btn.appendChild(dot); btn.appendChild(label);
      el.appendChild(btn);
    }
  }

  for (const el of targets.type) {
    if (!el) continue;
    el.innerHTML = "";
    for (const t of state.facets.types) {
      const active = state.filters.types.has(t);
      const btn = document.createElement("button");
      btn.className = "relative px-2 py-2 rounded-xl border hover:bg-zinc-800 flex items-center justify-center";
      btn.style.borderColor = active ? "rgb(113 113 122)" : "rgb(39 39 42)";
      btn.title = t;
      btn.onclick = () => { toggleInSet(state.filters.types, t); applyFilters(); renderFacets(); };
      const img = document.createElement("img");
      img.src = detectIconForType(t);
      img.alt = t;
      img.className = "w-6 h-6";
      btn.appendChild(img);
      el.appendChild(btn);
    }
  }

  for (const el of targets.map) {
    if (!el) continue;
    el.innerHTML = "";
    for (const m of state.facets.maps) {
      const active = state.filters.maps.has(m);
      el.appendChild(chip(m, active, () => { toggleInSet(state.filters.maps, m); applyFilters(); renderFacets(); }));
    }
  }

  for (const el of targets.cond) {
    if (!el) continue;
    el.innerHTML = "";
    for (const c of state.facets.conds) {
      const active = state.filters.conds.has(c);
      el.appendChild(chip(c, active, () => { toggleInSet(state.filters.conds, c); applyFilters(); renderFacets(); }));
    }
  }

  renderActiveChips();
}

function renderActiveChips() {
  const wrap = document.getElementById("activeChips");
  if (!wrap) return;
  wrap.innerHTML = "";

  const push = (label, clearFn) => {
    const b = document.createElement("button");
    b.className = "chip chip-active";
    b.textContent = label + " ✕";
    b.onclick = clearFn;
    wrap.appendChild(b);
  };

  if (state.filters.rarities.size) push(`Rarity: ${Array.from(state.filters.rarities).join(", ")}`, () => { state.filters.rarities.clear(); applyFilters(); renderFacets(); });
  if (state.filters.types.size) push(`Type: ${state.filters.types.size}`, () => { state.filters.types.clear(); applyFilters(); renderFacets(); });
  if (state.filters.maps.size) push(`Map: ${Array.from(state.filters.maps).join(", ")}`, () => { state.filters.maps.clear(); applyFilters(); renderFacets(); });
  if (state.filters.conds.size) push(`Condition: ${Array.from(state.filters.conds).join(", ")}`, () => { state.filters.conds.clear(); applyFilters(); renderFacets(); });
  if (state.filters.search.trim()) push(`Search: ${state.filters.search.trim()}`, () => {
    state.filters.search = "";
    const s1 = document.getElementById("searchInput");
    const s2 = document.getElementById("searchInputMobile");
    if (s1) s1.value = "";
    if (s2) s2.value = "";
    applyFilters(); renderFacets();
  });
}

function applyFilters() {
  const q = normKey(state.filters.search);
  const hasR = state.filters.rarities.size > 0;
  const hasT = state.filters.types.size > 0;
  const hasM = state.filters.maps.size > 0;
  const hasC = state.filters.conds.size > 0;

  let out = state.all.filter(it => {
    if (hasR && !state.filters.rarities.has(it.rarity)) return false;
    if (hasT && !state.filters.types.has(it.type)) return false;
    if (hasM && !state.filters.maps.has(it.map)) return false;
    if (hasC && !state.filters.conds.has(it.cond)) return false;
    if (q) {
      const blob = (it.name + " " + it.type + " " + it.map + " " + it.cond + " " + it.loc + " " + it.cont).toLowerCase();
      if (!blob.includes(q)) return false;
    }
    return true;
  });

  const sort = state.filters.sort;
  out.sort((a,b) => {
    if (sort === "name_asc") return a.name.localeCompare(b.name);
    if (sort === "name_desc") return b.name.localeCompare(a.name);
    if (sort === "type_asc") return (a.type||"").localeCompare(b.type||"");
    if (sort === "map_asc") return (a.map||"").localeCompare(b.map||"");
    if (sort === "rarity_desc") return rarityRank(b.rarity)-rarityRank(a.rarity) || a.name.localeCompare(b.name);
    if (sort === "rarity_asc") return rarityRank(a.rarity)-rarityRank(b.rarity) || a.name.localeCompare(b.name);
    return a.name.localeCompare(b.name);
  });

  state.filtered = out;
  renderGrid();
}

function renderGrid() {
  const grid = document.getElementById("grid");
  const empty = document.getElementById("emptyState");
  const count = document.getElementById("resultCount");
  if (!grid) return;

  grid.innerHTML = "";
  if (count) count.textContent = `${state.filtered.length} / ${state.all.length}`;

  if (!state.filtered.length) {
    grid.classList.add("hidden");
    if (empty) empty.classList.remove("hidden");
    return;
  } else {
    grid.classList.remove("hidden");
    if (empty) empty.classList.add("hidden");
  }

  for (const it of state.filtered) {
    const card = document.createElement("div");
    card.className = "card-compact bg-zinc-950 border border-zinc-800 rounded-2xl p-2";

    const frame = document.createElement("div");
    frame.className = "rarity-frame rarity-glow relative overflow-hidden";
    frame.style.borderColor = rarityColor(it.rarity);

    const imgWrap = document.createElement("div");
    imgWrap.className = "relative aspect-square bg-zinc-900/50 rounded-[16px] flex items-center justify-center overflow-hidden";
    // Inline fallbacks in case a utility class doesn't load.
    imgWrap.style.aspectRatio = "1 / 1";
    imgWrap.style.width = "100%";

    const img = document.createElement("img");
    img.src = it.img || "";
    img.alt = it.name;
    img.className = "w-full h-full object-contain p-2";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
    img.style.padding = "8px";
    img.loading = "lazy";

    const tab = document.createElement("div");
    tab.className = "type-tab";
    tab.style.background = rarityColor(it.rarity) + "22";
    tab.style.borderColor = rarityColor(it.rarity);

    const tabIcon = document.createElement("img");
    tabIcon.src = it.typeIcon;
    tabIcon.alt = it.type;

    const tabText = document.createElement("span");
    tabText.className = "text-[11px] font-semibold";
    tabText.textContent = it.rarity || "—";

    tab.appendChild(tabIcon);
    tab.appendChild(tabText);

    imgWrap.appendChild(img);
    imgWrap.appendChild(tab);

    const title = document.createElement("div");
    title.className = "mt-2 px-1 pb-1";

    const name = document.createElement("div");
    name.className = "text-sm font-semibold leading-tight";
    name.textContent = it.name;

    const subtitle = document.createElement("div");
    subtitle.className = "text-xs text-zinc-400 mt-1";
    subtitle.textContent = it.type || "—";

    title.appendChild(name);
    title.appendChild(subtitle);

    const details = document.createElement("div");
    details.className = "mt-2 hidden border-t border-zinc-800 pt-2 px-1 pb-1";

    const makeRow = (label, value) => {
      if (!value) return null;
      const row = document.createElement("div");
      row.className = "details-row";
      const l = document.createElement("div");
      l.className = "details-label";
      l.textContent = label;
      const v = document.createElement("div");
      v.className = "details-value";
      v.textContent = value;
      row.appendChild(l); row.appendChild(v);
      return row;
    };

    [makeRow("Map", it.map), makeRow("Location", it.loc), makeRow("Container", it.cont), makeRow("Condition", it.cond)]
      .filter(Boolean)
      .forEach(r => details.appendChild(r));

    if (it.wiki) {
      const a = document.createElement("a");
      a.href = it.wiki;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.className = "mt-2 inline-block text-xs text-zinc-300 hover:text-white underline decoration-zinc-700";
      a.textContent = "Open item page";
      details.appendChild(a);
    }

    frame.style.cursor = "pointer";
    frame.onclick = () => details.classList.toggle("hidden");

    frame.appendChild(imgWrap);
    frame.appendChild(title);

    card.appendChild(frame);
    card.appendChild(details);
    grid.appendChild(card);
  }
}

document.addEventListener("DOMContentLoaded", loadData);
