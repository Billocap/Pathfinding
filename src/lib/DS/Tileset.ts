class Tile<Type> {
    private _data: Type;

    constructor(data: Type) {
        this._data = data;
    }

    get data() {
        return this._data;
    }

    set data(value: Type) {
        this._data = value;
    }
}

class Tileset {
    private tiles: Tile<number>[];

    constructor() {
        this.tiles = [];
    }

    insert(tile: Tile<number>, index: number) {
        this.tiles.splice(index, 0, tile);
    }

    remove(index: number) {
        this.tiles.splice(index, 1);
    }

    replace(tile: Tile<number>, index: number) {
        this.tiles.splice(index, 1, tile);
    }

    find(tile: Tile<number>): number {
        let result = -1;

        for (let index = 0; index < this.tiles.length; index++) {
            const element = this.tiles[index];

            if (element == tile) {
                result = index;

                break;
            }
        }

        return result;
    }

    get(index: number): Tile<number> {
        if (index >= this.tiles.length || index < 0) return null;

        return this.tiles[index];
    }

    has(tile: Tile<number>): boolean {
        return this.find(tile) != -1;
    }
}

export { Tile, Tileset };