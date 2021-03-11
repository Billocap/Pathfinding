import Graph from "./Graph";
import { Tileset } from "./TileSet";

class Tilemap {
    private _tileset: Tileset;
    private _tilemap: number[];

    public width: number;
    public height: number;

    constructor(tileset: Tileset, width: number = 8, height: number = 8) {
        this._tileset = tileset;

        this.width = width;
        this.height = height;

        this._tilemap = [];
    }

    set map(value: number[]) {
        this._tilemap = value;
    }

    tile(x: number, y: number): number {
        const cy = y > this.height ? this.height - 1 : y;
        const cx = x >  this.width ? this.width - 1  : x;

        return this._tilemap[cy * this.width + cx];
    }

    grid(allowDiagonals: boolean, avoidCorners: boolean, avoidWalls: boolean, wallBias: [number, number]) {
        let result = new Graph();

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const index = this.tile(x, y);

                if (index != -1) {
                    let tile = this._tileset.get(index);

                    let sWeight = tile.data[0];
                    let dWeight = tile.data[1];

                    result.add(x, y);

                    if (avoidWalls) {
                        let hasWall = false;

                        for (let dy = y-1; dy <= y+1; dy++) {
                            if (dy < 0 || dy >= this.height) continue;

                            for (let dx = x-1; dx <= x+1; dx++) {
                                if (dx < 0 || dx >= this.width) continue;

                                let index = this.tile(dx, dy);

                                if (index != null && index == -1) {
                                    hasWall = true;

                                    break;
                                }
                            }

                            if (hasWall) break;
                        }

                        if (hasWall) {
                            sWeight += wallBias[0];
                            dWeight += wallBias[1];
                        }
                    }

                    result.link(result.node(x, y), result.node(x-1, y), sWeight);
                    result.link(result.node(x, y), result.node(x, y-1), sWeight);

                    if (allowDiagonals) {
                        let tleft = true;
                        let tright = true;

                        if (avoidCorners) {
                            let right = this.tile(x+1, y) != -1;
                            let left  = this.tile(x-1, y) != -1;

                            let top     = this.tile(x, y-1) != -1;
                            let bottom  = this.tile(x, y+1) != -1;

                            tleft  = top && left  && bottom;
                            tright = top && right && bottom;
                        } 
                        
                        if (tleft)  result.link(result.node(x, y), result.node(x-1, y-1), dWeight);
                        if (tright) result.link(result.node(x, y), result.node(x+1, y-1), dWeight);
                    }
                }
            }
        }

        return result;
    }
}

export default Tilemap;