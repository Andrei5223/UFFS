/*
 * Tarefa 01 - Grafo - Listas de Adjacencia
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Andrei Camilotto
 * Matricula: 2211100026
 */

#include "Grafo.h"
#include "Aresta.h"
#include <iostream>

using namespace std;

int main() {
    try {
        Grafo grafo(5);

        Aresta e(3, 4);
        grafo.inserir_aresta(e);

        //Instanciação direta
        grafo.inserir_aresta(Aresta(4, 2));
        grafo.inserir_aresta(Aresta(0, 3));

        grafo.imprime();

        grafo.remover_aresta(Aresta(0,3));

        grafo.imprime();
    }
    catch (const exception &e) {
        cerr << "exception: " << e.what() << "\n";
    }

    return 0;
}

// g++ *.cpp -o main
// ./main