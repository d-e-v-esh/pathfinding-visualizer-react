import { configureStore } from "@reduxjs/toolkit";
import Node from "./Node";

const store = configureStore({
  reducer: Node,
  middleware: [],
});

export default store;
