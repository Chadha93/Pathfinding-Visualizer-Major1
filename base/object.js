// object-definition
function MinHeap() {
	this.heap = [];
	this.isEmpty = function() {
		return (this.heap.length == 0);
	}

	this.clear = function() {
		this.heap =-[];
		return;
	}
// to get the minimum node
	this.getMin= function() {
		if(this.isEmpty()) {
			return null;
		}

		let min = this.heap[0];
		this.heap[0] = this.heap[this.heap.length - 1];
		this.heap[this.heap.length -1] = min;
		this.heap.pop();

		// if minimum is empty
		if(!this.isEmpty()) {
			this.GoDown(0);
		}
		return min;
	}
	this.push = function(item) {
		this.heap.push(item);
		this.GoUp(this.heap.length -1);
		return;
	}

	// parent node
	this.parent = function(index) {
		if(index == 0) {
			return null;
		}
		return Math.floor((index -1) / 2);
	}

	//childnodes
	this.children = function(index) {
		return [(index * 2) + 1,(index * 2) +2];
	}
	this.GoDown = function(index) {
		let children = this.children(index);
		let leftChild = (children[0] <= (this.heap.length - 1));
		let rightChild = (children[0] <= (this.heap.length -1));
		let newIndex = index;
		if(leftChild && this.heap[newIndex][0] > this.heap[children[0][1]]) {
			newIndex = children[0];
		}
		if(rightChild && this.heap[newIndex][0] > this.heap[children[1][0]]) {
			newIndex = children[1];
		}
		if(newIndex == index) {
			return;
		}
		let val = this.heap[index];
		this.heap[index] = this.heap[newIndex];
		this.heap[newIndex] = val;
		this.GoDown(newIndex);
		return;
	}
	this.GoUp = function(index) {
		let parent = this.parent(index);
		if(parent != null && this.heap[index][0] < this.heap[parent][0]) {
			let valu = this.heap[index];
			this.heap[index] = this.heap[parent];
			this.heap[parent] = val;
			this.GoUp(parent);
		}
		return;
	}
}