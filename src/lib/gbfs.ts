import { GraphNode } from "./Graph";
import HeapQueue from "./HeapQueue";

function gbfs(start: GraphNode, goal: GraphNode, h: (a: GraphNode, b: GraphNode) => number) {
    const frontier = new HeapQueue<GraphNode>();
    const path = new Map<GraphNode, GraphNode>();

    frontier.enqueue(start, 0);
    path.set(start, null);

    while(frontier.length) {
        const current = frontier.dequeue();

        if (current == goal) break;

        current.neighbors.forEach(([next]) => {
            if (next != null) {
                if (!path.has(next)) {
                    frontier.enqueue(next, h(goal, next));

                    path.set(next, current);
                }
            }
        });
    }

    return path;
}

export default gbfs;