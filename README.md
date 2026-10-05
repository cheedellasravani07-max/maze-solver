# 🧩 Maze Solver — ADSA Project

A web-based Maze Solver application developed using **Python, Flask, HTML, CSS, and JavaScript**.

The project demonstrates how different pathfinding algorithms solve a maze by finding a path from a selected **Start** cell to an **End** cell.

---

## 🎯 Project Objective

The main objective of this project is to understand and demonstrate **Algorithms and Data Structures (ADSA)** through an interactive maze-solving application.

The project implements:

- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- A* Search Algorithm

The application visually displays the explored cells and final solution path.

---

## 🚀 Features

- 🧭 BFS, DFS, and A* algorithms
- 🟢 Start and End cell selection
- 🧱 Manual wall creation
- 🎲 Random maze generation
- 📐 10×10, 15×15, and 20×20 maze sizes
- 🧹 Clear path
- 📊 Algorithm comparison
- ⚡ Slow, Normal, and Fast animation speeds
- 📈 Path length, cells explored, and execution time
- 🌙 Dark Mode
- 📱 Responsive design
- 💾 Download maze as JSON
- 🎨 Interactive maze visualization

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Python | Algorithms and backend |
| Flask | Web server and API |
| HTML | Frontend structure |
| CSS | Styling and responsive design |
| JavaScript | Maze interaction and visualization |
| Git | Version control |
| GitHub | Code hosting |

---

## 🧠 Algorithms

### Breadth-First Search (BFS)

BFS explores the maze level by level using a **Queue**.

For an unweighted maze, BFS guarantees the shortest path when a path exists.

**Time Complexity:** `O(V + E)`  
**Space Complexity:** `O(V)`

---

### Depth-First Search (DFS)

DFS explores one direction as deeply as possible before backtracking.

It uses a **Stack** concept.

DFS can find a path but does not guarantee the shortest path.

**Time Complexity:** `O(V + E)`  
**Space Complexity:** `O(V)`

---

### A* Search

A* combines the cost of reaching the current cell with an estimated cost to the destination.

```text
f(n) = g(n) + h(n)
Where:

- `g(n)` = cost from Start to current cell
- `h(n)` = estimated cost from current cell to End
- `f(n)` = total estimated cost

A* uses a priority queue to explore the most promising cells first.
