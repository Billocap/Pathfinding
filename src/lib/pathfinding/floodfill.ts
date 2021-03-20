function floodfill(start: Graph.Node) {
    const frontier: Graph.Node[] = [start];
    const path = new Map<Graph.Node, Graph.Node>();

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