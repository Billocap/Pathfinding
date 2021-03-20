import { GridNode } from "../DS/Graph";

class PathWalker {
    private _path: Map<GridNode, GridNode>;
    private _current: GridNode;

    constructor(start: GridNode) {
        this._current = start;
    }

    set current(node: GridNode) {
        this._current = node;
    }

    get current() {
        return this._current;
    }

    set path(path: Map<GridNode, GridNode>) {
        this._path = path;
    }

    walk() {
        const temp = this._current;

        if (this._path.get(this._current)) this._current = this._path.get(this._current);

        return temp;
    }
}

export default PathWalker;