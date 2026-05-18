(function () {
    var svg, connections = [], pendingFrom = null;
    var mouseX = 0, mouseY = 0, tempLine = null;

    window.addEventListener('DOMContentLoaded', function () {
        setupSVG();
        setupNodes();
        requestAnimationFrame(tick);
    });

    function setupSVG() {
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.id = 'conn-svg';
        svg.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:500;overflow:visible;';

        var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.appendChild(makeMarker('arr', '#aaa'));
        defs.appendChild(makeMarker('arr-temp', '#888'));
        svg.appendChild(defs);
        document.body.appendChild(svg);

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.addEventListener('click', function (e) {
            if (pendingFrom && !e.target.classList.contains('conn-dot')) {
                clearPending();
            }
        });
    }

    function makeMarker(id, color) {
        var marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', id);
        marker.setAttribute('markerWidth', '8');
        marker.setAttribute('markerHeight', '6');
        marker.setAttribute('refX', '8');
        marker.setAttribute('refY', '3');
        marker.setAttribute('orient', 'auto');
        var poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        poly.setAttribute('points', '0 0, 8 3, 0 6');
        poly.setAttribute('fill', color);
        marker.appendChild(poly);
        return marker;
    }

    function setupNodes() {
        document.querySelectorAll('p.process').forEach(addDots);
        document.querySelectorAll('li.d').forEach(addDots);
        document.querySelectorAll('div.endflow').forEach(addDots);
    }

    function addDots(el) {
        if (el.dataset.hasConn) return;
        el.dataset.hasConn = 'true';

        ['top', 'right', 'bottom', 'left'].forEach(function (side) {
            var dot = document.createElement('div');
            dot.className = 'conn-dot conn-dot-' + side;
            dot.dataset.side = side;
            el.appendChild(dot);

            dot.addEventListener('click', function (e) {
                e.stopPropagation();
                handleDotClick(el, side, dot);
            });
        });
    }

    function handleDotClick(el, side, dot) {
        if (!pendingFrom) {
            pendingFrom = { el: el, side: side, dot: dot };
            dot.style.opacity = '1';
            dot.style.background = '#ff6b35';
            dot.style.boxShadow = '0 0 6px rgba(255,107,53,0.6)';
            tempLine = makeLine(0, 0, 0, 0, true);
            svg.appendChild(tempLine);
        } else {
            if (pendingFrom.el === el) { clearPending(); return; }
            var line = makeLine(0, 0, 0, 0, false);
            svg.appendChild(line);

            var conn = { from: pendingFrom.el, fromSide: pendingFrom.side, to: el, toSide: side, line: line };
            connections.push(conn);

            // right-click the line to delete it
            line.style.pointerEvents = 'stroke';
            line.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                svg.removeChild(line);
                connections = connections.filter(function (c) { return c.line !== line; });
            });

            clearPending();
        }
    }

    function clearPending() {
        if (pendingFrom) {
            pendingFrom.dot.style.opacity = '';
            pendingFrom.dot.style.background = '';
            pendingFrom.dot.style.boxShadow = '';
            pendingFrom = null;
        }
        if (tempLine) { svg.removeChild(tempLine); tempLine = null; }
    }

    function makeLine(x1, y1, x2, y2, dashed) {
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('stroke', dashed ? '#888' : '#aaa');
        line.setAttribute('stroke-width', '1.5');
        line.setAttribute('x1', x1); line.setAttribute('y1', y1);
        line.setAttribute('x2', x2); line.setAttribute('y2', y2);
        if (dashed) line.setAttribute('stroke-dasharray', '5,4');
        line.setAttribute('marker-end', dashed ? 'url(#arr-temp)' : 'url(#arr)');
        return line;
    }

    function edgePt(el, side) {
        var r = el.getBoundingClientRect();
        if (side === 'top')    return [r.left + r.width / 2,  r.top];
        if (side === 'bottom') return [r.left + r.width / 2,  r.bottom];
        if (side === 'left')   return [r.left,                r.top + r.height / 2];
        if (side === 'right')  return [r.right,               r.top + r.height / 2];
    }

    function tick() {
        connections.forEach(function (c) {
            var p1 = edgePt(c.from, c.fromSide);
            var p2 = edgePt(c.to, c.toSide);
            c.line.setAttribute('x1', p1[0]); c.line.setAttribute('y1', p1[1]);
            c.line.setAttribute('x2', p2[0]); c.line.setAttribute('y2', p2[1]);
        });
        if (pendingFrom && tempLine) {
            var p1 = edgePt(pendingFrom.el, pendingFrom.side);
            tempLine.setAttribute('x1', p1[0]); tempLine.setAttribute('y1', p1[1]);
            tempLine.setAttribute('x2', mouseX); tempLine.setAttribute('y2', mouseY);
        }
        requestAnimationFrame(tick);
    }
})();
