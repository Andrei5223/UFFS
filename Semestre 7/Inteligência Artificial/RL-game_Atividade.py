import numpy as np
import gymnasium as gym
from gymnasium import spaces
import matplotlib.pyplot as plt
from collections import defaultdict
import random
import pickle


class MazeEnv(gym.Env):
    def __init__(self):
        super(MazeEnv, self).__init__()

        # Define grid size
        self.height = 20
        self.width = 20

        # Define elements
        self.EMPTY = 0
        self.WALL = 1
        self.HOLE = 2
        self.AGENT = 3
        self.GOAL = 4
        self.ENEMY = 5
        self.AGENT_POSITION = [1, 1]
        self.ENEMY_POSITION = [14, 14]

        # Initialize visualization
        self.fig, self.ax = plt.subplots(figsize=(7, 5))
        plt.ion()

        # Action space: up, right, down, left
        self.action_space = spaces.Discrete(4)
        # Observation space: single number representing state
        self.observation_space = spaces.Discrete(self.height * self.width)

        # Set agent, enemy and goal position
        self.agent_pos = self.AGENT_POSITION.copy()
        self.enemy_pos = self.ENEMY_POSITION.copy()
        self.goal_pos = [15, 15]
        self.turn = 0

        # Create grid
        self.grid = np.zeros((self.height, self.width))
        self.grid_initialization()

    def grid_initialization(self):
        self.grid = np.zeros((self.height, self.width))
        # Add border walls
        self.grid[0:self.height, 0] = self.WALL
        self.grid[0, 0:self.width ] = self.WALL
        self.grid[self.height-1, 0:self.width] = self.WALL
        self.grid[0:self.height , self.width-1] = self.WALL
        # Add inner walls

        #extra wall
        self.grid[13,15] = self.WALL

        self.grid[2:9, 2] = self.WALL
        self.grid[2:9, 4] = self.WALL
        self.grid[2:9, 8] = self.WALL
        self.grid[2:6, 10:15] = self.WALL
        self.grid[1:6, 16:19] = self.WALL
        self.grid[2, 6:8] = self.WALL
        self.grid[4, 5:7] = self.WALL
        self.grid[6, 6:8] = self.WALL
        self.grid[8, 5:7] = self.WALL
        self.grid[7:9, 10:12] = self.WALL
        self.grid[7:9, 13:15] = self.WALL
        self.grid[7:14, 16:18] = self.WALL
        self.grid[14:16, 17] = self.WALL
        self.grid[10, 1:3] = self.WALL
        self.grid[10, 4:7] = self.WALL
        self.grid[10, 8:11] = self.WALL
        self.grid[10, 12:14] = self.WALL
        self.grid[11, 9:14:4] = self.WALL
        self.grid[12, 2:7:2] = self.WALL
        self.grid[12, 7] = self.WALL
        self.grid[14, 1:8:2] = self.WALL
        self.grid[17, 3:12:4] = self.WALL
        self.grid[18, 5:14:4] = self.WALL
        self.grid[15, 7] = self.WALL
        self.grid[16, 3:13] = self.WALL
        self.grid[13, 13:15] = self.WALL
        self.grid[14, 13] = self.WALL
        self.grid[15, 12:15] = self.WALL
        self.grid[16, 14:16] = self.WALL
        self.grid[17, 15:18] = self.WALL
        # Add holes
        self.grid[15, 1] = self.HOLE
        self.grid[17, 2] = self.HOLE
        self.grid[6, 12] = self.HOLE
        self.grid[14, 9] = self.HOLE
        self.grid[13, 10] = self.HOLE
        self.grid[12, 11] = self.HOLE
        self.grid[16, 13] = self.HOLE
        # Set initial positions
        self.grid[self.agent_pos[0], self.agent_pos[1]] = self.AGENT
        self.grid[self.goal_pos[0], self.goal_pos[1]] = self.GOAL
        self.grid[self.enemy_pos[0], self.enemy_pos[1]] = self.ENEMY

    def get_state(self):
        # Calculate Manhattan distance to goal
        manhattan_distance_to_goal = abs(self.agent_pos[0] - self.goal_pos[0]) + abs(self.agent_pos[1] - self.goal_pos[1])
        
        # Calculate Manhattan distance to enemy
        manhattan_distance_to_enemy = abs(self.agent_pos[0] - self.enemy_pos[0]) + abs(self.agent_pos[1] - self.enemy_pos[1])
        
        if manhattan_distance_to_enemy > 3:
            manhattan_distance_to_enemy = 0
        
        state = self.agent_pos[0] * self.width + self.agent_pos[1]
        
        # # Add sensor information
        # sensor = 0  # Default: no enemy nearby
        # if self.agent_pos[0] > 0 and self.grid[self.agent_pos[0] - 1, self.agent_pos[1]] == self.ENEMY:  # Up
        #     sensor = 1

        # return state, sensor

        return state, manhattan_distance_to_enemy

    def step(self, action):
        # Save previous position
        prev_pos = self.enemy_pos.copy()

        # Move enemy
        if self.turn % 8 < 2:  # right
            self.enemy_pos[1] = min(self.width - 1, self.enemy_pos[1] + 1)
        elif self.turn % 8 < 4:  # down
            self.enemy_pos[0] = min(self.height - 1, self.enemy_pos[0] + 1)
        elif self.turn % 8 < 6:  # up
            self.enemy_pos[0] = max(0, self.enemy_pos[0] - 1)
        elif self.turn % 8 < 8:  # left
            self.enemy_pos[1] = max(0, self.enemy_pos[1] - 1)

        # Update grid
        self.grid[prev_pos[0], prev_pos[1]] = self.EMPTY
        self.grid[self.enemy_pos[0], self.enemy_pos[1]] = self.ENEMY

        # Add 1 turn
        self.turn += 1

        # Save previous position
        prev_pos = self.agent_pos.copy()

        # Enemy caught agent
        if self.grid[self.agent_pos[0], self.agent_pos[1]] == self.ENEMY:
            return self.get_state(), -100, True, False, {}

        # Move agent
        if action == 0:  # up
            self.agent_pos[0] = max(0, self.agent_pos[0] - 1)
        elif action == 1:  # right
            self.agent_pos[1] = min(self.width - 1, self.agent_pos[1] + 1)
        elif action == 2:  # down
            self.agent_pos[0] = min(self.height - 1, self.agent_pos[0] + 1)
        elif action == 3:  # left
            self.agent_pos[1] = max(0, self.agent_pos[1] - 1)

        # Check if new position is valid
        new_pos_value = self.grid[self.agent_pos[0], self.agent_pos[1]]

        # Define rewards and terminal states
        done = False
        reward = -1  # small negative reward for each step

        if new_pos_value == self.WALL:
            self.agent_pos = prev_pos  # revert move
            reward = -5
        elif new_pos_value == self.HOLE or new_pos_value == self.ENEMY:
            done = True
            reward = -100
        elif self.agent_pos == self.goal_pos:
            done = True
            reward = 150
            
        # Update grid
        if new_pos_value != self.WALL:
            self.grid[prev_pos[0], prev_pos[1]] = self.EMPTY
            self.grid[self.agent_pos[0], self.agent_pos[1]] = self.AGENT

        return self.get_state(), reward, done, False, {}

    def reset(self, *, seed = None, options = None, return_info = False,):
        super().reset(seed=seed)
        # Reset game to initial state
        self.turn = 0
        self.agent_pos = self.AGENT_POSITION.copy()
        self.enemy_pos = self.ENEMY_POSITION.copy()
        self.grid_initialization()
        return self.get_state(), {}

    def render(self):
        self.ax.clear()
        # Define colors for each element
        colors = {
            self.EMPTY: 'white',
            self.WALL: 'gray',
            self.HOLE: 'black',
            self.AGENT: 'blue',
            self.GOAL: 'green',
            self.ENEMY: 'red'
        }

        name = {
            self.EMPTY: 'Vazio',
            self.WALL: 'Parede',
            self.HOLE: 'Buraco',
            self.AGENT: 'Agente',
            self.GOAL: 'Objetivo',
            self.ENEMY: 'Inimigo'
        }

        # Create color map
        cmap = plt.cm.colors.ListedColormap(list(colors.values()))
        # Plot the grid
        self.ax.imshow(self.grid, cmap=cmap)

        # Add legend
        legend_elements = [plt.Rectangle((0, 0), 1, 1, facecolor=color, label=name[key])
                           for key, color in colors.items()]
        self.ax.legend(handles=legend_elements, loc='center left', bbox_to_anchor=(1, 0.5))

        plt.axis('off')
        plt.pause(0.2)
        self.fig.canvas.draw()


