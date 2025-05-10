import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans

# Configurações gerais
plt.style.use('seaborn-v0_8')

# Gerar dados mais desafiadores

centers = [[1, 1], [-1, -1], [1, -1]]
X, y_true = make_blobs(
    n_samples=750, centers=centers, cluster_std=0.4, random_state=0
)

# Forçar uma inicialização ruim manualmente
bad_centroids = np.array([[1, 0], [-1, 0], [-1, 1.5]])  # Centróides nas bordas

# Configurar evolução do algoritmo
history = []
n_iterations = 20  # Aumentamos o número de iterações

# Primeira iteração com inicialização ruim
kmeans = KMeans(n_clusters=3, init=bad_centroids, max_iter=1, n_init=1)
kmeans.fit(X)
history.append({
    'labels': kmeans.labels_.copy(),
    'centroids': kmeans.cluster_centers_.copy()
})

# Iterações subsequentes
for _ in range(n_iterations - 1):
    kmeans = KMeans(n_clusters=3, init=history[-1]['centroids'], max_iter=1, n_init=1)
    kmeans.fit(X)
    history.append({
        'labels': kmeans.labels_.copy(),
        'centroids': kmeans.cluster_centers_.copy()
    })

# Configurar animação
fig, ax = plt.subplots(figsize=(10, 6))
ax.set_xlim(-2.0, 2.0)
ax.set_ylim(-2.0, 2.0)

scat = ax.scatter(X[:, 0], X[:, 1], c=history[0]['labels'], cmap='tab10', s=50, alpha=0.7)
centroids_plot = ax.scatter([], [], c='black', marker='X', s=200, edgecolor='red', linewidth=2)

def update(frame):
    # Atualizar pontos
    scat.set_array(history[frame]['labels'])
    
    # Atualizar centróides com trail
    current_centroids = history[frame]['centroids']
    
    # Manter histórico dos centróides para mostrar o rastro
    if frame > 0:
        prev_centroids = history[frame-1]['centroids']
        ax.plot([prev_centroids[:,0], current_centroids[:,0]],
                [prev_centroids[:,1], current_centroids[:,1]], 
                c='gray', alpha=0.4, linestyle='--')
    
    centroids_plot.set_offsets(current_centroids)
    
    # Adicionar número da iteração
    ax.set_title(f'Movimento dos Centróides', fontsize=12)
    
    return scat, centroids_plot

ani = FuncAnimation(fig, update, frames=n_iterations, interval=600, blit=True)
ani.save('kmeans_evolution.gif', writer='pillow', fps=2, dpi=100)
plt.show()