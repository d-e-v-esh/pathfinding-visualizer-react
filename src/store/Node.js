// State management for the grid

// TODO: Add right click functionality and then figure out dijkstra and implement by tomorrow.

import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

// import { useSelector, useDispatch } from "react-redux";

// This file contains the global state of our nodes

const startNodeRow = 10;
const startNodeCol = 15;
const endNodeRow = 10;
const endNodeCol = 40;

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === startNodeRow && col === startNodeCol,
    isEnd: row === endNodeRow && col === endNodeCol,
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
  START_NODE_ROW: startNodeRow,
  START_NODE_COL: startNodeCol,
  FINISH_NODE_ROW: endNodeRow,
  FINISH_NODE_COL: endNodeCol,
};

// console.log(initialState.FINISH_NODE_COL);

const nodesSlice = createSlice({
  name: "Nodes",
  initialState,
  reducers: {
    makeWall: (state, { payload }) => {
      const singleNode = state.grid[payload.row][payload.col];
      // Start and End nodes cannot be converted to walls
      if (!singleNode.isStart && !singleNode.isEnd) {
        singleNode.isWall = true;
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
      // console.log(payload[i]); => This returns all the visited nodes in one array
      for (let i = 0; i < payload.length; i++) {
        state.grid[payload[i].row][payload[i].col].isPath = true;
      }
    },
  },
});

export const { makeWall, breakWall, visitNode, makePath } = nodesSlice.actions;

export default nodesSlice.reducer;
