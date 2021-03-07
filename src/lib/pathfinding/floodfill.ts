import { GraphNode } from "../DS/Graph";

function floodfill(start: GraphNode) {
    const frontier: GraphNode[] = [start];
    const path = new Map<GraphNode, GraphNode>();

    path.set(start, null);

    while(frontier.length) {
        let current = frontier.pop();

        current.neighbors.forEach(([node]) => {
            if (node && !path.has(node)) {
                frontier.unshift(node);

                path.set(node, current);
            }
        });
    }

    return path;
}

export default floodfill;