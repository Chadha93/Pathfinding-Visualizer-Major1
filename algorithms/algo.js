// 1. dijkstra's algorithm
function dijkstra() {
	var pathFound = false;
	var myHeap = new MinHeap();
	var prev = createPrev();
	var distances = createDistances();
	var visited = createVisited();
	distances[ startCell[0] ][ startCell[1] ] = 0;
	myHeap.push([0, [startCell[0], startCell[1]]]);
	cellsToAnimate.push([[startCell[0], startCell[1]], "searching"]);
	while (!myHeap.isEmpty()){
		var cell = myHeap.getMin();
		//console.log("Min was just popped from the heap! Heap is now: " + JSON.stringify(myHeap.heap));
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]){ continue; }
		visited[i][j] = true;
		cellsToAnimate.push([[i, j], "visited"]);
		if (i == endCell[0] && j == endCell[1]){
			pathFound = true;
			break;
		}
		var neighbors = getNeighbors(i, j);
		for (var k = 0; k < neighbors.length; k++){
			var m = neighbors[k][0];
			var n = neighbors[k][1];
			if (visited[m][n]){ continue; }
			var newDistance = distances[i][j] + 1;
			if (newDistance < distances[m][n]){
				distances[m][n] = newDistance;
				prev[m][n] = [i, j];
				myHeap.push([newDistance, [m, n]]);
				//console.log("New cell was added to the heap! It has distance = " + newDistance + ". Heap = " + JSON.stringify(myHeap.heap));
				cellsToAnimate.push( [[m, n], "searching"] );
			}
		}
		//console.log("Cell [" + i + ", " + j + "] was just evaluated! myHeap is now: " + JSON.stringify(myHeap.heap));
	}
	//console.log(JSON.stringify(myHeap.heap));
	// Make any nodes still in the heap "visited"
	while ( !myHeap.isEmpty() ){
		var cell = myHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]){ continue; }
		visited[i][j] = true;
		cellsToAnimate.push( [[i, j], "visited"] );
	}
	// If a path was found, illuminate it
	if (pathFound) {
		var i = endCell[0];
		var j = endCell[1];
		cellsToAnimate.push( [endCell, "success"] );
		while (prev[i][j] != null){
			var prevCell = prev[i][j];
			i = prevCell[0];
			j = prevCell[1];
			cellsToAnimate.push( [[i, j], "success"] );
		}
	}
	return pathFound;
}

// 2. BFS algorithm
function BFS(){
	var pathFound = false;
	var myQueue = new Queue();
	var prev = createPrev();
	var visited = createVisited();
	myQueue.enqueue( startCell );
	cellsToAnimate.push(startCell, "searching");
	visited[ startCell[0] ][ startCell[1] ] = true;
	while ( !myQueue.empty() ){
		var cell = myQueue.dequeue();
		var r = cell[0];
		var c = cell[1];
		cellsToAnimate.push( [cell, "visited"] );
		if (r == endCell[0] && c == endCell[1]){
			pathFound = true;
			break;
		}
		// Put neighboring cells in queue
		var neighbors = getNeighbors(r, c);
		for (var k = 0; k < neighbors.length; k++){
			var m = neighbors[k][0];
			var n = neighbors[k][1];
			if ( visited[m][n] ) { continue ;}
			visited[m][n] = true;
			prev[m][n] = [r, c];
			cellsToAnimate.push( [neighbors[k], "searching"] );
			myQueue.enqueue(neighbors[k]);
		}
	}
	// Make any nodes still in the queue "visited"
	while ( !myQueue.empty() ){
		var cell = myQueue.dequeue();
		var r = cell[0];
		var c = cell[1];
		cellsToAnimate.push( [cell, "visited"] );
	}
	// If a path was found, illuminate it
	if (pathFound) {
		var r = endCell[0];
		var c = endCell[1];
		cellsToAnimate.push( [[r, c], "success"] );
		while (prev[r][c] != null){
			var prevCell = prev[r][c];
			r = prevCell[0];
			c = prevCell[1];
			cellsToAnimate.push( [[r, c], "success"] );
		}
	}
	return pathFound;
}

// 3. DFS algorithm
function DFS(i, j, visited){
	if (i == endCell[0] && j == endCell[1]){
		cellsToAnimate.push( [[i, j], "success"] );
		return true;
	}
	visited[i][j] = true;
	cellsToAnimate.push( [[i, j], "searching"] );
	var neighbors = getNeighbors(i, j);
	for(var k = 0; k < neighbors.length; k++){
		var m = neighbors[k][0];
		var n = neighbors[k][1]; 
		if ( !visited[m][n] ){
			var pathFound = DFS(m, n, visited);
			if ( pathFound ){
				cellsToAnimate.push( [[i, j], "success"] );
				return true;
			} 
		}
	}
	cellsToAnimate.push( [[i, j], "visited"] );
	return false;
}

// 4. Astar algorithm
function AStar() {
	var pathFound = false;
	var myHeap = new MinHeap();
	var prev = createPrev();
	var distances = createDistances();
	var costs = createDistances();
	var visited = createVisited();
	distances[ startCell[0] ][ startCell[1] ] = 0;
	costs[ startCell[0] ][ startCell[1] ] = 0;
	myHeap.push([0, [startCell[0], startCell[1]]]);
	cellsToAnimate.push([[startCell[0], startCell[1]], "searching"]);
	while (!myHeap.isEmpty()){
		var cell = myHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]){ continue; }
		visited[i][j] = true;
		cellsToAnimate.push([[i, j], "visited"]);
		if (i == endCell[0] && j == endCell[1]){
			pathFound = true;
			break;
		}
		var neighbors = getNeighbors(i, j);
		for (var k = 0; k < neighbors.length; k++){
			var m = neighbors[k][0];
			var n = neighbors[k][1];
			if (visited[m][n]){ continue; }
			var newDistance = distances[i][j] + 1;
			if (newDistance < distances[m][n]){
				distances[m][n] = newDistance;
				prev[m][n] = [i, j];
				cellsToAnimate.push( [[m, n], "searching"] );
			}
			var newCost = distances[i][j] + Math.abs(endCell[0] - m) + Math.abs(endCell[1] - n);
			if (newCost < costs[m][n]){
				costs[m][n] = newCost;
				myHeap.push([newCost, [m, n]]);
			}
		}
	}
	// Make any nodes still in the heap "visited"
	while ( !myHeap.isEmpty() ){
		var cell = myHeap.getMin();
		var i = cell[1][0];
		var j = cell[1][1];
		if (visited[i][j]){ continue; }
		visited[i][j] = true;
		cellsToAnimate.push( [[i, j], "visited"] );
	}
	// If a path was found, illuminate it
	if (pathFound) {
		var i = endCell[0];
		var j = endCell[1];
		cellsToAnimate.push( [endCell, "success"] );
		while (prev[i][j] != null){
			var prevCell = prev[i][j];
			i = prevCell[0];
			j = prevCell[1];
			cellsToAnimate.push( [[i, j], "success"] );
		}
	}
	return pathFound;
}
