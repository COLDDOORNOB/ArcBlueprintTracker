import { animate, stagger } from "motion";
import { auth, db, googleProvider } from "./firebase-config.js";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const CSV_URL_DEFAULT = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUbvNSaRrEWnR67yD6RVyG3ypoeWJaJG9eBZ-f_cw7kOu4ZFSIBSHP4geWdtfQ_8zRzZTTi5h5Cw2d/pub?gid=1016263653&single=true&output=csv";

// Since we are now a module, we must attach global initialization to window if it's called from HTML
// However, existing onclicks in HTML might break if functions aren't on window.
// We should attach key functions to window.
window.initUI = initUI;
window.setGridSize = setGridSize;

// We will kick off loadData when the DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
  loadCollectionState();
  loadFilters(); // Load persisted filters
  initTabNavigation();
  switchTab(state.currentTab); // Ensure initial UI reflects the current tab
  initCollectionFilters();
  initAuth(); // Initialize Firebase Auth
  loadData();
});


// === Local assets ===
// If you host this site under /arcblueprinttracker/, put images in:
//   arcblueprinttracker/images/<files...>
// and type icons in:
//   arcblueprinttracker/icons/<ItemCategory_*.png>
const LOCAL_IMAGE_BASE = "./images/";
const LOCAL_ICON_BASE = "./icons/";

// Build a lookup of base filename -> hashed filename, e.g.
// "Anvil-Level1" -> "Anvil-Level1_4008ab9b4b.png"
const LOCAL_IMAGE_FILES = [
  "Extended_Medium_Mag_III_00531083a8.png",
  "Extended_Medium_Mag_II_2e66ba96e7.png",
  "Extended_Light_Mag_III_d9347dc8af.png",
  "Extended_Barrel_6f57d82e2b.png",
  "Extended_Light_Mag_II_95a5cf317a.png",
  "Explosive_Mine_f3f7dddb30.png",
  "Complex_Gun_Parts_a4523a546f.png",
  "Defibrillator_cbd07c7d0a.png",
  "Compensator_II_9efd71b2c0.png",
  "Compensator_III_0d2d5c294d.png",
  "Combat_Mk._3__Flanking__b8b75b54bf.png",
  "Combat_Mk._3__Aggressive__0c49a269d1.png",
  "Bobcat-Level1_542f741fbd.png",
  "Burletta-Level1_a959085f9a.png",
  "Blaze_Grenade_b6c426c6f1.png",
  "Barricade_Kit_b941aff2b2.png",
  "Bettina_6c889eadf0.png",
  "Aphelion_55eb3c8526.png",
  "Angled_Grip_II_7b2a8db317.png",
  "Angled_Grip_III_ba0d742697.png",
  "Anvil-Level1_4008ab9b4c.png",
  "Wolfpack_5d69c9575c.png",
  "Vulcano-Level1_4e6ad17258.png",
  "Vita_Spray_7142499abc.png",
  "Vita_Shot_245f6df518.png",
  "Vertical_Grip_III_e157ba22cd.png",
  "Venator-Level1_f745282e98.png",
  "Vertical_Grip_II_06f0877aa5.png",
  "Trigger_Nade_a68e53c662.png",
  "Torrente-Level1_4c179e6909.png",
  "Tempest-Level1_3e74f4b8f2.png",
  "Tagging_Grenade_76f0885a0b.png",
  "Tactical_Mk._3__Healing__3e45bd6fe9.png",
  "Tactical_Mk._3__Defensive__7ef33e823b.png",
  "Stable_Stock_III_14dce56e4f.png",
  "Stable_Stock_II_49853b0d73.png",
  "Smoke_Grenade_d211fd4b6e.png",
  "Snap_Hook_652f25b1ec.png",
  "Silencer_I_e702af3150.png",
  "Silencer_II_c3b8f6cd10.png",
  "Showstopper_80e11cbf02.png",
  "Shotgun_Silencer_e77598809f.png",
  "Shotgun_Choke_II_0fb1aeefc5.png",
  "Shotgun_Choke_III_d60e0aa440.png",
  "Padded_Stock_2d6217c623.png",
  "Remote_Raider_Flare_68128283b2.png",
  "Osprey-Level1_14b1a9548e.png",
  "Muzzle_Brake_III_d7c83e1c81.png",
  "Medium_Gun_Parts_fb4d3a320f.png",
  "Muzzle_Brake_II_65024a4a81.png",
  "Lure_Grenade_fdb536acb5.png",
  "Looting_Mk._3__Survivor__f49308eb27.png",
  "Blue_Light_Stick_d11f5037e4.png",
  "Lightweight_Stock_ff34cc3948.png",
  "Light_Gun_Parts_48a0ac28f7.png",
  "Jupiter_7c063c26c9.png",
  "Jolt_Mine_4b49b4b521.png",
  "Il_Toro-Level1_68a279b4f2.png",
  "Hullcracker-Level1_487079afcf.png",
  "Horizontal_Grip_0fc841c520.png",
  "Heavy_Gun_Parts_7d1986dfd5.png",
  "Equalizer_2299676690.png",
  "Extended_Shotgun_Mag_III_ddfb6650ba.png",
  "Extended_Shotgun_Mag_II_ccad252d22.png"
];
const LOCAL_IMAGE_MAP = (() => {
  const m = new Map();
  for (const f of LOCAL_IMAGE_FILES) {
    // strip ".png" and trailing "_<hash>"
    const stem = f.replace(/\.png$/i, "");
    const base = stem.replace(/_[0-9a-f]{10}$/i, "");
    m.set(base, f);
  }
  return m;
})();

