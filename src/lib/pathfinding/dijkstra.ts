import HeapQueue from "../DS/HeapQueue";

function dijkstra(start: Graph.Node, goal: Graph.Node) {
    const frontier = new HeapQueue<Graph.Node>();
    const path = new Map<Graph.Node, Graph.Node>();
    const cost = new Map<Graph.Node, number>();

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

    let result = new Map<Graph.Node, Graph.Node>();

    let current = goal;

    while(current) {
        result.set(path.get(current), current);

        current = path.get(current);
    }

    return result;
}

export default dijkstra;