// State management for the grid

// TODO: Add right click functionality and then figure out dijkstra and implement by tomorrow.

import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

// import { useSelector, useDispatch } from "react-redux";

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

const initialState = {
  grid: initialGrid,
  START_NODE_ROW: 10,
  START_NODE_COL: 15,
  FINISH_NODE_ROW: 10,
  FINISH_NODE_COL: 35,
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
      // const singleNode = state.grid[payload.row][payload.col];
      // if (!singleNode.isStart && !singleNode.isEnd) {
      //   singleNode.isVisited = true;
      // }

      for (let i = 1; i < payload.length; i++) {
        // console.log(payload[i]);
        state.grid[payload[i].row][payload[i].col].isVisited = true;
      }

      // TODO: Every node that we push from there, we want them to become visited here
    },
  },
});

export const { makeWall, breakWall, visitNode } = nodesSlice.actions;

export default nodesSlice.reducer;
