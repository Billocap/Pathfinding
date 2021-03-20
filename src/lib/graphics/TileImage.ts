class TileImage implements Mosaic.TileImage<HTMLCanvasElement> {
    private _source: HTMLImageElement;
    private _width: number;
    private _height: number;

    /**
     * Creates a new tileable image.
     * @param width The width of a tile within the image.
     * @param height The height of a tile within the image.
     */
    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    set source(image: HTMLImageElement) {
        this._source = image;
    }

    tile(x: number, y: number, width: number, height: number): HTMLCanvasElement {
        const context = document.createElement("canvas").getContext("2d");

        context.canvas.width  = width;
        context.canvas.height = height;

        context.imageSmoothingEnabled = false;
        
        context.drawImage(
            this._source,
            x * this._width,
            y * this._height,
            this._width,
            this._height,
            0,
            0,
            width,
            height
        );

        return context.canvas;
    }
}

export default TileImage;