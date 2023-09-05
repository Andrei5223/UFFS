#include "Grafo.h"
#include <iostream>

using namespace std;

Grafo::Grafo(int num_vertices) {
    num_vertices_ = num_vertices;
    num_arestas_ = 0;
    matriz_adj_.resize(num_vertices);
    for (int i = 0; i < num_vertices; i++) {
        matriz_adj_[i].resize(num_vertices, 0);
    }
}

/*
Grafo::Grafo(int num_vertices) {
    num_vertices_ = num_vertices;
    num_arestas_ = 0;
    lista_adj_.resize(num_vertices);
}
*/

void Grafo::inserir_aresta(Aresta e) {
    if ((matriz_adj_[e.v1][e.v2] == 0) && (e.v1 != e.v2)){
        matriz_adj_[e.v1][e.v2] = 1;
        matriz_adj_[e.v2][e.v1] = 1;

        num_arestas_++;
    }
}

void Grafo::remover_aresta(Aresta e) {
    if (matriz_adj_[e.v1][e.v2] == 1 ){
        matriz_adj_[e.v1][e.v2] = 0;
        matriz_adj_[e.v2][e.v1] = 0;
        
        num_arestas_--;
    }
}

void Grafo::imprime() {
    for (int i = 0; i < num_vertices_; i++) {
        cout << i << ":";
        for (int j = 0; j < num_vertices_; j++){
            if (matriz_adj_[i][j] == 1){
                cout << " " << j;
            }
        }
        cout << "\n";
    }
}

int Grafo::num_vertices(){
    return num_vertices_;
}

int Grafo::num_arestar(){
    return num_arestas_;
}

bool Grafo::caminho(int v, int w, std::vector<int> marcado) {
    if (v == w) {
        //printf("%d-", v);
        return true;
    }
    marcado[v] = 1;
    for (int u = 0; u < num_vertices_; u++)
        if (matriz_adj_[v][u] != 0)
            if (marcado[u] == 0)
                if (caminho(u, w, marcado)) {
                    //printf("%d-", v);
                    return true;
                }
    return false;
}

bool Grafo::conexo(){
    for (int i = 0; i < num_vertices_; i++){
        std::vector<int> marcado(num_vertices_);
        if (!caminho(0, i, marcado)) return false;
    }
    return true;
}

bool Grafo::clico(){
    // em uma aresta, remova ela e teste se ainda existe um caminho entre os 2 vertices, se encontrar, é um ciclo, se não, teste em todas. Se ainda não, então é acíclico
}

/* código alternativo para verificar se é conexo, by Breno Soares: 
bool Grafo::conexo(){
    for (int i = 0; i < matriz_adj.size(); i++)
    {
        for (int j = 0; j < matriz_adj[i].size(); j++)
        {
            if (i <= j)
                continue;
            int marcado[numero_vertices_] = {0};
            if (!marcado(i, j, marcado))
                return false;
        }
    }
    return true;
}
*/
