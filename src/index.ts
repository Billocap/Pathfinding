import Tilemap from './lib/DS/Tilemap';
import { Tile, Tileset } from './lib/DS/Tileset';
import { GridNode } from './lib/DS/Graph';

import astar from './lib/pathfinding/astar';

import Drawer from './lib/graphics/Drawer';
import { loadImage } from './lib/graphics/images';
import TilemapImage from './lib/graphics/TilemapImage';
import TileImage from './lib/graphics/TileImage';
import Layer from './lib/graphics/Layer';

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

let drawer = Drawer.drawer(ctx);

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

const background = new Layer();
const pathDraw = new Layer();
const mouseCursor = new Layer();
const player = new Layer();

background.link(pathDraw);
pathDraw.link(mouseCursor);
mouseCursor.link(player);

const tile = 16;

const MOUSE = {
    x: 0,
    y: 0,
    button: false
};

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

    background.drawSteps( ctx => {
        drawer.tilemap(
            map,
            imageSet.list().map(item => ctx.createPattern(item, "repeat")),
            draw.grid(ctx, tile, ctx.createPattern(imageTileset.tile(0, 0, tile, tile), "repeat"))
        )
    });

    let start = graph.node(0, 0);

    const walk = new PathWalker(start);

    let goal = graph.node(10, 10);

    let path = astar(start, goal, heuristics.euclidean(tile));

    walk.path = path as Map<GridNode, GridNode>;

    canvas.addEventListener("mousemove", e => {
        MOUSE.x = e.offsetX;
        MOUSE.y = e.offsetY;
    });

    canvas.addEventListener("click", e => {
        MOUSE.button = true;
    });

    let DTIME = 0;

    function mainLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const goal = graph.node(Math.floor((MOUSE.x - 4) / tile), Math.floor((MOUSE.y - 4) / tile));

        if (goal) coord.innerHTML = `mouse x: ${goal.x} - mouse y: ${goal.y}`;

        mouseCursor.drawSteps(ctx => {
            if (goal) ctx.drawImage(imageTileset.tile(11, 1, 16, 16), goal.x * tile, goal.y * tile);
        });

        if (MOUSE.button) {
            const start = graph.node(walk.current.x, walk.current.y);

            walk.current = start;

            let path = astar(start, goal, heuristics.euclidean(tile));

            walk.path = path as Map<GridNode, GridNode>;

            pathDraw.drawSteps(ctx => {
                drawer.path(path, start, goal, ctx.createPattern(imageTileset.tile(2, 4, tile, tile), "repeat"), tile);

                ctx.fillStyle = ctx.createPattern(imageTileset.tile(3, 3, tile, tile), "repeat");

                ctx.fillRect(start.x * tile, start.y * tile, tile, tile);

                ctx.fillStyle = ctx.createPattern(imageTileset.tile(3, 4, tile, tile), "repeat");

                ctx.fillRect(goal.x * tile, goal.y * tile, tile, tile);
            });
        }

        if (DTIME % 5 == 0) {
            let current = walk.walk();

            player.drawSteps(ctx => {
                ctx.drawImage(imageTileset.tile(4, 0, tile, tile), current.x * tile, current.y * tile);
            });
        }

        background.draw(ctx);

        DTIME += 1;

        MOUSE.button = false;

        requestAnimationFrame(mainLoop);
    }

    requestAnimationFrame(mainLoop);
});