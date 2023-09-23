/*
 * Tarefa 02 - Potenciais Comparsas
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Andrei Carlesso Camilotto
 * Matricula: 2211100026
 */

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

void Grafo::busca_larg(int v, vector<int>& pai, vector<int>& dist, vector<int>& marcado) {
    // Criacao e inicializacao do vetor marcado
    // Inicializacao dos vetores pai e dist
    queue<int> fila;
    marcado[v] = 1;
    pai[v] = -1;
    dist[v] = 0;
    fila.push(v);
    while (!fila.empty()) {
        int w = fila.front();
        fila.pop();
        //printf("%d\n", w);
        for (int u = 0; u < num_vertices_; u++)
            if (matriz_adj_[w][u] != 0)
                if (marcado[u] == 0) {
                    marcado[u] = 1;
                    pai[u] = w;
                    dist[u] = dist[w] + 1;
                    fila.push(u);
        }
    }
}

void Grafo::potenciais_comparsas(int v) {
    list<int> comparsas;
    vector<int> pai(num_vertices_, -1);
    vector<int> dist(num_vertices_, INT_MAX);
    vector<int> marcado(num_vertices_, 0);

    // Executa busca em largura
    busca_larg(v, pai, dist, marcado);

    // Identifica os potenciais comparças
    for (int i = 0; i < num_vertices_; i++){
        if (dist[i] <= 3){
            comparsas.push_front(i);
        }
    }

    // Ordena e imprime a lista
    comparsas.sort();
    cout << v << ": ";
    for (list<int>::iterator it = comparsas.begin(); it != comparsas.end(); ++it) {
        if ((it != comparsas.begin()) && (*it != v)) {
            cout << " ";
        }
        if (*it != v)
            cout << *it;
    }
    cout << endl;
}