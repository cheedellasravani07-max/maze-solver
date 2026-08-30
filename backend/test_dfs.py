from dfs import dfs


maze = [
    ["S", ".", ".", "#"],
    ["#", ".", ".", "#"],
    ["#", ".", ".", "E"]
]

start = (0, 0)
end = (2, 3)

path = dfs(maze, start, end)

print("Maze:")
for row in maze:
    print(row)

print("\nPath found:")
print(path)