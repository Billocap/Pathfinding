import { GraphNode } from './lib/DS/Graph';
import Tilemap from './lib/DS/Tilemap';
import { Tile, Tileset } from './lib/DS/Tileset';

import astar from './lib/pathfinding/astar';
import dijkstra from './lib/pathfinding/dijkstra';
import gbfs from './lib/pathfinding/gbfs';
import bfs from './lib/pathfinding/bfs';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const dirt = new Tile([10, 14]);
const grass = new Tile([20, 28]);
const bush = new Tile([30, 42]);

const set = new Tileset();
set.insert(dirt);
set.insert(grass);
set.insert(bush);

const map = new Tilemap(set, 15, 15);

map.map = [
     0,  0, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
     0,  0, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
     0,  0, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1,
     0,  0, -1,  1,  1,  1,  1,  2,  2,  2,  2,  2, -1,  0,  0,
     0,  0, -1,  1,  1,  1,  2,  2,  2,  2,  2,  1, -1,  0,  0,
     0,  0, -1,  1,  1,  1,  2,  2,  2,  2,  1,  1, -1,  0,  0,
     0,  0,  0,  1,  1,  1,  2,  2,  2,  2,  1,  1, -1,  0,  0,
     0,  0,  0,  1,  1,  2,  2,  2,  2,  1,  1,  1,  0,  0,  0,
     0,  0, -1,  1,  1,  2,  2,  2,  2,  1,  1,  1,  0,  0,  0,
     0,  0, -1,  1,  2,  2,  2,  2,  1,  1,  1,  1, -1,  0,  0,
     0,  0, -1,  2,  2,  2,  2,  2,  1,  1,  1,  1, -1,  0,  0,
     0,  0, -1,  2,  2,  2,  2,  2,  1,  1,  1,  1, -1,  0,  0,
    -1, -1, -1, -1,  0,  0, -1, -1, -1,  0,  0, -1, -1,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,  0,  0,
];

const graph = map.grid(true, true, true, [10, 14]);

const tile = 30;
const size = 15;

canvas.setAttribute("width",  `${tile * size}`);
canvas.setAttribute("height", `${tile * size}`);

for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
        if (map.tile(x, y) == 2) {
            ctx.strokeStyle = "crimson";
        } else if (map.tile(x, y) == 1) {
            ctx.strokeStyle = "green";
        } else {
            ctx.strokeStyle = "brown";
        }

        if (map.tile(x, y) != -1) {
            ctx.strokeRect(x * tile + 2, y * tile + 2, tile - 4, tile - 4);
        }
    }
}

const clean = ctx.getImageData(0, 0, canvas.width, canvas.height);

const start = graph.node(0,0);

function drawpath(path: Map<GraphNode, GraphNode>, current: GraphNode) {
    const from = path.get(current);

    ctx.fillStyle = "crimson";

    if (from) {
        if (from.x == current.x) {
            if (from.y > current.y) {
                ctx.fillText("↓", current.x * tile + 8, current.y * tile + 14);
            } else {
                ctx.fillText("↑", current.x * tile + 8, current.y * tile + 14);
            }
        } else {
            if (from.x > current.x) {
                ctx.fillText("→", current.x * tile + 8, current.y * tile + 14);
            } else {
                ctx.fillText("←", current.x * tile + 8, current.y * tile + 14);
            }
        }
    } else if (current) {
        ctx.fillText("O", current.x * tile + 8, current.y * tile + 14);
    }
}

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

    const goal = graph.node(Math.floor((e.offsetX-8)/tile), Math.floor((e.offsetY-8)/tile));

    let patha = astar(start, goal, manhattam);
    let pathb = dijkstra(start, goal);
    let pathc = gbfs(start, goal, manhattam);
    let pathd = bfs(start, goal);

    let current = goal;

    while(current) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.fillRect(current.x * tile, current.y * tile, tile, tile);

        current = patha.get(current);
    }

    current = goal;

    while(current) {
        ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
        ctx.fillRect(current.x * tile, current.y * tile, tile, tile);

        current = pathb.get(current);
    }

    current = goal;

    while(current) {
        ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
        ctx.fillRect(current.x * tile, current.y * tile, tile, tile);

        current = pathc.get(current);
    }

    current = goal;

    while(current) {
        ctx.fillStyle = "rgba(128, 0, 255, 0.5)";
        ctx.fillRect(current.x * tile, current.y * tile, tile, tile);

        current = pathd.get(current);
    }
});