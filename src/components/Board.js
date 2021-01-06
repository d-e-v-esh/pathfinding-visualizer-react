// This file contains the board and the nodes rendering.

import React, { useEffect } from "react";
import "../styles/Board.scss";
import Node from "./Node";
import { useSelector, useDispatch } from "react-redux";
import { Dijkstra } from "../algorithms/Dijkstra";

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

  return (
    <div className="grid">
      <button
        onClick={() =>
          Dijkstra(
            grid,
            START_NODE_ROW,
            START_NODE_COL,
            FINISH_NODE_ROW,
            FINISH_NODE_COL
          )
        }>
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
