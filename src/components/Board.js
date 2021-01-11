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

  const { isMousePressed } = useSelector((state) => state.controls);

  const dijkstraHandler = () => {
    // console.log([START_NODE_ROW, START_NODE_COL]);

    const { visited, result } = Dijkstra(
      grid,
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL
    );

    if (result.length === null || undefined) {
      console.log("NO PATH FOUND");
    } else {
      dispatch(makePath(result));
    }

    // console.log(result);
    // dispatch(visitNode(visited));
  };

  return (
    <div className="grid">
      <button onClick={() => dijkstraHandler()}>
        Visualize Dijkstra's Algorithm
      </button>
      {grid.map((row, rowIdx) => {
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
                  coordinate={[[row], [col]]}
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
