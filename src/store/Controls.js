import { createSlice } from "@reduxjs/toolkit";

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
