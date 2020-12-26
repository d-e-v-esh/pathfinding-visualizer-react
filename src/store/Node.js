// State management for the grid

import { createSlice } from "@reduxjs/toolkit";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

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

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const initialGrid = getInitialGrid();
// console.log(initialGrid);

const initialState = {
  grid: initialGrid,
  isMousePressed: false,
};

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    mousePressed: (state) => {
      state.isMousePressed = true;
    },
    mouseNotPressed: (state) => {
      state.isMousePressed = false;
    },
    makeWall: (state, { payload }) => {
      state.grid[payload.row][payload.col].isVisited = true;
    },
    breakWall: (state) => {
      state.grid = false;
    },
  },
});

const { actions, reducer } = nodesSlice;
export const {
  updateGrid,
  mousePressed,
  mouseNotPressed,
  makeWall,
  breakWall,
} = actions;
export default reducer;
