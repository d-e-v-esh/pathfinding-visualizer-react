import React from "react";

import "../styles/Node.css";
import { useSelector, useDispatch } from "react-redux";
import {
  mousePressed,
  mouseNotPressed,
  updateGrid,
  makeWall,
  breakWall,
} from "../store/Node";

const Node = ({ col, row }) => {
  const dispatch = useDispatch();

  const { grid, isMousePressed } = useSelector((state) => state);

  // Mouse Handling Events

  const handleMouseDown = (row, col) => {
    // const newGrid = getNewGridWithWallToggled(grid, row, col);
    // dispatch(makeWall(row, col));
    dispatch(mousePressed());
    console.log(row, col);

    // dispatch(mousePressed());
  };

  // We need to rewrite this entire function.
  // The check and flip happens here in an immutable way. We need to move that on to redux and clear it from here. This function can be very few lines.

  // const getNewGridWithWallToggled = (grid, row, col) => {
  //   const newGrid = grid.slice(); // This makes a shallow copy of the grid
  //   const node = newGrid[row][col];
  //   // console.log(node);
  //   const nodeCoordinates = { row, col };
  //   dispatch(makeWall(nodeCoordinates));

  //   console.log();

  //   // newGrid[row][col] = newNode;
  // };

  const handleMouseEnter = (row, col) => {
    // if (isMousePressed) return;
    // const newGrid = getNewGridWithWallToggled(grid, row, col);
    dispatch(makeWall([row]));
  };

  const handleMouseUp = () => {
    dispatch(mouseNotPressed());
  };
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseUp={() => handleMouseUp()}></div>
  );
};

export default Node;
