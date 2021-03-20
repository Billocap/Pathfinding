/**
 * Decalres a general interface for both 
 * normal queues and priority queues.
 */
 declare interface Queue<Type> {
    /**
     * The size of the queue.
     */
    length: number;
    /**
     * Adds an element to the queue, work for both types of queue.
     * @param data The data to be enqueue.
     * @param priority The priority of the element, if implementing a priority queue.
     */
    enqueue(data: Type, priority?: number): void;
    /**
     * Returns the data in the top most element of the queue for normal queues,
     * and the element with the lowest or highest priority for priority queues.
     * @returns The data of the node.
     */
    dequeue(): Type;
}

/**
 * Defines the overall structure of a Heap Priority Queue.
 */
declare namespace HeapQueue {
    /**
     * Defines the basic structure of Heap Priority Queue Node.
     */
    interface Node<Type> {
        /**
         * The left child of the node.
         */
        left: HeapQueue.Node<Type>; // Must have.
        /**
         * The right child of the node.
         */
        right: HeapQueue.Node<Type>; // Must have.
        /**
         * The parent of the node.
         */
        parent?: HeapQueue.Node<Type>; // Can help with the implementation.

        /**
         * The data of the node.
         */
        data: Type;
        /**
         * The priority of the node.
         */
        priority: number;
    }

    interface HeapQueue<Type> extends Queue<Type> {
        /**
         * Adds an element to the queue.
         * @param data The data to be enqueue.
         * @param priority The priority of the element.
         */
        enqueue(data: Type, priority?: number): void;
        /**
         * Returns the element with the lowest or highest priority.
         * @returns The data of the node.
         */
        dequeue(): Type;
    }
}