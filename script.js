
// 1. what is the first child of the table?

// 2a. what is the first child of a row in a table?
// 2b. what's the next sibling of a row in a table?

// 3. what is the next sibling of a data element in the table?

// need a method "next child" to traverse from child to child
// Array.from(nodelist) converts a node list into an array.

let maxHeight;
let maxWidth;
let tableElements;

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

function getCurrentCell() {
    return document.getElementById('current cell');
}

function unmarkCell(cell) {
    cell.style.backgroundColor = 'white';
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

function moveCellDown(currentCell) {
    if (currentCell.textContent.charAt(0) < maxWidth && currentCell.textContent.charAt(3) < maxHeight) {
        // move cell up:
        unboldCell(currentCell);
        let nextCell = (parseInt(currentCell.id.charAt(0)) + 1) + ', ' + (parseInt(currentCell.id.charAt(3)));
        let newCell = document.getElementById(nextCell);
        boldCell(newCell);
    }
}

function getCurrentCellCoord(cell) {
    return (parseInt(cell.id.charAt(0))) + ', ' + (parseInt(cell.id.charAt(3)));
}

// returns whether a move to the next coord is still in-bounds.
function safeToMove(cell, direction) {
    for (let i = 0; i < tableElements.length; i++) {
        for (let j = 0; j < tableElements[i].length; j++) {
            if (tableElements[i][j] === cell && direction === 'r') {
                let nextRightIndex = (j + 1);
                return (nextRightIndex > tableElements[i].length);
            }
            if (tableElements[i][j] === cell && direction === 'l') {
                let nextLeftIndex = (j - 1);
                return (nextLeftIndex < 0);
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
}



function moveCellUp(currentCell) {

}

function makeButtons() {
    let markCell = document.createElement('button');
    markCell.id = 'markCell';
    markCell.appendChild(document.createTextNode('Mark Cell'));
    markCell.addEventListener('click', () => {
        // to do
    });
    let upArrow = document.createElement('button');
    upArrow.id = 'upArrow';
    upArrow.appendChild(document.createTextNode('↑'));
    upArrow.addEventListener('click', () => {
        // to do
    });
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

function setButtonStyle(button) {
    button.style.height = '50px';
    button.style.width = '50px';
    button.style.fontSize = '30px';
    button.style.left = '300px';
}

function isButtonSelected (button) {
    return button.id === 'marked';
}

// function moveCell(cell) {
//     if (cell.direction == '')
// }

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
for (button of document.body.getElementsByTagName('button')) {setButtonStyle(button);}
markCell(document.body.getElementsByTagName('td')[0])
console.log(safeToMove(document.body.getElementsByTagName('td')[0], 'u'));
// moveCellUp(document.body.getElementsByTagName('td')[0]);
updateCells(document.body.getElementsByTagName('td'));