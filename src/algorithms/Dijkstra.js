import { useSelector, useDispatch } from "react-redux";

export const Dijkstra = () => {
  const { grid } = useSelector((state) => state.nodes);
  const startNode = grid[isStart.row][isStart.col];
  const endNode = grid[isEnd.row][isEnd.col];
  const visitedNodesInOrder = [];
  // First we will set the startNode distance to 0
  startNode.distance = 0;

  const unvisitedNodes = grid.slice(); // grid.slice() creates a shallow copy of the grid.
};

const sortNodesByDistance = () => {};
