import { animate, stagger } from "motion";
import { auth, db, googleProvider } from "./firebase-config.js";
import { onAuthStateChanged, signInWithPopup, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import { doc, getDoc, setDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";

const CSV_URL_DEFAULT = "./data.csv";

// Since we are now a module, we must attach global initialization to window if it's called from HTML
// However, existing onclicks in HTML might break if functions aren't on window.
// We should attach key functions to window.
window.initUI = initUI;
window.setGridSize = setGridSize;

// We will kick off loadData when the DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
  const safeInit = (name, fn) => {
    try {
      fn();
    } catch (e) {
      console.error(`Initialization failed for ${name}:`, e);
    }
  };

  safeInit("Collection State", loadCollectionState);
  safeInit("Spares", loadSpares);
  safeInit("Filters", loadFilters);
  safeInit("Tab Navigation", initTabNavigation);
  safeInit("Switch Tab", () => switchTab(state.currentTab));
  safeInit("Collection Filters", initCollectionFilters);
  safeInit("Auth", initAuth);
  safeInit("Event Banner", initEventBanner);
  safeInit("Blueprint Submission", initBlueprintSubmission);
  safeInit("Wrapped", initWrapped);
  safeInit("Announcements", initAnnouncements);
  safeInit("Context Menu", initContextMenu);

  // loadData is core, but we wrap it too just in case
  safeInit("Data Loading", loadData);
});


// === Local assets ===
// If you host this site under /arcblueprinttracker/, put images in:
//   arcblueprinttracker/images/<files...>
// and type icons in:
//   arcblueprinttracker/icons/<ItemCategory_*.png>
const LOCAL_IMAGE_BASE = "./images/";
const LOCAL_ICON_BASE = "./icons/";

// Image Map will be populated dynamically from image-manifest.json
const LOCAL_IMAGE_MAP = new Map();