env = MazeEnv()
state, _ = env.reset()
done = False

tabelaQ = defaultdict(lambda: np.zeros(env.action_space.n))

# Taxa de aprendizagem
alpha = 0.2
# Taxa de desconto
lamba = 0.9
# Taxa de exploração
e = 0.8
e_min = 0.5
taxa_decaimento = 0.995

win_rate = 0
win_history = []

qt_simulacao = 10000
for simulacao in range(qt_simulacao):
    print(f"\rSimulação atual: {simulacao + 1}", end="")
    state, _ = env.reset()
    done = False
    while not done:
        # Exploração
        if np.random.rand() < e:  
            action = env.action_space.sample()
        # Explotação
        else:
            action = np.argmax(tabelaQ[state])

        # Decaimento da taxa de exploração
        e = max(e_min, e * taxa_decaimento)

        # Executa a ação no ambiente
        next_state, reward, done, _, _ = env.step(action)

        # Atualiza tabela Q
        if state not in tabelaQ:
            tabelaQ[state] = np.zeros(env.action_space.n)
        if next_state not in tabelaQ:
            tabelaQ[next_state] = np.zeros(env.action_space.n)
        tabelaQ[state][action] = (1 - alpha) * tabelaQ[state][action] + \
            alpha * (reward + lamba * np.max(tabelaQ[next_state]))

        state = next_state

    # Atualiza histórico de vitórias
    if reward > 0:
        win_history.append(1)
    else:
        win_history.append(0)

    if len(win_history) > 10:
        win_history = win_history[-10:]

    win_rate = sum(win_history) / len(win_history)

    # Verifica se a taxa de vitória atingiu o limite desejado
    if win_rate >= 1:
        print(f"\nTaxa de vitória de {win_rate * 100:.2f}% atingida na simulação {simulacao + 1}")
        break

    # Realiza simulações adicionais usando apenas explotação para verificar a taxa de vitória
    # if qt_simulacao % 100:
    #     win_history = []
    #     qt_teste = 10
    #     for teste_simulacao in range(qt_teste):
    #         state, _ = env.reset()
    #         done = False
    #         while not done:
    #             action = np.argmax(tabelaQ[:, state])
    #             next_state, reward, done, _, _ = env.step(action)
    #             state = next_state
    #         if reward > 0:
    #             win_history.append(1)
    #         else:
    #             win_history.append(0)
        
    #     win_rate = sum(win_history) / len(win_history)
    #     if win_rate >= 0.8:
    #         print(f"Simulações: {qt_simulacao}, Taxa de vitória em teste: {win_rate * 100:.2f}%")
    #         break

else:
    print(f"\nLimite de {qt_simulacao} jogos atingido sem atingir a taxa de vitória desejada.")

print("Treino completo.")

# Executa mais um jogo com renderização usando apenas explotação

state, _ = env.reset()
done = False
while not done:
    action = np.argmax(tabelaQ[state])
    next_state, reward, done, _, _ = env.step(action)
    state = next_state
    env.render()
