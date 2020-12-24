// State management for the grid

import { createSlice } from "@reduxjs/toolkit";

// console.log(grid);
const initialState = {
  grid: [],
  isMousePressed: false,
};

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    updateGrid: (state, { payload }) => {
      state.grid = payload;
    },
    mousePressed: (state) => {
      state.mouseIsPressed = true;
    },
    mouseNotPressed: (state) => {
      state.mouseIsPressed = false;
    },
  },
});

const { actions, reducer } = nodesSlice;
export const { updateGrid, mousePressed, mouseNotPressed } = actions;
export default reducer;