function normalizeWikiStem(stem) {
  if (!stem) return "";
  try { stem = decodeURIComponent(stem); } catch (_e) { }
  stem = stem.replace(/\.webp$/i, "").replace(/\.png$/i, "");
  // Magazine -> Mag
  stem = stem.replace(/Magazine/g, "Mag");
  // Convert common wiki filename quirks into our local naming scheme
  // Combat_Mk._3_(Flanking) -> Combat_Mk._3__Flanking__
  // We match optional space before ( so we don't get triple underscores like ___Flanking__
  stem = stem.replace(/\s*\(/g, "__").replace(/\)/g, "__");
  // Trigger_'Nade -> Trigger_Nade
  stem = stem.replace(/['’]/g, "");
  // Spaces -> underscores
  stem = stem.replace(/\s+/g, "_");
  // Clean up trailing underscores if any (optional, but good for consistency)
  stem = stem.replace(/_+$/, "");
  return stem;
}

const MANUAL_IMAGE_MAPPINGS = {
  "Light_Stick__Any_Color": "Blue_Light_Stick"
};

// === Collection Management ===
const COLLECTION_STORAGE_KEY = "arc_collection_v1";

function loadCollectionState() {
  try {
    const data = localStorage.getItem(COLLECTION_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Support legacy format (array of strings) or new format object
      if (Array.isArray(parsed)) {
        state.collectedItems = new Set(parsed);
      } else {
        if (parsed.collected) state.collectedItems = new Set(parsed.collected);
        if (parsed.wishlist) state.wishlistedItems = new Set(parsed.wishlist);
      }
    }
  } catch (e) {
    console.error("Failed to load collection state:", e);
  }
}

function saveCollectionState() {
  try {
    const data = {
      collected: Array.from(state.collectedItems),
      wishlist: Array.from(state.wishlistedItems)
    };
    localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save collection state:", e);
  }
}

const FILTERS_STORAGE_KEY = "arc_filters_v1";

function saveFilters() {
  try {
    const data = {
      rarities: Array.from(state.filters.rarities),
      types: Array.from(state.filters.types),
      maps: Array.from(state.filters.maps),
      conds: Array.from(state.filters.conds),
      confs: Array.from(state.filters.confs),
      collected: state.filters.collected,
      sort: state.filters.sort
    };
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save filters:", e);
  }
}

function loadFilters() {
  try {
    const data = localStorage.getItem(FILTERS_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.rarities) state.filters.rarities = new Set(parsed.rarities);
      if (parsed.types) state.filters.types = new Set(parsed.types);
      if (parsed.maps) state.filters.maps = new Set(parsed.maps);
      if (parsed.conds) state.filters.conds = new Set(parsed.conds);
      if (parsed.confs) state.filters.confs = new Set(parsed.confs);
      if (parsed.collected) state.filters.collected = parsed.collected;
      if (parsed.sort) state.filters.sort = parsed.sort;
    }
  } catch (e) {
    console.error("Failed to load filters:", e);
  }
}

function updateCardVisuals(frame, itemName) {
  if (!frame) return;
  // Clear existing visuals
  frame.querySelectorAll(".collected-badge, .collected-glow, .wishlist-badge, .wishlist-glow, .collection-hint").forEach(el => el.remove());

  const isCollected = state.collectedItems.has(itemName);
  const isWishlisted = state.wishlistedItems.has(itemName);

  // Unified Visual Logic
  if (isCollected) {
    const badge = document.createElement("div");
    badge.className = "collected-badge";
    badge.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    frame.appendChild(badge);

    const glow = document.createElement("div");
    glow.className = "collected-glow";
    frame.appendChild(glow);
  } else if (isWishlisted) {
    const badge = document.createElement("div");
    badge.className = "wishlist-badge";
    badge.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`;
    frame.appendChild(badge);

    const glow = document.createElement("div");
    glow.className = "wishlist-glow";
    frame.appendChild(glow);
  }

  if (state.currentTab === "collection") {
    // Interaction Hints
    let hintIcon = "";
    let hintText = "";
    let showHint = false;

    if (isCollected) {
      hintIcon = `<svg viewBox="0 0 24 24" width="20" height="20" fill="#fbbf24" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`;
      hintText = "Click to Wishlist";
      showHint = true;
    } else if (isWishlisted) {
      hintIcon = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="#f87171" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      hintText = "Click To Unwishlist";
      showHint = true;
    } else {
      hintIcon = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="white" stroke-width="2" fill="none"><path d="M12 5v14M5 12h14"></path></svg>`;
      hintText = "Click to Collect";
      showHint = true;
    }

    if (showHint) {
      const hint = document.createElement("div");
      hint.className = "collection-hint";
      hint.innerHTML = `
          <div class="collection-hint-icon">${hintIcon}</div>
          <div class="collection-hint-text">${hintText}</div>
        `;
      if (isCollected || isWishlisted) {
        hint.classList.add("hint-hidden");
      }
      frame.appendChild(hint);
    }
  }
}

function cycleItemStatus(itemName, frame) {
  // Cycle: Uncollected -> Collected -> Wishlisted -> Uncollected
  if (state.collectedItems.has(itemName)) {
    // Was Collected -> Make Wishlisted
    state.collectedItems.delete(itemName);
    state.wishlistedItems.add(itemName);
  } else if (state.wishlistedItems.has(itemName)) {
    // Was Wishlisted -> Make Uncollected
    state.wishlistedItems.delete(itemName);
  } else {
    // Was Uncollected -> Make Collected
    state.collectedItems.add(itemName);
  }

  saveCollectionState();
  syncToCloud(); // Sync to Firebase if logged in

  // Directly update the card UI without full re-render
  // This is an optimization. But given we need to change badge styles, 
  // we might want to just call renderGrid() or implement specific update logic.
  // For now, let's stick to simple re-render to avoid desync bugs.
  // Actually, let's keep it efficient and just update the visuals if possible, 
  // but full render is safer for the new logic.
  updateCardVisuals(frame, itemName);
  updateProgress();
}

function updateProgress() {
  const container = document.getElementById("collectionProgressContainer");
  if (!container) return;

  const total = state.all.length;
  const collected = state.collectedItems.size;
  const percent = total > 0 ? Math.round((collected / total) * 100) : 0;

  // Update text
  const pctEl = document.getElementById("progressPercent");
  const countEl = document.getElementById("progressCount");

  if (pctEl) pctEl.textContent = `${percent}%`;
  if (countEl) countEl.textContent = `${collected} / ${total}`;

  // Update bar width & color
  const bar = document.getElementById("progressBar");
  if (bar) {
    bar.style.width = `${percent}%`;
    // Dynamic color: Red (0) -> Green (120)
    const hue = Math.floor(percent * 1.2);
    bar.style.backgroundColor = `hsl(${hue}, 80%, 50%)`;
    bar.style.backgroundImage = 'none';
  }
}

