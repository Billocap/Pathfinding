type direction = "right" | "left" | "top" | "bottom" | "bright" | "bleft" | "tleft" | "tright";
type weight = number; // Just some verbose.

// Grid centric node implementation.
class GridNode implements Graph.Node {
    public x: number;
    public y: number;
    
    // The links can be stored in any data structure.
    private links: Map<direction, [GridNode, weight]>;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.links = new Map();
    }

    // IMplementation specific for grid graphs.
    get neighbors(): [GridNode, weight][] {
        const nodes = this.links; // Just some verbose.

        // The order of the nodes change the style of the path.
        let result = [
            nodes.get("top")    || [null, 0],
            nodes.get("tright") || [null, 0],
            nodes.get("right")  || [null, 0],
            nodes.get("bright") || [null, 0],
            nodes.get("bottom") || [null, 0],
            nodes.get("left")   || [null, 0],
            nodes.get("bleft")  || [null, 0],
            nodes.get("tleft")  || [null, 0]
        ];
        
        // If alternate the order the path may become wavier or flatter.
        if ((this.x + this.y) % 2 == 0) {
            result = result.reverse();
        }

        return result;
    }

    /**
     * @param direction The link direction.
     * @returns An array with the node and weight.
     */
    neighbor(direction: direction): [GridNode, weight] {
        return this.links.get(direction) || [null, 0];
    }

    /**
     * @param node Node to connect to.
     * @param weight The weight of the link.
     * @param direction The direction of the link.
     */
    link(node: GridNode, weight: number, direction: direction) {
        this.links.set(direction, [node, weight]);
    }
}

class Grid implements Graph.Graph{
    // Saves the connections in a map because it's kind painfull
    // to deal with 2d arrays in JavaScript;
    private nodes: Map<string, GridNode>;

    constructor() {
        this.nodes = new Map();
    }

    /**
     * @param x The x coordinate of the new node.
     * @param y The y coordinate of the new node.
     */
    add(x: number, y:number) {
        // Sevas the x and y coordinates in the key for a
        // pseudo 2d array effect.
        this.nodes.set(`${x}-${y}`, new GridNode(x, y));
    }

    /**
     * @param x The x coordinate of the node to delete.
     * @param y The y coordinate of the node to delete.
     */
    delete(x: number, y: number) {
        return this.nodes.delete(`${x}-${y}`);
    }

    /**
     * @param x The x coordinate of the quered node.
     * @param y The y coordinate of the quered node.
     */
    node(x: number, y: number) {
        return this.nodes.get(`${x}-${y}`) || null;
    }

    // This implamentation is specific for a grid graph.
    // For other kinds of graph the implamentation can vary.
    // As long as the interface is respected.
    link(nodefrom: GridNode, nodeto: GridNode, weight: number) {
        if (!nodefrom || !nodeto) return; // If none of the nodes are null.
         
        const h = nodeto.x - nodefrom.x; // Horizotal difference.
        const v = nodeto.y - nodefrom.y; // Vertical difference.

        // from_dir must be the opposite of to_dir.
        let from_dir: direction, to_dir: direction;

        if (h == 0) {
            // If the horizotal difference is 0.
            // Only the y coordinates vary.
            from_dir = v > 0 ? "bottom" : "top";
            to_dir   = v > 0 ? "top" : "bottom";
        } else if (v == 0) {
            // If the vertical difference is 0.
            // Only the x coordinates vary.
            from_dir = h > 0 ? "right" : "left";
            to_dir   = h > 0 ? "left" : "right";
        } else {
            // If none are zero the link is diagonal.
            if (h > 0) {
                from_dir = v > 0 ? "bleft" : "tright";
                to_dir   = v > 0 ? "tright" : "bleft";
            } else {
                from_dir = v > 0 ? "bright" : "tleft";
                to_dir   = v > 0 ? "tleft" : "bright";
            }
        }

        nodefrom.link(nodeto, weight, from_dir);
        nodeto.link(nodefrom, weight, to_dir);
    }
}

export default Grid;

export {GridNode};