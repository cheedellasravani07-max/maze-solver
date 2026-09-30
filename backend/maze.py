def is_valid_maze(maze, start, end):
    if not maze:
        return False

    rows = len(maze)
    cols = len(maze[0])

    # Check all rows have the same number of columns
    if any(len(row) != cols for row in maze):
        return False

    # Check start and end are inside the maze
    if not (0 <= start[0] < rows and 0 <= start[1] < cols):
        return False

    if not (0 <= end[0] < rows and 0 <= end[1] < cols):
        return False

    # Start and end cannot be walls
    if maze[start[0]][start[1]] == "#":
        return False

    if maze[end[0]][end[1]] == "#":
        return False

    return True