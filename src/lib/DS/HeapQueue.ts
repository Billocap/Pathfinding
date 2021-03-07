class HeapNode<Type> {
    public left: HeapNode<Type>;
    public right: HeapNode<Type>;
    public parent: HeapNode<Type>;

    public data: Type;
    public priority: number;

    constructor(data: Type, priority: number = 0, parent: HeapNode<Type> = null) {
        this.data = data;
        this.priority = priority;
        this.parent = parent;

        this.left = null;
        this.right = null;
    }
}

class HeapQueue<Type> {
    private root: HeapNode<Type>;

    public length: number = 0;

    enqueue(data: Type, priority: number = 0) {
        if (this.length == 0) {
            this.root = new HeapNode(data, priority);
        } else {
            if (this.length % 2) {
                const parent = this.count((this.length - 1) / 2);

                parent.left = new HeapNode(data, priority, parent);

                this.heapfy(parent.left);
            } else {
                const parent = this.count((this.length - 2) / 2);

                parent.right = new HeapNode(data, priority, parent);

                this.heapfy(parent.right);
            }
        }

        this.length++;
    }

    dequeue() {
        if (this.length == 0) return null;

        const pop = this.root.data;

        if (this.length == 1) {
            this.root = null;

            this.length--;

            return pop;
        }

        const last = this.count(this.length - 1);

        if (last.parent.left === last) {
            last.parent.left = null;
        } else {
            last.parent.right = null;
        }

        this.root.data = last.data;
        this.root.priority = last.priority;

        let current = this.root;
        let min = current.left;

        if (current.right && current.left.priority > current.right.priority) {
            min = current.right;
        }

        while(min && current.priority > min.priority) {
            this.swap(current, min);

            current = min;

            min = current.left;

            if (current.right && current.left.priority > current.right.priority) {
                min = current.right;
            }
        }

        this.length--;

        return pop;
    }

    preorder(node: HeapNode<Type> = this.root, role: string) {
        if (!node) return;

        this.preorder(node.left, "left");

        console.log(role, node);

        this.preorder(node.right, "right");
    }

    print() {
        this.preorder(this.root, "root");
    }

    private count(to: number): HeapNode<Type> {
        const frontier = [this.root];
        
        let n = 0;
        let current = null;

        while (n <= to) {
            current = frontier.pop();

            if (current) {
                frontier.unshift(current.left);
                frontier.unshift(current.right);
            }

            n++;
        }

        return current;
    }

    private heapfy(node: HeapNode<Type>) {
        let current = node;

        while (current.parent && current.priority <= current.parent.priority) {
            this.swap(current, current.parent);

            current = current.parent;
        }
    }

    private swap(from: HeapNode<Type>, to: HeapNode<Type>) {
        const data = from.data;
        const priority = from.priority;

        from.data = to.data;
        from.priority = to.priority;

        to.data = data;
        to.priority = priority;
    }
}

export default HeapQueue;