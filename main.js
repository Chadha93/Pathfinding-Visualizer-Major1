// Global-Variables
var totalRows = 25;
var totalCols = 42;
var createWalls = false;
var movingStart = false;
var movingEnd = false;
var inProgress = false;
var algorithm = false;

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
    var cells = $("#tableContainer").find("td");
    var startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
    var endCellIndex = (endCell[0]*(totalCols)) + endCell[1];
    for(var i = 0; i< cells.length; i++) {
        var isWall = $(cells[i]).hasClass("wall");
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
    var index = $("td").index( this );
    var startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
    var endCellIndex = (endCell[0] * (totalCols)) + endCell[1];
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
    var index = $("td").index(this);
    var startCellIndex = (startCell[0] * (totalCols)) + startCell[1];
    var endCellIndex = (endCell[0] * (totalCols)) + endCell[1];
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
    var index = $("td").index(this);
    var startCellIndex = (startCell[0] * (totalCols)) +startCell[1];
    var endCellIndex = (startCell[0] * (totalCols)) + endCell[1];
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






