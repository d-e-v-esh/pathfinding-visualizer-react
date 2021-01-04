import { createSlice } from "@reduxjs/toolkit";

const algorithmStatusSlice = createSlice({
  name: "AlgorithmStatus",

  initialState,
  reducers: {
    runAlgorithm: (state) => {
      state.algorithmStatus = "RUNNING";
    },
    stopAlgorithm: (state) => {
      state.algorithmStatus = "STOPPED";
    },
    pauseAlgorithm: (state) => {
      state.algorithmStatus = "PAUSED";
    },
    completeAlgorithm: (state) => {
      state.algorithmStatus = "COMPLETE";
    },
  },
});

const selectAlgorithmSlice = createSlice({
  name: "SelectedAlgorithm",
  initialState,
  reducers: {
    aStar: (state) => {
      state.selectedAlgorithm = "dijkstra";
    },
    BFS: (state) => {
      state.selectedAlgorithm = "BFS";
    },
    DFS: (state) => {
      state.selectedAlgorithm = "BFS";
    },
  },
});

const isShowingPathSlice = createSlice({
  name: "IsShowingPath",
  initialState,
  reducers: {
    showPath: (state) => {
      state.isShowingPath = true;
    },
    hidePath: (state) => {
      state.isShowingPath = false;
    },
  },
});
