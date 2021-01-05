// TODO after implementing the algorithms: Make a local state here with useState and store all the changes to the grid in that local state. We will only dispatch once when user clicks to run the algorithm. We will dispatch the local grid state and push it to the global state then perform the algorithm.

// Not sure if this will improve performance but we need to see.

// We shouldn't be able to change the global grid state from the screen.

// We won't pull anything directly from the global state

// If it lags even a little bit then we can put a small loading gif till the algorithm starts.

import React from "react";

import "../styles/Node.scss";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Importing Actions
import { updateGrid, makeWall, breakWall } from "../store/Node";
import { mousePressed, mouseNotPressed } from "../store/Controls";

const Node = ({ col, row }) => {
  const dispatch = useDispatch();

  const { grid } = useSelector((state) => state.nodes);
  const { isMousePressed } = useSelector((state) => state.controls);

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
      // dispatch(mouseNotPressed());
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
