import HeapQueue from '../DS/HeapQueue';

function astar(start: Network.Node, goal: Network.Node, h: (a: Network.Node, b: Network.Node) => number) {
    const path = new Map<Network.Node, Network.Node>();
    const frontier = new HeapQueue<Network.Node>();
    const cost = new Map<Network.Node, number>();

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

    let result = new Map<Network.Node, Network.Node>();

    let current = goal;

    while(current) {
        result.set(path.get(current), current);

        current = path.get(current);
    }

    return result;
}

export default astar;