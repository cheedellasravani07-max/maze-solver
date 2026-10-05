const maze = document.getElementById("maze");

let rows = 10;
let cols = 10;

let selectedMode = "wall";
let startCell = null;
let endCell = null;

let startPosition = null;
let endPosition = null;
let mazeData = [];


function createMaze() {

    maze.innerHTML = "";
    mazeData = [];

    for (let row = 0; row < rows; row++) {
        mazeData[row] = [];

        for (let col = 0; col < cols; col++) {
            mazeData[row][col] = 0;
        }
    }

    for (let row = 0; row < rows; row++) {

        for (let col = 0; col < cols; col++) {

            const cell = document.createElement("div");

            cell.classList.add("cell");

            cell.dataset.row = row;
            cell.dataset.col = col;

            maze.appendChild(cell);

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
                    console.log("Start position:", startPosition);
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
                    console.log("End position:", endPosition);

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
}
createMaze();

// Buttons

const startBtn = document.getElementById("startBtn");
const endBtn = document.getElementById("endBtn");
const mazeSize = document.getElementById("mazeSize");
const speedSelect = document.getElementById("speed");
startBtn.addEventListener("click", function() {
    selectedMode = "start";
    console.log("Start mode selected");
});

endBtn.addEventListener("click", function() {
    selectedMode = "end";
    console.log("End mode selected");
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

        const response = await fetch("/solve", ...) {
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

        }, index * Number(speedSelect.value));
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

                },  result.explored.length * Number(speedSelect.value) + index * Number(speedSelect.value) * 2);
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
        if (startPosition === null) {
        alert("Please select a Start point.");
        return;
    }

    if (endPosition === null) {
        alert("Please select an End point.");
        return;
    }

    const algorithms = ["bfs", "dfs", "astar"];
    const results = [];

    for (const algorithm of algorithms) {

        const mazeRequest = {
            maze: mazeData,
            start: startPosition,
            end: endPosition,
            algorithm: algorithm
        };
        console.log("Compare request:", mazeRequest);

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

comparisonDiv.innerHTML = `
    <h3>Algorithm Comparison</h3>
    <table>
        <tr>
            <th>Algorithm</th>
            <th>Path Length</th>
            <th>Execution Time</th>
        </tr>
    </table>
`;

const table = comparisonDiv.querySelector("table");

results.forEach(function(result) {

    table.innerHTML += `
        <tr>
            <td>${result.algorithm}</td>
            <td>${result.pathLength}</td>
            <td>${(result.executionTime * 1000).toFixed(2)} ms</td>
        </tr>
    `;
});

});
// Reset button

const resetBtn = document.getElementById("resetBtn");
const generateBtn = document.getElementById("generateBtn");
const clearPathBtn = document.getElementById("clearPathBtn");
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
const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
});
const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", function() {
    const mazeDataText = JSON.stringify(mazeData);

    const blob = new Blob([mazeDataText], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "maze.json";

    link.click();

    URL.revokeObjectURL(url);
});
