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
  makeMultipleWalls,
  breakMultipleWalls,
  setStartNode,
  setEndNode,
  moveStartNode,
  removeStartNode,
  removeEndNode,
  moveEndNode,
} from "../store/Node";
import { mousePressed, mouseNotPressed } from "../store/Controls";

// TODO: Find a new data structure for the walledNodes that prevents duplicate values.
let walledNodes = [];

let deleteWalledNodes = [];

const Node = ({ col, row, coordinate }) => {
  // Pulling from global state
  const {
    grid,

    startNodeMoving,
    endNodeMoving,
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_ROW,
    FINISH_NODE_COL,
  } = useSelector((state) => state.nodes);
  const currentStartNode = { row: START_NODE_ROW, col: START_NODE_COL };
  const currentEndNode = { row: FINISH_NODE_ROW, col: FINISH_NODE_COL };
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
    console.log(currentEndNode);
    if (GLOBAL_NODE.isStart) {
      dispatch(moveStartNode(true));
    }
    if (GLOBAL_NODE.isEnd) {
      dispatch(moveEndNode(true));
    }

    // Wall Portion
    // else if (!wallClass) {
    //   createWall();
    // } else if (wallClass) {
    //   destroyWall();
    // }
  };

  const handleMouseEnter = (row, col) => {
    // Wall Portion
    // if (isMousePressed && !wallClass) {
    //   createWall();
    // } else if (isMousePressed && wallClass) {
    //   destroyWall();
    // }
  };

  const handleMouseLeave = () => {};

  const handleMouseUp = () => {
    dispatch(mouseNotPressed());

    if (startNodeMoving) {
      dispatch(moveStartNode(false));
      // Before setting the new startNode, we need to delete the old one.
      dispatch(removeStartNode(currentStartNode));
      dispatch(setStartNode({ row, col }));
    }
    if (endNodeMoving) {
      dispatch(moveEndNode(false));
      dispatch(removeEndNode(currentEndNode));
      dispatch(setEndNode({ row, col }));
    }

    // Wall Portion
    dispatch(makeMultipleWalls(walledNodes));
    walledNodes = [];

    dispatch(breakMultipleWalls(deleteWalledNodes));
    deleteWalledNodes = [];
  };

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
      onMouseLeave={() => handleMouseLeave()}
      onMouseEnter={(e) => handleMouseEnter(row, col)}
      onMouseUp={() => handleMouseUp()}></div>
  );
};

export default Node;
