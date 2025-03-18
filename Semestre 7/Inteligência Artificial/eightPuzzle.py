from collections import deque
import random
import time

# Function to get the possible moves for a state
def get_possible_moves(state):
    moves = []
    zero_pos = state.index(0)
    row, col = divmod(zero_pos, 3)

    # Directions: Up, Down, Left, Right
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
    for dr, dc in directions:
        new_row, new_col = row + dr, col + dc
        if 0 <= new_row < 3 and 0 <= new_col < 3:
            new_zero_pos = new_row * 3 + new_col
            new_state = state[:]
            new_state[zero_pos], new_state[new_zero_pos] = new_state[new_zero_pos], new_state[zero_pos]
            moves.append(new_state)
    
    return moves

# Function to shuffle the puzzle by performing random valid moves
def shuffle_puzzle(initial_state, shuffle_moves=100):
    current_state = initial_state[:]
    
    for _ in range(shuffle_moves):
        # Get possible valid moves
        moves = get_possible_moves(current_state)
        
        # Randomly select one of the valid moves
        current_state = random.choice(moves)
    
    return current_state

# Display function to print puzzle state
def display(state):
    for i in range(0, 9, 3):
        print(state[i:i+3])

# Function to get the possible moves
def get_possible_moves(state):
    moves = []
    zero_pos = state.index(0)
    row, col = divmod(zero_pos, 3)

    # Directions: Up, Down, Left, Right
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
    for dr, dc in directions:
        new_row, new_col = row + dr, col + dc
        if 0 <= new_row < 3 and 0 <= new_col < 3:
            new_zero_pos = new_row * 3 + new_col
            new_state = state[:]
            new_state[zero_pos], new_state[new_zero_pos] = new_state[new_zero_pos], new_state[zero_pos]
            moves.append(new_state)
    
    return moves

# Function to perform BFS on the 8-puzzle
def bfs(initial_state):
    # BFS queue
    queue = deque([(initial_state, [])])
    visited = set()
    visited.add(tuple(initial_state))

    while queue:
        current_state, path = queue.popleft()

        # Check if we reached the goal
        if current_state == goal_state:
            return path

        # Get possible moves and add them to the queue
        for move in get_possible_moves(current_state):
            move_tuple = tuple(move)
            if move_tuple not in visited:
                visited.add(move_tuple)
                queue.append((move, path + [move]))

    return None  # No solution found

# Function to display the state of the puzzle
def display(state):
    for i in range(0, 9, 3):
        print(state[i:i+3])

# Example usage
# initial_state = [1, 2, 3, 4, 5, 6, 7, 0, 8]  # Example initial state
initial_state = [8, 6, 7, 
                 2, 5, 4, 
                 3, 0, 1]

# Example usage
goal_state = [1, 2, 3, 
              4, 5, 6, 
              7, 8, 0]

# Shuffle the puzzle starting from the goal state
shuffled_state = shuffle_puzzle(goal_state, shuffle_moves=1000)

# print("Shuffled Puzzle State:")
# display(shuffled_state)

# Measure the time to find the solution using BFS
start_time = time.time()

print("Initial State:")
display(initial_state)
print("\nSolving the puzzle...\n")

solution_path = bfs(initial_state)

end_time = time.time()
elapsed_time = end_time - start_time

# Print the time taken to solve
print(f"Time taken to find the solution: {elapsed_time:.6f} seconds")

if solution_path:
    print(f"Solution found in {len(solution_path)} moves:\n")
    for step in solution_path:
        # display(step)
        # print()
        pass
else:
    print("No solution found.")

