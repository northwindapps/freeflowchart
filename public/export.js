// Export the rendered chart as PNG or PDF.
// Requires html2canvas (window.html2canvas) and jsPDF (window.jspdf) loaded from CDN.
(function () {
    var PAD = 30;          // px of whitespace around the chart
    var RES = 2;           // output pixel ratio (2 = crisp on retina / print)

    window.addEventListener('DOMContentLoaded', function () {
        var png = document.getElementById('btn-export-png');
        var pdf = document.getElementById('btn-export-pdf');
        if (png) png.addEventListener('click', function () { run(png, exportPNG); });
        if (pdf) pdf.addEventListener('click', function () { run(pdf, exportPDF); });
    });

    function run(btn, fn) {
        if (!window.html2canvas) { alert('Export library failed to load. Check your connection.'); return; }
        var label = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Exporting…';
        fn().catch(function (err) {
            console.error(err);
            alert('Export failed: ' + err.message);
        }).then(function () {
            btn.disabled = false;
            btn.textContent = label;
        });
    }

    // Bounding box (client coords) of every chart node and connection line.
    function chartBounds() {
        var b = { l: Infinity, t: Infinity, r: -Infinity, btm: -Infinity };
        function add(l, t, r, btm) {
            if (r - l <= 0 || btm - t <= 0) return;
            b.l = Math.min(b.l, l); b.t = Math.min(b.t, t);
            b.r = Math.max(b.r, r); b.btm = Math.max(b.btm, btm);
        }
        document.querySelectorAll('#main *').forEach(function (el) {
            if (el.classList.contains('conn-dot')) return;
            var r = el.getBoundingClientRect();
            add(r.left, r.top, r.right, r.bottom);
        });
        conns().forEach(function (c) {
            try {
                var bb = c.path.getBBox();   // svg is fixed at 0,0 → client coords
                add(bb.x, bb.y, bb.x + bb.width, bb.y + bb.height);
            } catch (e) { /* path not rendered yet */ }
        });
        if (!isFinite(b.l)) throw new Error('Nothing to export');
        return b;
    }

    function conns() {
        return window._getConnections ? window._getConnections() : [];
    }

    async function renderCanvas() {
        var b = chartBounds();
        var sx = window.scrollX, sy = window.scrollY;
        // crop box in document coordinates
        var x = Math.floor(b.l + sx - PAD);
        var y = Math.floor(b.t + sy - PAD);
        var w = Math.ceil(b.r - b.l + PAD * 2);
        var h = Math.ceil(b.btm - b.t + PAD * 2);

        var canvas = await window.html2canvas(document.body, {
            x: x, y: y, width: w, height: h,
            scale: RES,
            backgroundColor: '#ffffff',
            logging: false,
            windowWidth: document.documentElement.scrollWidth,
            windowHeight: document.documentElement.scrollHeight,
            ignoreElements: function (el) {
                return el.id === 'conn-svg' ||
                       (el.classList && (el.classList.contains('toolbar') || el.classList.contains('conn-dot')));
            }
        });

        // Paint connection lines on top. Path data is in client coords.
        var ctx = canvas.getContext('2d');
        var lw = 1.5 * (window._chartScale || 1);
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);   // html2canvas leaves its own scale applied
        ctx.scale(RES, RES);
        ctx.translate(sx - x, sy - y);
        ctx.strokeStyle = '#aaa';
        ctx.fillStyle = '#aaa';
        ctx.lineWidth = lw;
        conns().forEach(function (c) {
            var d = c.path.getAttribute('d');
            if (!d) return;
            ctx.stroke(new Path2D(d));
            drawArrow(ctx, d, lw);
        });
        ctx.restore();
        return canvas;
    }

    // Arrowhead at the end of an "M x,y C c1 c2 x2,y2" path, matching the SVG marker.
    function drawArrow(ctx, d, lw) {
        var n = d.match(/-?\d+(\.\d+)?/g);
        if (!n || n.length < 8) return;
        n = n.map(Number);
        var ex = n[6], ey = n[7], cx = n[4], cy = n[5];
        if (cx === ex && cy === ey) { cx = n[0]; cy = n[1]; }
        var ang = Math.atan2(ey - cy, ex - cx);
        var len = 8 * lw / 1.5 * 1.2, half = 3 * lw / 1.5 * 1.2;
        ctx.save();
        ctx.translate(ex, ey);
        ctx.rotate(ang);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-len, -half);
        ctx.lineTo(-len, half);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function download(href, name) {
        var a = document.createElement('a');
        a.href = href;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    async function exportPNG() {
        var canvas = await renderCanvas();
        await new Promise(function (resolve) {
            canvas.toBlob(function (blob) {
                var url = URL.createObjectURL(blob);
                download(url, 'flowchart.png');
                setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
                resolve();
            }, 'image/png');
        });
    }

    async function exportPDF() {
        if (!window.jspdf) throw new Error('PDF library failed to load');
        var canvas = await renderCanvas();
        var w = canvas.width / RES, h = canvas.height / RES;
        var pdf = new window.jspdf.jsPDF({
            orientation: w >= h ? 'landscape' : 'portrait',
            unit: 'px',
            format: [w, h],
            hotfixes: ['px_scaling']
        });
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, w, h);
        pdf.save('flowchart.pdf');
    }
})();
