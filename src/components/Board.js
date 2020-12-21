import React, { useState, useEffect } from "react";
import Node from "../components/Node";

let START_NODE_ROW = 12;
let START_NODE_COL = 20;
let END_NODE_ROW = 12;
let END_NODE_COL = 40;

const Board = () => {
  const [grid, setGrid] = useState([]);
  const [isMousePressed] = useState(false);

  const createNode = (row, col) => ({
    row,
    col,
    isWall: false,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === END_NODE_ROW && col === END_NODE_COL,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
    f: 0,
    g: 0,
    h: 0,
  });
  const ROW = 30;
  const COL = 65;
  const createInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < ROW; row++) {
      const rowArray = [];
      for (let col = 0; col < COL; col++) {
        rowArray.push(createNode(row, col));
      }
      grid.push(rowArray);
    }
    return grid;
  };

  useEffect(() => {
    const grid = createInitialGrid();
    setGrid({ grid });
  });
  return (
    <div>
      <div className="visualizer-container">
        {grid.map((rowArray, rowIdx) => (
          <div key={rowIdx}>
            {rowArray.map((node, nodeIdx) => (
              <Node
                key={nodeIdx}
                row={node.row}
                col={node.col}
                isStart={node.isStart}
                isEnd={node.isEnd}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
