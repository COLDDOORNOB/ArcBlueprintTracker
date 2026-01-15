/*
 * Simple World-Space Heatmap Generator
 * 
 * Uses simpleheat to generate a static canvas matching the map's dimensions.
 * This canvas is then added as an L.imageOverlay, ensuring perfect coordinate tracking
 * (zero drift) on CRS.Simple maps, at the cost of dots scaling with zoom.
 */

// Vendorized simpleheat (v0.2.0)
// https://github.com/mourner/simpleheat
!function () { "use strict"; function t(i) { return this instanceof t ? (this._canvas = i = "string" == typeof i ? document.getElementById(i) : i, this._ctx = i.getContext("2d"), this._width = i.width, this._height = i.height, this._max = 1, void this.clear()) : new t(i) } t.prototype = { defaultRadius: 25, defaultGradient: { .4: "blue", .6: "cyan", .7: "lime", .8: "yellow", 1: "red" }, data: function (t, i) { return this._data = t, this }, max: function (t) { return this._max = t, this }, add: function (t) { return this._data.push(t), this }, clear: function () { return this._data = [], this }, radius: function (t, i) { i = i || 15; var a = this._circle = document.createElement("canvas"), s = a.getContext("2d"), e = this._r = t + i; return a.width = a.height = 2 * e, s.shadowOffsetX = s.shadowOffsetY = 200, s.shadowBlur = i, s.shadowColor = "black", s.beginPath(), s.arc(e - 200, e - 200, t, 0, 2 * Math.PI, !0), s.closePath(), s.fill(), this }, gradient: function (t) { var i = document.createElement("canvas"), a = i.getContext("2d"), s = a.createLinearGradient(0, 0, 0, 256); i.width = 1, i.height = 256; for (var e in t) s.addColorStop(e, t[e]); return a.fillStyle = s, a.fillRect(0, 0, 1, 256), this._grad = a.getImageData(0, 0, 1, 256).data, this }, draw: function (t) { this._circle || this.radius(this.defaultRadius), this._grad || this.gradient(this.defaultGradient); var i = this._ctx; i.clearRect(0, 0, this._width, this._height); for (var a, s = 0, e = this._data.length; e > s; s++)a = this._data[s], i.globalAlpha = Math.max(a[2] / this._max, t || .05), i.drawImage(this._circle, a[0] - this._r, a[1] - this._r); var n = i.getImageData(0, 0, this._width, this._height); return this._colorize(n.data, this._grad), i.putImageData(n, 0, 0), this }, _colorize: function (t, i) { for (var a, s = 3, e = t.length; e > s; s += 4)a = 4 * t[s], a && (t[s - 3] = i[a], t[s - 2] = i[a + 1], t[s - 1] = i[a + 2]) } }, window.simpleheat = t }();

/**
 * Creates a static ImageOverlay containing a heatmap of the points.
 * @param {Array} points - Array of {x, y, value} objects (native map coordinates)
 * @param {Array} bounds - Leaflet bounds [[y1, x1], [y2, x2]]
 * @param {Object} options - Heatmap options {radius, blur, gradient, max}
 * @returns {L.ImageOverlay}
 */
export function createWorldHeatmap(points, bounds, options = {}) {
    // 1. Calculate dimensions
    const topLeft = bounds[0]; // [0, 0] usually
    const bottomRight = bounds[1]; // [maxY, maxX]

    // For CRS.Simple image maps:
    const width = Math.abs(bottomRight[1] - topLeft[1]);
    const height = Math.abs(bottomRight[0] - topLeft[0]);

    // 2. Create off-screen canvas (High-Res)
    // You might want to cap this for massive maps, but 4k x 4k is 16MP (64MB), manageable.
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    // 3. Initialize simpleheat
    const heat = window.simpleheat(canvas);

    // Config
    heat.radius(options.radius || 25, options.blur || 15);
    if (options.gradient) heat.gradient(options.gradient);
    heat.max(options.max || 1);

    // 4. Add points (Directly mapping x/y with Y-INVERSION)
    // Canvas Origin is Top-Left. Map Origin (Simple CRS) is Bottom-Left (usually).
    // So canvas Y = Height - Map Y
    // Also shift by minX/minY if bounds start non-zero
    const minY = topLeft[0];
    const minX = topLeft[1];

    const data = points.map(p => {
        const x = p.x - minX;
        const y = height - (p.y - minY); // Invert Y
        return [x, y, p.value || 1];
    });
    heat.data(data);

    // 5. Draw
    heat.draw(options.minOpacity || 0.05);

    // 6. Return as ImageOverlay
    // Convert to Data URL for compatibility with standard Leaflet ImageOverlay
    return L.imageOverlay(canvas.toDataURL(), bounds, {
        opacity: 0.8,
        interactive: false
    });
}
