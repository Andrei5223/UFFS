/*
 * Tarefa 04 - Desbravo Bros.
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      XXXX
 * Matricula: XXXX
 */

#ifndef DIGRAFO_H
#include <vector>
#include <utility>
#include "Aresta.h"

#define DIGRAFO_H

class Digrafo {
public:
    /* Constroi um grafo que possui um numero de vertices recebido por parametro e não possui nenhuma aresta */
    Digrafo(int num_vertices_);

    /* Insere uma aresta no grafo caso a aresta ainda não exista no grafo e não seja um laço */
    void inserir_aresta(Aresta e);

    void imprime();

    bool bellman_ford(int s, std::vector<int>& pai, std::vector<int>& dp);

private:
    int num_vertices_;
    int num_arestas_;
    std::vector<std::vector<std::pair<int, int>>> matriz_adj_;
};

#endif /* DIGRAFO_H */
