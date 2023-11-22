/*
 * Tarefa 04 - Desbravo Bros.
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      XXXX
 * Matricula: XXXX
 */

#include "Digrafo.h"
#include <iostream>
#include <limits>

using namespace std;

Digrafo::Digrafo(int num_vertices) {
    num_vertices_ = num_vertices;
    num_arestas_ = 0;
    matriz_adj_.resize(num_vertices);
    for (int i = 0; i < num_vertices; i++) {
        matriz_adj_[i].resize(num_vertices);
    }
}

void Digrafo::inserir_aresta(Aresta e) {
    if ((matriz_adj_[e.v1][e.v2].first == 0) && (e.v1 != e.v2)){
        matriz_adj_[e.v1][e.v2].first = 1;
        matriz_adj_[e.v1][e.v2].second = e.peso;
        num_arestas_++;
    }
}

void Digrafo::imprime() {
    for (int i = 0; i < num_vertices_; i++) {
        cout << i << ":";
        for (int j = 0; j < num_vertices_; j++){
            if (matriz_adj_[i][j].first == 1){
                cout << " " << j << "peso: " << matriz_adj_[i][j].second;
            }
        }
        cout << "\n";
    }
}

bool Digrafo::bellman_ford(int s, std::vector<int>& pai, std::vector<int>& dp) {
    // Inicialização: Configuração dos vetores dp e pai para valores iniciais
    for (int w = 0; w < num_vertices_; ++w) {
        dp[w] = numeric_limits<int>::max(); // Inicializa todas as distâncias como infinito
        pai[w] = -1; // Define todos os pais como -1
    }

    dp[s] = 0; // A distância para o vértice de origem é 0

    // Relaxamento: Iterações para encontrar as distâncias mais curtas
    for (int i = 1; i <= num_vertices_ - 1; ++i) {
        for (int u = 0; u < num_vertices_; ++u) {
            // Itera sobre todas as arestas saindo do vértice u
            for (const auto& uv : matriz_adj_[u]) {
                int v = uv.first; // Vértice de destino da aresta
                int peso_uv = uv.second; // Peso da aresta de u para v

                // Relaxamento da aresta: Atualiza dp[v] se encontrar um caminho mais curto
                if (dp[u] != numeric_limits<int>::max() && dp[v] > dp[u] + peso_uv) {
                    dp[v] = dp[u] + peso_uv;
                    pai[v] = u;
                }
            }
        }
    }

    // Verificação de ciclo de peso negativo
    for (int u = 0; u < num_vertices_; ++u) {
        for (const auto& uv : matriz_adj_[u]) {
            int v = uv.first;
            int peso_uv = uv.second;

            // Se ainda for possível relaxar uma aresta, há um ciclo de peso negativo
            if (dp[u] != numeric_limits<int>::max() && dp[v] > dp[u] + peso_uv) {
                return false; // Ciclo de peso negativo encontrado
            }
        }
    }

    // Se não foi encontrado ciclo de peso negativo, o algoritmo foi bem-sucedido
    return true;
}