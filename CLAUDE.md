# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

No build step, package manager, or server required. Open `index.html` directly in a browser (or use any static file server, e.g. `npx serve .`). There are no tests or linters configured.

## Architecture

This is a two-page vanilla JS web app that converts a text-based flowchart DSL into a rendered diagram.

### Page 1 — Input (`index.html` + `main.js`)

The user types pseudo-code into a `<textarea>`. On "Build Chart":
- `main.js` tokenizes the input by splitting on newlines (converted to `<>` sentinels) and recognizing reserved words
- The token array is stored in `sessionStorage` as `"src"`
- The browser navigates to `chart.html`

### Page 2 — Chart (`chart.html` + `chart.js` + `drag.js` + `connect.js`)

`chart.js` reads the token array from `sessionStorage` and renders the flowchart:

1. **`checkTotalLanes(filtered)`** — first pass; computes `elementLaneInfo[]`, a per-token lane index (0 = top lane, 1+ = nested branches). Lanes increment on `then`/`else`, decrement on `endthen`/`endelse`.

2. **`parseValue(ary)`** — second pass; walks the token list and dispatches to DOM-builder functions based on a `status` variable (0=normal, 1=then-branch, 2=else-branch, 3=then-process) and the token's `elementLaneInfo` lane index.

3. **DOM layout** — The chart is a `<ul id="main">` containing `<li class="branch branchN">` lane rows. Within each lane, elements are positioned absolutely using `style.left` computed by summing prior siblings' widths. Constants: process nodes are 220 px wide, half-line connectors are 110 px wide.

4. **`drag.js`** — Makes `p.process`, `li.d` (diamond), and `div.endflow` nodes draggable via the Pointer Events API. Converts relative-positioned elements to absolute on first drag.

5. **`connect.js`** — Overlays a fixed SVG layer. Hoverable dots appear on chart nodes; clicking two dots draws an SVG `<line>` connection between them. Right-click a connection line to delete it. Uses `requestAnimationFrame` to keep line endpoints updated as nodes are dragged.

## DSL Reserved Words

| Keyword | Meaning |
|---|---|
| `if` | Start a decision diamond |
| `then` | Start a "yes" branch (downward) |
| `endthen` | End a `then` branch |
| `else` | Start the "no" branch |
| `endelse` | End an `else` block |
| `endif` | Close an if/else block |
| `endprocess` | End a process block |
| `endflow` | Terminate the flow |
| `none` | Spacer (extends a lane with connector lines, no process box) |

Non-reserved words between keywords become process node labels.
