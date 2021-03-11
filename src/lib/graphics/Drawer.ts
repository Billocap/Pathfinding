import Tilemap from "lib/DS/Tilemap";
import { GraphNode } from "../DS/Graph";

class Drawer {
    private static instance: Drawer;
    private context: CanvasRenderingContext2D;

    private constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    static drawer(context: CanvasRenderingContext2D): Drawer {
        if (this.instance == null) this.instance = new Drawer(context);

        return this.instance;
    }

    public path(path: Map<GraphNode, GraphNode>, goal: GraphNode, color: string, size: number) {
        let current = goal;

        while(current) {
            this.context.fillStyle = color;
            this.context.fillRect(current.x * size, current.y * size, size, size);

            current = path.get(current);
        }
    }

    public frontier(path: Map<GraphNode, GraphNode>, color: string, size: number) {
        path.forEach(current => {
            const from = path.get(current);
    
            this.context.fillStyle = color;
    
            if (from) {
                if (from.x == current.x) {
                    if (from.y > current.y) {
                        this.context.fillText("↓", current.x * size + 8, current.y * size + 14);
                    } else {
                        this.context.fillText("↑", current.x * size + 8, current.y * size + 14);
                    }
                } else {
                    if (from.x > current.x) {
                        this.context.fillText("→", current.x * size + 8, current.y * size + 14);
                    } else {
                        this.context.fillText("←", current.x * size + 8, current.y * size + 14);
                    }
                }
            } else if (current) {
                this.context.fillText("O", current.x * size + 8, current.y * size + 14);
            }
        });
    }

    public tilemap(tilemap: Tilemap, styles: string[], drawfn: (x: number, y: number, style: string) => void) {
        for (let y = 0; y < tilemap.height; y++) {
            for (let x = 0; x < tilemap.width; x++) {
                const index = tilemap.tile(x, y);
                let style = "";

                if (index <= 0) {
                    style = styles[0];
                } else {
                    style = styles[index];
                }
            
                if (index != -1) {
                    drawfn(x, y, style);
                }
            }
        }
    }
}

export default Drawer;