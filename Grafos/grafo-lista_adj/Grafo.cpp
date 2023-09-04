/*
 * Tarefa 01 - Grafo - Listas de Adjacencia
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Andrei Camilotto
 * Matricula: 2211100026
 */

#include "Grafo.h"
#include <iostream>

using namespace std;

Grafo::Grafo(int num_vertices) {
    num_vertices_ = num_vertices;
    num_arestas_ = 0;
    lista_adj_.resize(num_vertices);
}

// Verifica se a lista já contém um valor
int contains(list<int> lista, int vertice){
    for (list<int>::iterator it = lista.begin(); it != lista.end(); ++it) {
        if (*it == vertice){
            return 1;
        }
    }
    return 0;
}

void Grafo::inserir_aresta(Aresta e) {
    if (contains(lista_adj_[e.v1], e.v2) == 0){
        lista_adj_[e.v1].push_front(e.v2);
        lista_adj_[e.v2].push_front(e.v1);
        num_arestas_++;
    }
}

void Grafo::remover_aresta(Aresta e) {
    if (contains(lista_adj_[e.v1], e.v2) == 1){
        lista_adj_[e.v1].remove(e.v2);
        lista_adj_[e.v2].remove(e.v1);
        num_arestas_--;
    }
}

void Grafo::remover_vertice(int vertice) {
    if (vertice <= num_vertices_){
        for (int i = 0; i < num_vertices_; i++) {
            lista_adj_[vertice].remover_aresta(Aresta(vertice, i));
        }
    }
}

void Grafo::imprime() {
    for (int i = 0; i < num_vertices_; i++) {
        cout << i << ":";
        for (list<int>::iterator it = lista_adj_[i].begin(); it != lista_adj_[i].end(); ++it) {
            cout << " " << *it;
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
