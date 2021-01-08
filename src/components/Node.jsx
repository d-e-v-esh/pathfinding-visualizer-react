// TODO after implementing the algorithms: Make a local state here with useState and store all the changes to the grid in that local state. We will only dispatch once when user clicks to run the algorithm. We will dispatch the local grid state and push it to the global state then perform the algorithm.

// Not sure if this will improve performance but we need to see.

// We shouldn't be able to change the global grid state from the screen.

// We won't pull anything directly from the global state

// If it lags even a little bit then we can put a small loading gif till the algorithm starts.

import React, { useState, useEffect } from "react";

import "../styles/Node.scss";

// Redux

import { useSelector, useDispatch } from "react-redux";

// Importing Actions
import {
  makeWall,
  breakWall,
  updateGrid,
  makeMultipleWalls,
} from "../store/Node";
import { mousePressed, mouseNotPressed } from "../store/Controls";

// Setting up Local Grid
const draggedWalls = [];

const nodeWallClassChange = false;

const Node = ({ col, row, coordinate }) => {
  const dispatch = useDispatch();

  const { grid } = useSelector((state) => state.nodes);

  const { isMousePressed } = useSelector((state) => state.controls);

  const handleMouseDown = (row, col) => {
    dispatch(mousePressed());
    draggedWalls.push([row, col]);
    // dispatch(makeWall({ row, col }));
  };

  const handleMouseEnter = (row, col) => {
    console.log(coordinate);
    if (isMousePressed) {
      draggedWalls.push([row, col]);
    }
  };

  const handleMouseUp = () => {
    dispatch(mouseNotPressed());

    dispatch(makeMultipleWalls(draggedWalls));
  };

  const globalNode = grid[row][col];
  // const singleNode = localGrid[row][col];
  // TODO: Refactor this part to rely on the state directly

  const extraClassName = globalNode.isWall
    ? "node-wall"
    : globalNode.isStart
    ? "node-start"
    : globalNode.isEnd
    ? "node-end"
    : globalNode.isVisited
    ? "node-visited"
    : globalNode.isPath
    ? "node-shortest-path"
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
