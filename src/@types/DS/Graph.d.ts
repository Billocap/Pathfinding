/**
 * Declares the basic interfaces a Graph must have.
 */
declare namespace Network {
    /**
     * Represents a vertex on the graph, must store it's edges and the weight of this edges.
     */
    interface Node {
        /**
         * An array containing the nodes an weights of the connections.
         */
        neighbors: [Network.Node, number][];
        /**
         * Returns the node and weight of that link.
         * @param args Any extra paramethers needed for the implementation.
         * @returns An array with the node and weight.
         */
        neighbor(...args: any[]): [Network.Node, number];
        /**
         * Unidirectionally links this node to the other node.
         * @param node Node to connect to.
         * @param weight The weight of the link.
         * @param args Any extra paramethers needed for the implementation.
         */
        link(node: Network.Node, weight: number, ...args: any[]): void;
    }

    /**
     * Represents the graph itself, must store it's edges and the weight of this edges.
     */
    interface Graph {
        /**
         * Adds a new node to the graph.
         * @param args Any paremthers needed.
         */
        add(...args: any[]): void;
        /**
         * Removes a node from the graph.
         * @param args Any paremthers needed.
         */
        delete(...args: any[]): void;
        /**
         * Query a node from the graph.
         * @param args Any paremthers needed.
         * @returns The quered node.
         */
        node(...args: any[]): Network.Node;
        /**
         * Link to nodes on the graph.
         * @param nodefrom The first node to link.
         * @param nodeto The second node to link.
         * @param weight The weight of the link.
         */
        link(nodefrom: Network.Node, nodeto: Network.Node, weight: number): void;
    }
}