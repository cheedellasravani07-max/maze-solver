const maze = document.getElementById("maze");

const rows = 10;
const cols = 10;

let selectedMode = "wall";
let startCell = null;
let endCell = null;

let startPosition = null;
let endPosition = null;

let mazeData = [];

// Create maze data
for (let row = 0; row < rows; row++) {
    mazeData[row] = [];

    for (let col = 0; col < cols; col++) {
        mazeData[row][col] = 0;
    }
}

// Create maze cells
for (let row = 0; row < rows; row++) {

    for (let col = 0; col < cols; col++) {

        const cell = document.createElement("div");

        cell.classList.add("cell");

        cell.dataset.row = row;
        cell.dataset.col = col;

        maze.appendChild(cell);

        // Cell click
        cell.addEventListener("click", function() {

            if (selectedMode === "start") {

                if (startCell !== null) {
                    startCell.classList.remove("start");
                }

                cell.classList.remove("wall");
                cell.classList.remove("end");
                cell.classList.add("start");

                startCell = cell;

                startPosition = [
                    Number(cell.dataset.row),
                    Number(cell.dataset.col)
                ];

            } else if (selectedMode === "end") {

                if (endCell !== null) {
                    endCell.classList.remove("end");
                }

                cell.classList.remove("wall");
                cell.classList.remove("start");
                cell.classList.add("end");

                endCell = cell;

                endPosition = [
                    Number(cell.dataset.row),
                    Number(cell.dataset.col)
                ];

            } else {

                cell.classList.toggle("wall");

                const row = Number(cell.dataset.row);
                const col = Number(cell.dataset.col);

                if (cell.classList.contains("wall")) {
                    mazeData[row][col] = 1;
                } else {
                    mazeData[row][col] = 0;
                }
            }
        });
    }
}


// Buttons

const startBtn = document.getElementById("startBtn");
const endBtn = document.getElementById("endBtn");

startBtn.addEventListener("click", function() {
    selectedMode = "start";
});

endBtn.addEventListener("click", function() {
    selectedMode = "end";
});


// Solve button

const solveBtn = document.getElementById("solveBtn");

solveBtn.addEventListener("click", function() {

    if (startPosition === null) {
        alert("Please select a Start point.");
        return;
    }

    if (endPosition === null) {
        alert("Please select an End point.");
        return;
    }

    const selectedAlgorithm = "bfs";

    const mazeRequest = {
        maze: mazeData,
        start: startPosition,
        end: endPosition,
        algorithm: selectedAlgorithm
    };

    console.log("Maze data ready:", mazeRequest);
});


// Reset button

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function() {

    const cells = document.querySelectorAll(".cell");

    cells.forEach(function(cell) {

        cell.classList.remove("wall");
        cell.classList.remove("start");
        cell.classList.remove("end");
        cell.classList.remove("visited");
        cell.classList.remove("path");

    });

    for (let row = 0; row < rows; row++) {

        for (let col = 0; col < cols; col++) {
            mazeData[row][col] = 0;
        }

    }

    startCell = null;
    endCell = null;

    startPosition = null;
    endPosition = null;

    selectedMode = "wall";
});