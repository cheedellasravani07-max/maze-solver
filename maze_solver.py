from collections import deque
import heapq
import time

# Get maze size
rows = int(input("Enter number of rows: "))
cols = int(input("Enter number of columns: "))

# Create maze
maze = []

for i in range(rows):
    while True:
        row = list(map(int, input(f"Enter row {i}: ").split()))

        if len(row) != cols:
            print(f"Please enter exactly {cols} values.")
            continue

        maze.append(row)
        break

print("Maze size:", rows, "x", cols)


# Check whether a cell is valid
def is_valid_cell(row, col):
    if row < 0 or row >= len(maze):
        return False

    if col < 0 or col >= len(maze[0]):
        return False

    if maze[row][col] == 1:
        return False

    return True


# Get start position
start_row = int(input("Enter start row: "))
start_col = int(input("Enter start column: "))

start = (start_row, start_col)

if not is_valid_cell(start[0], start[1]):
    print("Invalid start position!")
    exit()


# Get end position
end_row = int(input("Enter end row: "))
end_col = int(input("Enter end column: "))

end = (end_row, end_col)

if not is_valid_cell(end[0], end[1]):
    print("Invalid end position!")
    exit()
def heuristic(cell, end):
    return abs(cell[0] - end[0]) + abs(cell[1] - end[1])


# BFS algorithm
def bfs(start, end):

    queue = deque([start])
    visited = {start}
    parent = {}

    directions = [
        (1, 0),   # Down
        (0, 1),   # Right
        (-1, 0),  # Up
        (0, -1)   # Left
    ]

    while queue:

        current = queue.popleft()

        if current == end:
            break

        for dr, dc in directions:

            next_row = current[0] + dr
            next_col = current[1] + dc

            next_cell = (next_row, next_col)

            if is_valid_cell(next_row, next_col):

                if next_cell not in visited:
                    visited.add(next_cell)
                    parent[next_cell] = current
                    queue.append(next_cell)

    # Build the path
        if end not in parent and start != end:
            return [], len(visited)

    path = []
    current = end

    while current != start:
        path.append(current)
        current = parent[current]

    path.append(start)
    path.reverse()

    return path, len(visited)


def dfs(start, end):

    stack = [start]
    visited = {start}
    parent = {}

    directions = [
        (1, 0),   # Down
        (0, 1),   # Right
        (-1, 0),  # Up
        (0, -1)   # Left
    ]

    while stack:

        current = stack.pop()

        if current == end:
            break

        for dr, dc in directions:

            next_row = current[0] + dr
            next_col = current[1] + dc

            next_cell = (next_row, next_col)

            if is_valid_cell(next_row, next_col):

                if next_cell not in visited:
                    visited.add(next_cell)
                    parent[next_cell] = current
                    stack.append(next_cell)


        if end not in parent and start != end:
            return [], len(visited)

    path = []
    current = end

    while current != start:
        path.append(current)
        current = parent[current]

    path.append(start)
    path.reverse()

    return path, len(visited)
def a_star(start, end):

    open_list = []

    heapq.heappush(open_list, (0, start))

    visited = {start}
    parent = {}

    g_cost = {start: 0}

    directions = [
        (1, 0),    # Down
        (0, 1),    # Right
        (-1, 0),   # Up
        (0, -1)    # Left
    ]

    while open_list:

        current_cost, current = heapq.heappop(open_list)

        if current == end:
            break

        for dr, dc in directions:

            next_row = current[0] + dr
            next_col = current[1] + dc

            next_cell = (next_row, next_col)

            if is_valid_cell(next_row, next_col):

                new_g_cost = g_cost[current] + 1

                if next_cell not in g_cost or new_g_cost < g_cost[next_cell]:

                    g_cost[next_cell] = new_g_cost
                    parent[next_cell] = current

                    f_cost = new_g_cost + heuristic(next_cell, end)

                    heapq.heappush(open_list, (f_cost, next_cell))

                    visited.add(next_cell)


        if end not in parent and start != end:
             return [], len(visited)

    path = []
    current = end

    while current != start:
        path.append(current)
        current = parent[current]

    path.append(start)
    path.reverse()

    return path, len(visited)



    # Algorithm Comparison

print("\n" + "=" * 55)
print("              ALGORITHM COMPARISON")
print("=" * 55)

# BFS
start_time = time.perf_counter()
bfs_path, bfs_explored = bfs(start, end)
bfs_time = time.perf_counter() - start_time

# DFS
start_time = time.perf_counter()
dfs_path, dfs_explored = dfs(start, end)
dfs_time = time.perf_counter() - start_time

# A*
start_time = time.perf_counter()
astar_path, astar_explored = a_star(start, end)
astar_time = time.perf_counter() - start_time


# Display comparison table
print("\nAlgorithm    Path cells    Cells Explored    Time (seconds)")
print("-" * 55)

print(f"BFS          {len(bfs_path):<14} {bfs_explored:<17} {bfs_time:.8f}")
print(f"DFS          {len(dfs_path):<14} {dfs_explored:<17} {dfs_time:.8f}")
print(f"A*           {len(astar_path):<14} {astar_explored:<17} {astar_time:.8f}")

print("=" * 55)


# Display A* solved maze

if not astar_path:
    print("\nNo path found!")
    exit()

solved_maze = [row[:] for row in maze]

for row, col in astar_path:
    solved_maze[row][col] = "*"

solved_maze[start[0]][start[1]] = "S"
solved_maze[end[0]][end[1]] = "E"

print("\nSolved Maze:")

for row in solved_maze:
    print(" ".join(map(str, row)))
