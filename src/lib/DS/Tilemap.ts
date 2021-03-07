import Graph from "./Graph";
import { Tileset } from "./TileSet";

class Tilemap {
    private _set: Tileset;
    private _map: number[];

    public width: number;
    public height: number;

    constructor(tileset: Tileset, width: number = 8, height: number = 8) {
        this._set = tileset;

        this.width = width;
        this.height = height;

        this._map = [];
    }

    set map(value: number[]) {
        this._map = value;
    }

    tile(x: number, y: number): number {
        const cy = y > this.height ? this.height : y;
        const cx = x >  this.width ? this.width  : x;

        return this._map[cy * this.width + cx];
    }

    grid() {
        let result = new Graph();

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const index = this.tile(x, y);

                if (index != -1) {
                    let tile = this._set.get(index);

                    result.add(x, y);
        
                    result.link(result.node(x, y), result.node(x-1, y), tile.data);
                    result.link(result.node(x, y), result.node(x, y-1), tile.data);
                }
            }
        }

        return result;
    }
}

export default Tilemap;