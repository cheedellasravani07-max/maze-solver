from flask import Flask, request, jsonify, render_template
import time
from bfs import bfs
from dfs import dfs
from astar import astar
from maze import is_valid_maze

app = Flask(__name__, template_folder="../templates", static_folder="../Static")

@app.route("/")
def home():
    return render_template("index.html")

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
    start_time = time.perf_counter()
    if algorithm == "bfs":
        result = bfs(maze, start, end)
        path = result["path"] if result else None
        explored = result["explored"] if result else []

    elif algorithm == "dfs":
        result = dfs(maze, start, end)
        path = result["path"] if result else None
        explored = result["explored"] if result else []

    elif algorithm == "astar":
            result = astar(maze, start, end)
            path = result["path"] if result else None
            explored = result["explored"] if result else []

    else:
        return jsonify({"error": "Unknown algorithm"}), 400

    if path is None:
        return jsonify({
            "algorithm": algorithm,
            "path": None,
            "message": "No path found"
        })
    execution_time = time.perf_counter() - start_time
    path_length = len(path)
    return jsonify({
        "algorithm": algorithm,
        "path": path,
        "explored": explored,
        "path_length": path_length,
        "execution_time": execution_time,
        "message": "Path found"
    })

        
import os

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000))
    )
