import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
// import rootReducer from "./rootReducer";

import nodesReducer from "./Node";
import controlsReducer from "./Controls";

const rootReducer = combineReducers({
  nodes: nodesReducer,
  controls: controlsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [],
});

export default store;
