import pandas as pd
from sklearn.cluster import KMeans
from sklearn.cluster import AffinityPropagation
# https://scikit-learn.org/stable/modules/clustering.html

# Carregue os dados do arquivo CSV
data = pd.read_csv('MusicasJogosDataset_20232_20251.csv')
# Retira a primeira coluna (nome da pessoa) para realizar o agrupamento
x = data.iloc[:, 1:]

# Crie o modelo usando K-Means e define parâmetros essenciais (número de grupos/clusters)
modelo_ia_1 = KMeans(n_clusters=5, random_state=42)
# Crie o modelo usando Affinity Propagation (não requer número de clusters pré-definido)
modelo_ia_2 = AffinityPropagation(random_state=42, preference=-50)
# Treina o modelo
modelo_ia_1.fit(x)
modelo_ia_2.fit(x)
# Adicione rótulos aos dados para indicar a qual grupo cada pessoa pertence
data['Grupo KMeans'] = modelo_ia_1.labels_
data['Grupo Affinity'] = modelo_ia_2.labels_

# Ordena dados usando coluna de agrupamento
data = data.sort_values(by=['Grupo KMeans'])
# Salva os resultados em arquivo
print("\nResultado do KMeans")
data.iloc[:, [0, -2, -1]].to_csv('resultado.csv', index=False)
with pd.option_context('display.max_rows', None, 'display.max_columns', 4):
    print(data)

# Ordena dados usando coluna de agrupamento
data = data.sort_values(by=['Grupo Affinity'])
# Salva os resultados em arquivo
print("\nResultado do Affinity Propagation")
data.iloc[:, [0, -2, -1]].to_csv('resultado_2.csv', index=False)
with pd.option_context('display.max_rows', None, 'display.max_columns', 4):
    print(data)

# Crie um DataFrame com os centros dos grupos
centros = pd.DataFrame(modelo_ia_1.cluster_centers_, columns=data.columns.values[1:-2])
# Arredonda valores com 2 casas decimais
centros = centros.round(2)
# Adicione uma coluna para identificar os centros dos grupos
centros['Nome'] = ['Centro ' + str(i) for i in range(modelo_ia_1.n_clusters)]
# Salva os resultados em arquivo
print("\nCentros do KMeans")
centros.to_csv('grupos.csv', index=False)
with pd.option_context('display.max_rows', None, 'display.max_columns', None, 'display.width', 1000):
    print(centros)

# Crie um DataFrame com os centros dos grupos do Affinity Propagation
centros = x.iloc[modelo_ia_2.cluster_centers_indices_].copy()
# Arredonda valores com 2 casas decimais
centros = centros.round(2)
# Adicione uma coluna para identificar os centros dos grupos
centros['Nome'] = ['Centro ' + str(i) for i in range(len(modelo_ia_2.cluster_centers_indices_))]
# Salva os resultados em arquivo
print("\nCentros do Affinity Propagation")
centros.to_csv('grupos_2.csv', index=False)
with pd.option_context('display.max_rows', None, 'display.max_columns', None, 'display.width', 1000):
    print(centros)


import numpy as np

# Obtém os rótulos de cada algoritmo
labels_kmeans = data['Grupo KMeans'].values
labels_affinity = data['Grupo Affinity'].values

# Identifica os grupos únicos de cada método
grupos_kmeans = np.unique(labels_kmeans)
grupos_affinity = np.unique(labels_affinity)

# Cria uma matriz para armazenar a porcentagem de interseção
similaridade = pd.DataFrame(index=[f'KMeans {i}' for i in grupos_kmeans],
                            columns=[f'Affinity {j}' for j in grupos_affinity])

# Preenche a matriz de similaridade
for i in grupos_kmeans:
    indices_kmeans = (labels_kmeans == i)
    total_kmeans = np.sum(indices_kmeans)
    
    for j in grupos_affinity:
        indices_affinity = (labels_affinity == j)
        intersecao = np.sum(indices_kmeans & indices_affinity)
        
        # Percentual de elementos do grupo i do KMeans que também estão no grupo j do Affinity
        percentual = 100 * intersecao / total_kmeans if total_kmeans > 0 else 0
        similaridade.loc[f'KMeans {i}', f'Affinity {j}'] = f'{percentual:.2f}%'

# Exibe a matriz de similaridade
print("\nSimilaridade entre grupos KMeans e Affinity Propagation (% dos elementos do grupo KMeans que também estão no grupo Affinity):")
print(similaridade.to_string())

# Salva o resultado em arquivo CSV
similaridade.to_csv('similaridade_kmeans_affinity.csv')


# Cria nova matriz para armazenar a similaridade invertida
similaridade_invertida = pd.DataFrame(index=[f'Affinity {j}' for j in grupos_affinity],
                                      columns=[f'KMeans {i}' for i in grupos_kmeans])

# Preenche a matriz de similaridade invertida
for j in grupos_affinity:
    indices_affinity = (labels_affinity == j)
    total_affinity = np.sum(indices_affinity)
    
    for i in grupos_kmeans:
        indices_kmeans = (labels_kmeans == i)
        intersecao = np.sum(indices_kmeans & indices_affinity)

        # Percentual de elementos do grupo j do Affinity que também estão no grupo i do KMeans
        percentual = 100 * intersecao / total_affinity if total_affinity > 0 else 0
        similaridade_invertida.loc[f'Affinity {j}', f'KMeans {i}'] = f'{percentual:.2f}%'

# Exibe a matriz de similaridade invertida
print("\nSimilaridade entre grupos Affinity Propagation e KMeans (% dos elementos do grupo Affinity que também estão no grupo KMeans):")
print(similaridade_invertida.to_string())

# Salva o resultado em arquivo CSV
similaridade_invertida.to_csv('similaridade_affinity_kmeans.csv')


from sklearn.metrics import silhouette_score

score_kmeans = silhouette_score(x, modelo_ia_1.labels_)
score_affinity = silhouette_score(x, modelo_ia_2.labels_)

print(f"Silhouette Score - KMeans: {score_kmeans:.4f}")
print(f"Silhouette Score - Affinity Propagation: {score_affinity:.4f}")


import matplotlib.pyplot as plt

# Carrega os centros do Affinity Propagation
centros_affinity = pd.read_csv('grupos_2.csv')

# Move a última coluna ('Nome') para a primeira posição
cols = centros_affinity.columns.tolist()
cols = [cols[-1]] + cols[:-1]
centros_affinity = centros_affinity[cols]

# Cria uma imagem da tabela usando matplotlib
fig, ax = plt.subplots(figsize=(centros_affinity.shape[1] + 2, centros_affinity.shape[0] + 2))
ax.axis('off')
tabela = ax.table(cellText=centros_affinity.values,
                  colLabels=centros_affinity.columns,
                  loc='center',
                  cellLoc='center')
tabela.auto_set_font_size(False)
tabela.set_fontsize(10)
tabela.auto_set_column_width(col=list(range(len(centros_affinity.columns))))
plt.title('Centros dos Grupos - Affinity Propagation', pad=20)
plt.tight_layout()
plt.savefig('tabela_centros_affinity.png')
plt.show()