function normalizeWikiStem(stem) {
  if (!stem) return "";
  try { stem = decodeURIComponent(stem); } catch (_e) { }
  stem = stem.replace(/\.webp$/i, "").replace(/\.png$/i, "");
  // Magazine -> Mag
  stem = stem.replace(/Magazine/g, "Mag");
  // Convert common wiki filename quirks into our local naming scheme
  // Combat_Mk._3_(Flanking) -> Combat_Mk._3__Flanking__
  // We match optional space before ( and inside the parentheses
  stem = stem.replace(/\s*\(/g, "_").replace(/\)/g, "_");
  // Trigger_'Nade -> Trigger_Nade
  stem = stem.replace(/['’]/g, "");
  // Spaces -> underscores (including non-breaking spaces)
  stem = stem.replace(/\s/g, "_");
  // Collapse multiple underscores into one
  stem = stem.replace(/_+/g, "_");
  // Clean up trailing/leading underscores
  stem = stem.replace(/^_+|_+$/g, "");
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

// === Spares Management ===
const SPARES_STORAGE_KEY = "arc_spares_v1";

function loadSpares() {
  try {
    const data = localStorage.getItem(SPARES_STORAGE_KEY);
    if (data) {
      state.spares = JSON.parse(data);
    }
  } catch (e) {
    console.error("Failed to load spares:", e);
  }
}

function saveSpares() {
  try {
    localStorage.setItem(SPARES_STORAGE_KEY, JSON.stringify(state.spares));
  } catch (e) {
    console.error("Failed to save spares:", e);
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
    // Hide the toast since they're no longer marking as collected
    hideToast();
  } else if (state.wishlistedItems.has(itemName)) {
    // Was Wishlisted -> Make Uncollected
    state.wishlistedItems.delete(itemName);
  } else {
    // Was Uncollected -> Make Collected
    state.collectedItems.add(itemName);
    // Show toast asking for location data (only on collection tab)
    if (state.currentTab === "collection") {
      showCollectToast(itemName);
    }
  }

  saveCollectionState();
  debouncedSyncToCloud(); // Debounced sync to Firebase if logged in

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
  // Only count collected items that exist in state.all (excludes inactive items)
  const activeItemNames = new Set(state.all.map(item => item.name));
  const collected = [...state.collectedItems].filter(name => activeItemNames.has(name)).length;
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
      // Only count collected items that exist in state.all (excludes inactive items)
      const activeItemNames = new Set(state.all.map(item => item.name));
      const collected = [...state.collectedItems].filter(name => activeItemNames.has(name)).length;
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

async function fetchUserContributions() {
  if (!auth.currentUser) return;
  state.wrappedData.loading = true;
  try {
    const q = query(
      collection(db, "blueprintSubmissions"),
      where("userId", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    state.wrappedData.contributionCount = querySnapshot.size;
    console.log(`User has submitted ${querySnapshot.size} reports.`);
  } catch (e) {
    console.error("Failed to fetch user contributions:", e);
  } finally {
    state.wrappedData.loading = false;
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
      // FORCE "Local" Persistence (Keep logged in indefinitely)
      await setPersistence(auth, browserLocalPersistence);
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


function renderProgression() {
  const container = document.getElementById("progressionTab");
  const sidebar = document.getElementById("filtersSidebar");

  // Hide sidebar on desktop when progression tab is shown
  if (sidebar) {
    if (container && !container.classList.contains("hidden")) {
      sidebar.classList.add("md:hidden");
      sidebar.classList.remove("md:block");
    } else {
      sidebar.classList.remove("md:hidden");
      sidebar.classList.add("md:block");
    }
  }

  if (!container || container.classList.contains("hidden")) return;

  const total = state.all.length;
  // Use correct state variable for collected items
  const collected = state.collectedItems ? state.collectedItems.size : 0;

  if (total === 0) return;

  const percent = Math.round((collected / total) * 100);

  // Update Big Linear Bar
  const bar = document.getElementById("progressionBarMain");
  const sign = document.getElementById("progressionSign");
  const countLabel = document.getElementById("progressionCount");
  const totalLabel = document.getElementById("progressionTotal");

  // Animate Percentage Hero - will be synced with bar below
  // Set total immediately
  if (totalLabel) totalLabel.textContent = total;

  // Unified Animation: Bar + Percentage + Count all in sync
  if (bar) {
    // Reset bar
    bar.style.transition = "none";
    bar.style.width = "0%";
    bar.style.backgroundImage = "none";
    bar.style.backgroundColor = "hsl(340, 80%, 50%)"; // Start red-purple
    void bar.offsetWidth; // Force reflow

    // JS Animation - all elements synced
    // Duration scaled by percentage: 0% = 0s, 100% = 2.5s
    const duration = (percent / 100) * 2500;
    let startTime = null;

    const animateAll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Ease-out: fast start, slows down at end (quadratic - faster ramp down)
      let progress = Math.min(elapsed / duration, 1);
      progress = 1 - Math.pow(1 - progress, 2); // Quadratic ease-out (faster ramp down)

      const currentPercent = progress * percent;
      const currentCount = Math.floor(progress * collected);

      // Update bar width
      bar.style.width = `${currentPercent}%`;

      // Update percentage display (synced)
      if (sign) sign.textContent = `${Math.floor(currentPercent)}%`;

      // Update count display (synced)
      if (countLabel) countLabel.textContent = currentCount;

      // Smooth Color: Red-purple (340) -> Green (120)
      // Linear interpolation through the hue wheel (going backwards: 340 -> 0 -> 120 would wrap)
      // Instead, go 340 -> 360/0 -> 60 -> 120 smoothly
      // Total hue distance: 340 to 0 = 20, then 0 to 120 = 120, total = 140 degrees
      const hueProgress = currentPercent / 100;
      // Map: 0% = 340, 100% = 120 (going 340 -> 480, then wrap 480 to 120)
      let hue = 340 + (hueProgress * 140);
      if (hue >= 360) hue -= 360;

      bar.style.backgroundColor = `hsl(${hue}, 80%, 50%)`;
      bar.style.boxShadow = `0 0 20px hsl(${hue}, 80%, 40%)`;

      if (progress < 1) {
        requestAnimationFrame(animateAll);
      } else {
        // Final values
        if (sign) sign.textContent = `${percent}%`;
        if (countLabel) countLabel.textContent = collected;
      }
    };
    requestAnimationFrame(animateAll);
  }

  // Update Category Grid
  const grid = document.getElementById("progressionCategories");
  if (!grid) return;
  grid.innerHTML = "";

  // Color Mapping for Item Types (Custom Order: Augment, Weapon, Quick Use, Grenade, Mod, Material)
  // Colors left to right: Gold, Pink, Cyan, Green, Grey, White
  const typeColors = {
    "Augment": { border: "rgba(251,199,0,0.5)", bg: "rgba(251,199,0,0.1)", barFrom: "#FBC700", barTo: "#f59e0b", icon: "rgba(251,199,0,0.2)", text: "#FBC700" },         // Gold
    "Weapon": { border: "rgba(216,41,155,0.5)", bg: "rgba(216,41,155,0.1)", barFrom: "#D8299B", barTo: "#ec4899", icon: "rgba(216,41,155,0.2)", text: "#D8299B" },       // Pink
    "Quick Use": { border: "rgba(30,203,252,0.5)", bg: "rgba(30,203,252,0.1)", barFrom: "#1ECBFC", barTo: "#06b6d4", icon: "rgba(30,203,252,0.2)", text: "#1ECBFC" },    // Cyan
    "Grenade": { border: "rgba(65,235,106,0.5)", bg: "rgba(65,235,106,0.1)", barFrom: "#41EB6A", barTo: "#34d399", icon: "rgba(65,235,106,0.2)", text: "#41EB6A" },      // Green
    "Mod": { border: "rgba(255,255,255,0.5)", bg: "rgba(255,255,255,0.05)", barFrom: "#ffffff", barTo: "#d4d4d8", icon: "rgba(255,255,255,0.15)", text: "#ffffff" },        // White
    "Material": { border: "rgba(113,116,113,0.5)", bg: "rgba(113,116,113,0.1)", barFrom: "#717471", barTo: "#a1a1aa", icon: "rgba(113,116,113,0.2)", text: "#a1a1aa" }, // Grey
    // Default fallback
    "default": { border: "rgba(255,255,255,0.3)", bg: "rgba(255,255,255,0.05)", barFrom: "#52525b", barTo: "#a1a1aa", icon: "rgba(255,255,255,0.1)", text: "#d4d4d8" }
  };

  // Group items by Type
  const typeCounts = {};
  state.all.forEach(item => {
    const t = item.type || "Unknown";
    // Ensure structure exists
    if (!typeCounts[t]) typeCounts[t] = { total: 0, collected: 0, icon: item.typeIcon };

    typeCounts[t].total++;
    // Check main collection
    if (state.collectedItems && state.collectedItems.has(item.name)) {
      typeCounts[t].collected++;
    }
  });

  // Custom sort order
  const typeOrder = ["Augment", "Weapon", "Quick Use", "Grenade", "Mod", "Material"];
  const types = Object.keys(typeCounts).sort((a, b) => {
    const aIndex = typeOrder.indexOf(a);
    const bIndex = typeOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  types.forEach(type => {
    const data = typeCounts[type];
    const p = Math.round((data.collected / data.total) * 100);

    // DEBUG: Log the type being used
    console.log("Category type:", type, "Has color?", !!typeColors[type]);

    // Get color theme or default
    const theme = typeColors[type] || typeColors["default"];

    const card = document.createElement("div");
    // Glassy Card Style with Colored Border and Background Tint (Inline Styles)
    card.className = "relative overflow-hidden rounded-2xl backdrop-blur-xl p-4 flex flex-col gap-3 shadow-xl hover:brightness-110 transition-all duration-300 group";
    card.style.border = `2px solid ${theme.border}`;
    card.style.backgroundColor = theme.bg;

    // Header
    const header = document.createElement("div");
    header.className = "flex items-center gap-4 z-10";

    const iconBox = document.createElement("div");
    iconBox.className = "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner";
    iconBox.style.backgroundColor = theme.icon;
    if (data.icon) {
      const img = document.createElement("img");
      img.src = data.icon;
      img.className = "w-7 h-7 opacity-90 drop-shadow-md";
      iconBox.appendChild(img);
    }

    const textGroup = document.createElement("div");
    const title = document.createElement("div");
    title.className = "text-base font-bold tracking-wide";
    title.style.color = theme.text;
    title.textContent = type;
    const sub = document.createElement("div");
    sub.className = "text-sm text-zinc-500 font-mono";
    sub.textContent = `${data.collected} / ${data.total}`;

    textGroup.appendChild(title);
    textGroup.appendChild(sub);
    header.appendChild(iconBox);
    header.appendChild(textGroup);

    // Progress Bar (Pill Container)
    const barWrap = document.createElement("div");
    barWrap.className = "relative h-4 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 z-10";

    // Colored Bar (Inline gradient)
    const subBar = document.createElement("div");
    subBar.className = "h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-1000 ease-out";
    subBar.style.background = `linear-gradient(to right, ${theme.barFrom}, ${theme.barTo})`;
    subBar.style.width = "0%";

    // Trigger animation next frame
    requestAnimationFrame(() => {
      subBar.style.width = `${p}%`;
    });

    barWrap.appendChild(subBar);

    card.appendChild(header);
    card.appendChild(barWrap);

    // Add subtle gradient glow in background
    const bgGlow = document.createElement("div");
    bgGlow.className = `absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${theme.bar} opacity-5 blur-3xl rounded-full group-hover:opacity-10 transition-opacity pointer-events-none`;
    card.appendChild(bgGlow);

    grid.appendChild(card);
  });
}

function switchTab(tabName) {
  state.currentTab = tabName;
  window.scrollTo(0, 0);

  // Tab Buttons
  const blueprintsBtn = document.getElementById("tabBlueprints");
  const progressionBtn = document.getElementById("tabProgression");
  const dataBtn = document.getElementById("tabData");

  // Reset all active states
  [blueprintsBtn, progressionBtn, dataBtn].forEach(btn => {
    if (btn) btn.classList.remove("tab-button-active");
  });

  // Highlight active
  if (tabName === "blueprints" && blueprintsBtn) blueprintsBtn.classList.add("tab-button-active");
  if (tabName === "progression" && progressionBtn) progressionBtn.classList.add("tab-button-active");
  if (tabName === "data" && dataBtn) dataBtn.classList.add("tab-button-active");

  // View Containers
  const gridSection = document.getElementById("gridSection"); // We might need to wrap the grid+filters in a div or manage visibility of elements
  // simpler for now: toggle visibility of main interactive elements

  // NOTE: For now, 'blueprints' is the only grid view. 
  // We need to hide/show the Grid vs Progression Container vs Data Container.
  // Since we haven't wrapped the grid yet, let's control the grid and filters visibility directly later.
  // For this step, I will assume we are HIDING the Grid when NOT on blueprints.

  const grid = document.getElementById("grid");
  const empty = document.getElementById("emptyState");
  const filtersDesktop = document.querySelectorAll(".filter-section-desktop"); // Pseudo-selector for desktop sidebars? No, they are in aside.
  // Actually, the ASIDE is always visible on desktop?

  // Let's control the "Main Content Area" visibility
  // Current structure: <main> -> [Banner, Progress, Chips, Help, Grid/Empty]

  // Create references to the new tab containers (will be added in index.html in next steps if not already)
  const progressionTab = document.getElementById("progressionTab");
  const dataTab = document.getElementById("dataTab");

  // Toggle Grid View Visibility
  const showGrid = (tabName === "blueprints");

  if (grid) {
    if (showGrid) {
      // Grid visibility is also handled by renderGrid based on filters, 
      // but we force hide it if not on blueprints tab
      applyFilters(); // Re-apply to show correct items
      grid.classList.remove("hidden");
    } else {
      grid.classList.add("hidden");
      if (empty) empty.classList.add("hidden");
    }
  }

  // Toggle Progression Tab
  if (progressionTab) {
    if (tabName === "progression") {
      progressionTab.classList.remove("hidden");
      renderProgression();
    } else {
      progressionTab.classList.add("hidden");
    }
  }

  // Toggle Data Tab
  if (dataTab) {
    if (tabName === "data") {
      dataTab.classList.remove("hidden");
    } else {
      dataTab.classList.add("hidden");
    }
  }
}

// Initialize tab navigation
function initTabNavigation() {
  const blueprintsBtn = document.getElementById("tabBlueprints");
  const progressionBtn = document.getElementById("tabProgression");
  const dataBtn = document.getElementById("tabData");
  const logoHome = document.getElementById("logoHome");
  const logoHomeMobile = document.getElementById("logoHomeMobile");

  if (blueprintsBtn) blueprintsBtn.onclick = () => switchTab("blueprints");
  if (progressionBtn) progressionBtn.onclick = () => switchTab("progression");
  if (dataBtn) dataBtn.onclick = () => switchTab("data");

  // Logo home navigation
  if (logoHome) logoHome.onclick = () => switchTab("blueprints");
  if (logoHomeMobile) logoHomeMobile.onclick = () => switchTab("blueprints");
}

// Event Banner Management (Dynamic from Firestore)
let eventBannerDismissed = false; // Temporary state, clears on refresh
window.menuCloseTimer = null;

// Helper to clear all selection states (Details & Context Menu)
function deselectAll() {
  // Close Details Overlays
  document.querySelectorAll(".details-overlay:not(.hidden)").forEach(d => {
    d.classList.add("hidden");
    d.style.transform = "";
  });

  // Reset Card States
  document.querySelectorAll(".card-open").forEach(c => {
    c.classList.remove("card-open");
    c.style.zIndex = "";
  });

  document.querySelectorAll(".card-selected").forEach(c => {
    c.classList.remove("card-selected");
  });

  const menu = document.getElementById("itemContextMenu");
  if (menu && !menu.classList.contains("hidden")) {
    menu.classList.add("opacity-0");
    if (window.menuCloseTimer) clearTimeout(window.menuCloseTimer);
    window.menuCloseTimer = setTimeout(() => {
      menu.classList.add("hidden");
      window.menuCloseTimer = null;
    }, 150);
  }
}

// Helper to set selection state (Status = Banner + Glow)
function selectCard(card, type = "details") {
  // 1. Clear everything first
  deselectAll();

  if (!card) return;

  // 2. Apply "Selected" status
  card.classList.add("card-selected");

  // 3. Show appropriate banner
  if (type === "details") {
    const details = card.querySelector(".details-overlay");
    if (details) {
      details.classList.remove("hidden");
      card.classList.add("card-open");
      card.style.zIndex = "50";
    }
  }
  // Note: Context menu positioning logic is handled by showMenu, 
  // so showMenu will call selectCard(card, "menu") just to set the state.
}

function initEventBanner() {
  const banner = document.getElementById("eventBanner");
  const closeBtn = document.getElementById("closeEventBanner");
  const bannerText = banner ? banner.querySelector("p") : null;

  // 1. Fetch Banner Config from Firestore
  getDoc(doc(db, "siteConfig", "banner")).then((snap) => {
    if (snap.exists()) {
      const data = snap.data();
      // 2. Check if active and has text
      if (data.active && data.text && bannerText && banner) {
        bannerText.innerHTML = data.text; // Supports HTML for colors/bold
        banner.classList.add("banner-active");

        // 3. Show if not dismissed and on existing tab
        if (!eventBannerDismissed && state.currentTab === "blueprints") {
          banner.classList.remove("hidden");
        }
      }
    }
  }).catch((err) => console.debug("Banner fetch skipped", err));

  if (closeBtn) {
    closeBtn.onclick = () => {
      if (banner) banner.classList.add("hidden");
      eventBannerDismissed = true;
    };
  }
}

// Blueprint Submission System
let toastTimeout = null;
let pendingBlueprintName = null;

function initBlueprintSubmission() {
  const fab = document.getElementById("submitLocationFab");
  const toast = document.getElementById("collectToast");
  const toastText = document.getElementById("collectToastText");
  const toastProgress = document.getElementById("collectToastProgress");
  const modal = document.getElementById("submitModal");
  const closeModal = document.getElementById("closeSubmitModal");
  const form = document.getElementById("submitLocationForm");
  const blueprintSelect = document.getElementById("submitBlueprintName");

  // FAB click -> open modal
  if (fab) {
    fab.onclick = () => openSubmissionModal();
  }

  // Toast click -> open modal with pre-filled blueprint
  if (toast) {
    toast.onclick = () => {
      hideToast();
      if (pendingBlueprintName) {
        openSubmissionModal(pendingBlueprintName);
      }
    };
  }

  // Close modal
  if (closeModal) {
    closeModal.onclick = () => closeSubmissionModal();
  }

  // Close modal on backdrop click
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) closeSubmissionModal();
    };
  }

  // Form submission
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      await submitBlueprintLocation();
    };
  }
}

function populateBlueprintPicklist() {
  const select = document.getElementById("submitBlueprintName");
  if (!select || !state.all || state.all.length === 0) return;

  // Clear existing options except the first
  select.innerHTML = '<option value="">Select a Blueprint...</option>';

  // Add all blueprints from state.all
  for (const item of state.all) {
    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = item.name;
    select.appendChild(option);
  }
}

function openSubmissionModal(prefilledBlueprint = null) {
  const modal = document.getElementById("submitModal");
  const blueprintSelect = document.getElementById("submitBlueprintName");

  // Populate the picklist first
  populateBlueprintPicklist();

  // Pre-fill if provided
  if (prefilledBlueprint && blueprintSelect) {
    blueprintSelect.value = prefilledBlueprint;
  }

  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden"; // Lock scroll
  }
}

function closeSubmissionModal() {
  const modal = document.getElementById("submitModal");
  const form = document.getElementById("submitLocationForm");

  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = ""; // Unlock scroll
  }

  if (form) {
    form.reset();
    // Manually unchecked just in case (though form.reset should handle it if they are inside the form)
    const t = document.getElementById("submitTrialsReward");
    const q = document.getElementById("submitQuestReward");
    if (t) t.checked = false;
    if (q) q.checked = false;
  }
  pendingBlueprintName = null;
}

function initWrapped() {
  const showBtn = document.getElementById("showWrappedBtn");
  const modal = document.getElementById("wrappedModal");
  const closeBtn = document.getElementById("closeWrappedBtn");
  const downloadBtn = document.getElementById("downloadWrappedBtn");
  if (!showBtn || !modal) return;

  const toggleCaptureMode = (active) => {
    const outer = document.getElementById("wrappedOuterContainer");
    const inner = document.getElementById("wrappedInner");
    const content = document.getElementById("wrappedContent");
    const shimmer = document.getElementById("wrappedShimmer");
    const actions = document.getElementById("wrappedActions");
    const captureActions = document.getElementById("captureModeActions");
    const modal = document.getElementById("wrappedModal");

    if (active) {
      const scale = window.innerWidth / 896;
      if (outer) {
        outer.style.setProperty('background', 'none', 'important');
        outer.style.setProperty('box-shadow', 'none', 'important');
        outer.style.setProperty('padding', '0', 'important');
        outer.style.setProperty('border-radius', '0', 'important');
      }
      if (inner) {
        inner.style.setProperty('width', '896px', 'important');
        inner.style.setProperty('transform', `scale(${scale})`, 'important');
        inner.style.setProperty('transform-origin', 'top center', 'important');
        inner.style.setProperty('gap', '0', 'important');
        const heightAdjustment = 896 * (1 - scale);
        inner.style.setProperty('margin-bottom', `-${heightAdjustment}px`, 'important');
      }
      if (content) content.style.setProperty('border-radius', '0', 'important');
      if (shimmer) shimmer.classList.add("hidden");
      if (actions) actions.classList.add("hidden");
      if (captureActions) captureActions.classList.remove("hidden");

      if (modal) {
        modal.style.setProperty('padding', '0', 'important');
        modal.style.setProperty('overflow-x', 'hidden', 'important');
        modal.style.setProperty('overflow-y', 'hidden', 'important');
        modal.scrollTo(0, 0);
      }
    } else {
      const isMobileUI = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth < 800);
      if (isMobileUI) {
        const scale = (window.innerWidth - 32) / 896;
        if (inner) {
          inner.style.setProperty('width', '896px', 'important');
          inner.style.setProperty('transform', `scale(${scale})`, 'important');
          inner.style.setProperty('transform-origin', 'top center', 'important');
          inner.style.removeProperty('gap');
          const heightAdjustment = 896 * (1 - scale);
          inner.style.setProperty('margin-bottom', `-${heightAdjustment}px`, 'important');
        }
      } else {
        if (inner) {
          inner.style.removeProperty('width');
          inner.style.removeProperty('transform');
          inner.style.removeProperty('transform-origin');
          inner.style.removeProperty('gap');
          inner.style.removeProperty('margin-bottom');
        }
      }
      if (outer) {
        outer.style.removeProperty('background');
        outer.style.removeProperty('box-shadow');
        outer.style.removeProperty('padding');
        outer.style.removeProperty('border-radius');
      }
      if (content) content.style.removeProperty('border-radius');
      if (shimmer) shimmer.classList.remove("hidden");
      if (actions) actions.classList.remove("hidden");
      if (captureActions) captureActions.classList.add("hidden");
      if (modal) {
        modal.style.removeProperty('padding');
        modal.style.removeProperty('overflow-x');
        modal.style.removeProperty('overflow-y');
        setTimeout(() => modal.scrollTo(0, 0), 20);
      }
    }
  };

  const exitBtn = document.getElementById("exitCaptureBtn");
  if (exitBtn) exitBtn.onclick = () => toggleCaptureMode(false);

  // Mobile Screenshot button setup
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isMobile && downloadBtn) {
    const newBtn = downloadBtn.cloneNode(true);
    downloadBtn.parentNode.replaceChild(newBtn, downloadBtn);
    newBtn.innerHTML = `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Fullscreen for Screenshot`;
    newBtn.className = "flex-[2] md:flex-none px-8 py-3 h-14 md:h-auto text-xl md:text-base rounded-full bg-emerald-600 text-white font-bold shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-emerald-400/30 flex items-center justify-center gap-2 active:scale-95 transition-transform";
    newBtn.onclick = () => toggleCaptureMode(true);
  }

  showBtn.onclick = async () => {
    // Hide Submit FAB while in Wrapped flow
    const fab = document.getElementById("submitLocationFab");
    if (fab) fab.classList.add("hidden");

    // 1. Fetch data
    if (auth.currentUser) {
      showBtn.disabled = true;
      showBtn.textContent = "Loading Data...";
      await fetchUserContributions();
      showBtn.disabled = false;
      showBtn.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg> View My Blueprint Wrapped 2025`;
      // Ensure the button keeps its responsive classes if modified by textContent earlier
      showBtn.className = "flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-[10px] sm:text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95";
    }

    // 2. Populate UI
    const total = state.all.length;
    // Only count collected items that exist in state.all (excludes inactive items)
    const activeItemNames = new Set(state.all.map(item => item.name));
    const collected = [...state.collectedItems].filter(name => activeItemNames.has(name)).length;
    const percent = total > 0 ? Math.round((collected / total) * 100) : 0;

    // Update Percentage and Progress Bar
    document.getElementById("wrappedPercent").textContent = `${percent}%`;
    const progressBar = document.getElementById("wrappedProgressBar");
    if (progressBar) progressBar.style.width = `${percent}%`;

    // Calculate Weapon/Augment stats
    const weaponsAll = state.all.filter(it => /weapon/i.test(it.type)).length;
    const weaponsColl = state.all.filter(it => /weapon/i.test(it.type) && state.collectedItems.has(it.name)).length;
    const augmentsAll = state.all.filter(it => /augment/i.test(it.type)).length;
    const augmentsColl = state.all.filter(it => /augment/i.test(it.type) && state.collectedItems.has(it.name)).length;

    // Calculate Best Map (most contributed map)
    const mapCounts = {};
    if (state.wrappedData.contributions) {
      state.wrappedData.contributions.forEach(c => {
        if (c.map) {
          mapCounts[c.map] = (mapCounts[c.map] || 0) + 1;
        }
      });
    }
    const bestMap = Object.entries(mapCounts).sort((a, b) => b[1] - a[1])[0];

    document.getElementById("wrappedPercent").textContent = `${percent}%`;

    // Build dynamic stats array
    const statsGrid = document.getElementById("wrappedStatsGrid");
    statsGrid.innerHTML = "";

    const stats = [];

    // Locations Reported (only if > 0)
    if (state.wrappedData.contributionCount > 0) {
      stats.push({
        value: state.wrappedData.contributionCount,
        label: "Locations<br>Reported",
        color: "text-emerald-400",
        icon: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`
      });
    }

    // Best Map (only if exists)
    if (bestMap && bestMap[0]) {
      stats.push({
        value: bestMap[0],
        label: "Best<br>Map",
        color: "text-purple-400",
        icon: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>`,
        smallText: true
      });
    }

    // Blueprints Collected (always show) - checkmark icon
    stats.push({
      value: `${collected}/${total}`,
      label: "Blueprints<br>Collected",
      color: "text-white",
      icon: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
    });

    // Weapons (always show with game icon)
    stats.push({
      value: `${weaponsColl}/${weaponsAll}`,
      label: "Weapons<br>Collected",
      color: "text-amber-400",
      icon: `<img src="icons/ItemCategory_Weapon.webp" class="w-5 h-5 object-contain" style="filter: brightness(0) saturate(100%) invert(67%) sepia(74%) saturate(575%) hue-rotate(360deg) brightness(101%) contrast(101%);" alt="Weapon">`
    });

    // Augments (always show with game icon)
    stats.push({
      value: `${augmentsColl}/${augmentsAll}`,
      label: "Augments<br>Collected",
      color: "text-cyan-400",
      icon: `<img src="icons/ItemCategory_Augment.webp" class="w-5 h-5 object-contain" style="filter: brightness(0) saturate(100%) invert(76%) sepia(32%) saturate(1057%) hue-rotate(152deg) brightness(95%) contrast(92%);" alt="Augment">`
    });

    // Create stat pills
    stats.forEach((stat, index) => {
      const pill = document.createElement("div");
      pill.className = "rounded-xl p-3 border border-white/10 flex flex-col items-center justify-center flex-1 min-w-[90px]";

      // Randomize gradient angle slightly
      const angle = 120 + Math.floor(Math.random() * 30);

      // USER REQUEST: 
      // 1. 100% Opacity (Solid background, no throughput)
      // 2. Solid colored layer matching the green at 50% opacity
      // Implementation: Solid Dark Base (#09090b) + Linear Gradient of the green at 50%

      pill.style.boxShadow = "inset 0 0 15px rgba(255, 255, 255, 0.03)";

      // Base Green: Bright Emerald (closer to UI green)
      // Tailwind emerald-500 is approx rgb(16, 185, 129)
      const greenBase = "rgba(16, 185, 129, 0.4)"; // Slightly lower opacity since it's brighter
      const greenHighlight = "rgba(52, 211, 153, 0.4)"; // emerald-400

      if (index % 2 === 0) {
        // Solid background composed of black + brighter green
        pill.style.background = `linear-gradient(${angle}deg, ${greenBase}, ${greenBase}), #09090b`;
      } else {
        // Slight streak variant
        pill.style.background = `linear-gradient(${angle}deg, ${greenBase}, ${greenHighlight} 50%, ${greenBase}), #09090b`;
      }

      // Make icons larger
      const largerIcon = stat.icon.replace('w-4 h-4', 'w-6 h-6').replace('w-5 h-5', 'w-7 h-7');

      pill.innerHTML = `
        <div class="${stat.color} mb-1 drop-shadow-md">
          ${largerIcon}
        </div>
        <span class="${stat.smallText ? 'text-xl' : 'text-3xl'} font-black ${stat.color} drop-shadow-lg">${stat.value}</span>
        <div class="text-xs text-zinc-300 uppercase font-black tracking-wider text-center leading-tight drop-shadow-md opacity-90">${stat.label}</div>
      `;

      statsGrid.appendChild(pill);
    });

    // Highlights (Legendary/Epic, not Mod/Material)
    const highlightsWrap = document.getElementById("wrappedHighlights");
    highlightsWrap.innerHTML = "";

    // USER PRIORITY LIST
    const WRAPPED_PRIORITY = [
      "Bobcat", "Looting Mk. 3 (Survivor)", "Aphelion", "Equalizer", "Jupiter",
      "Combat Mk. 3 (Aggressive)", "Combat Mk. 3 (Flanking)", "Vulcano",
      "Snap Hook", "Deadline", "Wolfpack", "Tactical Mk. 3 (Defensive)",
      "Tactical Mk. 3 (Healing)", "Venator", "Tempest", "Torrente",
      "Bettina", "Anvil", "Osprey"
    ];

    // Filter all collected items (excluding mods/materials)
    let collectedValid = state.all.filter(it =>
      state.collectedItems.has(it.name) &&
      !/mod|material|parts|component|attachment|misc/i.test(it.type)
    );

    // Sort by Priority List first, then by Rarity Descending
    collectedValid.sort((a, b) => {
      const idxA = WRAPPED_PRIORITY.indexOf(a.name);
      const idxB = WRAPPED_PRIORITY.indexOf(b.name);

      // If both are in priority list, sort by list order
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;

      // If only A is in list, A comes first
      if (idxA !== -1) return -1;

      // If only B is in list, B comes first
      if (idxB !== -1) return 1;

      // Otherwise, sort by Rarity (Highest first)
      return rarityRank(b.rarity) - rarityRank(a.rarity);
    });

    // Take top 8
    const rareBlueprints = collectedValid.slice(0, 8);



    if (rareBlueprints.length === 0) {
      highlightsWrap.innerHTML = `<div class="text-zinc-500 text-xs w-full text-center py-4 italic">No rare blueprints collected yet... keep hunting!</div>`;
    }

    rareBlueprints.forEach(bp => {
      const color = rarityColor(bp.rarity);
      const miniCard = document.createElement("div");
      // Use exact card-compact structure, but force width to fit grid
      // USER REQUEST: removed dark grey rectangle
      miniCard.className = "card-compact w-full p-2";

      const frame = document.createElement("div");
      frame.className = "rarity-frame rarity-glow relative overflow-hidden";
      frame.style.borderColor = color;

      const imgWrap = document.createElement("div");
      imgWrap.className = "relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden";
      // EXACT Gradient stack from renderGrid
      imgWrap.style.background = `
        linear-gradient(to top right, ${color}44 0%, rgba(24,24,27,0.5) 75%),
        linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
        url('Background/Arc BP Image Background.webp')
      `;
      imgWrap.style.backgroundSize = "cover, cover, cover";
      imgWrap.style.backgroundPosition = "center, center, center";

      const img = document.createElement("img");
      img.src = bp.img || "";
      img.className = "w-full h-full object-contain p-2 relative z-10";

      // Concave Ramp
      const corner = document.createElement("div");
      corner.className = "rarity-corner";
      // EXACT corner gradient from renderGrid
      corner.style.background = `radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${color}66 60%, ${color}cc 100%)`;

      // Type Tab -> NOW DISPLAYS NAME
      const tab = document.createElement("div");
      tab.className = "type-tab";

      // ERSATZ GLASS EFFECT (Solid Base + Rarity Overlay)
      // Base: #09090b (Zinc-950)
      // Overlay: Rarity Color at ~40-50%
      const angle = 110 + Math.floor(Math.random() * 40);
      tab.style.background = `linear-gradient(${angle}deg, ${color}99, ${color}66), #09090b`;

      tab.style.borderColor = color;
      // USER REQUEST: No shadow needed
      tab.style.maxWidth = "90%"; // Prevent overflow

      const tabIcon = document.createElement("img");
      tabIcon.src = bp.typeIcon || detectIconForType(bp.type);
      tabIcon.className = "w-5 h-5 object-contain shadow-sm drop-shadow-md"; // Larger (w-5)

      const tabText = document.createElement("span");
      // USER REQUEST: Dynamic scaling instead of ellipsis truncate
      tabText.textContent = bp.name;

      // Allow max-width to expand slightly more
      tab.style.maxWidth = "96%";
      tab.style.paddingRight = "10px"; // Increased padding to prevent clipping
      tab.style.whiteSpace = "normal"; // Override CSS nowrap
      tab.style.overflow = "visible"; // Prevent clipping

      let fontSize = "15px";
      let lineHeight = "normal";

      // AGGRESSIVE SCALING with Direct Style Override
      // Tailwind classes might be overridden by specific CSS, so we use inline styles.
      if (bp.name.length > 25) { fontSize = "9px"; lineHeight = "1"; }
      else if (bp.name.length > 15) { fontSize = "10px"; lineHeight = "1.1"; }
      else if (bp.name.length > 12) { fontSize = "12px"; lineHeight = "1.2"; }

      // Apply styles directly
      tabText.style.fontSize = fontSize;
      tabText.style.lineHeight = lineHeight;
      tabText.style.whiteSpace = "normal";
      tabText.style.textOverflow = "clip";
      tabText.style.overflow = "visible";

      // Base classes without size
      tabText.className = `ml-1.5 font-black uppercase tracking-wide drop-shadow-lg text-white whitespace-normal break-words text-left`;

      tab.appendChild(tabIcon);
      tab.appendChild(tabText);

      imgWrap.appendChild(img);
      imgWrap.appendChild(corner);
      imgWrap.appendChild(tab);
      frame.appendChild(imgWrap);

      // Name (Below Image)
      const title = document.createElement("div");
      title.className = "mt-2 px-1 pb-1 text-center";

      const name = document.createElement("div");
      name.className = "font-semibold leading-tight text-white";
      name.style.fontSize = "14px"; // Fixed readable size for screenshot
      name.textContent = bp.name;

      title.appendChild(name);

      miniCard.appendChild(frame);

      highlightsWrap.appendChild(miniCard);
    });

    // Show custom gamertag modal first
    const gamertagModal = document.getElementById("gamertagModal");
    const gamertagInput = document.getElementById("gamertagInput");
    const skipBtn = document.getElementById("skipGamertagBtn");
    const confirmBtn = document.getElementById("confirmGamertagBtn");

    // Clear previous input
    gamertagInput.value = "";

    // Function to proceed to Wrapped modal with optional gamertag
    const proceedToWrapped = (gamertag) => {
      try {
        console.log("[ProceedToWrapped] Starting...", gamertag);
        gamertagModal.classList.add("hidden");
        gamertagModal.classList.remove("flex");

        // Add gamertag to preview if provided
        const node = document.getElementById("wrappedContent");
        // Remove any existing gamertag element first
        const existingGT = document.getElementById("wrappedGamertag");
        if (existingGT) existingGT.remove();

        if (gamertag && gamertag.trim()) {
          // Wrapper for shimmer border effect
          const gamertagWrapper = document.createElement("div");
          gamertagWrapper.id = "wrappedGamertag";
          gamertagWrapper.className = "absolute top-4 right-4 p-[2px] rounded-full z-50";
          gamertagWrapper.style.background = "linear-gradient(135deg, rgba(16,185,129,0.6) 0%, rgba(255,255,255,0.3) 50%, rgba(16,185,129,0.6) 100%)";
          gamertagWrapper.style.boxShadow = "0 0 20px rgba(16,185,129,0.4)";

          const gamertagInner = document.createElement("div");
          gamertagInner.className = "bg-black/50 backdrop-blur-xl px-6 py-2.5 rounded-full text-white font-bold text-lg";
          gamertagInner.textContent = "@" + gamertag.trim();

          gamertagWrapper.appendChild(gamertagInner);
          node.appendChild(gamertagWrapper);
        }

        // Show Wrapped Modal
        console.log("[ProceedToWrapped] Calling toggleCaptureMode(false)...");
        toggleCaptureMode(false);
        console.log("[ProceedToWrapped] Showing modal...");
        modal.classList.remove("hidden");
        modal.classList.add("flex", "items-center", "justify-center");
        document.body.style.overflow = "hidden";
        console.log("[ProceedToWrapped] Done!");
      } catch (err) {
        console.error("[ProceedToWrapped] CRITICAL ERROR:", err);
        alert("Error loading wrapped view. Check console.");
      }
    };

    // Wire up buttons
    skipBtn.onclick = () => proceedToWrapped("");
    confirmBtn.onclick = () => proceedToWrapped(gamertagInput.value);
    gamertagInput.onkeydown = (e) => {
      if (e.key === "Enter") proceedToWrapped(gamertagInput.value);
    };

    // Show gamertag modal
    gamertagModal.classList.remove("hidden");
    gamertagModal.classList.add("flex", "items-center", "justify-center");
    gamertagInput.focus();
  };

  if (closeBtn) {
    closeBtn.onclick = () => {
      toggleCaptureMode(false);
      modal.classList.add("hidden");
      modal.classList.remove("flex", "items-center", "justify-center");
      document.body.style.overflow = "";

      // Restore Submit FAB if on collection tab
      const fab = document.getElementById("submitLocationFab");
      if (fab && state.currentTab === "collection") {
        fab.classList.remove("hidden");
      }
    };

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeBtn.click();
      }
    });
  }

  if (downloadBtn) {
    // Helper to convert an image to data URL via canvas
    const getBase64Image = (img) => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL("image/png");
      } catch (e) {
        console.warn("Canvas base64 failed", e);
        return null;
      }
    };

    // Helper to fetch and convert to data URL (for background images)
    const fetchAsDataURL = async (url) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      } catch (e) {
        console.error("Fetch base64 failed", e);
        return url;
      }
    };
    if (!isMobile) {
      downloadBtn.onclick = async () => {
        const originalNode = document.getElementById("wrappedContent");
        if (!originalNode) return;

        const originalText = downloadBtn.textContent;
        downloadBtn.disabled = true;
        downloadBtn.textContent = "Baking...";

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        // Create a clone that is rendered but hidden from user view
        const node = originalNode.cloneNode(true);
        node.style.position = "fixed";
        node.style.top = "0";
        node.style.left = "0";
        node.style.width = originalNode.offsetWidth + "px";
        node.style.height = originalNode.offsetHeight + "px";
        node.style.zIndex = "-9999";
        node.style.opacity = "1";
        node.style.pointerEvents = "none";
        node.style.transform = "none";
        node.style.margin = "0";
        node.style.backgroundColor = "#09090b"; // Force solid background on node
        document.body.appendChild(node);

        try {
          console.group("iOS Robust Baking");

          // Ensure all images in clone are baked
          const images = node.querySelectorAll("img");
          for (let img of images) {
            if (img.src && !img.src.startsWith("data:")) {
              // Find corresponding original
              const originalImg = Array.from(originalNode.querySelectorAll("img")).find(i => i.src === img.src);
              if (originalImg && originalImg.complete) {
                const b64 = getBase64Image(originalImg);
                if (b64) img.src = b64;
              } else if (originalImg) {
                // Wait for it if not ready
                await new Promise(r => {
                  originalImg.onload = r;
                  originalImg.onerror = r;
                });
                const b64 = getBase64Image(originalImg);
                if (b64) img.src = b64;
              }
            }
          }

          // Bake background surgically with robust URL matching
          const bgFileName = 'Arc BP Image Background.webp';
          const bgDataUrl = await fetchAsDataURL('Background/' + bgFileName);
          const allWithBg = [node, ...Array.from(node.querySelectorAll('*'))];
          allWithBg.forEach(el => {
            const computedBg = window.getComputedStyle(el).backgroundImage;
            if (computedBg && computedBg.toLowerCase().includes(bgFileName.toLowerCase())) {
              // Find the specific url(...) part that contains our background file
              // Matches url("path/to/file.webp"), url('file.webp'), etc.
              const regex = new RegExp(`url\\((['"]?)([^'"\\)]*?${bgFileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(\\1)\\)`, 'gi');
              el.style.backgroundImage = computedBg.replace(regex, `url("${bgDataUrl}")`);
              el.style.backgroundSize = "cover";
              el.style.backgroundPosition = "center";
            }
          });

          console.info("Baking complete. Starting capture...");
          console.groupEnd();

          downloadBtn.textContent = isIOS ? "Processing..." : "Generating...";

          const size = Math.max(originalNode.offsetWidth, originalNode.offsetHeight);
          const options = {
            width: size,
            height: size,
            pixelRatio: 2,
            // node has its own background color now
            cacheBust: true,
            style: { borderRadius: '0', width: `${size}px`, height: `${size}px`, transform: 'none' }
          };

          // iOS needs longer delays and sometimes a "prime" call to toCanvas
          if (isIOS) {
            try { await htmlToImage.toCanvas(node, options); } catch (e) { }
          }

          await htmlToImage.toSvg(node, options);
          await new Promise(r => setTimeout(r, isIOS ? 3000 : 1000));

          const dataUrl = await htmlToImage.toPng(node, options);

          if (!dataUrl || dataUrl.length < 50000) {
            throw new Error("Captured image is too small or black.");
          }

          const link = document.createElement('a');
          link.download = `arc-raiders-wrapped-2025.png`;
          link.href = dataUrl;
          link.click();
        } catch (error) {
          console.error('Capture error:', error);
          alert("Download failed on this device. Please take a screenshot instead - sorry!");
        } finally {
          if (node.parentNode) node.parentNode.removeChild(node);
          downloadBtn.disabled = false;
          downloadBtn.textContent = originalText;
        }
      };
    }
  }

  // 5. Dynamic Scaling Logic for 1080p/Small Screens
  const scaleContent = () => {
    // Target the actual card container
    const modalContent = modal.querySelector(".w-\\[896px\\]");
    if (!modalContent || modal.classList.contains("hidden")) return;

    // Reset to measure natural size
    modalContent.style.transform = "none";
    modalContent.style.margin = "0";

    // Safety buffer
    const padding = 40;
    const availableHeight = window.innerHeight - padding;
    const availableWidth = window.innerWidth - padding;

    const naturalHeight = modalContent.scrollHeight;
    const naturalWidth = modalContent.scrollWidth;

    const scaleY = availableHeight / naturalHeight;
    const scaleX = availableWidth / naturalWidth;
    const scale = Math.min(scaleX, scaleY, 1);

    if (scale < 1) {
      modalContent.style.transformOrigin = "center center";
      modalContent.style.transform = `scale(${scale})`;

      // Counter-act the layout footprint using negative margins
      // This "shrinks" the space the element takes in the document flow
      const widthDiff = naturalWidth * (1 - scale);
      const heightDiff = naturalHeight * (1 - scale);

      modalContent.style.marginLeft = `-${widthDiff / 2}px`;
      modalContent.style.marginRight = `-${widthDiff / 2}px`;
      modalContent.style.marginTop = `-${heightDiff / 2}px`;
      modalContent.style.marginBottom = `-${heightDiff / 2}px`;

      modalContent.style.willChange = "transform";
    } else {
      modalContent.style.transform = "none";
      modalContent.style.margin = "0";
      modalContent.style.willChange = "auto";
    }
  };

  window.addEventListener("resize", scaleContent);

  // Observer to trigger scale when modal opens
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        if (!modal.classList.contains("hidden")) {
          // Wait for layout to stabilize
          requestAnimationFrame(() => {
            requestAnimationFrame(scaleContent);
          });
        }
      }
    });
  });

  observer.observe(modal, { attributes: true });
}

