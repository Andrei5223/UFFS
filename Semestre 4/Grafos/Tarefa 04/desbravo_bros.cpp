/*
 * Tarefa 04 - Desbravo Bros.
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      XXXX
 * Matricula: XXXX
 */
#include "Digrafo.h"
#include "Aresta.h"
#include <iostream>
#include <limits>

using namespace std;

int main() {

    Digrafo grafo(5);

    Aresta aresta2(0, 2, 4);
    Aresta aresta3(1, 2, 3);
    Aresta aresta4(1, 3, 2);
    Aresta aresta5(1, 4, 2);
    Aresta aresta6(3, 2, 5);
    Aresta aresta7(3, 1, 1);
    Aresta aresta8(4, 3, 3);

    grafo.inserir_aresta(Aresta (0, 1, 1));
    grafo.inserir_aresta(aresta2);
    grafo.inserir_aresta(aresta3);
    grafo.inserir_aresta(aresta4);
    grafo.inserir_aresta(aresta5);
    grafo.inserir_aresta(aresta6);
    grafo.inserir_aresta(aresta7);
    grafo.inserir_aresta(aresta8);

    vector<int> pai(5, -1);
    vector<int> dp(5, numeric_limits<int>::max());

    if (grafo.bellman_ford(0, pai, dp)) {
        cout << "Distâncias para o vértice 0: " << endl;
        for (int i = 0; i < 5; i++){
            cout << "Vértice: " << dp[i] << endl;
        }

    } else {
        cout << "Ciclo de peso negativo encontrado." << endl;
    }

    return 0;
}
