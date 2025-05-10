import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from matplotlib.colors import ListedColormap
from sklearn.cluster import DBSCAN
from sklearn.datasets import make_blobs

# Dataset
centers = [[1, 1], [-1, -1], [1, -1]]
X, y_true = make_blobs(
    n_samples=750, centers=centers, cluster_std=0.4, random_state=0
)

# Configurações
plt.style.use('seaborn-v0_8')
eps_values = np.linspace(0.1, 0.5, 50)
min_samples = 10

# Pré-processamento
history = []
for eps in eps_values:
    db = DBSCAN(eps=eps, min_samples=min_samples)
    history.append(db.fit_predict(X))

# Colormap com cores únicas para até 10 clusters + ruído
cmap_colors = ['gray'] + list(plt.get_cmap('tab20').colors[:19])
cmap = ListedColormap(cmap_colors)

# Configuração do gráfico
fig, ax = plt.subplots(figsize=(10, 6))
ax.set_xlim(-2.0, 2.0)
ax.set_ylim(-2.0, 2.0)
scat = ax.scatter(X[:, 0], X[:, 1], c=history[0], cmap=cmap, s=50, alpha=0.7, vmin=-1, vmax=len(cmap_colors)-1)
info_text = ax.text(0.02, 0.95, '', transform=ax.transAxes, fontsize=12, 
                    bbox=dict(facecolor='white', alpha=0.8))

def update(frame):
    labels = history[frame]
    
    # Mapeamento único de rótulos para índices sequenciais
    unique_labels = np.unique(labels)
    label_mapping = {label: idx+1 for idx, label in enumerate(unique_labels[unique_labels != -1])}
    adjusted_labels = np.array([label_mapping.get(lbl, 0) for lbl in labels])  # 0 = ruído
    
    scat.set_array(adjusted_labels)
    
    # Estatísticas
    n_clusters = len(label_mapping)
    n_noise = (labels == -1).sum()
    
    info_text.set_text(
        f'DBSCAN Parameters:\nε = {eps_values[frame]:.2f}\nClusters: {n_clusters}\nNoise points: {n_noise}\nmin_samples = {min_samples}'
    )
    
    return scat, info_text

# Salvar o GIF completo
ani = FuncAnimation(fig, update, frames=len(history), interval=150, blit=True)
path = r'd:/User/Documentos/GitHub/UFFS/Semestre 7/Machine Learning/'
ani.save(f'{path}dbscan_evolution_complete.gif', writer='pillow', fps=8, dpi=100)

# Atualizar o gráfico para o último frame
update(len(history) - 1)

# Salvar apenas o último frame como imagem
fig.savefig(f'{path}dbscan.jpg', dpi=100)

# Exibir a animação
plt.show()