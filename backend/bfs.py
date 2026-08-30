from collections import deque


def bfs(maze, start, end):
    queue = deque([start])
    visited = {start}
    parent = {start: None}

    directions = [
        (-1, 0),  # Up
        (1, 0),   # Down
        (0, -1),  # Left
        (0, 1)    # Right
    ]

    while queue:
        current = queue.popleft()

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
                and (new_row, new_col) not in visited
            ):
                new_cell = (new_row, new_col)

                queue.append(new_cell)
                visited.add(new_cell)
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