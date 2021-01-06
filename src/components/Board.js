// This file contains the board and the nodes rendering.

import React, { useEffect } from "react";
import "../styles/Board.scss";
import Node from "./Node";
import { useSelector, useDispatch } from "react-redux";
import { Dijkstra, getNodesInShortestPathOrder } from "../algorithms/Dijkstra";

const Board = () => {
  const dispatch = useDispatch();

  const {
    grid,
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_ROW,
    FINISH_NODE_COL,
  } = useSelector((state) => state.nodes);
  const { isMousePressed } = useSelector((state) => state.controls);

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = Dijkstra(
      grid,
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <div className="grid">
      <button onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="grid-row">
            {row.map((node, nodeIdx) => {
              const { row, col, isFinish, isStart, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  row={row}
                  col={col}
                  // isFinish={isFinish}
                  // isStart={isStart}
                  // isWall={isWall}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
