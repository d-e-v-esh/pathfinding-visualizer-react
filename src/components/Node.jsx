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
  breakMultipleWalls,
} from "../store/Node";
import { mousePressed, mouseNotPressed } from "../store/Controls";

// TODO: Find a new data structure for the walledNodes that prevents duplicate values.
let walledNodes = [];

let deleteWalledNodes = [];

const Node = ({ col, row, coordinate }) => {
  // Pulling from global state
  const { grid } = useSelector((state) => state.nodes);
  const { isMousePressed } = useSelector((state) => state.controls);
  // Constants
  const GLOBAL_NODE = grid[row][col];
  const dispatch = useDispatch();
  // Local State
  const [wallClass, setWallClass] = useState(false);

  const createWall = () => {
    if (!GLOBAL_NODE.isStart && !GLOBAL_NODE.isEnd && !GLOBAL_NODE.isWall) {
      walledNodes.push([row, col]);
      setWallClass(true);
    }
  };

  const destroyWall = () => {
    if (!GLOBAL_NODE.isStart && !GLOBAL_NODE.isEnd && GLOBAL_NODE.isWall) {
      setWallClass(false);
      deleteWalledNodes.push([row, col]);
    }
  };

  const handleMouseDown = (row, col) => {
    dispatch(mousePressed());
    if (!wallClass) {
      createWall();
    }
    if (wallClass) {
      destroyWall();
    }
  };

  const handleMouseEnter = (row, col) => {
    if (isMousePressed && !wallClass) {
      createWall();
    }
    if (isMousePressed && wallClass) {
      destroyWall();
    }
  };

  const handleMouseUp = () => {
    dispatch(mouseNotPressed());

    dispatch(makeMultipleWalls(walledNodes));
    walledNodes = [];
    dispatch(breakMultipleWalls(deleteWalledNodes));
    deleteWalledNodes = [];
  };

  // const singleNode = localGrid[row][col];
  // TODO: Refactor this part to rely on the state directly

  const extraClassName = wallClass
    ? "node-wall"
    : GLOBAL_NODE.isStart
    ? "node-start"
    : GLOBAL_NODE.isEnd
    ? "node-end"
    : GLOBAL_NODE.isVisited
    ? "node-visited"
    : GLOBAL_NODE.isPath
    ? "node-shortest-path"
    : "";
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={(e) => handleMouseDown(row, col)}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      onMouseEnter={(e) => handleMouseEnter(row, col)}
      onMouseUp={() => handleMouseUp()}></div>
  );
};

export default Node;
