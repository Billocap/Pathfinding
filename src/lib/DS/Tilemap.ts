class Tilemap implements Mosaic.Tilemap {
    // This class is cpupled to the tileset but
    // can be replace by an array.
    private _tileset: Mosaic.Tileset<unknown>;
    // The map is defined as a one dimensional
    // array because it's easier the create and
    // don't change the code that much.
    private _tilemap: number[];

    public width: number;
    public height: number;

    constructor(tileset: Mosaic.Tileset<unknown>, width: number = 8, height: number = 8) {
        this._tileset = tileset;

        this.width = width;
        this.height = height;

        this._tilemap = [];
    }

    set map(value: number[]) {
        this._tilemap = value;
    }

    get map(): number[] {
        return this._tilemap;
    }

    // Change this part to migrate the code to work with arrays.
    set tileset(tileset: Mosaic.Tileset<unknown>) {
        this._tileset = tileset;
    }

    get tileset(): Mosaic.Tileset<unknown> {
        return this._tileset;
    }
    // ***********************

    index(x: number, y: number): number {
        const cy = y > this.height ? this.height - 1 : y;
        const cx = x > this.width  ? this.width  - 1 : x;

        return this._tilemap[cy * this.width + cx];
    }

    // Also chnage this code to migrate to arrays.
    tile(x: number, y: number): Mosaic.Tile<unknown> {
        return this._tileset.tile(this.index(x, y));
    }
    // ***********************
}

export default Tilemap;