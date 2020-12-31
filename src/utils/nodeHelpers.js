export function createEmptyNodes(cols, rows) {
  return Array(rows)
    .fill(0)
    .map((_, row) =>
      Array(cols)
        .fill(0)
        .map((_, col) => createNode(col, row))
    );
}

export function createNode(x, y) {
  return { x, y, visitedIndex: null };
}