function animateNumber(element, start, end, duration) {
  if (!element) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = `${current}%`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = `${end}%`;
    }
  };
  window.requestAnimationFrame(step);
}

// Hook into Tab Switching to animate
document.addEventListener("DOMContentLoaded", () => {
  const tabColl = document.getElementById("tabCollection");
  const tabBP = document.getElementById("tabBlueprints");
  const container = document.getElementById("collectionProgressContainer");

  if (tabColl) {
    tabColl.addEventListener("click", () => {
      const bar = document.getElementById("progressBar");
      const pctEl = document.getElementById("progressPercent");

      // Get target values
      const total = state.all.length;
      const collected = state.collectedItems.size;
      const targetPercent = total > 0 ? Math.round((collected / total) * 100) : 0;

      if (bar) {
        // Reset
        bar.style.transition = "none";
        bar.style.width = "0%";
        bar.style.backgroundColor = "hsl(0, 80%, 50%)"; // Start Red
      }
      if (pctEl) {
        pctEl.textContent = "0%";
      }

      if (container) container.classList.remove("hidden");

      // Trigger Animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (bar) {
            // Slower animation: 2.5s
            bar.style.transition = "width 2.5s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 2.5s linear";
            updateProgress(); // Sets width and final color
          }
          if (pctEl) {
            animateNumber(pctEl, 0, targetPercent, 2500);
          }
        });
      });
    });
  }

  if (tabBP) {
    tabBP.addEventListener("click", () => {
      if (container) container.classList.add("hidden");
    });
  }
});

// === Firebase Cloud Sync ===
async function syncToCloud() {
  if (!auth.currentUser) return;
  try {
    const userRef = doc(db, "users", auth.currentUser.uid);
    await setDoc(userRef, {
      collectedItems: Array.from(state.collectedItems),
      wishlistedItems: Array.from(state.wishlistedItems),
      lastSync: new Date().toISOString(),
      updatedAt: new Date()
    }, { merge: true });
    console.log("Cloud sync successful.");
  } catch (e) {
    console.error("Cloud sync failed:", e);
  }
}

async function loadFromCloud(user) {
  try {
    console.log("Loading collection from cloud...");
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();

      let changed = false;

      if (data.collectedItems) {
        // MERGE logic for Collected
        const cloudCollected = new Set(data.collectedItems);
        const preSize = state.collectedItems.size;
        cloudCollected.forEach(item => state.collectedItems.add(item));
        if (state.collectedItems.size > preSize) changed = true;
      }

      if (data.wishlistedItems) {
        // MERGE logic for Wishlist
        const cloudWish = new Set(data.wishlistedItems);
        const preSize = state.wishlistedItems.size;
        cloudWish.forEach(item => state.wishlistedItems.add(item));
        if (state.wishlistedItems.size > preSize) changed = true;
      }

      if (changed) {
        console.log("Cloud sync merged new items.");
        saveCollectionState(); // Sync back to local storage
        applyFilters(); // Refresh UI
        syncToCloud(); // Push back any local diffs
      }
    } else {
      console.log("No cloud data found for user. Creating initial sync...");
      syncToCloud(); // First time login, save local progress to cloud
    }
  } catch (e) {
    console.error("Loading from cloud failed:", e);
  }
}

function initAuth() {
  const loginBtn = document.getElementById("loginBtn");
  const loginBtnMob = document.getElementById("loginBtnMobile");
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutBtnMob = document.getElementById("logoutBtnMobile");

  const login = async () => {
    try {
      console.log("Attempting Google Sign-in...");
      await signInWithPopup(auth, googleProvider);
      console.log("Sign-in successful!");
    } catch (error) {
      console.error("Firebase Auth Error:", error.code, error.message);
      if (error.code === 'auth/popup-closed-by-user') {
        console.warn("Popup was closed before finishing.");
      } else if (error.code === 'auth/operation-not-allowed') {
        alert("Google Sign-in is not enabled in the Firebase Console.");
      } else if (error.code === 'auth/unauthorized-domain') {
        alert("This domain is not authorized for Firebase Auth. Check your Firebase Console settings.");
      } else {
        alert("Sign-in failed: " + error.message);
      }
    }
  };
  const logout = () => signOut(auth).catch(console.error);

  if (loginBtn) loginBtn.onclick = login;
  if (loginBtnMob) loginBtnMob.onclick = login;
  if (logoutBtn) logoutBtn.onclick = logout;
  if (logoutBtnMob) logoutBtnMob.onclick = logout;

  onAuthStateChanged(auth, (user) => {
    const authSection = document.getElementById("authSection");
    const userProfile = document.getElementById("userProfile");
    const authSectionMob = document.getElementById("authSectionMobile");
    const userProfileMob = document.getElementById("userProfileMobile");

    if (user) {
      // Logged in
      if (loginBtn) loginBtn.classList.add("hidden");
      if (loginBtnMob) loginBtnMob.classList.add("hidden");
      if (userProfile) userProfile.classList.remove("hidden");
      if (userProfileMob) userProfileMob.classList.remove("hidden");

      // Update profile info
      const photo = document.getElementById("userPhoto");
      const name = document.getElementById("userName");
      const photoMob = document.getElementById("userPhotoMobile");
      const nameMob = document.getElementById("userNameMobile");

      if (photo) photo.src = user.photoURL || "";
      if (name) name.textContent = user.displayName || "Explorer";
      if (photoMob) photoMob.src = user.photoURL || "";
      if (nameMob) nameMob.textContent = user.displayName || "Explorer";

      loadFromCloud(user);
    } else {
      // Logged out
      if (loginBtn) loginBtn.classList.remove("hidden");
      if (loginBtnMob) loginBtnMob.classList.remove("hidden");
      if (userProfile) userProfile.classList.add("hidden");
      if (userProfileMob) userProfileMob.classList.add("hidden");
    }
  });
}

