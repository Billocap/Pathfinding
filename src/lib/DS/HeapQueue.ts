// Just a simple Heap Node.
class HeapNode<Type> implements HeapQueue.Node<Type> {
    public left: HeapNode<Type>;
    public right: HeapNode<Type>;
    // The parent node can be omitted with nedded.
    public parent: HeapNode<Type>;

    public data: Type;
    // Must have since this is a Heap Priority Queue Node.
    public priority: number;

    constructor(data: Type, priority: number = 0, parent: HeapNode<Type> = null) {
        this.data = data;
        this.priority = priority;
        this.parent = parent;

        this.left = null;
        this.right = null;
    }
}

// The heap it self, this is a Minimum Heap Queue.
class HeapQueue<Type> implements HeapQueue.HeapQueue<Type> {
    private root: HeapNode<Type>; // Must have;

    public length: number = 0;

    enqueue(data: Type, priority: number = 0) {
        if (this.length == 0) {
            // If the queue is empty adds a new node.
            this.root = new HeapNode(data, priority);
        } else {
            // If not ...
            // This implementation is based on the array 
            // method for implementing a Heap.
            if (this.length % 2) {
                // If the lenght of Heap is odd the new node is on the left
                // of the last heap node.
                // The formula for the index of the parent node of a left node is :
                // (n - 1) / 2 -> Where n is the size of the Array.
                const parent = this.count((this.length - 1) / 2);

                // Connects the new node to it's parent.
                parent.left = new HeapNode(data, priority, parent);

                // And minheapfy the queue.
                this.heapfy(parent.left);
            } else {
                // If the lenght of Heap is even the new node is on the right
                // of the last heap node.
                // The formula for the index of the parent node of a right node is :
                // (n - 2) / 2 -> Where n is the size of the Array.
                const parent = this.count((this.length - 2) / 2);

                // Connects the new node to it's parent.
                parent.right = new HeapNode(data, priority, parent);

                // And minheapfy the queue.
                this.heapfy(parent.right);
            }
        }

        // And don't forget to update the size.
        this.length++;
    }

    dequeue() {
        // if queue is empty there's nothing to return.
        if (this.length == 0) return null;

        // The thing to return if the queue isn't empty.
        const pop = this.root.data;

        // Safety measures.
        if (this.length == 1) {
            this.root = null;

            this.length--;

            return pop;
        }

        // Gets the last element on the queue;
        const last = this.count(this.length - 1);

        // Removes it from the queue.
        if (last.parent.left === last) {
            last.parent.left = null;
        } else {
            last.parent.right = null;
        }

        // Moves he last element to the top of the Queue.
        this.root.data = last.data;
        this.root.priority = last.priority;

        // Heapfy downwards change all the (>) to a (<) for a max heap.
        let current = this.root;

        // Gets the minimum child node.
        let min = current.left;

        if (current.right && current.left.priority > current.right.priority) {
            min = current.right;
        }
        //******************************************

        while(min && current.priority > min.priority) {
            this.swap(current, min);

            current = min;

            // Gets the minimum child node.
            min = current.left;

            if (current.right && current.left.priority > current.right.priority) {
                min = current.right;
            }
            //******************************************
        }

        // Don't forget to update the size.
        this.length--;

        // And also to return de value.
        return pop;
    }

    // Since my implementation is based on a array but I'm not using one for
    // storing the nodes, this function does the job of finding the element
    // that would be in the specified index.
    // This method is a simple floodfill throught the heap.
    private count(to: number): HeapNode<Type> {
        // Starts the frontier.
        // Must be a simple Queue.
        const frontier = [this.root];
        
        // Controll variables.
        let n = 0;
        let current = null;

        // If isn't the index I want.
        while (n <= to) {
            // Removes the last element from the queue.
            current = frontier.pop();

            // And add it's childs.
            if (current) {
                // The order matters.
                frontier.unshift(current.left);
                frontier.unshift(current.right);
            }

            // Increase n by 1.
            n++;
        }

        // If n is the index a want just return the current element.
        return current;
    }

    // This is hardcoded as a minheap, for the sake of path finding.
    private heapfy(node: HeapNode<Type>) {
        let current = node;

        // Where the magic happens.
        // Change the (<=) to (>=) for a max heap.
        while (current.parent && current.priority <= current.parent.priority) {
            this.swap(current, current.parent);

            current = current.parent;
        }
    }

    // This is a very commom operation on a heap, so to 
    // avoid flooding the code with the same step over and over
    // I recommend putting it on a separated method.
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