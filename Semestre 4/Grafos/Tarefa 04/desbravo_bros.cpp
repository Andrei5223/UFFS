/*
 * Tarefa 04 - Desbravo Bros.
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Andrei Carlesso Camilotto
 * Matricula: 2211100026 
 */
#include "Digrafo.h"
#include "Aresta.h"
#include <iostream>
#include <limits>

using namespace std;

int main() {
    int ver, are;
    int v1, v2, v3;
    int numero_de_origens;

    cin >> ver >> are;

    Digrafo grafo(ver);

    for (int i = 0; i < are; i++){
        cin >> v1 >> v2 >> v3;
        grafo.inserir_aresta(Aresta (v1, v2, v3));
    }

    cin >> numero_de_origens;
    vector<int> origem(numero_de_origens);

    for (int i = 0; i < numero_de_origens; i++){
        cin >> v1;
        origem[i] = v1;
    }

    grafo.max_vidas(origem);

    return 0;
}
