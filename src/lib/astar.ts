import { GraphNode } from './Graph';
import HeapQueue from './HeapQueue';

function astar(start: GraphNode, goal: GraphNode, h: (a: GraphNode, b: GraphNode) => number) {
    const path = new Map<GraphNode, GraphNode>();
    const frontier = new HeapQueue<GraphNode>();
    const cost = new Map<GraphNode, number>();

    frontier.enqueue(start, 0);
    cost.set(start, 0);

    while (frontier.length) {
        const current = frontier.dequeue();

        if (current == goal) break;

        current.neighbors.forEach(([next, weight]) => {
            if (next != null){
                const new_cost = cost.get(current) + weight;

                if (!cost.has(next) || new_cost < cost.get(next)) {
                    frontier.enqueue(next, new_cost + h(goal, next));
                    cost.set(next, new_cost);

                    path.set(next, current);
                }
            }
        });
    }

    return path;
}

export default astar;