function switchTab(tabName) {
  state.currentTab = tabName;

  // Update tab button states
  const blueprintsBtn = document.getElementById("tabBlueprints");
  const collectionBtn = document.getElementById("tabCollection");
  const collectionOnlyElements = document.querySelectorAll(".collection-only");

  if (tabName === "blueprints") {
    blueprintsBtn.classList.add("tab-button-active");
    collectionBtn.classList.remove("tab-button-active");
    document.body.classList.remove("collection-mode");
    collectionOnlyElements.forEach(el => el.classList.add("hidden"));
  } else {
    blueprintsBtn.classList.remove("tab-button-active");
    collectionBtn.classList.add("tab-button-active");
    document.body.classList.add("collection-mode");
    collectionOnlyElements.forEach(el => el.classList.remove("hidden"));
  }

  applyFilters();
}

// Initialize tab navigation
function initTabNavigation() {
  const blueprintsBtn = document.getElementById("tabBlueprints");
  const collectionBtn = document.getElementById("tabCollection");

  if (blueprintsBtn) {
    blueprintsBtn.onclick = () => switchTab("blueprints");
  }
  if (collectionBtn) {
    collectionBtn.onclick = () => switchTab("collection");
  }
}


function resolveLocalImageUrl(imgUrl, itemName) {
  // 1) If sheet already points to a local image path, keep it.
  if (imgUrl && (imgUrl.startsWith("./images/") || imgUrl.includes("/arcblueprinttracker/images/"))) return imgUrl;

  // 2) Prefer deriving from sheet Image URL filename (arcraiders.wiki/.../<File>.png)
  let stem = "";
  if (imgUrl) {
    const parts = imgUrl.split("?");
    const path = parts[0];
    stem = path.split("/").pop() || "";
  }
  stem = normalizeWikiStem(stem);

  // 3) Fallback: derive from item name (spaces -> underscores)
  const fromName = normalizeWikiStem((itemName || "").trim());

  // 2.5) Check manual mappings
  if (MANUAL_IMAGE_MAPPINGS[fromName]) {
    const mapped = MANUAL_IMAGE_MAPPINGS[fromName];
    // Try exact or prefix match for the mapped name
    if (LOCAL_IMAGE_MAP.has(mapped)) return LOCAL_IMAGE_BASE + LOCAL_IMAGE_MAP.get(mapped);
    for (const [base, filename] of LOCAL_IMAGE_MAP.entries()) {
      if (base.startsWith(mapped)) return LOCAL_IMAGE_BASE + filename;
    }
  }

  // Try exact matches in map
  const candidates = [stem, fromName];
  for (const c of candidates) {
    if (!c) continue;
    if (LOCAL_IMAGE_MAP.has(c)) return LOCAL_IMAGE_BASE + LOCAL_IMAGE_MAP.get(c);
  }

  // Try loose match: if any local base starts with candidate
  for (const c of candidates) {
    if (!c) continue;
    for (const [base, filename] of LOCAL_IMAGE_MAP.entries()) {
      if (base === c) return LOCAL_IMAGE_BASE + filename;
      if (base.startsWith(c)) return LOCAL_IMAGE_BASE + filename;
    }
  }

  // Give up: return empty string (don't use the CSV URL as it might be a Wiki link)
  return "";
}
const GRID = {
  min: 70,
  max: 220,
  step: 10,
  default: 120,
  storageKey: "arc_gridSize_v2",
};

const RARITY = {
  Common: { color: "#717471", rank: 1 },
  Uncommon: { color: "#41EB6A", rank: 2 },
  Rare: { color: "#1ECBFC", rank: 3 },
  Epic: { color: "#D8299B", rank: 4 },
  Legendary: { color: "#FBC700", rank: 5 },
};

const CONFIDENCE_COLORS = {
  "Confirmed": RARITY.Legendary.color,
  "Very High": RARITY.Epic.color,
  "Confident": RARITY.Rare.color,
  "Low": RARITY.Uncommon.color,
  "Not Enough Data": "#E11D48" // Red
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
  return LOCAL_ICON_BASE + encodeURIComponent(fileName);
}

function setGridSize(px) {
  const val = Math.max(GRID.min, Math.min(GRID.max, Number(px) || GRID.default));
  document.documentElement.style.setProperty("--cardSize", `${val}px`);
  // Also set inline style as a fallback in case CSS isn't loading/cached.
  const grid = document.getElementById("grid");
  if (grid) {
    grid.style.gridTemplateColumns = `repeat(auto-fill, minmax(${val}px, 1fr))`;
  }
  try { localStorage.setItem(GRID.storageKey, String(val)); } catch { }
  const l1 = document.getElementById("gridSizeLabel");
  const l2 = document.getElementById("gridSizeLabelMobile");
  if (l1) l1.textContent = `${val}px`;
  if (l2) l2.textContent = `${val}px`;
}

