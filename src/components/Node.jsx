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

// Setting up Local Grid

// TODO: Remove duplicates from this array tomorrow
let walledNodes = [];

const Node = ({ col, row, coordinate }) => {
  const { grid } = useSelector((state) => state.nodes);
  const globalNode = grid[row][col];
  // let makeWallClass = false;
  const [wallClass, setWallClass] = useState(false);
  const dispatch = useDispatch();
  const { isMousePressed } = useSelector((state) => state.controls);

  const makeWallHandler = () => {
    if (!globalNode.isStart && !globalNode.isEnd) {
      walledNodes.push([row, col]);
      setWallClass(true);
    }
    // console.log("poggers");
  };

  const breakWallHandler = () => {
    // TODO: (1) remove all the nodes that were dis-walled from the walled nodes array, (2) turn setWallClass State to false
  };

  // const handleRightClick = (e) => {
  //   console.log("right click");
  // };

  const handleMouseDown = (row, col) => {
    dispatch(mousePressed());
    // if (!globalNode.isStart && !globalNode.isEnd) {
    //   draggedWalls.push([row, col]);
    //   setWallClass(true);
    // }

    makeWallHandler();
  };

  const handleMouseEnter = (row, col) => {
    // console.log(makeWallClass);
    // console.log([row, col]);
    if (isMousePressed) {
      if (!globalNode.isStart && !globalNode.isEnd) {
        walledNodes.push([row, col]);
        setWallClass(true);
      }
    }
    // console.log(makeWallClass);
    // console.log(grid[row][col]);
  };

  const handleMouseUp = () => {
    dispatch(mouseNotPressed());

    dispatch(makeMultipleWalls(walledNodes));
  };

  // const singleNode = localGrid[row][col];
  // TODO: Refactor this part to rely on the state directly

  const extraClassName = wallClass
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
      onMouseDown={(e) => handleMouseDown(row, col)}
      onContextMenu={(e) => e.preventDefault()}
      onMouseEnter={(e) => handleMouseEnter(row, col)}
      onMouseUp={() => handleMouseUp()}></div>
  );
};

export default Node;
