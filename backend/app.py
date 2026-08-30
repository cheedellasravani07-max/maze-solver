from flask import Flask, request, jsonify
from bfs import bfs
from dfs import dfs
from astar import astar

app = Flask(__name__)


@app.route("/")
def home():
    return "Maze Solver Backend is Running!"


@app.route("/solve", methods=["POST"])
def solve_maze():
    data = request.get_json()

    maze = data["maze"]
    start = tuple(data["start"])
    end = tuple(data["end"])
    algorithm = data["algorithm"]

    if algorithm == "bfs":
        path = bfs(maze, start, end)

    elif algorithm == "dfs":
        path = dfs(maze, start, end)

    elif algorithm == "astar":
        path = astar(maze, start, end)

    else:
        return jsonify({"error": "Unknown algorithm"}), 400

    return jsonify({
        "algorithm": algorithm,
        "path": path
    })


if __name__ == "__main__":
    app.run(debug=True)