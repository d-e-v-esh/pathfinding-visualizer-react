import React from "react";

import "../styles/Node.scss";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Importing Actions
import { updateGrid, makeWall, breakWall } from "../store/Node";
import { mousePressed, mouseNotPressed } from "../store/Controls";

const Node = ({ col, row }) => {
  const dispatch = useDispatch();

  const { grid, isMousePressed } = useSelector((state) => state.nodes);

  // Mouse Handling Events

  const handleMouseDown = (row, col) => {
    dispatch(mousePressed());
    // console.log(row, col);
    dispatch(makeWall({ row, col }));
  };

  const handleMouseEnter = (row, col) => {
    if (isMousePressed) {
      dispatch(makeWall({ row, col }));
    }
    if (!isMousePressed) {
      dispatch(mouseNotPressed());
    }
  };

  const handleMouseUp = () => {
    dispatch(mouseNotPressed());
  };

  // console.log(grid);
  const singleNode = grid[row][col];

  const extraClassName = singleNode.isWall
    ? "node-wall"
    : singleNode.isStart
    ? "node-start"
    : singleNode.isEnd
    ? "node-end"
    : "";
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseUp={() => handleMouseUp()}></div>
  );
};

export default Node;
