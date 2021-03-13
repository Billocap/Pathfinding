import Tilemap from './lib/DS/Tilemap';
import { Tile, Tileset } from './lib/DS/Tileset';

import astar from './lib/pathfinding/astar';

import Drawer from './lib/graphics/Drawer';
import { loadImage } from './lib/graphics/images';
import TilemapImage from './lib/graphics/TilemapImage';
import TileImage from './lib/graphics/TileImage';

import heuristics from './utils/heuristics';
import draw from './utils/drawings';
import graphfromtilemap from './utils/converter';

import mapimage from './assets/room.png';
import paletteimg from './assets/palette.png';
import tiles from './assets/123.png';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const drawer = Drawer.drawer(ctx);

const dirt = new Tile([10, 14]);
const grass = new Tile([20, 28]);
const water = new Tile([30, 42]);

const set = new Tileset<number[]>();
const imageSet = new Tileset<HTMLCanvasElement>();

set.insert(dirt);
set.insert(grass);
set.insert(water);

const tilemapImage = new TilemapImage();
const imageTileset = new TileImage(8, 8);

const tile = 16;

loadImage(tiles).then(response => {
    imageTileset.source = response;

    const dirtTile  = new Tile(imageTileset.tile(1, 1, tile, tile));
    const grassTile = new Tile(imageTileset.tile(1, 0, tile, tile));
    const waterTile = new Tile(imageTileset.tile(0, 1, tile, tile));

    imageSet.insert(grassTile);
    imageSet.insert(dirtTile);
    imageSet.insert(waterTile);

    return loadImage(paletteimg);

}).then(paletteimage => {
    //tilemapImage.palette = paletteimage;

    return loadImage(mapimage);

}).then(mapImage => {
    const map = new Tilemap(set, mapImage.width, mapImage.height);

    tilemapImage.source = mapImage;

    const [mapdata, palette] = tilemapImage.tilemap;

    map.map = mapdata;

    const graph = graphfromtilemap(map, true, false, false, [10, 14]);

    canvas.setAttribute("width",  `${tile * mapImage.width }`);
    canvas.setAttribute("height", `${tile * mapImage.height}`);

    drawer.tilemap(map, [
        ctx.createPattern(imageSet.get(0).data, "repeat"),
        ctx.createPattern(imageSet.get(1).data, "repeat"),
        ctx.createPattern(imageSet.get(2).data, "repeat")
    ], draw.grid(ctx, tile, ctx.createPattern(imageTileset.tile(0, 0, tile, tile), "repeat")));

    const clean = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const start = graph.node(0, 0);

    canvas.addEventListener("mousemove", e => {
        ctx.putImageData(clean, 0, 0);

        const goal = graph.node(Math.floor((e.offsetX - 8) / tile), Math.floor((e.offsetY - 8) / tile));

        let path = astar(start, goal, heuristics.manhattam(tile));

        drawer.path(path, goal, "rgb(255, 0, 0)", tile);
    });
});