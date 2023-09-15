#include "Grafo.h"
#include "Aresta.h"
#include <iostream>
#include <chrono>
#include <random>

using namespace std;

int main() {
    try {
        /*
        const int vertices = 7;

        //Inicialização
        vector<int> marcado;
        marcado.resize(vertices);
        Grafo grafo(vertices);

        //Instanciação direta
        grafo.inserir_aresta(Aresta(0, 1));
        grafo.inserir_aresta(Aresta(0, 2));
        grafo.inserir_aresta(Aresta(1, 3));
        grafo.inserir_aresta(Aresta(1, 4));
        grafo.inserir_aresta(Aresta(2, 5));
        grafo.inserir_aresta(Aresta(2, 6));
        
        grafo.imprime();
        //grafo.caminho(0, 3, marcado); printf("\n");
        cout << "Caminho: " << grafo.caminho(0, 6, marcado) << endl;
        cout << "Conexo: " << grafo.conexo1() << endl;
        cout << "Cíclico: " << grafo.ciclo() << endl;
        */

        // Inicialização do gerador de números aleatórios
        random_device rd;
        mt19937 mt(rd());

        int n = 10000;
        int lixo = 0;
        while (n <= 10000){
            // Reinicializar a distribuição com o valor atual de n
            uniform_int_distribution<int> distrib(0, n-1);

            //Inicialização
            vector<int> marcado;
            marcado.resize(n);
            Grafo grafo(n);
            int max_arestas = (n * (n - 1)) / 2;
            
            // Popula o grafo de tamanho n com até o número de máximo de arestas possível. Importante destacar que não há garantia de gerar arestas válidas para inserção.
            // Arestas invalidas serão ignoradas e não inseridas.
            for (int i = 0; i < max_arestas; i++) {
                int v1 = distrib(mt);
                int v2 = distrib(mt);
                grafo.inserir_aresta(Aresta(v1, v2));
            }

            cout << "Num_Vertices: " << grafo.num_vertices() << " ";
            cout << "Num_Arestas: " << grafo.num_arestas() << " ";
            cout.flush();

            // Conta o tempo para o conexo usando busca em profundidade
            cout << "ConexoDFS: "; cout.flush();
            auto start = chrono::high_resolution_clock::now();
            lixo = grafo.conexoDFS();
            auto end = chrono::high_resolution_clock::now();
            auto duration = chrono::duration_cast<chrono::microseconds>(end - start).count();
            cout << duration << " "; cout.flush();

            
            // Conta o tempo para o conexo de 1 for
            cout << "Conexo1For: "; cout.flush();
            start = chrono::high_resolution_clock::now();
            lixo = grafo.conexo1();
            end = chrono::high_resolution_clock::now();
            duration = chrono::duration_cast<chrono::microseconds>(end - start).count();
            cout << duration << " "; cout.flush();
/*
            // Conta o tempo para o conexo de 2 for
            cout << "Conexo2For: "; cout.flush();
            start = chrono::high_resolution_clock::now();
            lixo = grafo.conexo2();
            end = chrono::high_resolution_clock::now();
            duration = chrono::duration_cast<chrono::microseconds>(end - start).count();
            cout << duration << " "; cout.flush();
            */

            cout << endl;
            n = n+50;
        }

    }
    catch (const exception &e) {
        cerr << "exception: " << e.what() << "\n";
    }

    return 0;
}

// g++ *.cpp -o main
// ./main