function loadGridSize() {
  try {
    const v = localStorage.getItem(GRID.storageKey);
    if (v) return Number(v);

    // Mobile detection: set smaller default grid size
    const isMobile = window.innerWidth <= 768;
    return isMobile ? 120 : GRID.default;
  } catch {
    const isMobile = window.innerWidth <= 768;
    return isMobile ? 120 : GRID.default;
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
  currentTab: "blueprints", // "blueprints" or "collection"
  collectedItems: new Set(), // Set of collected item names
  wishlistedItems: new Set(), // Set of wishlisted item names
  filters: {
    rarities: new Set(),
    types: new Set(),
    maps: new Set(),

    conds: new Set(),
    confs: new Set(),
    search: "",
    sort: "rarity_desc",
    collected: "all", // "all", "collected", "not-collected", "wishlist"
  },
  facets: {
    rarities: [],
    types: [],
    maps: [],
    types: [],

    conds: [],
    confs: [],
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
  function openDrawer() {
    drawer.classList.remove("hidden");
    document.body.classList.add("no-scroll");
  }
  function closeDrawer() {
    drawer.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  }
  function toggleDrawer() {
    const isClosing = !drawer.classList.contains("hidden");
    drawer.classList.toggle("hidden");
    if (isClosing) {
      document.body.classList.remove("no-scroll");
    } else {
      document.body.classList.add("no-scroll");
    }
  }
  if (openBtn) openBtn.onclick = openDrawer;
  const mobileFilterBtn = document.getElementById("mobileFilterBtn");
  if (mobileFilterBtn) mobileFilterBtn.onclick = toggleDrawer;
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
    saveFilters();
  };
  if (sort1) sort1.onchange = (e) => onSort(e.target.value);
  if (sort2) sort2.onchange = (e) => onSort(e.target.value);

  const resetAll = () => {
    state.filters.rarities.clear();
    state.filters.types.clear();
    state.filters.maps.clear();

    state.filters.conds.clear();
    state.filters.confs.clear();
    state.filters.search = "";
    state.filters.sort = "rarity_desc";
    if (s1) s1.value = "";
    if (s2) s2.value = "";
    if (sort1) sort1.value = "rarity_desc";
    if (sort2) sort2.value = "rarity_desc";
    state.filters.collected = "all";
    applyFilters();
    renderFacets();
    // Re-sync collection buttons visually since they might be "collected" or "not-collected"
    initCollectionFilters(); // This re-binds but also re-syncs visual state based on state.filters.collected
    saveFilters();
  };
  ["resetBtn", "resetBtn2", "resetBtnMobile"].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.onclick = resetAll;
  });

  const bindAll = (id, set) => {
    const b = document.getElementById(id);
    if (b) b.onclick = () => { set.clear(); applyFilters(); renderFacets(); saveFilters(); };
  };
  bindAll("rarityAllBtn", state.filters.rarities);
  bindAll("typeAllBtn", state.filters.types);
  bindAll("mapAllBtn", state.filters.maps);

  bindAll("condAllBtn", state.filters.conds);
  bindAll("confAllBtn", state.filters.confs);
  bindAll("rarityAllBtnMobile", state.filters.rarities);
  bindAll("typeAllBtnMobile", state.filters.types);
  bindAll("mapAllBtnMobile", state.filters.maps);
  bindAll("condAllBtnMobile", state.filters.conds);
  bindAll("confAllBtnMobile", state.filters.confs);

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
  // Collapsible sections
  const setupCollapsible = (toggleId, contentId, iconId) => {
    const toggle = document.getElementById(toggleId);
    const content = document.getElementById(contentId);
    const icon = document.getElementById(iconId);
    if (toggle && content && icon) {
      toggle.onclick = () => {
        content.classList.toggle("hidden");
        icon.classList.toggle("rotate-180");
      };
    }
  };

  // Desktop
  setupCollapsible("toggleRarity", "rarityFilters", "iconRarity");
  setupCollapsible("toggleType", "typeFilters", "iconType");
  setupCollapsible("toggleMap", "mapFilters", "iconMap");
  setupCollapsible("toggleCond", "condFilters", "iconCond");
  setupCollapsible("toggleConf", "confFilters", "iconConf");
  // Mobile
  setupCollapsible("toggleRarityMobile", "rarityFiltersMobile", "iconRarityMobile");
  setupCollapsible("toggleTypeMobile", "typeFiltersMobile", "iconTypeMobile");
  setupCollapsible("toggleMapMobile", "mapFiltersMobile", "iconMapMobile");
  setupCollapsible("toggleCondMobile", "condFiltersMobile", "iconCondMobile");
  setupCollapsible("toggleConfMobile", "confFiltersMobile", "iconConfMobile");
}

