
function renderProgression() {
    const container = document.getElementById("progressionTab");
    if (!container || container.classList.contains("hidden")) return;

    const total = state.all.length;
    const collected = state.progress.size; // Assuming state.progress stores names of collected items

    if (total === 0) return;

    const percent = Math.round((collected / total) * 100);

    // Update Big Circle
    const circle = document.getElementById("progressionCircle");
    const sign = document.getElementById("progressionSign");
    const countLabel = document.getElementById("progressionCount");

    if (sign) sign.textContent = `${percent}%`;
    if (countLabel) countLabel.textContent = `${collected} / ${total}`;

    if (circle) {
        // 502 is approximate circumference for r=80 (2 * pi * 80 ~= 502.65)
        // Stroke Dash Offset: 502 (empty) -> 0 (full)
        // Formula: 502 - (502 * percent / 100)
        const circumference = 502;
        const offset = circumference - (circumference * percent) / 100;
        circle.style.strokeDashoffset = offset;
    }

    // Update Category Grid
    const grid = document.getElementById("progressionCategories");
    if (!grid) return;
    grid.innerHTML = "";

    // Group items by Type
    const typeCounts = {};
    state.all.forEach(item => {
        const t = item.type || "Unknown";
        if (!typeCounts[t]) typeCounts[t] = { total: 0, collected: 0, icon: item.typeIcon };
        typeCounts[t].total++;
        // Check main collection
        if (state.progress.has(item.name)) {
            typeCounts[t].collected++;
        }
    });

    // Sort alpha or by count? User said "all with item type icons integrated"
    const types = Object.keys(typeCounts).sort();

    types.forEach(type => {
        const data = typeCounts[type];
        const p = Math.round((data.collected / data.total) * 100);

        const card = document.createElement("div");
        card.className = "bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-3";

        // Header
        const header = document.createElement("div");
        header.className = "flex items-center gap-3";

        const iconBox = document.createElement("div");
        iconBox.className = "w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700";
        if (data.icon) {
            const img = document.createElement("img");
            img.src = data.icon;
            img.className = "w-6 h-6 opacity-80";
            iconBox.appendChild(img);
        }

        const textGroup = document.createElement("div");
        const title = document.createElement("div");
        title.className = "text-sm font-bold text-zinc-100";
        title.textContent = type;
        const sub = document.createElement("div");
        sub.className = "text-xs text-zinc-500";
        sub.textContent = `${data.collected} / ${data.total}`;

        textGroup.appendChild(title);
        textGroup.appendChild(sub);
        header.appendChild(iconBox);
        header.appendChild(textGroup);

        // Progress Bar
        const barWrap = document.createElement("div");
        barWrap.className = "h-2 w-full bg-zinc-800 rounded-full overflow-hidden";
        const bar = document.createElement("div");
        bar.className = "h-full bg-emerald-500 rounded-full";
        bar.style.width = `${p}%`;
        barWrap.appendChild(bar);

        card.appendChild(header);
        card.appendChild(barWrap);
        grid.appendChild(card);
    });
}
