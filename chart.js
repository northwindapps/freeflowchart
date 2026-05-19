window.addEventListener('DOMContentLoaded', function () {
    var mainUL = document.querySelector('#main');
    var values = JSON.parse(sessionStorage.getItem('src'));
    if (!values) return;

    var NODE_W = 220, H_GAP = 100, ROW_H = 320;
    var curX = {};
    var autoConns = [], lastNodeId = {}, lastDiamondId = {}, pendingBranch = null;

    function gx(L) { return curX[L] || 0; }
    function gy(L) { return L * ROW_H; }
    function advance(L) { curX[L] = gx(L) + NODE_W + H_GAP; }

    function connectToPrev(L, id) {
        if (pendingBranch) {
            autoConns.push({ fromId: pendingBranch.fromId, fromSide: pendingBranch.fromSide, toId: id, toSide: pendingBranch.toSide });
            pendingBranch = null;
        } else if (lastNodeId[L] !== undefined) {
            autoConns.push({ fromId: lastNodeId[L], fromSide: 'right', toId: id, toSide: 'left' });
        }
        lastNodeId[L] = id;
    }

    var tokens = values.filter(function (v) { return v && v.replace(/\s/g, ''); });

    var laneOf = [], lane = 0;
    for (var i = 0; i < tokens.length; i++) {
        var t = tokens[i];
        if (t === 'endthen' || t === 'endelse') lane = Math.max(0, lane - 1);
        if (t === 'then'    || t === 'else')    lane++;
        laneOf.push(lane);
    }

    for (var i = 0; i < tokens.length; i++) {
        if (!tokens[i]) continue;
        var tok = tokens[i], L = laneOf[i];

        switch (tok) {
            case 'if': {
                var label = tokens[i + 1] || '';
                tokens[i + 1] = null;
                var px = gx(L);
                if (curX[L + 1] === undefined) curX[L + 1] = px;
                mkDiamond(L, px, label.trim(), i);
                advance(L);
                break;
            }
            case 'then':
                if (lastDiamondId[L - 1] !== undefined)
                    pendingBranch = { fromId: lastDiamondId[L - 1], fromSide: 'bottom', toSide: 'top' };
                break;
            case 'else':
                if (lastDiamondId[L - 1] !== undefined)
                    pendingBranch = { fromId: lastDiamondId[L - 1], fromSide: 'right', toSide: 'left' };
                break;
            case 'endthen':
            case 'endelse':
                pendingBranch = null;
                break;
            case 'endif':
                pendingBranch = null;
                curX[L] = Math.max(gx(L), gx(L + 1) || 0);
                break;
            case 'endflow':
                mkEndflow(L, gx(L), i);
                advance(L);
                break;
            case 'endprocess':
            case 'none':
                break;
            default:
                if (tok.trim()) { mkProcess(L, gx(L), tok.trim(), i); advance(L); }
        }
    }

    window._autoConns = autoConns;

    function place(li, L, px) {
        li.style.position = 'absolute';
        li.style.left = px + 'px';
        li.style.top  = gy(L) + 'px';
        mainUL.appendChild(li);
    }

    function mkProcess(L, px, body, id) {
        var li = document.createElement('li');
        li.id = id;
        li.innerHTML =
            '<p class="process">' + body + '</p>' +
            '<a href="./chart.html">document:none</a>' +
            '<div class="modal none">' +
            '<input type="text" class="filename" placeholder="file name">' +
            '<input type="text" class="url" placeholder="url">' +
            '<br></div>';
        place(li, L, px);
        li.addEventListener('click', makeHandler(id));
        connectToPrev(L, id);
    }

    function mkDiamond(L, px, body, id) {
        var li = document.createElement('li');
        li.id = id;
        li.className = 'd';
        li.innerHTML =
            '<div class="diamond"><p class="d-body">' + body + '</p></div>' +
            '<span class="y">yes</span><span class="n">no</span>';
        place(li, L, px);
        connectToPrev(L, id);
        lastDiamondId[L] = id;
    }

    function mkEndflow(L, px, id) {
        var li = document.createElement('li');
        li.id = id;
        li.className = 'half ef';
        li.innerHTML = '<div class="endflow"></div>';
        place(li, L, px);
        connectToPrev(L, id);
    }

    function makeHandler(id) {
        return function () {
            var modal  = document.querySelector('[id="' + id + '"] .modal');
            var a      = document.querySelector('[id="' + id + '"] a');
            var urlEl  = document.querySelector('[id="' + id + '"] .url');
            var nameEl = document.querySelector('[id="' + id + '"] .filename');
            if (modal)  modal.classList.remove('none');
            if (urlEl  && a) a.href      = urlEl.value;
            if (nameEl && a) a.innerHTML = nameEl.value || 'document:none';
        };
    }

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.process') && !e.target.closest('.url') && !e.target.closest('.filename')) {
            document.querySelectorAll('.modal').forEach(function (m) { m.classList.add('none'); });
        }
    });
});
