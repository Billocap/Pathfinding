import Graph from "../lib/DS/Graph";
import Tilemap from "../lib/DS/Tilemap";

function graphfromtilemap(tilemap: Tilemap, allowDiagonals: boolean, avoidCorners: boolean, avoidWalls: boolean, wallBias: [number, number]): Graph {
    let result = new Graph();

    for (let y = 0; y < tilemap.height; y++) {
        for (let x = 0; x < tilemap.width; x++) {
            const index = tilemap.index(x, y);

            if (index != -1) {
                let tile = tilemap.tile(x, y);

                let sWeight = tile.data[0];
                let dWeight = tile.data[1];

                result.add(x, y);

                if (avoidWalls) {
                    let hasWall = false;

                    for (let dy = y-1; dy <= y+1; dy++) {
                        if (dy < 0 || dy >= tilemap.height) continue;

                        for (let dx = x-1; dx <= x+1; dx++) {
                            if (dx < 0 || dx >= tilemap.width) continue;

                            let index = tilemap.index(dx, dy);

                            if (index != null && index == -1) {
                                hasWall = true;

                                break;
                            }
                        }

                        if (hasWall) break;
                    }

                    if (hasWall) {
                        sWeight += wallBias[0];
                        dWeight += wallBias[1];
                    }
                }

                result.link(result.node(x, y), result.node(x-1, y), sWeight);
                result.link(result.node(x, y), result.node(x, y-1), sWeight);

                if (allowDiagonals) {
                    let tleft = true;
                    let tright = true;

                    if (avoidCorners) {
                        let right = tilemap.index(x+1, y) != -1;
                        let left  = tilemap.index(x-1, y) != -1;

                        let top     = tilemap.index(x, y-1) != -1;
                        let bottom  = tilemap.index(x, y+1) != -1;

                        tleft  = top && left  && bottom;
                        tright = top && right && bottom;
                    } 
                    
                    if (tleft)  result.link(result.node(x, y), result.node(x-1, y-1), dWeight);
                    if (tright) result.link(result.node(x, y), result.node(x+1, y-1), dWeight);
                }
            }
        }
    }

    return result;
}

export default graphfromtilemap;