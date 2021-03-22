function floodfill(start: Network.Node) {
    const frontier: Network.Node[] = [start];
    const path = new Map<Network.Node, Network.Node>();

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