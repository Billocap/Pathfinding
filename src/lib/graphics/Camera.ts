class Camera {
    public width: number;
    public height: number;

    public x: number;
    public y: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;
    }

    draw(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
        context.imageSmoothingEnabled = false;
        
        context.drawImage(
            context.canvas,
            this.x,
            this.y,
            this.width,
            this.height,
            x,
            y,
            width,
            height,
        );
    }
}

export default Camera;