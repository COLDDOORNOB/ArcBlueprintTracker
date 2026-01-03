/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./*.js",
        "./scripts/**/*.js"
    ],
    theme: {
        extend: {
            fontFamily: {
                // Base body font - clean and readable
                sans: ['Barlow', 'system-ui', 'sans-serif'],
                // Tabs and navigation headings - modern and geometric
                tabs: ['Urbanist', 'system-ui', 'sans-serif'],
                // Large hero headings - bold and impactful
                heading: ['Prompt', 'system-ui', 'sans-serif'],
                // HUD elements like stats, counters, code - monospace
                hud: ['JetBrains Mono', 'ui-monospace', 'monospace'],
            },
        },
    },
    plugins: [],
}
