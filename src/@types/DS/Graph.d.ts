/**
 * Declares the basic interfaces a Graph must have.
 */
declare namespace Graph {
    /**
     * Represents a vertex on the graph, must store it's edges and the weight of this edges.
     */
    interface Node {
        /**
         * An array containing the nodes an weights of the connections.
         */
        neighbors: [Graph.Node, number][];
        /**
         * Returns the node and weight of that link.
         * @param args Any extra paramethers needed for the implementation.
         * @returns An array with the node and weight.
         */
        neighbor(...args: any[]): [Graph.Node, number];
        /**
         * Unidirectionally links this node to the other node.
         * @param node Node to connect to.
         * @param weight The weight of the link.
         * @param args Any extra paramethers needed for the implementation.
         */
        link(node: Graph.Node, weight: number, ...args: any[]): void;
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
        node(...args: any[]): Graph.Node;
        /**
         * Link to nodes on the graph.
         * @param nodefrom The first node to link.
         * @param nodeto The second node to link.
         * @param weight The weight of the link.
         */
        link(nodefrom: Graph.Node, nodeto: Graph.Node, weight: number): void;
    }
}