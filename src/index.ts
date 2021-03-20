import Tilemap from './lib/DS/Tilemap';
import { Tile, Tileset } from './lib/DS/Tileset';
import { GridNode } from './lib/DS/Graph';

import astar from './lib/pathfinding/astar';

import Drawer from './lib/graphics/Drawer';
import { loadImage } from './lib/graphics/images';
import TilemapImage from './lib/graphics/TilemapImage';
import TileImage from './lib/graphics/TileImage';

import PathWalker from './lib/Agents/PathWalker';

import heuristics from './utils/heuristics';
import draw from './utils/drawings';
import graphfromtilemap from './utils/converter';

import mapimage from './assets/room.png';
import paletteimg from './assets/palette.png';
import tiles from './assets/123.png';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const coord = document.querySelector("p");

const drawer = Drawer.drawer(ctx);

const dirt = new Tile([10, 14]);
const grass = new Tile([12, 14]);
const water = new Tile([15, 21]);

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

    const graph = graphfromtilemap(map, true, true, false, [10, 14]);

    canvas.setAttribute("width",  `${tile * mapImage.width }`);
    canvas.setAttribute("height", `${tile * mapImage.height}`);

    drawer.tilemap(
        map,
        imageSet.list().map(item => ctx.createPattern(item, "repeat")),
        draw.grid(ctx, tile, ctx.createPattern(imageTileset.tile(0, 0, tile, tile), "repeat"))
    );

    const clean = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let pathclean = clean;

    let start = graph.node(0, 0);

    const walk = new PathWalker(start);

    let goal = graph.node(10, 10);

    let path = astar(start, goal, heuristics.euclidean(tile));

    walk.path = path as Map<GridNode, GridNode>;

    canvas.addEventListener("mousemove", e => {
        ctx.putImageData(clean, 0, 0);

        const start = graph.node(walk.current.x, walk.current.y);

        const goal = graph.node(Math.floor((e.offsetX - 8) / tile), Math.floor((e.offsetY - 8) / tile));

        let apath = astar(start, goal, heuristics.euclidean(tile));

        drawer.path(apath, start, ctx.createPattern(imageTileset.tile(2, 4, 16, 16), "repeat"), tile);

        pathclean = ctx.getImageData(0, 0, canvas.width, canvas.height);

        ctx.drawImage(imageTileset.tile(4, 0, tile, tile), walk.current.x * tile, walk.current.y * tile);

        coord.innerHTML = `mouse x: ${goal.x} - mouse y: ${goal.y}`;
    });

    canvas.addEventListener("click", e => {
        ctx.putImageData(clean, 0, 0);

        const goal = graph.node(Math.floor((e.offsetX - 8) / tile), Math.floor((e.offsetY - 8) / tile));

        const start = graph.node(walk.current.x, walk.current.y);

        walk.current = start;

        let path = astar(start, goal, heuristics.euclidean(tile));

        walk.path = path as Map<GridNode, GridNode>;

        drawer.path(path, start, ctx.createPattern(imageTileset.tile(2, 4, 16, 16), "repeat"), tile);

        pathclean = ctx.getImageData(0, 0, canvas.width, canvas.height);
    });

    setInterval(() => {
        ctx.putImageData(pathclean, 0, 0);

        let current = walk.walk();

        ctx.drawImage(imageTileset.tile(4, 0, tile, tile), current.x * tile, current.y * tile);
    }, 100);
});