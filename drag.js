window.addEventListener('DOMContentLoaded', function() {
    enableDrag();
});

function enableDrag() {
    document.querySelectorAll('p.process').forEach(function(el) {
        makeDraggable(el.closest('li'));
    });
    document.querySelectorAll('li.d').forEach(function(el) {
        makeDraggable(el);
    });
    document.querySelectorAll('div.endflow').forEach(function(el) {
        makeDraggable(el.closest('li'));
    });
    document.querySelectorAll('.proc-doc').forEach(function(el) {
        makeDraggable(el.closest('li'));
    });
}

function makeDraggable(el) {
    if (!el || el.dataset.draggable) return;
    el.dataset.draggable = 'true';
    el.style.cursor = 'grab';

    var startX, startY, startLeft, startTop, didMove;

    el.addEventListener('pointerdown', function(e) {
        if (document.body.dataset.mode === 'connect') return;
        if (e.target.closest('.modal') || e.target.tagName === 'INPUT' || e.target.isContentEditable) return;

        if (getComputedStyle(el).position !== 'absolute') {
            var savedLeft = el.offsetLeft;
            var savedTop = el.offsetTop;
            el.style.position = 'absolute';
            el.style.left = savedLeft + 'px';
            el.style.top = savedTop + 'px';
        }

        didMove = false;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = parseInt(el.style.left) || 0;
        startTop = parseInt(el.style.top) || 0;
        el.setPointerCapture(e.pointerId);
        el.style.cursor = 'grabbing';
        el.style.zIndex = '999';
    });

    el.addEventListener('pointermove', function(e) {
        if (!el.hasPointerCapture(e.pointerId)) return;
        var sc = window._chartScale || 1;
        var dx = (e.clientX - startX) / sc;
        var dy = (e.clientY - startY) / sc;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didMove = true;
        el.style.left = (startLeft + dx) + 'px';
        el.style.top = (startTop + dy) + 'px';
    });

    el.addEventListener('pointerup', function() {
        el.style.cursor = 'grab';
        el.style.zIndex = '';
    });

    // Block modal click handler from firing after a drag
    el.addEventListener('click', function(e) {
        if (didMove) {
            e.stopImmediatePropagation();
            didMove = false;
        }
    }, true);
}
