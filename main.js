//grid-generate
var totalRows = 25;
var totalCols = 45;
const startCell = [11, 15];
const endCell = [11,25];

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
// callling guncction implementGrid
implementGrid();
