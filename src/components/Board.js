import React, { useState, useEffect } from "react";

import Node from "./Node";

const Board = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const START_NODE_ROW = 10;
  const START_NODE_COL = 15;
  const FINISH_NODE_ROW = 10;
  const FINISH_NODE_COL = 35;

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    // this.setState({ grid: newGrid, mouseIsPressed: true });

    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    // this.setState({grid: newGrid});

    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    // this.setState({mouseIsPressed: false});

    setMouseIsPressed(false);
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };

    if (node.isStart || node.isFinish) {
      //create component warning, update the props
      console.log(
        "Warning! This is the ",
        node.isStart ? "Start Node" : "End Node"
      );
    } else {
      newNode = { ...node, isWall: !node.isWall };
    }

    newGrid[row][col] = newNode;
    return newGrid;
  };

  useEffect(() => {
    const grid = getInitialGrid();
    // this.setState({grid});
    setGrid(grid);
  }, []);

  // console.log(grid);
  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  console.log(grid);
  return (
    <div className="grid">
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { row, col, isFinish, isStart, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                  onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                  onMouseUp={() => this.handleMouseUp()}
                  row={row}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
