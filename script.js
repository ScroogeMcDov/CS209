
let maxHeight; // maximum height of table
let maxWidth; // maximum width of table
let tableElements;  // contains the entire table structure and its cells in a 3d array. [[row1cells], [row2cells],..]
let selectedCoordinates = {
    x: 1,
    y: 1
};

function makeTable(rows, cols) {
    maxHeight = cols;
    maxWidth = rows;

    let rowsAndColumns =[];

    let table = document.createElement('table');
    let tableHeaderRow = document.createElement('tr');  // header row with *cols* columns

    // 1: Header
    for (let i = 0; i < cols; i++) {
        let headerCell = document.createElement('th');
        headerCell.style.border = "1px solid black";
        headerCell.appendChild(document.createTextNode('Header ' + (i + 1)));
        tableHeaderRow.appendChild(headerCell);
    }
    table.appendChild(tableHeaderRow);

    // 2: Rest of table
    for (let i = 1; i <= rows - 1; i++) {
        rowsAndColumns.push([]); // create row amount of nested list that each hold cols amount of cells.
        let row = document.createElement('tr');
        for (let j = 1; j <= cols; j++) {
            let col = document.createElement('td');
            col.style.border = "1px solid black";
            col.id = i + ', ' + j;
            if (i === 1 && j === 1) {
                col.style.border = "3px solid black";
            }
            col.appendChild(document.createTextNode(i + ", " + j));
            row.appendChild(col);
            rowsAndColumns[i-1].push(col); // add coll amount of cells to the list.
        }
        table.appendChild(row);
    }
    document.body.appendChild(table);
    tableElements = rowsAndColumns; // the populated list.
}


// === Cell Style Changers ===
function unmarkCell(coordinates) {
    let currentCell = getCell(coordinates.x, coordinates.y);
    currentCell.style.backgroundColor = 'white';
}
function markCell(coordinates) {
    let currentCell = getCell(coordinates.x, coordinates.y);
    currentCell.style.backgroundColor = 'yellow';
}
function isMarked(coordinates) {
    let currentCell = getCell(coordinates.x, coordinates.y);
    return currentCell.style.backgroundColor == 'yellow';
}
function unboldCell(cell) {
    cell.style.border = "1px solid black";
}
function boldCell(cell) {
    cell.style.border = "3px solid black";
}
function setButtonStyle(button) {
    button.style.height = '50px';
    button.style.width = '50px';
    button.style.fontSize = '30px';
    button.style.left = '300px';
}

// Returns cell with x, y coords.
function getCell(x, y) {
    return document.getElementById(x + ', ' + y);
}

/* returns whether a move to the next coord is still in-bounds.

*/
function safeToMove(targetPosition) {
    return (targetPosition.x > 0 && targetPosition.x < 4 && targetPosition.y > 0 && targetPosition.y <= 4);
}

// === Cell Controls ===
function updateSelectedCoordinates(targetPosition) {
    unboldCell(getCell(selectedCoordinates.x, selectedCoordinates.y));
    boldCell(getCell(targetPosition.x, targetPosition.y));
    selectedCoordinates = targetPosition;
}

function moveCellUp() {
    let targetPosition = {
        x: selectedCoordinates.x - 1,
        y: selectedCoordinates.y
    };

    if (safeToMove(targetPosition)) {
        updateSelectedCoordinates(targetPosition);
    }
}
function moveCellDown() {
    let targetPosition = {
        x: selectedCoordinates.x + 1,
        y: selectedCoordinates.y
    };
    if (safeToMove(targetPosition)) {
        updateSelectedCoordinates(targetPosition);
    }
}
function moveCellLeft() {
    let targetPosition = {
        x: selectedCoordinates.x,
        y: selectedCoordinates.y - 1
    };
    if (safeToMove(targetPosition)) {
        updateSelectedCoordinates(targetPosition);
    }
}
function moveCellRight() {
    let targetPosition = {
        x: selectedCoordinates.x,
        y: selectedCoordinates.y + 1
    };
    if (safeToMove(targetPosition)) {
        updateSelectedCoordinates(targetPosition);
    }
}

/*Creates all the buttons and adds them to the tree.
*/
function generateButtons() {
    let markCellButton = document.createElement('button');
    markCellButton.id = 'markCell';
    markCellButton.appendChild(document.createTextNode('Mark Cell'));
    markCellButton.onclick = function () {
        if (!isMarked(selectedCoordinates)) {
            markCell(selectedCoordinates);
        }
        else {
            unmarkCell(selectedCoordinates);
        }
    }
    markCellButton.style.width = '100%';

    let upArrow = document.createElement('button');
    upArrow.id = 'upArrow';
    upArrow.appendChild(document.createTextNode('↑'));
    upArrow.onclick = function () {
        moveCellUp();
    }
    upArrow.style.width = '33%'

    let downArrow = document.createElement('button');
    downArrow.id = 'downArrow';
    downArrow.appendChild(document.createTextNode('↓'));
    downArrow.onclick = function () {
        moveCellDown();
    }
    downArrow.style.width = '33%'

    let rightArrow = document.createElement('button');
    rightArrow.id = 'rightArrow';
    rightArrow.appendChild(document.createTextNode('→'));
    rightArrow.onclick = function () {
        moveCellRight();
    }
    rightArrow.style.width = '33%'

    let leftArrow = document.createElement('button');
    leftArrow.id = 'leftArrow';
    leftArrow.appendChild(document.createTextNode('←'));
    leftArrow.onclick = function () {
        moveCellLeft();
    }
    leftArrow.style.width = '33%'

    let buttonLayout = document.createElement('div');
    buttonLayout.style.width = '100px';
    buttonLayout.style.textAlign = 'center';


    buttonLayout.appendChild(upArrow);
    buttonLayout.appendChild(document.createElement('br'));
    buttonLayout.appendChild(leftArrow);
    buttonLayout.appendChild(downArrow);
    buttonLayout.appendChild(rightArrow);

    buttonLayout.appendChild(markCellButton);

    document.body.appendChild(buttonLayout);
}

// === MAIN PART OF FILE ===
// 1. setting up table.
let table = makeTable(4, 4);
generateButtons();

