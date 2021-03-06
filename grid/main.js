// Global-Variables
var totalRows = 25;
var totalCols = 60;
var createWalls = false;
var movingStart = false;
var movingEnd = false;
var inProgress = false;
var finished = false;
var algorithm = false;
var cellsToAnimate = [];
var animationState = null;
var animationSpeed = "Fast";

//grid-generate
function generateGrid( rows, cols ) {
    let grid = "<table>";
    for ( row = 1; row <= rows; row++ ) {
        grid += "<tr>"; 
        for ( col = 1; col <= cols; col++ ) {      
            grid += "<td></td>";
        }
        grid += "</tr>"; 
    }
    grid += "</table>";
    return grid;
}

let myGrid = generateGrid( totalRows, totalCols);
$( "#tableContainer" ).append( myGrid );

// grid-working-implementation
const startCell = [12, 14];
const endCell = [12,45];

function implementGrid( walls ) {
    let cells = $("#tableContainer").find("td");
    let startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
    let endCellIndex = (endCell[0]*(totalCols)) + endCell[1];
    for(let i = 0; i< cells.length; i++) {
        let isWall = $(cells[i]).hasClass("wall");
        $(cells[i]).removeClass();
        if (i == startCellIndex) {
            $(cells[i]).addClass("start");
        }
        else if(i == endCellIndex) {
            $(cells[i]).addClass("end");
        }
        else if( walls && isWall ) {
            $(cells[i]).addClass("wall");
        }
    }
}
// callling function implementGrid
implementGrid();

// grid functioning(wall-vreation)
/*mousedown event*/
$("td").mousedown(function() {
    let index = $("td").index( this );
    let startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
    let  endCellIndex = (endCell[0] * (totalCols)) + endCell[1];
    if(!inProgress) {
        //board will be finished if finished
        if(finished && !inProgress) {
             implementGrid( walls = true);
             finished = false;
        }
        if(index == startCellIndex) {
            movingStart = true;
        }
        else if(index == endCellIndex) {
            movingEnd = true;
        }
        else {
            createWalls = true;
        }
    }
});

/*mouseup event*/
$("td").mouseup(function() {
    createWalls = false;
    movingStart = false;
    movingEnd = false;
    inProgress = false;
    finished = false;
});

/*mouse-hovering-while-mousedown*/
$("td").mouseenter(function() { 
    if(!createWalls && !movingStart && !movingEnd) {
        return;
    }
    let index = $("td").index(this);
    let startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
    let endCellIndex = (endCell[0] * (totalCols)) + endCell[1];
    if(!inProgress) {
        if(finished) {
            implementGrid( walls = true);
            finished = false;
        }
        if(movingStart  && index != endCellIndex) {
            moveStartOrEnd(startCellIndex, index, "start");
        }
        else if(movingEnd && index != startCell) {
            moveStartOrEnd(endCellIndex, index, "end");
        }
        else if(index != startCellIndex && index != endCellIndex) {
            $(this).toggleClass("wall");
        }
    }
});

/*click-function*/
$("td").click(function() {
    let index = $("td").index(this);
    let startCellIndex = (startCell[0] * (totalCols)) +startCell[1];
    let endCellIndex = (startCell[0] * (totalCols)) + endCell[1];
    if((inProgress ==false) && !(index == startCellIndex) && !(index == endCellIndex)) {
        if(finished) {
            implementGrid(walls = true);
            finished = false;
        }
    } $(this).toggleClass("wall");
});

/*mouse-releasr*/
$("body").mouseup(function() {
    createWalls = false;
    movingStart = false;
    movingEnd = false;
});

// buttons
$("#start-btn").click(function() {
    if(algorithm == null)
    {
        return;
    }
    if(inProgress)
    {
        update("wait");
        return;
    }
    traverseGraph(algorithm);
});



// update button
function updatestartBtnText(){
    if(algorithm == "Dijkstra") {
        $("#start-btn").html("start Dijkstra");
    }
    else if(algorithm == "Breadth-First-Search") {
        $("#start-btn").html("Start Breadth-First-Search")
    }
    else if(algorithm == "A*") {
        $("#start-btn").html("start A*");
    }
    else if(algorithm == "Depth-First-Search") {
        $("#start-btn").html("start Depth-First-Search");
    }
    return;

}


