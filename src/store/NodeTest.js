import { createSlice } from "@reduxjs/toolkit";
import {
  createEmptyNodes,
  isStartOrEndNode,
  clearNotToolNodes,
} from "../utils/nodeHelpers";

// Default state
const COLS = 40;
const ROWS = 50;

function initNodesState(cols, rows) {
  const nodes = createEmptyNodes(cols, rows);
  const middleY = Math.floor(nodes.length / 2);
  const middleX = Math.floor(nodes[0].length / 2);

  const startNode = { y: middleY, x: middleX };
  const endNode = { y: Math.floor(middleY / 2), x: middleX };
  nodes[startNode.y][startNode.x].type = NodeTypes.start;
  nodes[endNode.y][endNode.x].type = NodeTypes.end;

  return {
    columns: cols,
    rows,
    nodes,
    startNode,
    endNode,
    pathfinding: pathfindingState.ready,
  };
}

const defaultState = initNodesState(COLS, ROWS);

const nodesSlice = createSlice({
  name: "nodes",
  initialState: defaultState,
  reducers: {
    changeColumns: (state, { payload }) => {
      state.columns = payload;
    },
    changeRows: (state, { payload }) => {
      state.rows = payload;
    },
    startPathfinding: (state) => {
      if (state.pathfinding === pathfindingState.ready) {
        state.pathfinding = pathfindingState.running;
      }
    },
    endPathfinding: (state) => {
      if (state.pathfinding === pathfindingState.running) {
        state.pathfinding = pathfindingState.done;
      }
    },
    setNodesType: (state, action) => {
      switch (state.pathfinding) {
        case pathfindingState.ready:
          setNodesTypeReady(state, action);
          break;
        case pathfindingState.running:
          setNodesTypeRunning(state, action);
          break;
        case pathfindingState.done:
          setNodesTypeDone(state, action);
          break;
        default:
          break;
      }
    },
    clearNodes: clearNodesCase,
    resetNodes: () => defaultState,
  },
});

const { actions, reducer } = nodesSlice;
export const {
  changeColumns,
  changeRows,
  startPathfinding,
  endPathfinding,
  setNodesType,
  clearNodes,
  resetNodes,
} = actions;
export default reducer;
