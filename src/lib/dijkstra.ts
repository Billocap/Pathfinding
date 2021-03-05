import { GraphNode } from "./Graph";
import HeapQueue from "./HeapQueue";

function dijkstra(start: GraphNode, goal: GraphNode) {
    const frontier = new HeapQueue<GraphNode>();
    const path = new Map<GraphNode, GraphNode>();
    const cost = new Map<GraphNode, number>();

    frontier.enqueue(start, 0);
    path.set(start, null);
    cost.set(start, 0);

    while(frontier.length) {
        const current = frontier.dequeue();

        if (current == goal) break;

        current.neighbors.forEach(([next, weight]) => {
            if (next != null) {
                const new_cost = cost.get(current) + weight;

                if (!path.has(next) || new_cost < cost.get(next)) {
                    frontier.enqueue(next, new_cost);

                    path.set(next, current);
                    cost.set(next, new_cost);
                }
            }
        });
    }

    return path;
}

export default dijkstra;