import { useSelector, useDispatch } from "react-redux";

// export default function Dijkstra(nodes, startNode, endNode) {
//   return basicAStar(nodes, startNode, endNode, dijkstraHeuristic);
// }

export const Dijkstra = (
  grid,
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL
) => {
  // console.log(grid);
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const endNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

  console.log(startNode, endNode);

  const neighbors = (node1, node2) => {
    const xDistance = Math.abs(node1.row - node2.row);
    const yDistance = Math.abs(node1.col - node2.col);
    return xDistance + yDistance === 1;
  };

  const dijkstraHeuristic = {
    comparer: (a, b) => a.distanceFromStart - b.distanceFromStart,
    addHeuristics: (grid, startNode, endNode) =>
      grid.map((girdNode) => ({
        ...girdNode,
        distanceFromStart: girdNode.isStart ? 0 : Infinity, // either 0 or infinity
        previousNode: null,
        // console.log()
      })),
    map: (currentNode, testedNode) => {
      const calculatedDistance = currentNode.distanceFromStart + 1;

      // console.log(currentNode);
      return neighbors(currentNode, testedNode)
        ? {
            ...testedNode,
            distanceFromStart: Math.min(
              testedNode.distanceFromStart,
              calculatedDistance
            ),
            previousNode:
              testedNode.distanceFromStart > calculatedDistance
                ? currentNode
                : testedNode.previousNode,
          }
        : testedNode;
    },
    endCondition: (currentNode) => currentNode.distanceFromStart === Infinity,
  };

  const basicAStar = (grid, startNode, endNode, heuristic) => {
    const visited = [];

    const flatNodes = grid.flat().filter((gridNode) => !gridNode.isWall);
    // console.log(flatNodes);
    let unvisited = heuristic.addHeuristics(flatNodes, startNode, endNode);

    for (let i = 0; unvisited.length !== 0; i++) {
      unvisited.sort(heuristic.comparer);
      const currentNode = unvisited[0];

      // if lowest distance from start node in unvisited array equals Infinity
      // it means there is no path from start to end, so we can end searching
      if (heuristic.endCondition(currentNode)) {
        return { visited, result: null };
      }

      unvisited.shift(); //remove current node
      unvisited = unvisited.map((node) => heuristic.map(currentNode, node));

      visited.push({ ...currentNode, visitedIndex: i });
      if (currentNode.isEnd) {
        break;
      }
    }

    const result = [];

    const endNodeData = visited.find((n) => n.isEnd);
    for (
      let i = 0, node = endNodeData.previousNode;
      node?.isStart;
      node = node.previousNode, i++
    ) {
      if (!node) {
        return { visited, result };
      }
      result.push({ ...node, visitedIndex: i });
    }
    // console.log(visited);

    // TODO: Result is still an empty array (check the for loop) but visited is working
    // console.log(result);

    //
    return { visited, result };
  };

  // Main Return Statement
  return basicAStar(grid, startNode, endNode, dijkstraHeuristic);
};
