#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Estrutura do Nó da árvore
typedef struct Node {
    char data;
    int frequencia;
    struct Node* left, * right;
} Carcatere;

// Retorna o tamanho do vetor de raizes. Recebe o vetor da raizes.
int tamanhoArvore(Carcatere** raizes){
    int i = 0;
    int contador = 0;

    while (raizes[i] != NULL){
        contador++;
        i++;
    }
    return contador;
}

// Ordena o vetor de raizes. Recebe o vetor de raizes e o tamanho do mesmo.
void ordenaNodos(Carcatere** raizes, int size){
    int i, j;
    Carcatere* aux;

    for(i=0;i<size-1;i++){

        for(j=size-1;j>i;j--){
            //ordena com base na frequencia
            if((raizes[j-1]->frequencia > raizes[j]->frequencia) || (raizes[j-1]->frequencia == raizes[j]->frequencia && raizes[j-1]->data > raizes[j]->data) ){
                aux = raizes[j-1];
                raizes[j-1] = raizes[j];
                raizes[j] = aux;
            }
        }
    }
}

// Aloca memoria para um novo nodo
Carcatere* criaNodo(){
    Carcatere* aux = malloc(sizeof(Carcatere));
    aux->data = '\0';
    aux->frequencia = 0;
    aux->left = NULL;
    aux-> right = NULL;

    return aux;
}

// Adiciona um caractere ao vetor de raizes. Recebe vetor de raizes, caractere a adicionar e tamanho do vetor de raizes.
void adicionaCaractere(Carcatere** raizes, char caractere, int size){
    int i = 0;

    for (i = 0; i < size; i++){
        if (raizes[i]->data == caractere){
            raizes[i]->frequencia++;
            return;
        }
    }

    raizes[size] = criaNodo();
    raizes[size]->data = caractere;
    raizes[size]->frequencia++;
}

// Cria o vetor de raizes. Recebe vetor de raizes, string de input e tamanho do input.
void constroiRaizes(Carcatere** raizes, char input[], int size){
    int i = 0;

    //NULL em todo o vetor
    for (i = 0; i < size; i++){
        raizes[i] = NULL;
    }

    //Adiciona os caracteres do input às raizes
    for (i = 0; i < size; i++){
        adicionaCaractere(raizes, input[i], tamanhoArvore(raizes));
    }

    ordenaNodos(raizes, tamanhoArvore(raizes));
}

// Função recursiva que irá acumular todas as raizes em uma só. Recebe o vetor de raizes e o tamanho.
void criaHuffman(Carcatere** raizes, int size){
    Carcatere* novoNodo = criaNodo();
    int i = 0;

    // Soma as frequencias e atribui os filhos novo nodo
    novoNodo->left = raizes[0];
    novoNodo->right = raizes[1];
    novoNodo->frequencia = raizes[0]->frequencia + raizes[1]->frequencia;

    // Atribui o novo nodo ao primeiro elemento
    raizes[0] = novoNodo;

    // Move todos os nodos um elemento à esquerda
    for (i = 1; i < size-2; i++){
        raizes[i] = raizes[i+1];
    }

    // Atribui NULL ao ultimo
    raizes[size-1] = NULL;

    if (size - 1 >= 2){
        criaHuffman(raizes, size-1);
    }
}

// Imprime as chaves da codificação de huffman
void imprimir(Carcatere* raiz, int posicao, char* caminho){
    if (raiz != NULL) {
        
        // Adiciona o 0 no caminho para percorrer à esquerda
        caminho[posicao] = '0';
        caminho[posicao+1] = '\0';
        imprimir(raiz->left, posicao+1, caminho);

        if (raiz->data != '\0'){
            printf("%c: %s", raiz->data, caminho);
        }

        // Adiciona 1 no caminho para percorrer à direita
        caminho[posicao] = '1';
        imprimir(raiz->right, posicao+1, caminho);

        // Desfaz as alterações
        caminho[posicao] = '\0';
    }
}

int main() {
    int size = 100;
    char input[size];
    char caminho[100];

    // Coleta o input
    fgets(input, sizeof(input), stdin);
    input[strcspn(input, "\n")] = '\0';  // remove o caractere de nova linha

    // Atualiza o tamanho do input
    size = strlen(input);
    Carcatere* raizes[size];

    // Cria o vetor de raizes
    constroiRaizes(raizes, input, size);

    //imprime a codificação
    imprimir(raizes[0], 0, caminho);

    return 0;
}