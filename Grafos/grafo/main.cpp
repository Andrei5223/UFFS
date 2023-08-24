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

        grafo.imprime();
    }
    catch (const exception &e) {
        cerr << "exception: " << e.what() << "\n";
    }

    return 0;
}
