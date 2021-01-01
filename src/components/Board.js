// This file contains the board and the nodes rendering.

import React, { useState, useEffect } from "react";
import "../styles/Board.scss";
import Node from "./Node";
import { useSelector, useDispatch } from "react-redux";
import { updateGrid } from "../store/Node";

const Board = () => {
  const dispatch = useDispatch();

  const { grid } = useSelector((state) => state);

  useEffect(() => {}, []);

  return (
    <div className="grid">
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
