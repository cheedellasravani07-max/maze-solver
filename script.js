const maze = document.getElementById("maze");

const algorithm = document.getElementById("algorithm");
const selectedAlgorithm = document.getElementById("selectedAlgorithm");

const steps = document.getElementById("steps");
const pathLength = document.getElementById("pathLength");

const generateBtn = document.getElementById("generateBtn");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const rows = 10;
const columns = 10;

function createMaze() {

    maze.innerHTML = "";

    for (let i = 0; i < rows * columns; i++) {

        const cell = document.createElement("div");

        cell.classList.add("maze-cell");

        if (i === 0) {
            cell.classList.add("start");
        }

        if (i === rows * columns - 1) {
            cell.classList.add("end");
        }

        maze.appendChild(cell);
    }
}

algorithm.addEventListener("change", function () {

    selectedAlgorithm.textContent =
        algorithm.options[algorithm.selectedIndex].text;

});

generateBtn.addEventListener("click", function () {

    createMaze();

    steps.textContent = "0";
    pathLength.textContent = "0";
});

startBtn.addEventListener("click", function () {

    const cells = document.querySelectorAll(".maze-cell");

    let count = 0;

    cells.forEach(function (cell, index) {

        if (
            index !== 0 &&
            index !== cells.length - 1
        ) {
            cell.classList.remove("start", "end");

            if (index % 7 === 0) {
                cell.classList.add("wall");
            }
        }

    });

    cells.forEach(function (cell, index) {

        if (
            index !== 0 &&
            index !== cells.length - 1 &&
            !cell.classList.contains("wall")
        ) {

            setTimeout(function () {

                cell.classList.add("visited");

                count++;

                steps.textContent = count;

            }, index * 30);

        }

    });

});

resetBtn.addEventListener("click", function () {

    createMaze();

    steps.textContent = "0";
    pathLength.textContent = "0";

    selectedAlgorithm.textContent =
        algorithm.options[algorithm.selectedIndex].text;

});

createMaze();