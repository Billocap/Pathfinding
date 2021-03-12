type direction = "right" | "left" | "top" | "bottom" | "bright" | "bleft" | "tleft" | "tright";
type weight = number;

class GraphNode {
    public x: number;
    public y: number;
    
    private links: Map<direction, [GraphNode, weight]>;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.links = new Map();
    }

    get neighbors(): [GraphNode, weight][] {
        const nodes = this.links;

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
        
        if ((this.x + this.y) % 2 == 0) {
            result = result.reverse();
        }

        return result;
    }

    neighbor(direction: direction): [GraphNode, weight] {
        return this.links.get(direction) || [null, 0];
    }

    link(node: GraphNode, direction: direction, weight: number) {
        this.links.set(direction, [node, weight]);
    }
}

class Graph {
    private nodes: Map<string, GraphNode>;

    constructor() {
        this.nodes = new Map();
    }

    add(x: number, y:number) {
        this.nodes.set(`${x}-${y}`, new GraphNode(x, y));
    }

    delete(x: number, y: number) {
        return this.nodes.delete(`${x}-${y}`);
    }

    node(x: number, y: number) {
        return this.nodes.get(`${x}-${y}`) || null;
    }

    link(nodefrom: GraphNode, nodeto: GraphNode, weight: number) {
        if (!nodefrom || !nodeto) return;
         
        const h = nodeto.x - nodefrom.x;
        const v = nodeto.y - nodefrom.y;

        let from_dir: direction, to_dir: direction;

        if (h == 0) {
            from_dir = v > 0 ? "bottom" : "top";
            to_dir   = v > 0 ? "top" : "bottom";
        } else if (v == 0) {
            from_dir = h > 0 ? "right" : "left";
            to_dir   = h > 0 ? "left" : "right";
        } else {
            if (h > 0) {
                from_dir = v > 0 ? "bleft" : "tright";
                to_dir   = v > 0 ? "tright" : "bleft";
            } else {
                from_dir = v > 0 ? "bright" : "tleft";
                to_dir   = v > 0 ? "tleft" : "bright";
            }
        }

        nodefrom.link(nodeto, from_dir, weight);
        nodeto.link(nodefrom, to_dir, weight);
    }
}

export default Graph;

export {GraphNode};