function loadData() {
  setMetaLine("Fetching sheet...");
  const url = getCsvUrl() + "&t=" + Date.now();

  Papa.parse(url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: (res) => {
      const rows = res.data || [];
      const headers = res.meta?.fields || Object.keys(rows[0] || {});

      const colName = findHeader(headers, ["Blueprint Name", "Item Name", "Name", "Item"]);
      const colType = findHeader(headers, ["Item Type", "Type"]);
      const colTypeIcon = findHeader(headers, [
        "Item Type Icon",
        "Type Icon",
        "Item Type Icon URL",
        "Type Icon URL",
        "Item Type Icon File",
        "Type Icon File",
      ]);
      const colMap = findHeader(headers, ["Most Likely Map", "Map"]);
      const colCond = findHeader(headers, ["Most Likely Condition", "Condition"]);
      const colLoc = findHeader(headers, ["Most Likely Location", "Location"]);
      const colCont = findHeader(headers, ["Most Likely Container", "Container"]);
      const colImg = findHeader(headers, ["Image URL", "ImageURL", "Icon URL", "Thumbnail", "Image"]);
      const colRarity = findHeader(headers, ["Rarity", "Item Rarity"]);
      const colConf = findHeader(headers, ["Data Confidence", "Confidence"]);
      const colWiki = findHeader(headers, ["Item URL", "Wiki URL", "URL", "Link", "Wiki"]) || headers[7];

      state.columns = { name: colName, type: colType, typeIcon: colTypeIcon, map: colMap, cond: colCond, loc: colLoc, cont: colCont, img: colImg, rarity: colRarity, conf: colConf, wiki: colWiki };

      const items = [];
      for (const r of rows) {
        const name = norm(r[colName]);
        if (!name) continue;

        const type = norm(r[colType]);
        const map = norm(r[colMap]);
        const cond = norm(r[colCond]);
        const loc = norm(r[colLoc]);
        const cont = norm(r[colCont]);
        const imgRaw = norm(r[colImg]);
        const img = resolveLocalImageUrl(imgRaw, name);
        const rarity = parseRarity(r[colRarity]);
        const conf = colConf ? norm(r[colConf]) : "";
        const wiki = norm(r[colWiki]);

        const iconFromSheet = colTypeIcon ? iconFromCellValue(r[colTypeIcon]) : "";
        const typeIcon = iconFromSheet || detectIconForType(type);
        items.push({ name, type, map, cond, loc, cont, img, rarity, conf, wiki, typeIcon });
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
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

// 5) Not Enough Data
const CONFIDENCE_ORDER = [
  "Confirmed",
  "Very High",
  "Confident",
  "Low",
  "Not Enough Data"
];

const TYPE_ORDER = [
  "Augment",
  "Weapon",
  "Quick Use",
  "Grenade",
  "Mod",
  "Material"
];

function buildFacets() {
  state.facets.rarities = uniqSorted(state.all.map(i => i.rarity)).sort((a, b) => rarityRank(b) - rarityRank(a));
  state.facets.types = uniqSorted(state.all.map(i => i.type))
    .sort((a, b) => {
      let ia = TYPE_ORDER.indexOf(a);
      let ib = TYPE_ORDER.indexOf(b);
      if (ia === -1) ia = 999;
      if (ib === -1) ib = 999;
      return ia - ib || a.localeCompare(b);
    });
  state.facets.maps = uniqSorted(state.all.map(i => i.map));

  state.facets.conds = uniqSorted(state.all.map(i => i.cond));
  // Sort confidence by predefined order
  state.facets.confs = uniqSorted(state.all.map(i => i.conf))
    .sort((a, b) => {
      let ia = CONFIDENCE_ORDER.indexOf(a);
      let ib = CONFIDENCE_ORDER.indexOf(b);
      if (ia === -1) ia = 999;
      if (ib === -1) ib = 999;
      return ia - ib;
    });
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
    conf: [document.getElementById("confFilters"), document.getElementById("confFiltersMobile")],
  };

  for (const el of targets.rarity) {
    if (!el) continue;
    el.innerHTML = "";
    for (const r of state.facets.rarities) {
      const active = state.filters.rarities.has(r);
      const c = rarityColor(r);
      const btn = document.createElement("button");
      btn.className = "px-3 py-2 rounded-xl border text-xs font-semibold backdrop-blur-md transition-all hover:brightness-125";

      // Glassy style: "22" = ~13% opacity, "66" = ~40% opacity
      const bg = active ? c + "66" : c + "22";

      btn.style.background = bg;
      btn.style.borderColor = c;
      btn.style.color = "#f4f4f5"; // zinc-100

      btn.onclick = () => { toggleInSet(state.filters.rarities, r); applyFilters(); renderFacets(); saveFilters(); };
      btn.textContent = r;
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
      btn.onclick = () => { toggleInSet(state.filters.types, t); applyFilters(); renderFacets(); saveFilters(); };
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
      el.appendChild(chip(m, active, () => { toggleInSet(state.filters.maps, m); applyFilters(); renderFacets(); saveFilters(); }));
    }
  }

  for (const el of targets.cond) {
    if (!el) continue;
    el.innerHTML = "";
    for (const c of state.facets.conds) {
      const active = state.filters.conds.has(c);
      el.appendChild(chip(c, active, () => { toggleInSet(state.filters.conds, c); applyFilters(); renderFacets(); saveFilters(); }));
    }
  }

  for (const el of targets.conf) {
    if (!el) continue;
    el.innerHTML = "";
    for (const c of state.facets.confs) {
      if (!c) continue;
      const active = state.filters.confs.has(c);
      const color = CONFIDENCE_COLORS[c] || "#71717a";

      const btn = document.createElement("button");
      btn.className = "flex items-center gap-2 px-3 py-2 rounded-xl border text-xs hover:bg-zinc-800";
      btn.style.borderColor = active ? color : "rgb(39 39 42)";
      btn.style.background = active ? "rgba(255,255,255,0.04)" : "rgb(24 24 27)";
      btn.onclick = () => { toggleInSet(state.filters.confs, c); applyFilters(); renderFacets(); saveFilters(); };

      const dot = document.createElement("span");
      dot.className = "confidence-dot";
      dot.style.background = color;

      const label = document.createElement("span");
      label.textContent = c;

      btn.appendChild(dot); btn.appendChild(label);
      el.appendChild(btn);
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

  if (state.filters.rarities.size) push(`Rarity: ${Array.from(state.filters.rarities).join(", ")}`, () => { state.filters.rarities.clear(); applyFilters(); renderFacets(); saveFilters(); });
  if (state.filters.types.size) push(`Type: ${Array.from(state.filters.types).join(", ")}`, () => { state.filters.types.clear(); applyFilters(); renderFacets(); saveFilters(); });
  if (state.filters.maps.size) push(`Map: ${Array.from(state.filters.maps).join(", ")}`, () => { state.filters.maps.clear(); applyFilters(); renderFacets(); saveFilters(); });

  if (state.filters.conds.size) push(`Condition: ${Array.from(state.filters.conds).join(", ")}`, () => { state.filters.conds.clear(); applyFilters(); renderFacets(); saveFilters(); });
  if (state.filters.confs.size) push(`Confidence: ${Array.from(state.filters.confs).join(", ")}`, () => { state.filters.confs.clear(); applyFilters(); renderFacets(); saveFilters(); });

  // Collection Status Chip
  if (state.filters.collected !== "all") {

    let label = "Collected";
    if (state.filters.collected === "not-collected") label = "Not Collected";
    if (state.filters.collected === "wishlist") label = "Wishlist";

    push(`Status: ${label}`, () => {
      // Revert to all
      state.filters.collected = "all";
      applyFilters();
      renderFacets();
      // Update visual buttons
      initCollectionFilters();
      saveFilters();
    });
  }
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
  const hasConf = state.filters.confs.size > 0;


  let out = state.all.filter(it => {
    if (hasR && !state.filters.rarities.has(it.rarity)) return false;
    if (hasT && !state.filters.types.has(it.type)) return false;
    if (hasM && !state.filters.maps.has(it.map)) return false;
    if (hasC && !state.filters.conds.has(it.cond)) return false;
    if (hasConf && !state.filters.confs.has(it.conf)) return false;

    // Collection filter (works in both tabs)
    const isCollected = state.collectedItems.has(it.name);
    const isWishlisted = state.wishlistedItems.has(it.name);

    if (state.filters.collected === "collected" && !isCollected) return false;
    if (state.filters.collected === "wishlist" && !isWishlisted) return false;
    // "not-collected" means neither collected nor wishlisted? 
    // Or just not collected? User likely wants to see everything they still need.
    // Let's hide collected items. Wishlisted items are technically "not collected" yet.
    if (state.filters.collected === "not-collected" && isCollected) return false;

    if (q) {
      const blob = (it.name + " " + it.type + " " + it.map + " " + it.cond + " " + it.loc + " " + it.cont).toLowerCase();
      if (!blob.includes(q)) return false;
    }
    return true;
  });

  const sort = state.filters.sort;
  out.sort((a, b) => {
    if (sort === "name_asc") return a.name.localeCompare(b.name);
    if (sort === "name_desc") return b.name.localeCompare(a.name);
    if (sort === "type_asc") return (a.type || "").localeCompare(b.type || "");
    if (sort === "rarity_desc") return rarityRank(b.rarity) - rarityRank(a.rarity) || a.name.localeCompare(b.name);
    if (sort === "rarity_asc") return rarityRank(a.rarity) - rarityRank(b.rarity) || a.name.localeCompare(b.name);
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


  const cards = [];

  for (const it of state.filtered) {
    const card = document.createElement("div");
    card.className = "card-compact bg-zinc-950 border border-zinc-800 rounded-2xl p-2 opacity-0"; // Start invisible
    card.style.position = "relative";
    card.style.overflow = "visible";
    // Reuse style settings

    const frame = document.createElement("div");
    frame.className = "rarity-frame rarity-glow relative overflow-hidden";
    frame.style.borderColor = rarityColor(it.rarity);

    const imgWrap = document.createElement("div");
    imgWrap.className = "relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden";
    // Background: Rarity gradient fades (0% -> 75%) into dark grey - middle ground
    imgWrap.style.background = `linear-gradient(to top right, ${rarityColor(it.rarity)}44 0%, rgba(24,24,27,0.5) 75%)`;
    // Inline fallbacks in case a utility class doesn't load.
    imgWrap.style.aspectRatio = "1 / 1";
    imgWrap.style.width = "100%";

    const img = document.createElement("img");
    img.src = it.img || "";
    img.alt = it.name;
    img.className = "w-full h-full object-contain p-2 relative z-10";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
    img.style.padding = "8px";
    img.loading = "lazy";

    // Hover effect: Expand image slightly when card is hovered
    card.style.transition = "transform 0.2s"; // Ensure smooth scaling if using CSS, but here we use motion animate
    card.addEventListener("mouseenter", () => animate(img, { scale: 1.1 }));
    card.addEventListener("mouseleave", () => animate(img, { scale: 1 }));

    const corner = document.createElement("div");
    corner.className = "rarity-corner";
    // Concave ramp: Center shifted out, hard stop for sharpness (60% -> 60%)
    corner.style.background = `radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${rarityColor(it.rarity)}66 60%, ${rarityColor(it.rarity)}cc 100%)`;

    const tab = document.createElement("div");
    tab.className = "type-tab";
    tab.style.background = rarityColor(it.rarity) + "22";
    tab.style.borderColor = rarityColor(it.rarity);

    const tabIcon = document.createElement("img");
    tabIcon.src = it.typeIcon;
    tabIcon.alt = it.type;

    const tabText = document.createElement("span");
    tabText.className = "";
    tabText.textContent = it.type || "—";

    tab.appendChild(tabIcon);
    tab.appendChild(tabText);

    imgWrap.appendChild(img);
    imgWrap.appendChild(corner);
    imgWrap.appendChild(tab);

    const title = document.createElement("div");
    title.className = "mt-2 px-1 pb-1";

    const name = document.createElement("div");
    name.className = "font-semibold leading-tight";
    name.style.fontSize = "clamp(13px, calc(var(--cardSize)/18), 16px)";
    name.textContent = it.name;
    title.appendChild(name);
    const details = document.createElement("div");
    details.className = "details-overlay hidden";

    const makeRow = (label, value) => {
      // Hide if value is empty or exactly "N/A"
      if (!value || value === "N/A") return null;
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

    if (it.conf) {
      const row = document.createElement("div");
      row.className = "details-row";

      const label = document.createElement("div");
      label.className = "details-label";
      label.textContent = "Data Confidence";

      const val = document.createElement("div");
      val.className = "details-value details-confidence";

      const dot = document.createElement("span");
      dot.className = "confidence-dot";
      dot.style.background = CONFIDENCE_COLORS[it.conf] || "#71717a";

      const text = document.createElement("span");
      text.textContent = it.conf;

      val.appendChild(dot);
      val.appendChild(text);

      row.appendChild(label);
      row.appendChild(val);
      details.appendChild(row);
    }

    if (it.wiki) {
      const a = document.createElement("a");
      a.href = it.wiki;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.className = "mt-2 inline-block text-xs text-zinc-300 hover:text-white underline decoration-zinc-700";
      a.textContent = "Item URL";
      details.appendChild(a);
    }

    frame.style.cursor = "pointer";
    frame.onclick = (e) => {
      // prevent bubbling if needed, though here we want card to capture? No, frame is inside card.
      e.stopPropagation();

      const isOpen = !details.classList.contains("hidden");

      // close any other open overlays
      document.querySelectorAll(".details-overlay").forEach(d => {
        if (d !== details) {
          d.classList.add("hidden");
          d.style.transform = ""; // reset shift
          const parent = d.closest(".card-compact");
          if (parent) {
            parent.classList.remove("card-open");
            parent.style.zIndex = ""; // Reset z-index
          }
        }
      });

      if (isOpen) {
        details.classList.add("hidden");
        details.style.transform = "";
        card.classList.remove("card-open");
        card.style.zIndex = "";
      } else {
        details.classList.remove("hidden");
        card.classList.add("card-open");
        card.style.zIndex = "50"; // Bring to front

        // Overflow check
        requestAnimationFrame(() => {
          const rect = details.getBoundingClientRect();
          const margin = 12; // padding from screen edge

          let shiftX = 0;
          if (rect.left < margin) {
            shiftX = (margin - rect.left);
          } else if (rect.right > window.innerWidth - margin) {
            shiftX = (window.innerWidth - margin - rect.right);
          }

          if (shiftX !== 0) {
            // Apply shift on top of the existing centering (-50%)
            details.style.transform = `translateX(calc(-50% + ${shiftX}px))`;
          }
        });
      }
    };
    frame.appendChild(imgWrap);

    // Collection mode features
    updateCardVisuals(frame, it.name);

    // Different click behavior based on tab
    if (state.currentTab === "collection") {
      // Collection mode: Click entire card to cycle state
      frame.style.cursor = "pointer";
      frame.onclick = (e) => {
        e.stopPropagation();
        cycleItemStatus(it.name, frame);
        // UI update is handled by applyFilters() called inside cycleItemStatus
      };
    } else {
      // Blueprint mode: Click to show details
      frame.style.cursor = "pointer";
      frame.onclick = (e) => {
        // prevent bubbling if needed, though here we want card to capture? No, frame is inside card.
        e.stopPropagation();

        const isOpen = !details.classList.contains("hidden");

        // close any other open overlays
        document.querySelectorAll(".details-overlay").forEach(d => {
          if (d !== details) {
            d.classList.add("hidden");
            d.style.transform = ""; // reset shift
            const parent = d.closest(".card-compact");
            if (parent) {
              parent.classList.remove("card-open");
              parent.style.zIndex = ""; // Reset z-index
            }
          }
        });

        if (isOpen) {
          details.classList.add("hidden");
          details.style.transform = "";
          card.classList.remove("card-open");
          card.style.zIndex = "";
        } else {
          details.classList.remove("hidden");
          card.classList.add("card-open");
          card.style.zIndex = "50"; // Bring to front

          // Overflow check
          requestAnimationFrame(() => {
            const rect = details.getBoundingClientRect();
            const margin = 12; // padding from screen edge

            let shiftX = 0;
            if (rect.left < margin) {
              shiftX = (margin - rect.left);
            } else if (rect.right > window.innerWidth - margin) {
              shiftX = (window.innerWidth - margin - rect.right);
            }

            if (shiftX !== 0) {
              // Apply shift on top of the existing centering (-50%)
              details.style.transform = `translateX(calc(-50% + ${shiftX}px))`;
            }
          });
        }
      };
    }

    card.appendChild(frame);
    card.appendChild(title);
    card.appendChild(details);
    grid.appendChild(card);
    cards.push(card);
  }

  // Animate cards entrance
  if (cards.length > 0) {
    animate(
      cards,
      { opacity: [0, 1], y: [20, 0] },
      { delay: stagger(0.015) }
    );
  }
}

// document.addEventListener("DOMContentLoaded", loadData); // Moved to top



// Initialize collection filter buttons
function initCollectionFilter() {
  const allBtn = document.getElementById("collectedAll");
  const yesBtn = document.getElementById("collectedYes");
  const noBtn = document.getElementById("collectedNo");

  if (allBtn) {
    allBtn.onclick = () => {
      state.filters.collected = "all";
      allBtn.classList.add("chip-active");
      yesBtn.classList.remove("chip-active");
      noBtn.classList.remove("chip-active");
      applyFilters();
    };
  }

  if (yesBtn) {
    yesBtn.onclick = () => {
      state.filters.collected = "collected";
      allBtn.classList.remove("chip-active");
      yesBtn.classList.add("chip-active");
      noBtn.classList.remove("chip-active");
      applyFilters();
    };
  }

  if (noBtn) {
    noBtn.onclick = () => {
      state.filters.collected = "not-collected";
      allBtn.classList.remove("chip-active");
      yesBtn.classList.remove("chip-active");
      noBtn.classList.add("chip-active");
      applyFilters();
    };
  }
}








// Update initCollectionFilters to handle both tabs
function initCollectionFilters() {
  // Collection tab filters
  const allBtn = document.getElementById("collectedAll");
  const yesBtn = document.getElementById("collectedYes");
  const noBtn = document.getElementById("collectedNo");

  // Blueprints tab filters
  const allBtnBP = document.getElementById("collectedAllBlueprints");
  const yesBtnBP = document.getElementById("collectedYesBlueprints");
  const wishlistBtnBP = document.getElementById("collectedWishBlueprints");
  const noBtnBP = document.getElementById("collectedNoBlueprints");

  // Mobile filters
  const allBtnMob = document.getElementById("collectedAllMobile");
  const yesBtnMob = document.getElementById("collectedYesMobile");
  const wishlistBtnMob = document.getElementById("collectedWishMobile");
  const noBtnMob = document.getElementById("collectedNoMobile");

  const setFilter = (value) => {
    state.filters.collected = value;

    // Synchronize all instances of these buttons
    const allSets = [
      [allBtn, yesBtn, null, noBtn],
      [allBtnBP, yesBtnBP, wishlistBtnBP, noBtnBP],
      [allBtnMob, yesBtnMob, wishlistBtnMob, noBtnMob]
    ];

    allSets.forEach(set => {
      const [a, y, w, n] = set;
      if (a) {
        a.classList.remove("chip-active");
        if (value === "all") a.classList.add("chip-active");
      }
      if (y) {
        y.classList.remove("chip-active");
        if (value === "collected") y.classList.add("chip-active");
      }
      if (w) {
        w.classList.remove("chip-active");
        if (value === "wishlist") w.classList.add("chip-active");
      }
      if (n) {
        n.classList.remove("chip-active");
        if (value === "not-collected") n.classList.add("chip-active");
      }
    });

    applyFilters();
    renderFacets(); // To update the chips
    saveFilters();
  };

  // Collection tab (No wishlist button here yet, or standard 3-set)
  // Actually, UI has 3 buttons. Let's assume standard behavior.
  if (allBtn) allBtn.onclick = () => setFilter("all");
  if (yesBtn) yesBtn.onclick = () => setFilter("collected");
  if (noBtn) noBtn.onclick = () => setFilter("not-collected");

  // Blueprints tab
  if (allBtnBP) allBtnBP.onclick = () => setFilter("all");
  if (yesBtnBP) yesBtnBP.onclick = () => setFilter("collected");
  if (wishlistBtnBP) wishlistBtnBP.onclick = () => setFilter("wishlist");
  if (noBtnBP) noBtnBP.onclick = () => setFilter("not-collected");

  if (allBtnMob) allBtnMob.onclick = () => setFilter("all");
  if (yesBtnMob) yesBtnMob.onclick = () => setFilter("collected");
  if (wishlistBtnMob) wishlistBtnMob.onclick = () => setFilter("wishlist");
  if (noBtnMob) noBtnMob.onclick = () => setFilter("not-collected");

  // Initial sync on load
  setFilter(state.filters.collected);
}








