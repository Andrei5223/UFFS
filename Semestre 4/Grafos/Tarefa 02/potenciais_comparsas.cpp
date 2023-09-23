/*
 * Tarefa 02 - Potenciais Comparsas
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Andrei Carlesso Camilotto
 * Matricula: 2211100026
 */
#include "Grafo.h"
#include "Aresta.h"
#include <iostream>

using namespace std;
int main() {
    try {
        int vertices, num_arestas;

        cin >> vertices >> num_arestas;

        //Inicialização
        vector<int> marcado;
        marcado.resize(vertices);
        Grafo grafo(vertices);

        for (int i = 0; i < num_arestas; i++){
            int v1, v2;
            char turno;

            cin >> v1 >> v2 >> turno;

            if (turno == 'W'){
                grafo.inserir_aresta(Aresta(v1, v2));
            }
            
        }

        int num_exec, ver;
        cin >> num_exec;

        for (int i = 0; i < num_exec; i++){
            cin >> ver;
            grafo.potenciais_comparsas(ver);
        }
    }
    catch (const exception &e) {
        cerr << "exception: " << e.what() << "\n";
    }
    
    return 0;
}