//nav function
$(".algorithms").click(function() {
    if(inProgress) {
        update("wait");
        return;
    }
    algorithm = $(this).text();
    updatestartBtnText();
    console.log("algorithm has changed to " + algorithm);
});

// Used to display error messages
function update(message){
	$("#resultsIcon").removeClass();
	$("#resultsIcon").addClass("fas fa-exclamation");
	$('#results').css("background-color", "red");
	$("#length").text("");
	if (message == "wait"){
		$("#duration").text("Please wait for the algorithm to finish.");
	}
}

// Runner-function-of-grid(wall-making)
function delay() {
    let run;
    run = 5;
    console.log("Delay = " + run);
    return run;
}

function createDistances() {
    let distances =[];
    for(let i = 0; i< totalRows; i++) {
        let row = [];
        for(let j = 0; j< totalCols; j++) {
            row.push(Number.POSITIVE_INFINITY);//property
        }
        distances.push(row);
    }
    return distances;
}

function createPrev() {
    let prev = [];
    for (let i = 0; i< totalRows; i++) {
        let row = [];
        for(let j = 0; j< totalCols; j++) {
            row = [];
        }
        prev.push(row);
    }
    return prev;
}

function getNeighbors(i, j) {
    let neighbors = [];
    if(i > 0) {
        neighbors.push( [i-1, j] );
    }
    if(j > 0) {
        neighbors.push( [i, j-1] );
    }
    if(i < (totalRows -1) )
    {
        neighbors.push([i+1, j] );
    }
    if(j < (totalCols -1))
    {
        neighbors.push([i,j + 1] );
    }
    return neighbors;
}

// cell-animation
async function animate() {
    animationState = null;
    let cells= $("#tableContainer").find("td");
    let startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
    let endCellIndex = (endCell[0] * (totalCols)) + endCell[1];
    let getdelay = delay();

    // animation started
    for( let i = 0; i<cellsToAnimate.length; i++) {
        let cellCoordinates = cellsToAnimate[i][0];
        let x = cellCoordinates[0];
        let y = cellCoordinates[1];
        let num = (x * (totalCols)) + y;
        if(num == startCellIndex || num == endCellIndex) {
            continue;
        }
        let cell = cells[num];
        let colorClass = cellsToAnimate[i][1];

        // Promise Object
        await new Promise(resolve => setTimeout(resolve, getdelay));

        // calling-classes
        $(cell).removeClass();
        $(cell).addClass(colorClass);
    }
    cellsToAnimate = [];
    // animation ended
    return new Promise(resolve => resolve(true));
}

// graph-traversal
async function traverseGraph(algorithm) {
    inProgress = true;
    implementGrid(walls = true);
    let startTime = Date.now();
    let pathfound = runAlgo();
    let endTime = Date.now();
    await animate();
  
    inProgress = false;
    finished = true;
}

function runAlgo() {
    if(algorithm == "Dijkstra") {                  
        var pathfound = dijkstra();
    }
    else if(algorithm == "A*") {
        var pathfound = AStar();
    }
    else if(algorithm == "Breadth-First-Search") {
        var pathfound = BFS();
    }
    else if(algorithm == "Depth-First-Search") {
        var visited = createVisited();
        var pathfound = DFS(startCell[0], startCell[1], visited);
    }
    return pathfound;
}

function createVisited(){
    let visited = [];
    let cells = $('#tableContainer').find("td");
    for(let i = 0; i< totalRows; i++) {
        let row =[];
        for(var j =0; j<totalCols; j++) {
            if(cellWall(i,j,cells)) {
                row.push(true);
            }
            else {
                row.push(false);
            }
        }
        visited.push(row);
    }
    return visited;
}

function cellWall(i, j, cells) {
    let cellNum = (i * (totalCols)) + j;
    return $(cells[cellNum]).hasClass("wall");
}


