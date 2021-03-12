class Tile<Type> {
    private _data: Type;

    constructor(data: Type) {
        this._data = data;
    }

    get data(): Type {
        return this._data;
    }

    set data(value: Type) {
        this._data = value;
    }
}

class Tileset<Type> {
    private tiles: Tile<Type>[];

    constructor() {
        this.tiles = [];
    }

    insert(tile: Tile<Type>, index: number = this.tiles.length) {
        this.tiles.splice(index, 0, tile);
    }

    remove(index: number) {
        this.tiles.splice(index, 1);
    }

    replace(tile: Tile<Type>, index: number) {
        this.tiles.splice(index, 1, tile);
    }

    find(tile: Tile<Type>): number {
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

    get(index: number): Tile<Type> {
        if (index >= this.tiles.length || index < 0) return null;

        return this.tiles[index];
    }

    has(tile: Tile<Type>): boolean {
        return this.find(tile) != -1;
    }
}

export { Tile, Tileset };