const READ_POSTS_KEY = "arc_read_posts_v1";

function initAnnouncements() {
  const btn = document.getElementById("announcementsBtn");
  const drawer = document.getElementById("announcementsDrawer");
  const closeBtn = document.getElementById("closeAnnouncementsBtn");
  const backdrop = drawer ? drawer.querySelector(":scope > div:first-child") : null;
  const panel = drawer ? drawer.querySelector(":scope > div:last-child") : null;
  const feed = document.getElementById("announcementsFeed");
  const badge = document.getElementById("newsBadge");

  // State
  let readPosts = new Set();
  try {
    const data = localStorage.getItem(READ_POSTS_KEY);
    if (data) readPosts = new Set(JSON.parse(data));
  } catch (e) { console.error("Failed to load read posts", e); }

  const saveReadState = () => {
    localStorage.setItem(READ_POSTS_KEY, JSON.stringify(Array.from(readPosts)));
  };

  const updateUI = () => {
    const cards = feed ? feed.querySelectorAll(".announcement-card") : [];
    let unreadCount = 0;

    cards.forEach(card => {
      const id = card.dataset.id;
      const dot = card.querySelector(".unread-dot");
      const isRead = readPosts.has(id);

      if (isRead) {
        if (dot) dot.classList.add("hidden");
        card.classList.add("read");
      } else {
        if (dot) dot.classList.remove("hidden");
        unreadCount++;
      }
    });

    if (badge) {
      if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    }
  };

  // Dev Reset
  const devBtn = document.getElementById("devResetAnnouncements");
  if (devBtn) {
    devBtn.onclick = (e) => {
      e.stopPropagation();
      readPosts.clear();
      saveReadState();

      // Collapse everything
      if (feed) {
        feed.querySelectorAll(".announcement-body").forEach(b => {
          b.classList.add("max-h-0", "opacity-0");
          b.classList.remove("max-h-[1500px]", "opacity-100");
        });
      }
      updateUI();
    };
  }

  // Mark All Read
  const markAllReadBtn = document.getElementById("markAllReadBtn");
  if (markAllReadBtn) {
    markAllReadBtn.onclick = (e) => {
      e.stopPropagation();
      const cards = feed ? feed.querySelectorAll(".announcement-card") : [];
      cards.forEach(card => {
        const id = card.dataset.id;
        if (id) readPosts.add(id);
      });
      saveReadState();
      updateUI();
    };
  }

  // Generate Wrapped from News
  const handleWrappedClick = (e) => {
    e.stopPropagation();
    closeDrawer(); // Close announcements

    // Switch to My Collection tab first
    const myCollBtn = document.getElementById("tabCollection");
    if (myCollBtn) myCollBtn.click();

    // Trigger the main Wrapped button
    const showWrappedBtn = document.getElementById("showWrappedBtn");
    if (showWrappedBtn) showWrappedBtn.click();
  };

  const wrappedBtnLegacy = document.getElementById("generateWrappedFromNews");
  if (wrappedBtnLegacy) {
    wrappedBtnLegacy.onclick = handleWrappedClick;
  }

  // Initial UI Check
  if (feed) updateUI();

  if (!btn || !drawer || !closeBtn || !backdrop || !panel) return;

  const openDrawer = () => {
    drawer.classList.remove("hidden");
    requestAnimationFrame(() => {
      backdrop.classList.remove("opacity-0");
      panel.classList.remove("translate-x-full");
    });
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    backdrop.classList.add("opacity-0");
    panel.classList.add("translate-x-full");
    setTimeout(() => {
      drawer.classList.add("hidden");
      document.body.style.overflow = "";
    }, 300);
  };

  btn.onclick = openDrawer;
  closeBtn.onclick = closeDrawer;
  backdrop.onclick = closeDrawer;

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !drawer.classList.contains("hidden")) {
      closeDrawer();
    }
  });

  // Card delegation
  if (feed) {
    feed.onclick = (e) => {
      const card = e.target.closest(".announcement-card");
      if (!card) return;

      const body = card.querySelector(".announcement-body");
      const id = card.dataset.id;
      if (!body) return;

      // Toggle Expansion
      const isExpanded = !body.classList.contains("max-h-0");

      if (isExpanded) {
        // Collapse
        body.classList.add("max-h-0", "opacity-0");
        body.classList.remove("max-h-[1500px]", "opacity-100");
      } else {
        // Expand
        body.classList.remove("max-h-0", "opacity-0");
        body.classList.add("max-h-[1500px]", "opacity-100");

        // Mark Read
        if (!readPosts.has(id)) {
          readPosts.add(id);
          saveReadState();
          updateUI();
        }
      }
    };
  }
}

