// Layout maths for the n8n-style workflow card.

// Zigzag (snake) placement: row 1 left→right, row 2 right→left, ...
export function snakePosition(i, cols) {
  const row = Math.floor(i / cols)
  const inRow = i % cols
  const col = row % 2 === 0 ? inRow : cols - 1 - inRow
  return { row: row + 1, col: col + 1 }
}

// Orthogonal connector between two node boxes (relative to the canvas).
// sameRow comes from the grid, never from measured heights: a wrapped label can shift a node a few
// pixels, and that must not turn a straight connector into a row-turn loop.
// Within a row: straight across. At the snake's turn: out past the canvas edge, down, and back into
// the next node's side (like n8n edges), so the line never crosses the labels.
export function edgePath(a, b, width, sameRow) {
  if (sameRow) {
    const forward = b.cx > a.cx
    const fromX = forward ? a.right : a.left
    const toX = forward ? b.left : b.right
    return { d: `M ${fromX} ${a.cy} L ${toX} ${b.cy}`, from: [fromX, a.cy], to: [toX, b.cy] }
  }
  const right = a.cx > width / 2
  const fromX = right ? a.right : a.left
  const toX = right ? b.right : b.left
  const outX = right ? width + 8 : -8
  const r = 10 // rounded corners, like n8n edges
  const sx = right ? 1 : -1
  const d = [
    `M ${fromX} ${a.cy}`,
    `L ${outX - sx * r} ${a.cy}`,
    `Q ${outX} ${a.cy} ${outX} ${a.cy + r}`,
    `L ${outX} ${b.cy - r}`,
    `Q ${outX} ${b.cy} ${outX - sx * r} ${b.cy}`,
    `L ${toX} ${b.cy}`,
  ].join(' ')
  return { d, from: [fromX, a.cy], to: [toX, b.cy] }
}
