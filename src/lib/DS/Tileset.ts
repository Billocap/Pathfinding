// Works as container for data.
class Tile<Type> implements Mosaic.Tile<Type> {
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

// Tileset works as list of tiles.
// Can be replace by a simple array.
class Tileset<Type> implements Mosaic.Tileset<Type> {
    private tiles: Mosaic.Tile<Type>[];

    constructor() {
        this.tiles = [];
    }

    insert(tile: Mosaic.Tile<Type>, index: number = this.tiles.length) {
        this.tiles.splice(index, 0, tile);
    }

    remove(index: number) {
        this.tiles.splice(index, 1);
    }

    replace(tile: Mosaic.Tile<Type>, index: number) {
        this.tiles.splice(index, 1, tile);
    }

    find(tile: Mosaic.Tile<Type>): number {
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

    tile(index: number): Mosaic.Tile<Type> {
        if (index >= this.tiles.length || index < 0) return null;

        return this.tiles[index];
    }

    data(index: number): Type {
        if (index >= this.tiles.length || index < 0) return null;

        return this.tiles[index].data;
    }

    has(tile: Mosaic.Tile<Type>): boolean {
        return this.find(tile) != -1;
    }

    from(array: Type[]) {
        this.tiles = new Array<Mosaic.Tile<Type>>();

        array.forEach(data => {
            this.tiles.push(new Tile<Type>(data));
        });
    }

    list(): Type[] {
        let result = [];

        this.tiles.forEach(tile => {
            result.push(tile.data);
        });

        return result;
    }
}

export { Tile, Tileset };