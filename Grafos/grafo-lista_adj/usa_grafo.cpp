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
        int vertices, operacoes, v1, v2;
        char op;

        cin >> vertices >> operacoes;
        
        Grafo grafo(vertices);

        for (int i = 0; i < operacoes; i++){
            cin >> op;

            switch(op){
                // Inserir aresta
                case 'I':
                    cin >> v1 >> v2;
                    grafo.inserir_aresta(Aresta(v1, v2));
                    break;
                // Remove aresta
                case 'R':
                    cin >> v1 >> v2;
                    grafo.remover_aresta(Aresta(v1, v2));
                    break;
                // Numero de arestas
                case 'E':
                    cout << grafo.num_arestas() << endl;
                    break;
                // Remove vertice
                case 'Q':
                    cin >> v1;
                    grafo.remover_vertice(v1);
                    break;
                // Numero de vertice
                case 'N':
                    cout << grafo.num_vertices() << endl;
                    break; 
                // Imprimir grafo
                case 'P':
                    grafo.imprime();
                    break;
            }
        }
    }
    catch (const exception &e) {
        cerr << "exception: " << e.what() << "\n";
    }

    return 0;
}

// g++ *.cpp -o main
// ./main