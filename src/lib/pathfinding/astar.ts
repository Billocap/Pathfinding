import HeapQueue from '../DS/HeapQueue';

function astar(start: Graph.Node, goal: Graph.Node, h: (a: Graph.Node, b: Graph.Node) => number) {
    const path = new Map<Graph.Node, Graph.Node>();
    const frontier = new HeapQueue<Graph.Node>();
    const cost = new Map<Graph.Node, number>();

    frontier.enqueue(start, 0);
    cost.set(start, 0);
    path.set(start, null);

    while (frontier.length) {
        const current = frontier.dequeue();

        if (current == goal) break;

        current.neighbors.forEach(([next, weight]) => {
            if (next){
                const new_cost = cost.get(current) + weight;

                if (!cost.has(next) || new_cost < cost.get(next)) {
                    frontier.enqueue(next, new_cost + h(goal, next));
                    cost.set(next, new_cost);

                    path.set(next, current);
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

export default astar;