function showCollectToast(blueprintName) {
  const toast = document.getElementById("collectToast");
  const toastText = document.getElementById("collectToastText");
  const toastProgress = document.getElementById("collectToastProgress");

  if (!toast || !toastText || !toastProgress) return;

  // Clear any existing timeout
  if (toastTimeout) {
    clearTimeout(toastTimeout);
    toastTimeout = null;
  }

  pendingBlueprintName = blueprintName;
  toastText.textContent = `${blueprintName} Blueprint collected? Tell us where!`;

  // Reset and start progress animation
  toastProgress.classList.remove("animate");
  void toastProgress.offsetWidth; // Force reflow
  toastProgress.classList.add("animate");

  toast.classList.remove("hidden");

  // Hide after 10 seconds
  toastTimeout = setTimeout(() => {
    hideToast();
  }, 10000);
}

function hideToast() {
  const toast = document.getElementById("collectToast");
  const toastProgress = document.getElementById("collectToastProgress");

  if (toast) toast.classList.add("hidden");
  if (toastProgress) toastProgress.classList.remove("animate");

  if (toastTimeout) {
    clearTimeout(toastTimeout);
    toastTimeout = null;
  }
}

async function submitBlueprintLocation() {
  const blueprintName = document.getElementById("submitBlueprintName")?.value;
  const map = document.getElementById("submitMap")?.value;
  const condition = document.getElementById("submitCondition")?.value;
  const location = document.getElementById("submitLocation")?.value;
  const container = document.getElementById("submitContainer")?.value;
  const trialsReward = document.getElementById("submitTrialsReward")?.checked || false;
  const questReward = document.getElementById("submitQuestReward")?.checked || false;

  if (!blueprintName) {
    alert("Please select a Blueprint Name.");
    return;
  }

  // Require at least one data field (Map/Cond/Loc/Cont/Trials/Quest)
  // Submitting ONLY a blueprint name is not useful.
  const hasData = map || condition || location || container || trialsReward || questReward;

  if (!hasData) {
    alert("Please provide at least one detail (Map, Condition, Location, Container, or Reward Type).");
    return;
  }

  try {
    await addDoc(collection(db, "blueprintSubmissions"), {
      blueprintName: blueprintName || "",
      map: map || "",
      condition: condition || "",
      location: location || "",
      container: container || "",
      trialsReward: trialsReward,
      questReward: questReward,
      submittedAt: new Date().toISOString(),
      userId: auth.currentUser?.uid || "anonymous"
    });

    closeSubmissionModal();
    showSuccessToast();
  } catch (error) {
    console.error("Error submitting blueprint location:", error);
    alert("Failed to submit. Please try again.");
  }
}

