import Graph, { GraphNode } from './lib/Graph';
import floodfill from './lib/floodfill';
import astar from './lib/astar';
import dijkstra from './lib/dijkstra';
import bfs from './lib/bfs';
import gbfs from './lib/gbfs';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const graph = new Graph();

const tile = 20;
const size = 15;

canvas.setAttribute("width",  `${tile * size}`);
canvas.setAttribute("height", `${tile * size}`);

for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
        if (
            !((x >=0 && x<=12) && y==2) && !(x==12 && (y >=2 && y<=6)) && 
            !((x >=2 && x<=12) && y==12) && !(x==2 && (y >=7 && y<=12))) {
            graph.add(x, y);

            if ((x>=2 && x<=12) && (y>=2 && y<=12)) {
                graph.link(graph.node(x, y), graph.node(x-1, y), tile + 5);
                graph.link(graph.node(x, y), graph.node(x, y-1), tile + 5);
            } else {
                graph.link(graph.node(x, y), graph.node(x-1, y), tile);
                graph.link(graph.node(x, y), graph.node(x, y-1), tile);
            }

            //graph.link(graph.node(x, y), graph.node(x-1, y-1), tile + (4 * tile / 10));
            //graph.link(graph.node(x, y), graph.node(x+1, y-1), tile + (4 * tile / 10));

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
    return Math.abs((goal.x - next.x) * tile) + Math.abs((goal.y - next.y) * tile);
}

canvas.addEventListener("mousemove", e => {
    ctx.putImageData(clean, 0, 0);

    const goal = graph.node(Math.floor((e.offsetX - 8)/tile), Math.floor((e.offsetY-8)/tile));

    let path = astar(start, goal, manhattam);

    let current = goal;

    while(current) {
        ctx.fillStyle = "crimson";
        ctx.fillRect(current.x * tile, current.y * tile, tile, tile);

        current = path.get(current);
    }
});