// Global-Variables
var totalRows = 25;
var totalCols = 42;
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
const startCell = [11, 14];
const endCell = [11,25];

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
             clearBoard( walls = true);
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
            clearBoard( walls = true);
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
            clearBoard(walls = true);
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
        update("maze");
        return;
    }
    traverseGraph(algorithm);
});

// Runner-function-of-grid(wall-making)
function delay() {
    let run;
    run = 5;
    console.log("Delay = " + run);
    return run;
}

function createDistance() {
    let distance =[];
    for(let i = 0; i< totalRows; i++) {
        let row = [];
        for(let j = 0; j< totalCols; i++) {
            row.push(Number.POSITIVE_INFINITY);//property
        }
        distance.push(row);
    }
    return distance;
}

function createPrev() {
    let prev = [];
    for (let index = 0; i< totalRows; i++) {
        let element = [];
        for(let j = 0; j< totalCols; j++) {
            row.push(null);
        }
        prev.push(row);
    }
    return prev;
}

function getneighbours(i, j) {
    let neighbours = [];
    if(i > 0) {
        neighbours.push( [i-1,j] );
    }
    if(j > 0) {
        neighbours.push( [i, j-1] );
    }
    if(i < (totalRows -1) )
    {
        neighbours.push([i+1,j] );
    }
    if(j < (totalCols -1))
    {
        neighbours.push([i,j + 1] );
    }
    return neighbours;
}
<<<<<<< HEAD

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
        let color = cellsToAnimate[i][1];
=======

// cell-animation
async function animate() {
    animationState = null;
    let cells= $("#tableContainer").find("td");
    let startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
    let endCellIndex = (endCell[0] * (totalCols)) + endCell[1];
    let endCellIndex = (endCell[0] * (totalCols)) + endCell[1];
    let getdelay = delay();

    for( let i = 0; i<cellsToAnimate.length; i++) {
        let cellCoordinates = cellsToAnimate[i][0];
        let x = cellCoordinates[0];
        let y = cellCoordinates[1];
        let num = (x * (totalCols)) + y;

    }
}
>>>>>>> 1ba8d379b5c3f682ae1f701776ad8b1882636d5a

        // Promise Object
        await new Promise(resolve => setTimeout(resolve, delay));

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
    clearBoard(walls = true);
    let startTime = Date.now();
    let pathfound = runAlgo();
    let endTime = Date.now();
    await animate()
    if(pathfound) {
        updateResults((endTime - startTime), true, countLength());
    }
    inProgress = false;
    finished = true;
}

function runAlgo() {
    algorithm == "Dijstra";
    let pathfound = dijstra();
    return pathfound;
}


