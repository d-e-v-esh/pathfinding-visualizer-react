// State management for the grid

// TODO: Add right click functionality and then figure out dijkstra and implement by tomorrow.

import { createSlice } from "@reduxjs/toolkit";

import { useSelector, useDispatch } from "react-redux";

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart:
      // row === initialState.START_NODE_ROW &&
      row === 10 && col === 15,
    isEnd: row === 10 && col === 35,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

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
const initialGrid = getInitialGrid();

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const initialState = {
  START_NODE_ROW: 10,
  START_NODE_COL: 15,
  FINISH_NODE_ROW: 10,
  FINISH_NODE_COL: 35,

  grid: initialGrid,
  isMousePressed: false,
  isShowingPath: false,
  algorithmStatus: "STOPPED",
  selectedAlgorithm: "dijkstra",
};

// console.log(initialState.FINISH_NODE_COL);

const nodesSlice = createSlice({
  name: "Nodes",
  initialState,
  reducers: {
    makeWall: (state, { payload }) => {
      var singleNode = state.grid[payload.row][payload.col];
      // Start and End nodes cannot be converted to walls
      if (!singleNode.isStart && !singleNode.isEnd) {
        singleNode.isWall = true;
      }
    },
    breakWall: (state) => {
      state.grid = false;
    },
    visitNode: (state, { payload }) => {
      // const singleNode = state.grid[payload.row][payload.col];
      // console.log(singleNode);
    },
  },
});

// const { actions, reducer } = nodesSlice;
// const { actions, reducer } = mouseEventSlice;
export const {
  // ----- nodesSlice
  updateGrid,
  mousePressed,
  mouseNotPressed,
  makeWall,
  breakWall,
  //-------- algorithmStatusSlice
  runAlgorithm,
  stopAlgorithm,
  pauseAlgorithm,
  completeAlgorithm,
} = actions;
export default reducer;
