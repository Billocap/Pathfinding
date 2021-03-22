import HeapQueue from "../DS/HeapQueue";

function gbfs(start: Network.Node, goal: Network.Node, h: (a: Network.Node, b: Network.Node) => number) {
    const frontier = new HeapQueue<Network.Node>();
    const path = new Map<Network.Node, Network.Node>();

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

    let result = new Map<Network.Node, Network.Node>();

    let current = goal;

    while(current) {
        result.set(path.get(current), current);

        current = path.get(current);
    }

    return result;
}

export default gbfs;