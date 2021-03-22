class Layer {
    private canvas: HTMLCanvasElement;
    private callback: (context: CanvasRenderingContext2D) => void;

    private next: Layer = null;

    constructor() {
        this.canvas = document.createElement("canvas");
    }

    link(layer: Layer) {
        this.next = layer;
    }

    drawSteps(callback: (context: CanvasRenderingContext2D) => void) {
        this.callback = callback;
    }

    draw(context: CanvasRenderingContext2D) {
        if (this.callback) {
            this.canvas.width = context.canvas.width;
            this.canvas.height = context.canvas.height;
            
            this.callback(this.canvas.getContext('2d'));

            context.drawImage(this.canvas, 0, 0);
        }

        if (this.next) this.next.draw(context);
    }
}

export default Layer;