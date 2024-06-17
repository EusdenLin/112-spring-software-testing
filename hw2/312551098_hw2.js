/*
 * A BoundedQueue is a mutable, bounded FIFO data structure
 * of fixed size, with size being set in the constructor
 * A typical Queue is [], [o1], or [o1, o2], where neither o1 nor o2
 * are ever null. Older elements are listed before newer ones.
 */
const assert = require('assert');
const { describe, it } = require('node:test');

class BoundedQueue {
    constructor(capacity) {
        if (capacity < 0) {
            throw new RangeError("capacity is less than 0");
        }
        this.capacity = capacity;
        this.elements = [];
        this.size = 0;
        this.front = 0;
        this.back = 0;
    }

    enqueue(element) {
        if (typeof element !== "number" || isNaN(element)) {
            throw new RangeError("element is invalid");
        }
        else if (this.is_full()) {
            throw new Error("queue is full");
        }
        this.size++;
        this.elements[this.back] = element;
        this.back = (this.back + 1) % this.capacity;
    }

    dequeue() {
        if (this.is_empty()) {
            throw new Error("queue is empty");
        }
        this.size--;
        let o = this.elements[this.front];
        this.elements[this.front] = null;
        this.front = (this.front + 1) % this.capacity;
        return o;
    }

    is_empty() {
        return this.size === 0;
    }

    is_full() {
        return this.size === this.capacity;
    }

    toString() {
        let result = "[";
        for (let i = 0; i < this.size; i++) {
            result += this.elements[(this.front + i) % this.capacity];
            if (i < this.size - 1) {
                result += ", ";
            }
        }
        result += "] ";
        result += "is_empty(): " + this.is_empty() + ", is_full(): " + this.is_full();
        return result;
    }
}

// test 1 
describe('BoundedQueue', () => {
    it('BoundedQueue constructor T', async () => {
        let bq = new BoundedQueue(10);
        assert.strictEqual(bq.toString(), "[] is_empty(): true, is_full(): false");
    });

    it('BoundedQueue constructor F', async() => {
        try {
            let bq = new BoundedQueue(-1);
        }
        catch (e) {
            assert.strictEqual(e.message, "capacity is less than 0");
        }
    });
});

//test 2
describe('enqueue', () => {
    it('enqueue TTTF', async () => {
        let bq = new BoundedQueue(10);
        bq.enqueue(1);
        bq.enqueue(2);
        console.log(bq.toString());
        assert.strictEqual(bq.toString(), "[1, 2] is_empty(): false, is_full(): false");
    });

    it('enqueue TFTF', async() => {
        let bq = new BoundedQueue(2);
        try {
            bq.enqueue("a");
        }
        catch (e) {
            assert.strictEqual(e.message, "element is invalid");
        }
    });

    it('enqueue TTFF', async() => {
        let bq = new BoundedQueue(2);
        try {
            bq.enqueue(NaN);
        }
        catch (e) {
            assert.strictEqual(e.message, "element is invalid");
        }
    });

    it('enqueue TTTT', async() => {
        let bq = new BoundedQueue(2);
        bq.enqueue(1);
        bq.enqueue(2);
        try {
            bq.enqueue(3);
        }
        catch (e) {
            assert.strictEqual(e.message, "queue is full");
        }
    });
});

//test 3
describe('dequeue', () => {
    it('dequeue TTF', async () => {
        let bq = new BoundedQueue(10);
        bq.enqueue(1);
        bq.enqueue(2);
        assert.strictEqual(bq.dequeue(), 1);
    });

    it('dequeue TTT', async() => {
        let bq = new BoundedQueue(2);
        try {
            bq.dequeue();
        }
        catch (e) {
            assert.strictEqual(e.message, "queue is empty");
        }
    });
});

//test 4

describe('is_empty', () => {
    it('is_empty TT', async () => {
        let bq = new BoundedQueue(10);
        assert.strictEqual(bq.is_empty(), true);
    });

    it('is_empty TF', async() => {
        let bq = new BoundedQueue(2);
        bq.enqueue(1);
        assert.strictEqual(bq.is_empty(), false);
    });
});

//test 5
describe('is_full', () => {
    it('is_full TT', async () => {
        let bq = new BoundedQueue(2);
        bq.enqueue(1);
        bq.enqueue(2);
        assert.strictEqual(bq.is_full(), true);
    });

    it('is_full TF', async() => {
        let bq = new BoundedQueue(2);
        assert.strictEqual(bq.is_full(), false);
    });
});
