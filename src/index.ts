import { GraphNode } from './lib/DS/Graph';
import Tilemap from './lib/DS/Tilemap';
import { Tile, Tileset } from './lib/DS/Tileset';

import astar from './lib/pathfinding/astar';
import dijkstra from './lib/pathfinding/dijkstra';
import gbfs from './lib/pathfinding/gbfs';
import bfs from './lib/pathfinding/bfs';
import Drawer from './lib/graphics/Drawer';

import image from './assets/wall_test.png';
import { mapfromimage, datafromsource } from './lib/graphics/images';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const drawer = Drawer.drawer(ctx);

const dirt = new Tile([10, 14]);
const grass = new Tile([20, 28]);
const bush = new Tile([30, 42]);

const set = new Tileset();
set.insert(dirt);
set.insert(grass);
set.insert(bush);

const map = new Tilemap(set, 16, 16);

const mapImage = new Image(16, 16);
mapImage.src = image;

mapImage.onload = () => {
    const [mapdata, palette] = mapfromimage(datafromsource(mapImage));

    map.map = mapdata;

    const graph = map.grid(false, true, true, [10, 14]);

    const tile = 30;
    const size = 16;

    canvas.setAttribute("width", `${tile * size}`);
    canvas.setAttribute("height", `${tile * size}`);

    function grid(x: number, y: number, color: string) {
        ctx.fillStyle = color;

        ctx.fillRect(x * tile + 1, y * tile + 1, tile - 2, tile - 2);
    }

    function small(x: number, y: number, color: string) {
        ctx.fillStyle = color;

        ctx.fillRect(x * tile + 8, y * tile + 8, tile - 16, tile - 16);
    }

    function stroke(x: number, y: number, color: string) {
        ctx.strokeStyle = color;

        ctx.strokeRect(x * tile + 2, y * tile + 2, tile - 4, tile - 4);
    }

    drawer.tilemap(map, palette, small);

    const clean = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const start = graph.node(0, 0);

    function manhattam(goal: GraphNode, next: GraphNode) {
        return (Math.abs(goal.x - next.x) + Math.abs(goal.y - next.y)) * tile;
    }

    function euclidean(goal: GraphNode, next: GraphNode) {
        const a = goal.x - next.x;
        const b = goal.y - next.y;

        return Math.round(Math.sqrt(a * a + b * b) * tile);
    }

    canvas.addEventListener("mousemove", e => {
        ctx.putImageData(clean, 0, 0);

        const goal = graph.node(Math.floor((e.offsetX - 8) / tile), Math.floor((e.offsetY - 8) / tile));

        let patha = astar(start, goal, manhattam);
        let pathb = dijkstra(start, goal);
        let pathc = gbfs(start, goal, manhattam);
        let pathd = bfs(start, goal);

        drawer.path(patha, goal, "rgb(255,   0,   0)", tile);
        // drawer.path(pathb, goal, "rgb(  0, 255,   0)", tile);
        // drawer.path(pathc, goal, "rgb(  0,   0, 255)", tile);
        // drawer.path(pathd, goal, "rgb(128,   0, 255)", tile);
    });
};