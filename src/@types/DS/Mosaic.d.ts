/**
 * Defines commom methods for grid tileable entities.
 */
declare namespace Mosaic {
    /**
     * The most basic tileable entity is a container
     * for the data to be tiled.
     */
    interface Tile<Type> {
        /**
         * The data to be tiled.
         */
        data: Type;
    }

    /**
     * It's a collection of tiles used by the tilemap.
     */
    interface Tileset<Type> {
        /**
         * Inserts the tile in the specified index, 
         * if no index is passed appends the tile to the end of tileset.
         * @param tile The tile to insert.
         * @param index The index to insert the tile.
         */
        insert(tile: Tile<Type>, index?: number): void;
        /**
         * Removes the tile in the specified index from the tileset.
         * @param tile The tile to remove.
         */
        remove(index: number): void;
        /**
         * Replaces the tile in the specified index.
         * @param tile The new tile to insert.
         * @param index The index of the tile to replace.
         */
        replace(tile: Tile<Type>, index: number): void;

        /**
         * Returns the tile in the specified index.
         * @param index The quered index.
         * @returns The tile in the specified index.
         */
        tile(index: number): Tile<Type>;
        /**
         * Returns the data in the tile in the specified index.
         * @param index The quered index.
         * @returns The data in the tile in the specified index.
         */
        data(index: number): Type;
        
        /**
         * Returns the index of the specified tile or
         *  -1 if the tile is not found.
         * @param tile Tile to be searched.
         * @returns The index of the tile.
         */
        find(tile: Tile<Type>): number;
        /**
         * Checks if the specified tile or exists on the tilset.
         * @param tile Tile to be searched.
         * @returns If the tile exists or not.
         */
        has(tile: Tile<Type>): boolean;
        
        /**
         * Defines the tiles based on a array.
         * @param array The array to use as base.
         */
        from(array: Type[]): void;
        /**
         * Transforms the tileset into an array.
         * @returns An array with the data in the tileset.
         */
        list(): Type[];
    }

    /**
     * Links a index map with a tileset.
     */
    interface Tilemap {
        /**
         * Width of the tilemap.
         */
        width: number;
        /**
         * Height of the tilemap.
         */
        height: number;

        /**
         * The index map of the tilemap. A index map it's just an array 
         * contaning the index of the tile that should be in that position.
         */
        map: number[] | (number[])[];
        /**
         * The tileset to be used.
         */
        tileset: Tileset<unknown>;

        /**
         * Returns the index in the specified position.
         * @param x The x coordinate.
         * @param y The y coordinate.
         */
        index(x: number, y: number): number;
        /**
         * Returns the tile in the specified position.
         * @param x The x coordinate.
         * @param y The y coordinate.
         */
        tile(x: number, y: number): Tile<unknown>;
    }

    /**
     * Defines an image that can be divided into tiles.
     */
    interface TileImage<Type> {
        /**
         * The source of the image to be tiled.
         */
        source: HTMLImageElement;

        /**
         * Returns the tile in the specified position, the width and height 
         * are the final dimensions the tile will have.
         * @param x The x coordinate of the tile within the image.
         * @param y The y coordinate of the tile within the image.
         * @param width The width of the tile.
         * @param height The height of the tile.
         */
        tile(x: number, y: number, width: number, height: number): Type;
    }

    interface TilemapImage {}
}