function showSuccessToast() {
  const toast = document.getElementById("successToast");
  const progress = document.getElementById("successToastProgress");

  if (!toast || !progress) return;

  // Reset and show
  progress.classList.remove("animate");
  void progress.offsetWidth; // Force reflow
  progress.classList.add("animate");

  toast.classList.remove("hidden");

  // Hide after 5 seconds
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 5000);
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

  // 4) Check manual mappings
  if (MANUAL_IMAGE_MAPPINGS[fromName]) {
    const mapped = MANUAL_IMAGE_MAPPINGS[fromName];
    // Try exact or prefix match for the mapped name
    if (LOCAL_IMAGE_MAP.has(mapped)) return LOCAL_IMAGE_BASE + LOCAL_IMAGE_MAP.get(mapped);
    for (const [base, filename] of LOCAL_IMAGE_MAP.entries()) {
      if (base.startsWith(mapped)) return LOCAL_IMAGE_BASE + filename;
    }
  }

  // 5) Try exact matches in our known/hashed map
  const candidates = [stem.toLowerCase(), fromName.toLowerCase()];
  for (const c of candidates) {
    if (!c) continue;
    if (LOCAL_IMAGE_MAP.has(c)) return LOCAL_IMAGE_BASE + LOCAL_IMAGE_MAP.get(c);
  }

  // 6) Try loose match in our known/hashed map
  for (const c of candidates) {
    if (!c) continue;
    for (const [base, filename] of LOCAL_IMAGE_MAP.entries()) {
      if (base === c || base.startsWith(c)) return LOCAL_IMAGE_BASE + filename;
    }
  }

  // 7) DYNAMIC FALLBACK: If not in our hashed list, try convention-based path
  // This allows the user to just drop "My_New_Item.png" or "My_New_Item.webp" into the folder.
  // We prefer .png if stem exists, otherwise try both.
  if (fromName) {
    return LOCAL_IMAGE_BASE + fromName + ".webp";
  }

  return "";
}
const GRID = {
  min: 70,
  max: 220,
  step: 10,
  default: 160,
  storageKey: "arc_gridSize_v2",
};

