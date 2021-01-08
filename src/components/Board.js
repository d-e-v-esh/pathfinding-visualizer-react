// This file contains the board and the nodes rendering.

import React, { useEffect, useState } from "react";
import "../styles/Board.scss";
import Node from "./Node";
import { useSelector, useDispatch } from "react-redux";
import { Dijkstra } from "../algorithms/Dijkstra";
import { visitNode, makePath, updateGrid } from "../store/Node";

const Board = () => {
  const dispatch = useDispatch();

  const {
    grid,
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_ROW,
    FINISH_NODE_COL,
  } = useSelector((state) => state.nodes);

  const newGrid = grid.slice();
  const [localGrid, setLocalGrid] = useState(newGrid);

  const { isMousePressed } = useSelector((state) => state.controls);

  const dijkstraHandler = () => {
    const { visited, result } = Dijkstra(
      grid, // => global to local
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL
    );

    dispatch(makePath(result));
    console.log(result);
    // dispatch(visitNode(visited));
  };

  return (
    <div className="grid">
      <button onClick={() => dijkstraHandler()}>
        Visualize Dijkstra's Algorithm
      </button>
      {localGrid.map((row, rowIdx) => {
        // => global to local
        return (
          <div key={rowIdx} className="grid-row">
            {row.map((node, nodeIdx) => {
              const { row, col } = node;

              return (
                <Node
                  key={nodeIdx}
                  row={row}
                  col={col}
                  coordinate={[row, col]}
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
