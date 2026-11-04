import { snakePosition, edgePath } from './workflowGeometry.js'

const box = (left, top, size = 48) => ({
  left,
  right: left + size,
  top,
  bottom: top + size,
  cx: left + size / 2,
  cy: top + size / 2,
})

describe('workflow geometry', () => {
  it('snakes 3 per row: row 2 runs right to left', () => {
    expect([0, 1, 2, 3, 4, 5].map((i) => snakePosition(i, 3))).toEqual([
      { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 },
      { row: 2, col: 3 }, { row: 2, col: 2 }, { row: 2, col: 1 },
    ])
  })

  // Regression (user screenshot 2026-11-04): a 2-line label pushed one node 8px higher, the edge was
  // treated as a row turn and drew a stray loop out to the left of the first node.
  it('nodes in the same row get a straight connector even if their heights differ', () => {
    const a = box(40, 60)
    const b = box(260, 52) // 8px higher than a
    const e = edgePath(a, b, 320, true)
    expect(e.d).not.toMatch(/Q/)
    expect(e.from[0]).toBe(a.right)
    expect(e.to[0]).toBe(b.left)
  })

  it('a row turn routes around the outside on the side where the row ends', () => {
    const a = box(260, 60) // end of row 1, right side
    const b = box(260, 200) // start of row 2, right side
    const e = edgePath(a, b, 320, false)
    expect(e.d).toMatch(/Q/)
    expect(e.d).toContain('328') // width + 8: outside the canvas on the right
  })
})
