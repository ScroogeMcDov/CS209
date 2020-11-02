
let maxHeight; // maximum height of table
let maxWidth; // maximum width of table
let tableElements;  // contains the entire table structure and its cells in a 3d array. [[row1cells], [row2cells],..]

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
            if (i == 1 && j == 1) {
                col.style.border = "3px solid black";
                col.id += "c"; // this is the current cell (index = 4)
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
function unmarkCell(cell) {
    cell.style.backgroundColor = 'white';
    cell.id -= 'm';
}
function markCell(cell) {
    cell.style.backgroundColor = 'yellow';
    cell.id += 'm';
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

function getCurrentCellCoord(cell) {
    return (parseInt(cell.id.charAt(0))) + ', ' + (parseInt(cell.id.charAt(3)));
}

/* returns whether a move to the next coord is still in-bounds.
arg: cell - current cell
arg: direction - desired direction to move in
*/
function safeToMove(cell, direction) {
    for (let i = 0; i < tableElements.length; i++) {
        for (let j = 0; j < tableElements[i].length; j++) {
            if (tableElements[i][j] === cell && direction === 'r') {
                let nextRightIndex = (j + 1);
                return (nextRightIndex < tableElements[i].length);
            }
            if (tableElements[i][j] === cell && direction === 'l') {
                let nextLeftIndex = (j - 1);
                return nextLeftIndex > 0;
            }
            if (tableElements[i][j] === cell && direction === 'u') {
                let nextUpIndex = (i - 1);
                return (nextUpIndex > 0);
            }
            if (tableElements[i][j] === cell && direction === 'd') {
                let nextDownIndex = (i - 1);
                return (nextDownIndex < tableElements[j].length);
            }
        }
    }
    return 'safeToMove error';
}

// === Cell Controls (Note: functions return the destination cell object) ===
function moveCellUp(currentCell) {
    if (safeToMove(currentCell, 'u')) {
        unboldCell(currentCell);
        let nextCell = (parseInt(currentCell.id.charAt(0)) - 1) + ', ' + (parseInt(currentCell.id.charAt(3)));
        let newCell = document.getElementById(nextCell);
        boldCell(newCell);
        return newCell;
    }
}
function moveCellDown(currentCell) {
    if (safeToMove(currentCell, 'd')) {
        unboldCell(currentCell);
        let nextCell = (parseInt(currentCell.id.charAt(0)) + 1) + ', ' + (parseInt(currentCell.id.charAt(3)));
        let newCell = document.getElementById(nextCell);
        boldCell(newCell);
        return newCell;
    }
}
function moveCellLeft(currentCell) {
    if (safeToMove(currentCell, 'l')) {
        unboldCell(currentCell);
        let nextCell = (parseInt(currentCell.id.charAt(0)) + ', ' + (parseInt(currentCell.id.charAt(3))) - 1);
        let newCell = document.getElementById(nextCell);
        boldCell(newCell);
        return newCell;
    }
}
function moveCellRight(currentCell) {
    if (safeToMove(currentCell, 'r')) {
        unboldCell(currentCell);
        let nextCell = (parseInt(currentCell.id.charAt(0)) + ', ' + (parseInt(currentCell.id.charAt(3)) + 1));
        let newCell = document.getElementById(nextCell);
        boldCell(newCell);
        return newCell;
    }
}

/*Creates all the buttons and adds them to the tree.
*/
function makeButtons() {
    let markCell = document.createElement('button');
    markCell.id = 'markCell';
    markCell.appendChild(document.createTextNode('Mark Cell'));

    let upArrow = document.createElement('button');
    upArrow.id = 'upArrow';
    upArrow.appendChild(document.createTextNode('↑'));

    let downArrow = document.createElement('button');
    downArrow.id = 'downArrow';
    downArrow.appendChild(document.createTextNode('↓'));

    let rightArrow = document.createElement('button');
    rightArrow.id = 'rightArrow';
    rightArrow.appendChild(document.createTextNode('→'));

    let leftArrow = document.createElement('button');
    leftArrow.id = 'leftArrow';
    leftArrow.appendChild(document.createTextNode('←'));

    document.body.appendChild(upArrow);
    document.body.appendChild(downArrow);
    document.body.appendChild(rightArrow);
    document.body.appendChild(leftArrow);
    document.body.appendChild(markCell);
}

function isButtonSelected (button) {
    return button.id === 'marked';
}

function updateCells(cellArray) {
    for (let cell of cellArray) {
        if (cell.id !== 'marked') {
            cell.style.backgroundColor = 'white';
        }
    }
}


// === MAIN PART OF FILE ===
// 1. setting up table.
let table = makeTable(4, 4);

// 2. setting up buttons..
for (button of document.body.getElementsByTagName('button')) {
    setButtonStyle(button);
}
markCell(document.body.getElementsByTagName('td')[0]); // highights
updateCells(document.body.getElementsByTagName('td'));

// 3. move cell (newCell returns the next cell object, which we can then call 'moveCell*Direction* on).
let newCell1 = moveCellRight(document.body.getElementsByTagName('td')[0]);
markCell(newCell1)
let newCell2 = moveCellRight(newCell1);
markCell(newCell2)
unmarkCell(newCell1);
