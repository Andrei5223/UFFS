/*
 * Tarefa 01 - Grafo - Listas de Adjacencia
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Andrei Camilotto
 * Matricula: 2211100026
 */

#ifndef GRAFO_H

#define GRAFO_H

#include <vector>
#include <list>
#include "Aresta.h"

class Grafo {
public:
    /* Constroi um grafo que possui um numero de vertices recebido por parametro e não possui nenhuma aresta */
    Grafo(int num_vertices_);
    
    int num_vertices();
    int num_arestar();

    /* Insere uma aresta no grafo caso a aresta ainda não exista no grafo e não seja um laço */
    void inserir_aresta(Aresta e);

    /* Remove uma aresta do grafo caso ela exista */
    void remover_aresta(Aresta e);

    /* Remove um vértice do grafo de modo que tenha seu índice diminuído de 1 todo vértice cujo índice é maior que o índice do vértice removido */
    void remover_vertice(int vertice);

    void imprime();
private:
    int num_vertices_;
    int num_arestas_;
    std::vector<std::list<int>> lista_adj_;
};

#endif /* GRAFO_H */
