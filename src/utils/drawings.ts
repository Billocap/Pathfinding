const draw = {
    grid(context: CanvasRenderingContext2D, size: number, wall?: CanvasPattern) {
        return (x: number, y: number, color: string | CanvasGradient | CanvasPattern, isWall: boolean) => {
            context.fillStyle = isWall ? wall : color;

            context.fillRect(x * size, y * size, size, size);
        };
    },
    small(context: CanvasRenderingContext2D, size: number) {
        return (x: number, y: number, color: string | CanvasGradient | CanvasPattern, isWall: boolean) => {
            context.fillStyle = color;

            context.fillRect(x * size + 8, y * size + 8, size - 16, size - 16);
        };
    },
    stroke(context: CanvasRenderingContext2D, size: number) {
        return (x: number, y: number, color: string | CanvasGradient | CanvasPattern, isWall: boolean) => {
            context.strokeStyle = color;

            if (!isWall) context.strokeRect(x * size + 2, y * size + 2, size - 4, size - 4);
        };
    }
}

export default draw;