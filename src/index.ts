import Tilemap from './lib/DS/Tilemap';
import { Tile, Tileset } from './lib/DS/Tileset';

import astar from './lib/pathfinding/astar';

import Drawer from './lib/graphics/Drawer';
import { mapfromimage, datafromsource, loadImage, canvasfromtile } from './lib/graphics/images';

import heuristics from './utils/heuristics';
import draw from './utils/drawings';
import graphfromtilemap from './utils/converter';

import image from './assets/map_test.png';
import tiles from './assets/123.png';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const drawer = Drawer.drawer(ctx);

const dirt  = new Tile([10, 14]);
const grass = new Tile([20, 28]);
const bush  = new Tile([30, 42]);

const set = new Tileset<number[]>();
const imageSet = new Tileset<HTMLCanvasElement>();

set.insert(dirt);
set.insert(grass);
set.insert(bush);

loadImage(tiles).then(response => {
    const dirtTile = new Tile(canvasfromtile(response, 8, 8, 8, 8));
    const grassTile = new Tile(canvasfromtile(response, 8, 0, 8, 8));
    const waterTile = new Tile(canvasfromtile(response, 0, 8, 8, 8));

    imageSet.insert(dirtTile);
    imageSet.insert(grassTile);
    imageSet.insert(waterTile);

    return loadImage(image);
}).then(mapImage => {
    const map = new Tilemap(set, mapImage.width, mapImage.height);

    const [mapdata, palette] = mapfromimage(datafromsource(mapImage));

    map.map = mapdata;

    const graph = graphfromtilemap(map, false, true, false, [10, 14]);

    const tile = 16;

    canvas.setAttribute("width",  `${tile * mapImage.width }`);
    canvas.setAttribute("height", `${tile * mapImage.height}`);

    drawer.tilemap(map, [
        ctx.createPattern(imageSet.get(0).data, "repeat"),
        ctx.createPattern(imageSet.get(1).data, "repeat"),
        ctx.createPattern(imageSet.get(2).data, "repeat")
    ], draw.grid(ctx, tile));

    const clean = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const start = graph.node(0, 0);

    canvas.addEventListener("mousemove", e => {
        ctx.putImageData(clean, 0, 0);

        const goal = graph.node(Math.floor((e.offsetX - 8) / tile), Math.floor((e.offsetY - 8) / tile));

        let patha = astar(start, goal, heuristics.manhattam(tile));

        drawer.path(patha, goal, "rgb(255, 0, 0)", tile);
    });
});