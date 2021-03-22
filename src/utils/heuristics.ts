import { GridNode } from "../lib/DS/Graph";

const heuristics = {
    manhattam(size: number) {
        return function (goal: Network.Node, next: Network.Node) {
            if (goal instanceof GridNode && next instanceof GridNode) {
                return (Math.abs(goal.x - next.x) + Math.abs(goal.y - next.y)) * size;
            }
        };
    },
    euclidean(size: number) {
        return function (goal: Network.Node, next: Network.Node) {
            if (goal instanceof GridNode && next instanceof GridNode) {
                const a = goal.x - next.x;
                const b = goal.y - next.y;

                return Math.round(Math.sqrt(a * a + b * b) * size);
            }
        };
    }
}

export default heuristics;