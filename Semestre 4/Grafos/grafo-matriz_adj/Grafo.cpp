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

int Grafo::num_arestas(){
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


bool Grafo::ciclo() {
    for (int v = 0; v < num_vertices_; v++) {
        for (int w = 0; w < num_vertices_; w++) {
            if (matriz_adj_[v][w] == 1) {
                // remove temporariamente a aresta (v, w)
                matriz_adj_[v][w] = 0;
                matriz_adj_[w][v] = 0;

                std::vector<int> marcado(num_vertices_, 0);
                
                if (caminho(v, w, marcado)) {
                    // repoe a aresta (v, w)
                    matriz_adj_[v][w] = 1;
                    matriz_adj_[w][v] = 1;
                    return true; // ciclo encontrado
                }

                // repoe a aresta (v, w)
                matriz_adj_[v][w] = 1;
                matriz_adj_[w][v] = 1;
            }
        }
    }
    return false; // ciclo não encontrado
}

bool Grafo::conexo1(){
    for (int i = 0; i < num_vertices_; i++){
        std::vector<int> marcado(num_vertices_);
        if (!caminho(0, i, marcado)) return false;
    }
    return true;
}

/* código alternativo para verificar se é conexo, by Breno Soares: */
bool Grafo::conexo2(){
    for (int i = 0; i < matriz_adj_.size(); i++) {
        for (int j = 0; j < matriz_adj_[i].size(); j++) {
            if (i <= j)
                continue;
            std::vector<int> marcado(num_vertices_);
            if (!caminho(i, j, marcado))
                return false;
        }
    }
    return true;
}

void Grafo::busca_prof(int v, int marcado[]) {
    //printf("%d\n", v);
    marcado[v] = 1;
    for (int u = 0; u < num_vertices_; u++)
        if (matriz_adj_[v][u] != 0)
            if (marcado[u] == 0)
                busca_prof(u, marcado);
}

bool Grafo::conexoDFS() {
    // Array para marcar vértices visitados
    int marcado[num_vertices_];
    for (int i = 0; i < num_vertices_; i++) {
        marcado[i] = 0;
    }

    // Chama DFS a partir do vértice 0
    busca_prof(0, marcado);

    // Verifica se todos os vértices foram visitados
    for (int i = 0; i < num_vertices_; i++) {
        if (marcado[i] == 0) {
            // Se algum vértice não foi visitado, o grafo não é conexo
            return false;
        }
    }
    
    // Se todos os vértices foram visitados, o grafo é conexo
    return true;
}

bool Grafo::cicloDFSrecursivo(int v, int marcado[], int anterior) {
    //printf("%d\n", v);
    marcado[v] = 1;
    bool resultado = true;

    for (int u = 0; u < num_vertices_; u++)
        if (matriz_adj_[v][u] != 0)
            if (marcado[u] == 0)
                resultado = cicloDFSrecursivo(u, marcado, v);
            else if ((u != anterior) || (!resultado))
                return false;
    return true; 
}

bool Grafo::cicloDFS() {
    // Array para marcar vértices visitados
    int marcado[num_vertices_];
    for (int i = 0; i < num_vertices_; i++) {
        marcado[i] = 0;
    }

    int anterior = -1;

    return cicloDFSrecursivo(0, marcado, anterior);
}

int Grafo::grau(int v){
    int count = 0;
    for (int i = 0; i < num_vertices_; i++){
        if (matriz_adj_[v][i] != 0)
            count++;
    }
    return count;
}

void Grafo::busca_prof_grau(int v, int marcado[], std::vector<int> graus) {
    //printf("%d\n", v);

    // verifica se o grau do vertice atual é par e marca
    if (grau(v) % 2 != 0){
        graus[v]=1;
    }

    marcado[v] = 1;

    for (int u = 0; u < num_vertices_; u++){
        if (matriz_adj_[v][u] != 0)
            if (marcado[u] == 0)
                busca_prof_grau(u, marcado, graus);
    }
}


bool Grafo::euleriano() {
    std::vector<int> graus(num_vertices_);

    int marcado[num_vertices_];
    for (int i = 0; i < num_vertices_; i++) {
        graus[i] = grau(i);
        if (grau(i) == 0){
            marcado[i] = 1;
        } else {
            marcado[i] = 0;
        }
    }

    // Chama DFS a partir do vértice 0
    busca_prof(0, marcado);

    // Verifica se todos os vértices foram visitados e se possuem grau par
    for (int i = 0; i < num_vertices_; i++) {
        if ((marcado[i] == 0 || graus[i] == 1)) {
            return false;
        }
    }

    // Se todos os vértices foram visitados, o grafo é conexo
    return true;
}