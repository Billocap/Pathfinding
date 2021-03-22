function bfs(start: Network.Node, goal: Network.Node) {
    const frontier: Network.Node[] = [start];
    const path = new Map<Network.Node, Network.Node>();

    path.set(start, null);

    while(frontier.length) {
        let current = frontier.pop();

        if (current == goal) break;

        current.neighbors.forEach(([node]) => {
            if (node && !path.has(node)) {
                frontier.unshift(node);

                path.set(node, current);
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

export default bfs;