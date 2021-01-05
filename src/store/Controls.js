import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMousePressed: false,
};

const mouseEventSlice = createSlice({
  name: "MouseEvent",
  initialState,
  reducers: {
    mousePressed: (state) => {
      state.isMousePressed = true;
    },
    mouseNotPressed: (state) => {
      state.isMousePressed = false;
    },
  },
});

const { actions, reducer } = mouseEventSlice;

export const { mousePressed, mouseNotPressed } = actions;

export default reducer;
