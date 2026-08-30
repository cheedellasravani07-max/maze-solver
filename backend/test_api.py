import requests


url = "http://127.0.0.1:5000/solve"

maze = [
    ["S", ".", ".", "#"],
    ["#", ".", ".", "#"],
    ["#", ".", ".", "E"]
]

start = [0, 0]
end = [2, 3]


for algorithm in ["bfs", "dfs", "astar"]:
    data = {
        "maze": maze,
        "start": start,
        "end": end,
        "algorithm": algorithm
    }

    response = requests.post(url, json=data)

    print("\nAlgorithm:", algorithm)
    print("Response:", response.json())