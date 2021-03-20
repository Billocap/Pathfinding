import HeapQueue from "../DS/HeapQueue";

function gbfs(start: Graph.Node, goal: Graph.Node, h: (a: Graph.Node, b: Graph.Node) => number) {
    const frontier = new HeapQueue<Graph.Node>();
    const path = new Map<Graph.Node, Graph.Node>();

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

    let result = new Map<Graph.Node, Graph.Node>();

    let current = goal;

    while(current) {
        result.set(path.get(current), current);

        current = path.get(current);
    }

    return result;
}

export default gbfs;