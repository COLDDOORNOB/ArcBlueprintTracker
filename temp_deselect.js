// Global timer to manage menu closing race conditions
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
