/*
 * Tarefa 04 - Desbravo Bros.
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Andrei Carlesso Camilotto
 * Matricula: 2211100026
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

bool Digrafo::bellman_ford_max(int s, std::vector<int>& pai, std::vector<int>& dp) {

    // Para cada vértice w de G
    for (int w = 0; w < num_vertices_; ++w) {
        dp[w] = numeric_limits<int>::min();
        pai[w] = -1;
    }

    dp[s] = 0;


    // Para i = 1 até |V(G)| -1
    for (int i = 1; i <= num_vertices_ - 1; i++) {

        // Para cada aresta uv de G
        for (int u = 0; u < num_vertices_; u++) {       // Percorre u
            for (int v= 0; v < num_vertices_; v++) {    // Percorre v
                if (matriz_adj_[u][v].first == 1){      // Verifica se a aresta existe
                    int peso_uv = matriz_adj_[u][v].second; // Obtém o peso da aresta uv

                    // Se dp[u] != ∞ e dp[v] > dp[u] + p(uv): Faz a relaxação
                    if (dp[u] != numeric_limits<int>::min() && dp[v] < dp[u] + peso_uv) {
                        dp[v] = dp[u] + peso_uv;
                        pai[v] = u;

                    }
                }
            }
        }
    }

    // Verificação de ciclo de peso negativo
    // Para cada aresta uv de G
    for (int u = 0; u < num_vertices_; u++) {       // Percorre u
        for (int v= 0; v < num_vertices_; v++) {    // Percorre v
            if (matriz_adj_[u][v].first == 1){      // Verifica se a aresta existe
                int peso_uv = matriz_adj_[u][v].second;

                // Se ainda for possível relaxar uma aresta, há um ciclo de peso negativo
                // Se dp[u] != ∞ e dp[v] > dp[u] + p(uv): Faz a relaxação
                if (dp[u] != numeric_limits<int>::min() && dp[v] < dp[u] + peso_uv) {
                    return false; // Ciclo de peso negativo encontrado
                }
            }
        }
    }
    // Se não foi encontrado ciclo de peso negativo, o algoritmo foi bem-sucedido
    return true;
}

void Digrafo::max_vidas(std::vector<int> origem) {
    for (auto i: origem){
        vector<int> pai(num_vertices_, -1);
        vector<int> dp(num_vertices_, numeric_limits<int>::min());

        if (bellman_ford_max(i, pai, dp)){
            int max = dp[0];

            for (auto d: dp){
                if (d > max){
                    max = d;
                }
            }

            if (max < 0)
                max = 0;

            cout << i << ": " << max << endl;

        } else {
            cout << i << ": ilimitada" << endl;
        }
    }
}