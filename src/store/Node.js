// State management for the grid

// TODO: Add right click functionality and then figure out dijkstra and implement by tomorrow.

import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

// import { useSelector, useDispatch } from "react-redux";

// This file contains the global state of our nodes

let START_NODE_ROW = 10;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 40;

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isPath: false,
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

const initialState = {
  grid: initialGrid,
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
  startNodeMoving: false,
  endNodeMoving: false,
};

// console.log(initialState.FINISH_NODE_COL);

const nodesSlice = createSlice({
  name: "Nodes",
  initialState,
  reducers: {
    updateGrid: (state, { payload }) => {
      state.grid = payload;
    },
    moveStartNode: (state, { payload }) => {
      state.startNodeMoving = payload;
    },
    moveEndNode: (state, { payload }) => {
      state.endNodeMoving = payload;
    },
    removeStartNode: (state, { payload }) => {
      const node = state.grid[payload.row][payload.col];
      node.isStart = false;
    },
    removeEndNode: (state, { payload }) => {
      const node = state.grid[payload.row][payload.col];
      node.isEnd = false;
    },
    setStartNode: (state, { payload }) => {
      const startNode = state.grid[payload.row][payload.col];

      state.START_NODE_ROW = payload.row;
      state.START_NODE_COL = payload.col;
      startNode.isWall = false;

      startNode.isStart = true;
    },
    setEndNode: (state, { payload }) => {
      const endNode = state.grid[payload.row][payload.col];

      state.FINISH_NODE_ROW = payload.row;
      state.FINISH_NODE_COL = payload.col;
      endNode.isWall = false;
      endNode.isEnd = true;
    },
    makeWall: (state, { payload }) => {
      const singleNode = state.grid[payload.row][payload.col];
      // Start and End nodes cannot be converted to walls
      if (!singleNode.isStart && !singleNode.isEnd) {
        singleNode.isWall = true;
      }
    },
    makeMultipleWalls: (state, { payload }) => {
      for (let i = 0; i < payload.length; i++) {
        const turnToWallRow = payload[i][0];
        const turnToWallCol = payload[i][1];
        state.grid[turnToWallRow][turnToWallCol].isWall = true;
      }
    },
    breakMultipleWalls: (state, { payload }) => {
      // const singleNode = state.grid[payload.row][payload.col];

      for (let i = 0; i < payload.length; i++) {
        const turnToWallRow = payload[i][0];
        const turnToWallCol = payload[i][1];
        state.grid[turnToWallRow][turnToWallCol].isWall = false;
      }
    },
    breakWall: (state, { payload }) => {
      const singleNode = state.grid[payload.row][payload.col];
      // Start and End nodes cannot be converted to walls
      if (!singleNode.isStart && !singleNode.isEnd) {
        singleNode.isWall = false;
      }
    },

    visitNode: (state, { payload }) => {
      // console.log(payload[i]); => This returns all the visited nodes in one array
      for (let i = 0; i < payload.length; i++) {
        state.grid[payload[i].row][payload[i].col].isVisited = true;
      }
    },

    makePath: (state, { payload }) => {
      // Here we are setting all the nodes.isPath to false.
      // TODO: find a better way to do if performance issues arise
      const flatGrid = state.grid.flat();
      for (let i = 0; i < flatGrid.length; i++) {
        flatGrid[i].isPath = false;
      }
      for (let i = 0; i < payload.length; i++) {
        state.grid[payload[i].row][payload[i].col].isPath = true;
      }
    },
  },
});

export const {
  makeWall,
  breakWall,
  visitNode,
  makePath,
  updateGrid,
  makeMultipleWalls,
  breakMultipleWalls,
  setStartNode,
  setEndNode,
  moveStartNode,
  moveEndNode,
  removeStartNode,
  removeEndNode,
} = nodesSlice.actions;

export default nodesSlice.reducer;
