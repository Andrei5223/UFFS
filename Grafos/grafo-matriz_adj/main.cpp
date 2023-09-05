#include "Grafo.h"
#include "Aresta.h"
#include <iostream>

using namespace std;

int main() {
    try {
        const int arestas = 4;

        //Inicialização
        std::vector<int> marcado;
        marcado.resize(arestas);
        Grafo grafo(arestas);

        //Instanciação direta
        grafo.inserir_aresta(Aresta(0, 1));
        grafo.inserir_aresta(Aresta(1, 2));
        grafo.inserir_aresta(Aresta(2, 3));

        grafo.imprime();
        //grafo.caminho(0, 3, marcado); printf("\n");
        cout << "Caminho: " << grafo.caminho(0, 0, marcado) << endl;
        cout << "Conexo: " << grafo.conexo() << endl;
    }
    catch (const exception &e) {
        cerr << "exception: " << e.what() << "\n";
    }

    return 0;
}

// g++ *.cpp -o main
// ./main