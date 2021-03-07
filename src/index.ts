import dijkstra from './lib/pathfinding/dijkstra';
import { GraphNode } from './lib/DS/Graph';
import Tilemap from './lib/DS/Tilemap';
import { Tile, Tileset } from './lib/DS/Tileset';

import astar from './lib/pathfinding/astar';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const dirt = new Tile<number>(10);
const grass = new Tile<number>(20);
const bush = new Tile<number>(30);

const set = new Tileset();
set.insert(dirt, 0);
set.insert(grass, 1);
set.insert(bush, 2);

const map = new Tilemap(set, 15, 15);

map.map = [
     0,  0, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
     0,  0, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
     0,  0, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
     0,  0, -1,  1,  1,  1,  1,  2,  2,  2,  2,  2, -1,  0,  0,
     0,  0, -1,  1,  1,  1,  2,  2,  2,  2,  2,  1, -1,  0,  0,
     0,  0, -1,  1,  1,  1,  2,  2,  2,  2,  1,  1, -1,  0,  0,
     0,  0,  0,  1,  1,  1,  2,  2,  2,  2,  1,  1, -1,  0,  0,
     0,  0,  0,  1,  1,  2,  2,  2,  2,  1,  1,  1,  1,  0,  0,
     0,  0, -1,  1,  1,  2,  2,  2,  2,  1,  1,  1,  1,  0,  0,
     0,  0, -1,  1,  2,  2,  2,  2,  1,  1,  1,  1, -1,  0,  0,
     0,  0, -1,  2,  2,  2,  2,  2,  1,  1,  1,  1, -1,  0,  0,
     0,  0, -1,  2,  2,  2,  2,  2,  1,  1,  1,  1, -1,  0,  0,
    -1, -1, -1,  0,  0, -1, -1, -1, -1,  0,  0, -1, -1,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1,  0,  0,
];

const graph = map.grid();

const tile = 20;
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
    const a = goal.x - next.y;
    const b = goal.y - next.y;

    return Math.round(Math.sqrt(a * a + b * b));
}

function weighted_manhattam(goal: GraphNode, next: GraphNode) {
    const x_dif = goal.x - next.x;
    const y_dif = goal.y - next.y;

    let x_dis = 0;
    let y_dis = 0;

    for (let x = 0; x < Math.abs(x_dif); x++) {
        if (x_dif > 0) {
            const node = graph.node(next.x + x, next.y);

            if (node && node.neighbor("right")[0]) {
                x_dis += node.neighbor("right")[1];
            } else {
                x_dis += 10;
            }
        } else {
            const node = graph.node(next.x - x, next.y);

            if (node && node.neighbor("left")[0]) {
                x_dis += node.neighbor("left")[1];
            } else {
                x_dis += 10;
            }
        }
    }

    for (let y = 0; y < Math.abs(y_dif); y++) {
        if (y_dif > 0) {
            const node = graph.node(next.x, next.y + y);

            if (node && node.neighbor("bottom")[0]) {
                y_dis += node.neighbor("bottom")[1];
            } else {
                y_dis += 10;
            }
        } else {
            const node = graph.node(next.x, next.y - y);

            if (node && node.neighbor("top")[0]) {
                y_dis += node.neighbor("top")[1];
            } else {
                y_dis += 10;
            }
        }
    }

    return x_dis + y_dis;
}

canvas.addEventListener("mousemove", e => {
    ctx.putImageData(clean, 0, 0);

    const goal = graph.node(Math.floor((e.offsetX-8)/tile), Math.floor((e.offsetY-8)/tile));

    let path = astar(start, goal, manhattam);
    //let path = dijkstra(start, goal);

    let current = goal;

    while(current) {
        ctx.fillStyle = "crimson";
        ctx.fillRect(current.x * tile, current.y * tile, tile, tile);

        current = path.get(current);
    }
});