
/* ==========================================================================
   TUTORIAL CONTROLLER (v1.6) - FULL SCRIPT
   ========================================================================== */

const TutorialController = {
    isActive: false,
    currentStep: -1,
    typingTimer: null,

    // Configuration - FULL TUTORIAL STEPS
    steps: [
        // === WELCOME ===
        {
            id: "welcome",
            text: "Welcome to the <span class='text-highlight'>Arc Blueprint Tracker</span>!",
            buttons: [
                { text: "No, I'm a trailblazer", action: "exit_prompt", class: "" },
                { text: "Let's go!", action: "next", class: "primary" }
            ],
            spotlightTarget: null
        },

        // === BLUEPRINTS TAB ===
        {
            id: "intro",
            text: "Here is the <span class='text-highlight'>Blueprints Tab</span>. This is where you will see a blueprint's most likely spawns, manage your collection, and submit blueprint locations.",
            buttons: [{ text: "Next", action: "next", class: "primary" }],
            spotlightTarget: null,
            onStart: () => {
                document.getElementById("tabBlueprints")?.click();
            }
        },
        {
            id: "item_card",
            text: "<span class='text-highlight'>Tap</span> a Blueprint to see information on where you can get it.",
            buttons: [{ text: "Next", action: "next", class: "primary" }],
            spotlightTarget: '.card-compact',
            onStart: () => window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        {
            id: "spawn_info",
            text: "Here you can see the data on its <span class='text-highlight'>spawn patterns</span>, or if it is a <span class='text-highlight'>Quest</span> or <span class='text-highlight'>Trial</span> reward.",
            buttons: [{ text: "Next", action: "next", class: "primary" }],
            spotlightTarget: '.card-compact'
        },
        {
            id: "confidence",
            text: "The <span class='text-highlight'>'Confidence'</span> – or amount of data pointing to that conclusion – is marked by a colored indicator on the item card.",
            buttons: [{ text: "Next", action: "next", class: "primary" }],
            spotlightTarget: '.card-compact .confidence-pill'
        },
        {
            id: "quick_actions_prompt",
            text: "<span class='text-highlight'>Tap and hold</span> a Blueprint to open the <span class='text-highlight'>Quick Actions Menu</span>.",
            buttons: [],
            spotlightTarget: '.card-compact[data-name="Aphelion"]',
            waitForEvent: "contextmenu"
        },
        {
            id: "quick_actions_explain",
            text: "Here you can mark items as <span class='text-green'>collected</span>, <span class='text-yellow'>wishlisted</span>, or add <span class='text-blue'>spares</span>.",
            buttons: [{ text: "Next", action: "next", class: "primary" }],
            spotlightTarget: '.card-compact[data-name="Aphelion"]',
            forcePosition: "pos-top"
        },
        {
            id: "mark_collected",
            text: "Have a lot of items to collect? Use the <span class='text-highlight'>Mark Items as Collected</span> button to enter collect mode.",
            buttons: [{ text: "Next", action: "next", class: "primary" }],
            spotlightTarget: '#toggleMassCollectBtn'
        },
        {
            id: "submit_intro",
            text: "After you find a Blueprint, please <span class='text-highlight'>submit your findings</span> right here on the Blueprints tab!",
            buttons: [{ text: "Next", action: "next", class: "primary" }],
            spotlightTarget: '#submitLocationFab'
        },
        {
            id: "submit_prompt",
            text: "<span class='text-highlight'>Tap</span> the Submit button to open the form.",
            buttons: [],
            spotlightTarget: '#submitLocationFab',
            waitForEvent: "click"
        },
        {
            id: "submit_explain",
            text: "Add in the blueprint, condition, map/location, and importantly <span class='text-highlight'>container type</span>. Once we have collected enough data, we will make a heatmap of all user-submitted locations!",
            buttons: [{ text: "Next", action: "next", class: "primary" }],
            spotlightTarget: '#submitModal',
            onStart: () => {
                // Modal should be open from previous click
            }
        },

        // === FILTERS ===
        {
            id: "filters_intro",
            text: "<span class='text-highlight'>Tap</span> the sidebar icon to access your account and the filters menu.",
            buttons: [],
            spotlightTarget: '#desktopFilterBtn',
            waitForEvent: "click"
        },
        {
            id: "filters_sync",
            text: "Sync with a <span class='text-highlight'>Google account</span> to keep track of your item collection.",
            buttons: [{ text: "Next", action: "next", class: "primary" }],
            spotlightTarget: '#loginBtn',
            onStart: () => {
                // Open sidebar if needed
                const sidebar = document.getElementById("filtersSidebar");
                if (sidebar) sidebar.classList.remove("-translate-x-full");
            }
        },
        {
            id: "filters_usage",
            text: "Use the <span class='text-highlight'>filters buttons</span> to customize your view.",
            buttons: [{ text: "Next", action: "next", class: "primary" }],
            spotlightTarget: '#filtersSidebar'
        },

        // === DATA TAB ===
        {
            id: "data_intro",
            text: "Click the <span class='text-highlight'>Data Tab</span> to see even more detailed breakdowns. (Or click 'Detailed Data' inside an item's description.)",
            buttons: [],
            spotlightTarget: '#tabData',
            waitForEvent: "click"
        },
        {
            id: "data_registry",
            text: "This is the <span class='text-highlight'>Drop Registry</span>, where you can find detailed, raw data on blueprint spawns.",
            buttons: [{ text: "Next", action: "next", class: "primary" }],
            spotlightTarget: '#dataTab',
            onStart: () => {
                document.getElementById("tabData")?.click();
            }
        },
        {
            id: "data_item",
            text: "Click an item to see its <span class='text-highlight'>detailed stats</span>.",
            buttons: [{ text: "Next", action: "next", class: "primary" }],
            spotlightTarget: '#dataRows' // Or the first row
        },

        // === PROGRESSION TAB ===
        {
            id: "progression_intro",
            text: "Tap the <span class='text-highlight'>Progression Tab</span> to view your collection progress.",
            buttons: [],
            spotlightTarget: '#tabProgression',
            waitForEvent: "click"
        },
        {
            id: "progression_explain",
            text: "Here you can see your overall progress and category breakdowns.",
            buttons: [{ text: "Next", action: "next", class: "primary" }],
            spotlightTarget: '#progressionTab',
            onStart: () => {
                document.getElementById("tabProgression")?.click();
            }
        },

        // === NEWS TAB ===
        {
            id: "news_intro",
            text: "<span class='text-highlight'>Updates and News</span>: Keep up with new updates and access the <span class='text-highlight'>Discord</span> and <span class='text-highlight'>Ko-fi</span>!",
            buttons: [],
            spotlightTarget: '#announcementsBtn',
            waitForEvent: "click"
        },
        {
            id: "news_explain",
            text: "Join the <span class='text-highlight'>Discord</span> to share findings, trade blueprints, and stay up to date. <span class='text-highlight'>Ko-fi</span> is how you can support keeping this site free and ad-free!",
            buttons: [{ text: "Next", action: "next", class: "primary" }],
            spotlightTarget: null
        },

        // === GOODBYE ===
        {
            id: "goodbye",
            text: "Enjoy the tracker and good luck Topside, <span class='text-highlight'>Raider</span>!",
            buttons: [{ text: "Done!", action: "end", class: "primary" }],
            spotlightTarget: null
        }
    ],

    init() {
        const seen = localStorage.getItem("tutorial_v1.6_seen");
        // Auto-start for new users (uncomment when ready)
        // if (!seen) setTimeout(() => this.start(), 1000);

        // Bind Test Button
        const btn = document.getElementById("testTutorialBtn");
        if (btn) btn.onclick = (e) => { e.stopPropagation(); this.start(); };

        // Bind Close Button
        const closeBtn = document.getElementById("tutorialCloseBtn");
        if (closeBtn) closeBtn.onclick = (e) => { e.stopPropagation(); this.showExitConfirmation(); };

        this.boundUpdateSpotlight = this.updateSpotlightPosition.bind(this);
    },

    start() {
        this.isActive = true;
        this.currentStep = 0;
        this.renderStep();

        const overlay = document.getElementById("tutorialOverlay");
        if (overlay) {
            overlay.classList.remove("hidden");
            requestAnimationFrame(() => overlay.classList.add("active"));
        }

        document.body.style.overflow = "hidden";
    },

    end() {
        this.isActive = false;
        this.currentStep = -1;

        const overlay = document.getElementById("tutorialOverlay");
        if (overlay) {
            overlay.classList.remove("active");
            setTimeout(() => overlay.classList.add("hidden"), 500);
        }

        document.body.style.overflow = "";
        localStorage.setItem("tutorial_v1.6_seen", "true");
    },

    updateSpotlightPosition() {
        if (!this.isActive) return;
        const step = this.steps[this.currentStep];
        if (!step || !step.spotlightTarget) return;

        const el = document.querySelector(step.spotlightTarget);
        if (el) this.moveSpotlight(el);
    },

    next() {
        // Cleanup UI before moving on
        this.cleanupUI();

        this.currentStep++;
        if (this.currentStep >= this.steps.length) {
            this.end();
        } else {
            this.renderStep();
        }
    },

    cleanupUI() {
        // Close context menu
        const contextMenu = document.getElementById("itemContextMenu");
        if (contextMenu) contextMenu.classList.add("hidden");

        // Close submit modal
        const submitModal = document.getElementById("submitModal");
        if (submitModal) submitModal.classList.add("hidden");

        // Close any open details/modals
        const detailsDrawer = document.getElementById("itemDetailsDrawer");
        if (detailsDrawer) detailsDrawer.classList.add("hidden");
    },

    prev() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.renderStep();
        }
    },

    showExitConfirmation() {
        const textEl = document.getElementById("tutorialText");
        const actionsEl = document.getElementById("tutorialActions");

        if (!textEl || !actionsEl) return;

        this.typeText("Walkthrough mode is always available in the Updates and News tab.", () => {
            actionsEl.innerHTML = "";
            actionsEl.style.opacity = "1";

            const okBtn = document.createElement("button");
            okBtn.className = "tutorial-btn primary";
            okBtn.textContent = "Got it";
            okBtn.onclick = () => this.end();
            actionsEl.appendChild(okBtn);
        });

        this.hideSpotlight();
    },

    renderStep() {
        const step = this.steps[this.currentStep];
        if (!step) return;

        if (step.onStart) step.onStart();

        const textEl = document.getElementById("tutorialText");
        const actionsEl = document.getElementById("tutorialActions");
        const box = document.getElementById("tutorialBox");

        if (!textEl || !actionsEl) return;

        textEl.innerHTML = "";
        actionsEl.innerHTML = "";
        actionsEl.style.opacity = "0";

        // Force position if specified
        if (step.forcePosition && box) {
            box.classList.remove("pos-top", "pos-bottom");
            box.classList.add(step.forcePosition);
        }

        // Spotlight
        if (step.spotlightTarget) {
            this.waitForElement(step.spotlightTarget, (el) => {
                this.moveSpotlight(el);

                if (step.waitForEvent) {
                    // Add event listener for the wait
                    const handler = () => {
                        el.removeEventListener(step.waitForEvent, handler);
                        document.removeEventListener(step.waitForEvent, handler);
                        this.next();
                    };
                    el.addEventListener(step.waitForEvent, handler, { once: true });
                    document.addEventListener(step.waitForEvent, handler, { once: true });
                }
            });
        } else {
            this.hideSpotlight();
        }

        // Type Text
        this.typeText(step.text, () => {
            // Back button (if not first step and not a wait step)
            if (this.currentStep > 0 && !step.waitForEvent) {
                const prevBtn = document.createElement("button");
                prevBtn.className = "tutorial-btn";
                prevBtn.textContent = "Back";
                const controller = this;
                prevBtn.onclick = function () { controller.prev(); };
                actionsEl.appendChild(prevBtn);
            }

            // Step buttons
            if (step.buttons && step.buttons.length > 0) {
                step.buttons.forEach(btnConfig => {
                    const btn = document.createElement("button");
                    btn.className = `tutorial-btn ${btnConfig.class}`;
                    btn.textContent = btnConfig.text;
                    btn.onclick = () => {
                        if (btnConfig.action === "next") this.next();
                        if (btnConfig.action === "end") this.end();
                        if (btnConfig.action === "skip") this.end();
                        if (btnConfig.action === "exit_prompt") this.showExitConfirmation();
                    };
                    actionsEl.appendChild(btn);
                });
            }

            // If waitForEvent, show a "Skip" button
            if (step.waitForEvent) {
                const skipBtn = document.createElement("button");
                skipBtn.className = "tutorial-btn";
                skipBtn.textContent = "Skip";
                skipBtn.onclick = () => this.next();
                actionsEl.appendChild(skipBtn);
            }

            actionsEl.style.opacity = "1";
        });
    },

    moveSpotlight(element) {
        const spotlight = document.getElementById("tutorialSpotlight");
        const box = document.getElementById("tutorialBox");
        if (!spotlight || !box) return;

        if (!element || element.offsetParent === null) {
            this.hideSpotlight();
            box.classList.remove("pos-top", "pos-bottom");
            return;
        }

        spotlight.style.opacity = "1";
        const rect = element.getBoundingClientRect();
        const padding = 6;

        spotlight.style.top = `${rect.top - padding}px`;
        spotlight.style.left = `${rect.left - padding}px`;
        spotlight.style.width = `${rect.width + (padding * 2)}px`;
        spotlight.style.height = `${rect.height + (padding * 2)}px`;

        // Dynamic Box Positioning (unless forced)
        const step = this.steps[this.currentStep];
        if (!step.forcePosition) {
            const centerY = rect.top + (rect.height / 2);
            const viewportHeight = window.innerHeight;

            box.classList.remove("pos-top", "pos-bottom");
            if (centerY < viewportHeight / 2) {
                box.classList.add("pos-bottom");
            } else {
                box.classList.add("pos-top");
            }
        }
    },

    hideSpotlight() {
        const spotlight = document.getElementById("tutorialSpotlight");
        const box = document.getElementById("tutorialBox");
        if (spotlight) spotlight.style.opacity = "0";
        if (box) box.classList.remove("pos-top", "pos-bottom");
    },

    typeText(text, callback) {
        const textEl = document.getElementById("tutorialText");
        if (this.typingTimer) clearInterval(this.typingTimer);
        textEl.innerHTML = "";

        // If HTML, insert directly
        if (text.includes("<")) {
            textEl.innerHTML = text;
            if (callback) callback();
            return;
        }

        let i = 0;
        this.typingTimer = setInterval(() => {
            textEl.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(this.typingTimer);
                if (callback) callback();
            }
        }, 15);
    },

    waitForElement(selector, callback) {
        const el = document.querySelector(selector);
        if (el) { callback(el); return; }

        let retries = 0;
        const interval = setInterval(() => {
            const retryEl = document.querySelector(selector);
            if (retryEl) {
                clearInterval(interval);
                callback(retryEl);
            }
            retries++;
            if (retries > 20) clearInterval(interval);
        }, 100);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    TutorialController.init();
});
