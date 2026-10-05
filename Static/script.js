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
                selectedMode = "wall";

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
                selectedMode = "wall";
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
const compareBtn = document.getElementById("compareBtn");
solveBtn.addEventListener("click", async function() {

    if (startPosition === null) {
        alert("Please select a Start point.");
        return;
    }

    if (endPosition === null) {
        alert("Please select an End point.");
        return;
    }

const algorithmSelect = document.getElementById("algorithm");
const selectedAlgorithm = algorithmSelect.value;
    const mazeRequest = {
        maze: mazeData,
        start: startPosition,
        end: endPosition,
        algorithm: selectedAlgorithm
    };

    console.log("Sending maze data:", mazeRequest);

    try {

        const response = await fetch("http://127.0.0.1:5000/solve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mazeRequest)
        });

        const result = await response.json();

        console.log("Backend response:", result);
        console.log("Explored cells:", result.explored);
        console.log("Path length:", result.path_length);
        document.getElementById("cellsExplored").textContent =
    "Cells Explored: " + result.explored.length;
        document.getElementById("pathLength").textContent =
        "Path Length: " + result.path_length;
        console.log("Execution time:", result.execution_time);
        document.getElementById("executionTime").textContent =
        "Execution Time: " + (result.execution_time * 1000).toFixed(2) + " ms";
        if (!response.ok) {
            alert(result.error || "Something went wrong.");
            return;
        }

        if (result.path === null) {
            alert("No path found!");
            return;
        }
// Clear previous path
document.querySelectorAll(".cell").forEach(function(cell) {
    cell.classList.remove("path");
    cell.classList.remove("visited");
});
        // Show visited cells
result.explored.forEach(function(position, index) {

    const row = position[0];
    const col = position[1];

    const cell = document.querySelector(
        `.cell[data-row="${row}"][data-col="${col}"]`
    );

    if (cell) {
        setTimeout(function() {

            if (
                !(row === startPosition[0] && col === startPosition[1]) &&
                !(row === endPosition[0] && col === endPosition[1])
            ) {
                cell.classList.add("visited");
            }

        }, index * 50);
    }
});

        // Show the solution path
        result.path.forEach(function(position, index) {

            const row = position[0];
            const col = position[1];

            const cell = document.querySelector(
                `.cell[data-row="${row}"][data-col="${col}"]`
            );

            if (cell) {
                setTimeout(function() {

                    // Don't remove start/end colors
                    if (
                        !(row === startPosition[0] && col === startPosition[1]) &&
                        !(row === endPosition[0] && col === endPosition[1])
                    ) {
                        cell.classList.remove("visited");
                        cell.classList.add("path");
                    }

                },  result.explored.length * 50 + index * 100);
            }
        });

    } catch (error) {

        console.error("Error connecting to backend:", error);

        alert(
            "Could not connect to the Flask backend.\n\n" +
            "Make sure python backend/app.py is running."
        );
    }
});
compareBtn.addEventListener("click", async function() {

    const algorithms = ["bfs", "dfs", "astar"];
    const results = [];

    for (const algorithm of algorithms) {

        const mazeRequest = {
            maze: mazeData,
            start: startPosition,
            end: endPosition,
            algorithm: algorithm
        };

        const response = await fetch("http://127.0.0.1:5000/solve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mazeRequest)
        });

        const result = await response.json();

        results.push({
            algorithm: algorithm.toUpperCase(),
            pathLength: result.path_length,
            executionTime: result.execution_time
        });
    }

    console.log("Algorithm comparison:", results);
    const comparisonDiv = document.getElementById("comparison");

comparisonDiv.innerHTML = "";

results.forEach(function(result) {
    comparisonDiv.innerHTML +=
        "<p>" +
        result.algorithm +
        " — Path: " +
        result.pathLength +
        " | Time: " +
        (result.executionTime * 1000).toFixed(2) +
        " ms</p>";
});
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
