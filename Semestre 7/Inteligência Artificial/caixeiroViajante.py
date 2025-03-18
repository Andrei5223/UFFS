import random
from collections import deque
import time
import heapq

# Função para gerar um grafo aleatório com pesos
def generate_random_graph(num_nodes, max_weight=10):
    graph = {}
    for i in range(num_nodes):
        graph[i] = {}
        for j in range(num_nodes):
            if i != j:
                # Peso aleatório entre 1 e max_weight
                graph[i][j] = random.randint(1, max_weight)
    return graph

# Função que implementa o algoritmo de Dijkstra
def dijkstra(graph, start):
    # Inicializando distâncias e caminhos
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    previous_nodes = {node: None for node in graph}
    pq = [(0, start)]  # Fila de prioridade com o custo e o nó atual (custo, nó)

    while pq:
        current_distance, current_node = heapq.heappop(pq)
        
        # Se o custo atual é maior que a distância registrada, ignoramos
        if current_distance > distances[current_node]:
            continue
        
        # Explora os vizinhos do nó atual
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            
            # Se o novo custo for menor, atualizamos a distância e o nó anterior
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous_nodes[neighbor] = current_node
                heapq.heappush(pq, (distance, neighbor))

    return distances, previous_nodes

# Função para reconstruir o caminho a partir dos nós anteriores
def reconstruct_path(previous_nodes, start, end):
    path = []
    current_node = end
    while current_node is not None:
        path.append(current_node)
        current_node = previous_nodes[current_node]
    path.reverse()
    return path

# Função para exibir o grafo
def display_graph(graph):
    for node, neighbors in graph.items():
        print(f"Cidade {node}: {neighbors}")

# Exemplo de uso
num_cities = 40  # Número de cidades no grafo

print("Started Random Graph")
# Gerar um grafo aleatório
graph = generate_random_graph(num_cities)

# Exibir o grafo gerado
# print("Grafo gerado com pesos:")
# display_graph(graph)

# Measure the time to find the solution using BFS
start_time1 = time.time()

# Executar Dijkstra a partir da cidade 0 (ou qualquer cidade inicial)
start_city = 0
print("Started Dijkstra")
distances, previous_nodes = dijkstra(graph, start_city)

end_time1 = time.time()
elapsed_time1 = end_time1 - start_time1

# Print the time taken to solve
print(f"Time taken to find the solution Dijkstra: {elapsed_time1:.6f} seconds\nNum cities: {num_cities}")

# Encontrar o caminho de menor custo entre a cidade 0 e todas as outras cidades
# for end_city in range(num_cities):
#     if end_city != start_city:
#         path = reconstruct_path(previous_nodes, start_city, end_city)
#         print(f"Caminho de cidade {start_city} para cidade {end_city}: {path}")
#         print(f"Custo total: {distances[end_city]}")
