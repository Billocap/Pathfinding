import { Tileset } from "./TileSet";

class Tilemap {
    private _tileset: Tileset<unknown>;
    private _tilemap: number[];

    public width: number;
    public height: number;

    constructor(tileset: Tileset<unknown>, width: number = 8, height: number = 8) {
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

    set tileset(tileset: Tileset<unknown>) {
        this._tileset = tileset;
    }

    get tileset(): Tileset<unknown> {
        return this._tileset;
    }

    index(x: number, y: number): number {
        const cy = y > this.height ? this.height - 1 : y;
        const cx = x > this.width  ? this.width  - 1 : x;

        return this._tilemap[cy * this.width + cx];
    }

    tile(x: number, y: number) {
        return this._tileset.get(this.index(x, y));
    }
}

export default Tilemap;