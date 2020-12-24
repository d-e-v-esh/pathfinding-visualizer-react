import React from "react";

import "../styles/Node.css";
import { useSelector, useDispatch } from "react-redux";
import { mousePressed, mouseNotPressed, updateGrid } from "../store/Node";

const Node = ({
  col,
  isFinish,
  isStart,
  isWall,

  onMouseEnter,
  onMouseUp,
  row,
}) => {
  const dispatch = useDispatch();

  const { grid } = useSelector((state) => state);
  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    // this.setState({ grid: newGrid, mouseIsPressed: true });

    // setGrid(newGrid);
    dispatch(updateGrid(newGrid));
    // setMouseIsPressed(true);
    dispatch(mousePressed());
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };

    newGrid[row][col] = newNode;
    return newGrid;
  };
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}></div>
  );
};

export default Node;
