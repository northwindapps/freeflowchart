# FlowScript

A browser-based tool that converts a simple text DSL into rendered flowcharts — no build step, no install, no mouse required.

**Live app:** [https://freeflowchart.web.app](https://freeflowchart.web.app)

---

## Quick Start

Open `index.html` in any browser (or `npx serve .`), type a script, and press **Build Chart**.

---

## Syntax

### Keywords

| Keyword | Meaning |
|---|---|
| `if` | Decision diamond (expects `then` + optional `else`) |
| `if2` | Decision diamond with no `else` branch |
| `then` | Start the "yes" branch |
| `endthen` | End a `then` branch |
| `else` | Start the "no" branch |
| `endelse` | End an `else` branch |
| `endif` | Close an if/else block |
| `endprocess` | End a process block |
| `endflow` | Terminate the flow (renders a circle) |
| `none` | Spacer — extends a lane with a connector, no box |
| `file(name)` | Attach a document icon to a process node |
| `db` | Render a database cylinder node |

Any text that is not a keyword becomes a **process node label**.

### Node Syntax

```
process label
```
Renders a rectangular process box.

```
db Database Name <- file(source.xlsx)
```
Renders a database cylinder with an attached document icon.

```
process label <- file(reference.pdf)
```
Renders a process box with an attached document icon.

```
endflow
endflow label text
```
Renders a terminator circle. Optional text after `endflow` appears as a label beneath the circle.

---

## Structure

```
Flow title
if condition?
  then
    process step
    endflow outcome A
  endthen
else
    process step
    endflow outcome B
  endelse
endif
```

When all branches of an `if/else` end with `endflow`, the next section automatically wraps to a new vertical position — allowing multiple independent flows in one chart.

---

## Examples

**Linear flow**
```
start
db Product Catalog <- file(products.xlsx)
select item
checkout
endflow done
```

**if/else**
```
if member?
  then
    apply discount
    endflow discount applied
  endthen
else
    regular price
    endflow no discount
  endelse
endif
```

**Chained if2 (no else)**
```
if2 member?
  then
    apply discount
  endthen
endif
if2 coupon?
  then
    apply coupon
  endthen
endif
process payment
endflow
```

**Multiple flows**
```
Order Flow
if member?
  then
    apply discount
    endflow discount applied
  endthen
else
    regular price
    endflow no discount
  endelse
endif
Payment Flow
charge card
endflow payment done
```

---

## Chart Interactions

- **Drag** any node to reposition it.
- **Connect** nodes by hovering to reveal dots, then clicking two dots to draw a line.
- **Delete** a connection by right-clicking the line.

---

## Visual Builder

Open `gui.html` for a point-and-click builder that exports FlowScript DSL.

---

## License

MIT © 2026 Yujin Yano