// --- Utilities ---
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

const debouncedSyncToCloud = debounce(syncToCloud, 2000); // Wait 2s before syncing

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
  { re: /weapon/i, file: "ItemCategory_Weapon.webp" },
  { re: /grenade/i, file: "ItemCategory_Grenade.webp" },
  { re: /quick\s*use|quickuse|consumable|med|healing|vita|tool|utility/i, file: "ItemCategory_QuickUse.webp" },
  { re: /augment/i, file: "ItemCategory_Augment.webp" },
  { re: /mod|attachment|barrel|muzzle|brake|choke|silencer|stock|grip|mag/i, file: "ItemCategory_Mod.webp" },
  { re: /material|parts|craft|component/i, file: "ItemCategory_Material.webp" },
  { re: /misc|key|trinket|other/i, file: "ItemCategory_Misc.webp" },
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
  if (k === "weapon") return localIconPath("ItemCategory_Weapon.webp");
  if (k === "grenade") return localIconPath("ItemCategory_Grenade.webp");
  if (k === "quickuse") return localIconPath("ItemCategory_QuickUse.webp");
  if (k === "mod") return localIconPath("ItemCategory_Mod.webp");
  if (k === "augment") return localIconPath("ItemCategory_Augment.webp");
  if (k === "material") return localIconPath("ItemCategory_Material.webp");
  if (k === "misc") return localIconPath("ItemCategory_Misc.webp");

  // Then fall back to regex classification
  for (const entry of ICON_FILE_BY_TYPE) {
    if (entry.re.test(t)) return localIconPath(entry.file);
  }
  return localIconPath("ItemCategory_Misc.webp");
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
  wrappedData: {
    contributionCount: 0,
    loading: false
  },
  spares: {} // Item name -> count of spare blueprints
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

