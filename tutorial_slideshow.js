
window.TutorialSlideshow = {
    steps: [
        // --- 1. WELCOME ---
        {
            text: "Welcome to the <span class='text-highlight'>Arc Blueprint Tracker</span>!",
            imageDesktop: "desktop_main.webp",
            imageMobile: "mobile_main.webp"
        },
        // --- 2. BLUEPRINTS TAB ---
        {
            textDesktop: "<span class='text-highlight'>Click</span> a Blueprint to see information on where you can get it.",
            textMobile: "<span class='text-highlight'>Tap</span> a Blueprint to see information on where you can get it.",
            imageDesktop: "desktop_main_card_h.webp",
            imageMobile: "mobile_main_card_h.webp"
        },
        // --- 3. SPAWN INFO ---
        {
            text: "Here you can see the data on its <span class='text-highlight'>spawn patterns</span>, or if it is a Quest or Trial reward.",
            imageDesktop: "desktop_details_h.webp",
            imageMobile: "mobile_details_h.webp"
        },
        // --- 4. CONFIDENCE ---
        {
            text: "The <span class='text-highlight'>Confidence</span> — or amount of data pointing to that conclusion — is marked by a colored indicator on the item card.",
            imageDesktop: "desktop_main_conf_indicator_h.webp",
            imageMobile: "mobile_main_conf_indicator_h.webp"
        },
        // --- 5. QUICK ACTIONS (OPEN) ---
        {
            textDesktop: "<span class='text-highlight'>Right click</span> a Blueprint to open the <span class='text-highlight'>Quick Actions Menu</span>.",
            textMobile: "<span class='text-highlight'>Long press</span> a Blueprint to open the <span class='text-highlight'>Quick Actions Menu</span>.",
            imageDesktop: "desktop_context_menu_h.webp",
            imageMobile: "mobile_main_card_h.webp"
        },
        // --- 6. QUICK ACTIONS (MENU) ---
        {
            text: "Here you can mark items as <span class='text-green'>collected</span>, <span class='text-yellow'>wishlisted</span>, or add <span class='text-blue'>spares</span>.",
            imageDesktop: "desktop_context_menu_h.webp",
            imageMobile: "mobile_context_menu_h.webp"
        },
        // --- 7. MARK COLLECTED ---
        {
            text: "Have a lot of items to collect? Use the <span class='text-highlight'>mark items as collected</span> button to enter collect mode.",
            imageDesktop: "desktop_collect_mode_h.webp",
            imageMobile: "mobile_collect_mode_h.webp"
        },
        // --- 8. SUBMIT INTRO ---
        {
            text: "After you find a Blueprint please submit your findings right here on the blueprints tab!",
            imageDesktop: "desktop_main_submit_button_h.webp",
            imageMobile: "mobile_main_submit_button.webp"
        },
        // --- 9. SUBMIT FORM ---
        {
            text: "Add in the blueprint, condition, map/location, and importantly container type. Once we have collected enough data we will make a heatmap of all these user submitted locations!",
            imageDesktop: "desktop_submit_final.webp",
            imageMobile: "mobile_submission_final.webp"
        },

        // --- 10. FILTERS (OPEN) ---
        {
            textDesktop: "<span class='text-highlight'>Click</span> the sidebar icon to access your account and the filters menu.",
            textMobile: "<span class='text-highlight'>Tap</span> the sidebar icon to access your account and the filters menu.",
            imageDesktop: "desktop_main_filters_button_h.webp",
            imageMobile: "mobile_main_filter_button_h.webp"
        },
        // --- 11. FILTERS (SYNC) ---
        {
            text: "Sync with a google account to keep track of your item collection. Use the filters buttons to customize your view.",
            imageDesktop: "desktop_main_sign_in_h.webp",
            imageMobile: "mobile_filters_panel_sign_in_h.webp"
        },

        // --- 12. DATA TAB (INTRO) ---
        {
            textDesktop: "<span class='text-highlight'>Click</span> the <span class='text-highlight'>Data Tab</span> to see even more detailed breakdowns. (Or click the “detailed data” button inside an item’s description to jump to that item’s data.)",
            textMobile: "<span class='text-highlight'>Tap</span> the <span class='text-highlight'>Data Tab</span> to see even more detailed breakdowns. (Or tap the “detailed data” button inside an item’s description to jump to that item’s data.)",
            imageDesktop: "desktop_data_tab_h.webp",
            imageMobile: "mobile_data_tab_h.webp"
        },
        // --- 13. DATA REGISTRY (COMBINED) ---
        {
            textDesktop: "This is the drop registry, where you can find detailed, raw data on blueprint spawns. <span class='text-highlight'>Click</span> an item to see its detailed stats.",
            textMobile: "This is the drop registry, where you can find detailed, raw data on blueprint spawns. <span class='text-highlight'>Tap</span> an item to see its detailed stats.",
            imageDesktop: "desktop_data_dropdown_h.webp",
            imageMobile: "mobile_data_tab_dropdown_h.webp"
        },

        // --- 14. PROGRESSION TAB ---
        {
            textDesktop: "<span class='text-highlight'>Click</span> the <span class='text-highlight'>Progression Tab</span> to view your collection progress.",
            textMobile: "<span class='text-highlight'>Tap</span> the <span class='text-highlight'>Progression Tab</span> to view your collection progress.",
            imageDesktop: "desktop_progression_h.webp",
            imageMobile: "mobile_progression_tab_h.webp"
        },

        // --- 15. NEWS TAB ---
        {
            text: "The <span class='text-highlight'>Updates and News</span> tab is where you can keep up with new updates and access the Discord and Kofi as well!",
            imageDesktop: "desktop_news_h.webp",
            imageMobile: "mobile_news_tab.webp"
        },
        // --- 16. DISCORD ---
        {
            text: "Join the Discord to share findings, trade blueprints, discuss strategies, and generally stay up to date with the site.",
            imageDesktop: "desktop_news_discord_h.webp",
            imageMobile: "mobile_news_tab_discord.webp"
        },
        // --- 17. KOFI ---
        {
            text: "Kofi is how you can support me if you enjoy the site and find it useful. I want to keep this site free and ad free for as long as possible and so far community donations have made that possible!",
            imageDesktop: "desktop_news_kofi.webp",
            imageMobile: "mobile_news_tab_kofi.webp"
        },
        // --- 18. GOODBYE ---
        {
            text: "Enjoy the tracker and good luck Topside, <span class='text-highlight'>Raider</span>!",
            imageDesktop: "desktop_main.webp",
            imageMobile: "mobile_main.webp"
        }
    ],

    currentIndex: 0,
    prefix: "images/tutorial/",

    init() {
        // Auto-start check
        const seen = localStorage.getItem("tutorial_slideshow_seen");
        if (!seen) {
            // Short delay to ensure styles loaded
            setTimeout(() => this.open(), 500);
        }

        // Bind global function for buttons
        window.openTutorial = () => this.open();
    },

    open() {
        this.currentIndex = 0;
        this.renderOverlay();
        // Prevent scrolling
        document.body.style.overflow = "hidden";

        // preload images
        this.preloadImages();
    },

    close() {
        const overlay = document.getElementById("tutorialSlideshowOverlay");
        if (overlay) {
            overlay.classList.remove("active");
            setTimeout(() => overlay.remove(), 300);
        }
        document.body.style.overflow = "";
        localStorage.setItem("tutorial_slideshow_seen", "true");
    },

    next() {
        if (this.currentIndex < this.steps.length - 1) {
            this.currentIndex++;
            this.updateContent();
        } else {
            this.close();
        }
    },

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateContent();
        }
    },

    preloadImages() {
        // Simple preload of next 2 images
        for (let i = 1; i <= 3; i++) {
            if (this.steps[this.currentIndex + i]) {
                const img = new Image();
                img.src = this.prefix + (window.innerWidth < 768 ? this.steps[this.currentIndex + i].imageMobile : this.steps[this.currentIndex + i].imageDesktop);
            }
        }
    },

    getImageUrl(step) {
        // Check window width
        const isMobile = window.innerWidth < 768;
        return this.prefix + (isMobile ? step.imageMobile : step.imageDesktop);
    },

    renderOverlay() {
        // Remove existing if any
        const existing = document.getElementById("tutorialSlideshowOverlay");
        if (existing) existing.remove();

        const overlay = document.createElement("div");
        overlay.id = "tutorialSlideshowOverlay";
        overlay.className = "tutorial-overlay";

        overlay.innerHTML = `
            <div class="tutorial-modal">
                <button class="tutorial-close-absolute" onclick="window.TutorialSlideshow.close()">&times;</button>
                
                <div class="tutorial-image-container">
                    <img id="tutorialImage" src="" alt="Tutorial Slide" />
                </div>
                
                <div class="tutorial-content">
                    <div id="tutorialText" class="tutorial-text"></div>
                    
                    <div class="tutorial-nav">
                        <div class="tutorial-dots" id="tutorialDots">
                            <!-- Dots generated by JS -->
                        </div>
                        <div class="tutorial-btn-group">
                            <button class="tutorial-btn" id="tutorialBackBtn" onclick="window.TutorialSlideshow.prev()">Back</button>
                            <button class="tutorial-btn primary" id="tutorialNextBtn" onclick="window.TutorialSlideshow.next()">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Add dots
        const dotsContainer = document.getElementById("tutorialDots");
        this.steps.forEach((_, i) => {
            const dot = document.createElement("div");
            dot.className = "tutorial-dot";
            dotsContainer.appendChild(dot);
        });

        // Trigger reflow for transition
        requestAnimationFrame(() => {
            overlay.classList.add("active");
            this.updateContent();
        });

        // Handle resize to update image source
        window.addEventListener('resize', this.handleResize.bind(this));
    },

    getText(step) {
        const isMobile = window.innerWidth < 768;
        if (isMobile && step.textMobile) return step.textMobile;
        if (!isMobile && step.textDesktop) return step.textDesktop;
        return step.text;
    },

    handleResize() {
        if (!document.getElementById("tutorialSlideshowOverlay")) return;

        const step = this.steps[this.currentIndex];
        if (!step) return;

        // Update image
        const img = document.getElementById("tutorialImage");
        if (img) img.src = this.getImageUrl(step);

        // Update text
        const text = document.getElementById("tutorialText");
        if (text) text.innerHTML = this.getText(step);
    },

    updateContent() {
        const step = this.steps[this.currentIndex];
        const img = document.getElementById("tutorialImage");
        const text = document.getElementById("tutorialText");
        const dots = document.querySelectorAll(".tutorial-dot");
        const backBtn = document.getElementById("tutorialBackBtn");
        const nextBtn = document.getElementById("tutorialNextBtn");

        if (img) {
            img.style.opacity = "0.5";
            setTimeout(() => {
                img.src = this.getImageUrl(step);
                img.onload = () => { img.style.opacity = "1"; };
            }, 100);
        }

        if (text) text.innerHTML = this.getText(step);

        // Update dots
        dots.forEach((dot, i) => {
            if (i === this.currentIndex) dot.classList.add("active");
            else dot.classList.remove("active");
        });

        // Update Buttons
        if (backBtn) {
            backBtn.style.visibility = this.currentIndex === 0 ? "hidden" : "visible";
        }

        if (nextBtn) {
            nextBtn.textContent = this.currentIndex === this.steps.length - 1 ? "Finish" : "Next";
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    window.TutorialSlideshow.init();
});
