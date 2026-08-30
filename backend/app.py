from flask import Flask, request, jsonify
from bfs import bfs
from dfs import dfs
from astar import astar
from maze import is_valid_maze

app = Flask(__name__)


@app.route("/")
def home():
    return "Maze Solver Backend is Running!"

@app.route("/solve", methods=["POST"])
def solve_maze():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    required_fields = ["maze", "start", "end", "algorithm"]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    maze = data["maze"]
    start = tuple(data["start"])
    end = tuple(data["end"])
    algorithm = data["algorithm"].lower()

    if not is_valid_maze(maze, start, end):
        return jsonify({"error": "Invalid maze"}), 400

    if algorithm == "bfs":
        path = bfs(maze, start, end)

    elif algorithm == "dfs":
        path = dfs(maze, start, end)

    elif algorithm == "astar":
        path = astar(maze, start, end)

    else:
        return jsonify({"error": "Unknown algorithm"}), 400

    if path is None:
        return jsonify({
            "algorithm": algorithm,
            "path": None,
            "message": "No path found"
        })

    return jsonify({
        "algorithm": algorithm,
        "path": path,
        "message": "Path found"
    })

        

if __name__ == "__main__":
    app.run(debug=True)