async function loadData() {
  setMetaLine("Fetching assets...");

  // 1. Fetch image manifest to populate LOCAL_IMAGE_MAP
  try {
    const manifestUrl = "./image-manifest.json?t=" + Date.now();
    const manifestRes = await fetch(manifestUrl);
    if (manifestRes.ok) {
      const filenames = await manifestRes.json();
      LOCAL_IMAGE_MAP.clear();
      for (const f of filenames) {
        // strip extension and hash if any
        const stem = f.replace(/\.png$|\.webp$|\.jpg$|\.jpeg$/i, "");
        const base = stem.replace(/_[0-9a-f]{10}$/i, "");
        // Normalize and lowercase the base key for case-insensitive lookup
        const normalizedBase = normalizeWikiStem(base).toLowerCase();
        LOCAL_IMAGE_MAP.set(normalizedBase, f);
      }
      console.log(`Loaded ${LOCAL_IMAGE_MAP.size} images from manifest.`);
    }
  } catch (e) {
    console.warn("Static image manifest not found or failed to load. Falling back to naming convention.", e);
  }

  setMetaLine("Fetching sheet...");
  let url = getCsvUrl();
  // Append cache-buster correctly
  url += (url.includes("?") ? "&" : "?") + "t=" + Date.now();

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
      const colTrialsReward = findHeader(headers, ["Trials Reward", "Trial Reward", "Trials"]) || headers[9];
      const colQuestReward = findHeader(headers, ["Quest Reward", "Quest"]) || headers[10];
      const colDescription = findHeader(headers, ["Description", "Desc", "Flavor Text"]) || headers[11];
      const colActive = findHeader(headers, ["Active", "Is Active", "Enabled"]) || headers[12];

      // Helper to parse boolean checkbox values from CSV
      const parseBoolField = (val) => {
        const v = norm(val).toLowerCase();
        return v === "true" || v === "yes" || v === "1" || v === "x" || v === "✓";
      };

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
        const trialsReward = colTrialsReward ? parseBoolField(r[colTrialsReward]) : false;
        const questReward = colQuestReward ? parseBoolField(r[colQuestReward]) : false;
        const description = colDescription ? norm(r[colDescription]) : "";
        const active = colActive ? parseBoolField(r[colActive]) : true; // Default to true if column missing
        items.push({ name, type, map, cond, loc, cont, img, rarity, conf, wiki, typeIcon, trialsReward, questReward, description, active });
      }

      // Filter out inactive items from state - they won't appear anywhere on the site
      state.all = items.filter(item => item.active !== false);
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
    if (state.filters.collected === "spares") label = "Has Spares";

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
    // "spares" shows only items with spares > 0
    if (state.filters.collected === "spares" && !(state.spares[it.name] > 0)) return false;

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
    card.style.setProperty("--glow-color", rarityColor(it.rarity));
    card.dataset.name = it.name; // For context menu
    // Reuse style settings

    const frame = document.createElement("div");
    frame.className = "rarity-frame rarity-glow relative overflow-hidden";
    frame.style.borderColor = rarityColor(it.rarity);

    const imgWrap = document.createElement("div");
    imgWrap.className = "relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden";
    // Background: Rarity gradient fades (0% -> 75%) into dark grey - middle ground
    // Pattern image with a 75% black overlay behind the rarity gradient
    imgWrap.style.background = `
      linear-gradient(to top right, ${rarityColor(it.rarity)}44 0%, rgba(24,24,27,0.5) 75%),
      linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
      url('Background/Arc BP Image Background.webp')
    `;
    imgWrap.style.backgroundSize = "cover, cover, cover";
    imgWrap.style.backgroundPosition = "center, center, center";
    imgWrap.style.backgroundBlendMode = "normal, normal, normal";
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

    // -- "Most Likely" Group Container --
    const spawnGroup = document.createElement("div");
    spawnGroup.className = "bg-zinc-900/50 rounded-lg p-3 border border-zinc-800 mb-3";

    // Group Header
    const groupHeader = document.createElement("div");
    groupHeader.className = "text-[10px] uppercase font-bold text-zinc-500 mb-2 tracking-wider";
    groupHeader.textContent = "Most Likely Spawn";
    spawnGroup.appendChild(groupHeader);

    let hasSpawnData = false;
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

      row.appendChild(l);
      row.appendChild(v);
      return row;
    };

    // Add spawn fields to the group
    [
      makeRow("Map", it.map),
      makeRow("Location", it.loc),
      makeRow("Container", it.cont),
      makeRow("Condition", it.cond)
    ]
      .filter(Boolean)
      .forEach(r => {
        spawnGroup.appendChild(r);
        hasSpawnData = true;
      });

    // Only append the group if it has content
    if (hasSpawnData) {
      details.appendChild(spawnGroup);
    }

    // -- Fields Outside Group (Confidence, Rewards) --

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

    // Trials Reward row (only show if true)
    if (it.trialsReward) {
      const row = document.createElement("div");
      row.className = "details-row";

      const label = document.createElement("div");
      label.className = "details-label";
      label.textContent = "Trials Reward";

      const val = document.createElement("div");
      val.className = "details-value";
      val.innerHTML = `<span class="inline-flex items-center gap-1.5 text-emerald-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Yes</span>`;

      row.appendChild(label);
      row.appendChild(val);
      details.appendChild(row);
    }

    // Quest Reward row (only show if true)
    if (it.questReward) {
      const row = document.createElement("div");
      row.className = "details-row";

      const label = document.createElement("div");
      label.className = "details-label";
      label.textContent = "Quest Reward";

      const val = document.createElement("div");
      val.className = "details-value";
      val.innerHTML = `<span class="inline-flex items-center gap-1.5 text-amber-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Yes</span>`;

      row.appendChild(label);
      row.appendChild(val);
      details.appendChild(row);
    }



    // Description (if present) - Standard Row Layout
    if (it.description) {
      const row = document.createElement("div");
      row.className = "details-row";

      const label = document.createElement("div");
      label.className = "details-label";
      label.textContent = "Description";

      const val = document.createElement("div");
      val.className = "details-value";
      val.textContent = it.description;
      // If description is long, we might want to ensure it wraps nicely, but details-value usually handles it.
      // We can add italic if desired, or keep it standard white. 
      // User said "text should show in white", so keeping standard.
      // If user wants italic, I can add `italic` class to val.className or val.classList.add("italic").
      // Based on previous prompt "make it italic also", I will keep it italic but in the standard row format.
      val.classList.add("italic");

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
      e.stopPropagation();

      const isOpen = !details.classList.contains("hidden");

      if (isOpen) {
        deselectAll();
      } else {
        selectCard(card, "details");

        // Overflow check

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

    // Render spares pill if item has spares (both tabs for visibility, but clicakble in collection)
    const sparesCount = state.spares[it.name] || 0;
    if (sparesCount > 0) {
      const pill = document.createElement("div");
      pill.className = "spares-pill absolute top-2 right-2 z-20 px-2 py-1 rounded-full text-[11px] bg-sky-500/20 text-sky-400 border border-sky-500/30 backdrop-blur-sm cursor-pointer";
      pill.innerHTML = `Spares: <span class="font-bold">${sparesCount}</span>`;
      pill.dataset.itemName = it.name;
      frame.appendChild(pill);
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
// Update initCollectionFilters to handle unified grid
function initCollectionFilters() {
  const allBtn = document.getElementById("collectedAll");
  const yesBtn = document.getElementById("collectedYes");
  const wishlistBtn = document.getElementById("collectedWish");
  const noBtn = document.getElementById("collectedNo");
  const sparesBtn = document.getElementById("collectedSpares");

  const setFilter = (value) => {
    state.filters.collected = value;

    // Synchronize buttons
    const buttons = {
      all: allBtn,
      collected: yesBtn,
      wishlist: wishlistBtn,
      "not-collected": noBtn,
      "spares": sparesBtn
    };

    Object.values(buttons).forEach(btn => btn?.classList.remove("chip-active"));

    // Activate correct button
    if (buttons[value]) buttons[value].classList.add("chip-active");

    applyFilters();
    renderFacets(); // To update the chips
    saveFilters();
  };

  if (allBtn) allBtn.onclick = () => setFilter("all");
  if (yesBtn) yesBtn.onclick = () => setFilter("collected");
  if (wishlistBtn) wishlistBtn.onclick = () => setFilter("wishlist");
  if (noBtn) noBtn.onclick = () => setFilter("not-collected");
  if (sparesBtn) sparesBtn.onclick = () => setFilter("spares");

  // Initial sync on load
  setFilter(state.filters.collected);
}


// =====================================================
// Context Menu for My Collection
// =====================================================
function initContextMenu() {
  const menu = document.getElementById("itemContextMenu");
  const grid = document.getElementById("grid");
  if (!menu || !grid) return;

  let activeCard = null;
  let longPressTimer = null;
  const LONG_PRESS_DURATION = 500; // ms

  // Show menu beneath the card
  const showMenu = (card) => {
    selectCard(card, "menu");

    // Stop any pending close since we are showing it now
    if (window.menuCloseTimer) {
      clearTimeout(window.menuCloseTimer);
      window.menuCloseTimer = null;
    }

    activeCard = card;
    if (!card) return;

    const cardRect = card.getBoundingClientRect();
    const menuWidth = 200; // Expected max width

    // Position menu centered below card
    let left = cardRect.left + (cardRect.width / 2) - (menuWidth / 2);
    let top = cardRect.bottom + 8; // 8px gap

    // Screen edge safety checks (horizontal)
    const margin = 12;
    if (left < margin) {
      left = margin;
    } else if (left + menuWidth > window.innerWidth - margin) {
      left = window.innerWidth - menuWidth - margin;
    }

    // Vertical safety check: if it would go off the bottom, show it above the item instead
    const estimatedHeight = 240; // Approx height including all options and stepper
    if (top + estimatedHeight > window.innerHeight - margin) {
      top = cardRect.top - estimatedHeight - 8;
      // Ensure it doesn't go off the top either
      if (top < margin) top = margin;
    }

    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    menu.classList.remove("hidden");
    requestAnimationFrame(() => menu.classList.remove("opacity-0"));

    // Update spares count display for this item
    const contextSparesCount = document.getElementById("contextSparesCount");
    if (contextSparesCount && card) {
      const itemName = card.dataset.name;
      const count = state.spares[itemName] || 0;
      contextSparesCount.textContent = count;
    }
  };

  // Hide menu
  const hideMenu = () => {
    menu.classList.add("opacity-0");
    setTimeout(() => menu.classList.add("hidden"), 150);
    if (activeCard) activeCard.classList.remove("card-selected");
    activeCard = null;
  };

  // Right-click handler (Desktop) - Global on Grid
  grid.addEventListener("contextmenu", (e) => {
    // if (state.currentTab !== "collection") return; // Enabled globally now
    const card = e.target.closest(".card-compact");
    if (!card) return;
    e.preventDefault();
    showMenu(card);
  });

  // Long-press handlers (Mobile) - Global on Grid
  grid.addEventListener("touchstart", (e) => {
    // if (state.currentTab !== "collection") return; // Enabled globally now
    const card = e.target.closest(".card-compact");
    if (!card) return;

    longPressTimer = setTimeout(() => {
      showMenu(card);
      // Vibrate if supported
      if (navigator.vibrate) navigator.vibrate(50);
    }, LONG_PRESS_DURATION);
  }, { passive: true });

  grid.addEventListener("touchend", () => {
    clearTimeout(longPressTimer);
  }, { passive: true });

  grid.addEventListener("touchmove", () => {
    clearTimeout(longPressTimer);
  }, { passive: true });

  // Hide menu/details on click outside
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target)) {
      deselectAll();
    }
  });

  // Spares pill click handler (event delegation) - open context menu
  grid.addEventListener("click", (e) => {
    const pill = e.target.closest(".spares-pill");
    if (!pill) return;
    e.stopPropagation();
    const card = pill.closest(".card-compact");
    if (card) {
      showMenu(card);
    }
  });

  // Hide menu on scroll
  window.addEventListener("scroll", hideMenu, { passive: true });

  // Hide menu on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideMenu();
  });

  // Inline Spares Stepper Setup (in context menu)
  const contextSparesCount = document.getElementById("contextSparesCount");
  const contextSparesMinus = document.getElementById("contextSparesMinus");
  const contextSparesPlus = document.getElementById("contextSparesPlus");

  const updateContextSparesDisplay = () => {
    if (activeCard && contextSparesCount) {
      const itemName = activeCard.dataset.name;
      const count = state.spares[itemName] || 0;
      contextSparesCount.textContent = count;
    }
  };

  const updateSparesPill = (card, itemName) => {
    const frame = card?.querySelector(".rarity-frame");
    if (!frame) return;

    // Remove existing spares pill
    const existingPill = frame.querySelector(".spares-pill");
    if (existingPill) existingPill.remove();

    const count = state.spares[itemName] || 0;
    if (count > 0) {
      const pill = document.createElement("div");
      pill.className = "spares-pill absolute top-2 right-2 z-20 px-2 py-1 rounded-full text-[11px] bg-sky-500/20 text-sky-400 border border-sky-500/30 backdrop-blur-sm cursor-pointer";
      pill.innerHTML = `Spares: <span class="font-bold">${count}</span>`;
      pill.dataset.itemName = itemName;
      frame.appendChild(pill);
    }
  };

  // Spares - button handler (inline in context menu)
  if (contextSparesMinus) {
    contextSparesMinus.onclick = (e) => {
      e.stopPropagation(); // Don't close menu
      if (!activeCard) return;
      const itemName = activeCard.dataset.name;
      const current = state.spares[itemName] || 0;
      if (current > 0) {
        state.spares[itemName] = current - 1;
        if (state.spares[itemName] === 0) {
          delete state.spares[itemName];
        }
        saveSpares();
        updateContextSparesDisplay();
        updateSparesPill(activeCard, itemName);
      }
    };
  }

  // Spares + button handler (inline in context menu)
  if (contextSparesPlus) {
    contextSparesPlus.onclick = (e) => {
      e.stopPropagation(); // Don't close menu
      if (!activeCard) return;
      const itemName = activeCard.dataset.name;
      const current = state.spares[itemName] || 0;
      state.spares[itemName] = current + 1;
      saveSpares();
      updateContextSparesDisplay();
      updateSparesPill(activeCard, itemName);
    };
  }


  // Menu item actions
  menu.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn || !activeCard) return;

    const action = btn.dataset.action;
    const itemName = activeCard.dataset.name;
    const frame = activeCard.querySelector(".rarity-frame");

    if (!itemName) {
      hideMenu();
      return;
    }

    if (action === "collected") {
      // Toggle collected state
      if (state.collectedItems.has(itemName)) {
        state.collectedItems.delete(itemName);
      } else {
        state.wishlistedItems.delete(itemName); // Remove from wishlist if present
        state.collectedItems.add(itemName);
      }
      saveCollectionState();
      if (frame) updateCardVisuals(frame, itemName);
      updateProgress();
      hideMenu();
    } else if (action === "wishlisted") {
      // Toggle wishlisted state
      if (state.wishlistedItems.has(itemName)) {
        state.wishlistedItems.delete(itemName);
      } else {
        state.collectedItems.delete(itemName); // Remove from collected if present
        state.wishlistedItems.add(itemName);
      }
      saveCollectionState();
      if (frame) updateCardVisuals(frame, itemName);
      updateProgress();
      hideMenu();
    } else if (action === "uncollected") {
      // Remove from both collected and wishlisted
      state.collectedItems.delete(itemName);
      state.wishlistedItems.delete(itemName);
      saveCollectionState();
      if (frame) updateCardVisuals(frame, itemName);
      updateProgress();
      hideMenu();
    }
  });
}




