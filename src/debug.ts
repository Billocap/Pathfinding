import Graph from './lib/DS/Graph';

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

            graph.link(graph.node(x, y), graph.node(x-1, y), 1);
            graph.link(graph.node(x, y), graph.node(x, y-1), 1);

            graph.link(graph.node(x, y), graph.node(x-1, y-1), 1.4);
            graph.link(graph.node(x, y), graph.node(x+1, y-1), 1.4);

            ctx.strokeRect(x * tile + 2, y * tile + 2, tile - 4, tile - 4);
        }
    }
}

const clean = ctx.getImageData(0, 0, canvas.width, canvas.height);

canvas.addEventListener("mousemove", e => {
    ctx.putImageData(clean, 0, 0);
    
    let current = graph.node(Math.floor(e.offsetX/tile),Math.floor(e.offsetY/tile));
    let n = 0;

    while(current) {
        ctx.fillStyle = `hsl(180, 50%, ${n * 100 / size}%)`;

        ctx.fillRect(current.x * tile + 2, current.y * tile + 2, tile - 4, tile - 4);
        
        n++;
        current = current.neighbor("left") ? current.neighbor("left")[0] : null;
    }

    current = graph.node(Math.floor(e.offsetX/tile),Math.floor(e.offsetY/tile));
    n = 0;

    while(current) {
        ctx.fillStyle = `hsl(90, 50%, ${n * 100 / size}%)`;

        ctx.fillRect(current.x * tile + 2, current.y * tile + 2, tile - 4, tile - 4);

        n++;
        current = current.neighbor("top") ? current.neighbor("top")[0] : null;
    }

    current = graph.node(Math.floor(e.offsetX/tile),Math.floor(e.offsetY/tile));
    n = 0;

    while(current) {
        ctx.fillStyle = `hsl(0, 50%, ${n * 100 / size}%)`;

        ctx.fillRect(current.x * tile + 2, current.y * tile + 2, tile - 4, tile - 4);

        n++;
        current = current.neighbor("right") ? current.neighbor("right")[0] : null;
    }

    current = graph.node(Math.floor(e.offsetX/tile),Math.floor(e.offsetY/tile));
    n = 0;

    while(current) {
        ctx.fillStyle = `hsl(270, 50%, ${n * 100 / size}%)`;

        ctx.fillRect(current.x * tile + 2, current.y * tile + 2, tile - 4, tile - 4);

        n++;
        current = current.neighbor("bottom") ? current.neighbor("bottom")[0] : null;
    }

    current = graph.node(Math.floor(e.offsetX/tile),Math.floor(e.offsetY/tile));
    n = 0;

    while(current) {
        ctx.fillStyle = `hsl(135, 50%, ${n * 100 / size}%)`;

        ctx.fillRect(current.x * tile + 2, current.y * tile + 2, tile - 4, tile - 4);

        n++;
        current = current.neighbor("tleft") ? current.neighbor("tleft")[0] : null;
    }

    current = graph.node(Math.floor(e.offsetX/tile),Math.floor(e.offsetY/tile));
    n = 0;

    while(current) {
        ctx.fillStyle = `hsl(45, 50%, ${n * 100 / size}%)`;

        ctx.fillRect(current.x * tile + 2, current.y * tile + 2, tile - 4, tile - 4);

        n++;
        current = current.neighbor("tright") ? current.neighbor("tright")[0] : null;
    }

    current = graph.node(Math.floor(e.offsetX/tile),Math.floor(e.offsetY/tile));
    n = 0;

    while(current) {
        ctx.fillStyle = `hsl(315, 50%, ${n * 100 / size}%)`;

        ctx.fillRect(current.x * tile + 2, current.y * tile + 2, tile - 4, tile - 4);

        n++;
        current = current.neighbor("bright") ? current.neighbor("bright")[0] : null;
    }

    current = graph.node(Math.floor(e.offsetX/tile),Math.floor(e.offsetY/tile));
    n = 0;

    while(current) {
        ctx.fillStyle = `hsl(225, 50%, ${n * 100 / size}%)`;

        ctx.fillRect(current.x * tile + 2, current.y * tile + 2, tile - 4, tile - 4);

        n++;
        current = current.neighbor("bleft") ? current.neighbor("bleft")[0] : null;
    }
    
    const node = graph.node(Math.floor(e.offsetX/tile),Math.floor(e.offsetY/tile));

    n = 0;

    node.neighbors.forEach(([neighbor, _]) => {
        ctx.fillStyle = `hsl(${n * (360 / 8)}, 50%, 50%)`;

        if (neighbor) ctx.fillRect(neighbor.x * tile + 2, neighbor.y * tile + 2, tile - 4, tile - 4);

        n++;
    });
});