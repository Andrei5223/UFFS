/*
 * Tarefa 02 - Potenciais Comparsas
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Andrei Carlesso Camilotto
 * Matricula: 2211100026
 */

#ifndef GRAFO_H

#define GRAFO_H

#include <vector>
#include <list>
#include <queue>
#include <climits>
#include "Aresta.h"

class Grafo {
public:
    /* Constroi um grafo que possui um numero de vertices recebido por parametro e não possui nenhuma aresta */
    Grafo(int num_vertices_);
    
    int num_vertices();
    int num_arestas();

    /* Insere uma aresta no grafo caso a aresta ainda não exista no grafo e não seja um laço */
    void inserir_aresta(Aresta e);

    /* Remove uma aresta do grafo caso ela exista */
    void remover_aresta(Aresta e);

    void imprime();

    bool caminho(int v, int w, std::vector<int> marcado);

    void busca_prof(int v, int marcado[]);

    bool conexoDFS();

    bool cicloDFS();

    bool cicloDFSrecursivo(int v, int marcado[], int anterior);

    void busca_larg(int v, std::vector<int>& pai, std::vector<int>& dist, std::vector<int>& marcado);

    void potenciais_comparsas(int v);
private:
    int num_vertices_;
    int num_arestas_;
    std::vector<std::vector<int>> matriz_adj_;
};

#endif /* GRAFO_H */
