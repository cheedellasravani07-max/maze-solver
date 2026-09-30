import heapq


def heuristic(a, b):
    # Manhattan distance
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


def astar(maze, start, end):
    priority_queue = []
    heapq.heappush(priority_queue, (0, start))

    parent = {start: None}
    cost = {start: 0}

    directions = [
        (-1, 0),  # Up
        (1, 0),   # Down
        (0, -1),  # Left
        (0, 1)    # Right
    ]

    while priority_queue:
        _, current = heapq.heappop(priority_queue)

        if current == end:
            break

        row, col = current

        for dr, dc in directions:
            new_row = row + dr
            new_col = col + dc

            if (
                0 <= new_row < len(maze)
                and 0 <= new_col < len(maze[0])
                and maze[new_row][new_col] != "#"
            ):
                new_cell = (new_row, new_col)

                new_cost = cost[current] + 1

                if new_cell not in cost or new_cost < cost[new_cell]:
                    cost[new_cell] = new_cost

                    priority = new_cost + heuristic(new_cell, end)

                    heapq.heappush(
                        priority_queue,
                        (priority, new_cell)
                    )

                    parent[new_cell] = current

    if end not in parent:
        return None

    path = []
    current = end

    while current is not None:
        path.append(current)
        current = parent[current]

    path.reverse()

    return path