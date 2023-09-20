#include <stdio.h>
#include <stdlib.h>

typedef int Item;

typedef struct elemFila {
    Item item;
    struct elemFila *proximo;
} ElemFila;

typedef struct {
    ElemFila *primeiro;
    ElemFila *ultimo;
} Fila;

void insereFila(Fila *fila, Item item) {
    ElemFila *aux;

    // Cria um novo elemento da lista encadeada que representa a fila e
    // armazena neste novo elemento o item a ser inserido na fila
    aux = malloc(sizeof(ElemFila));
    aux->item = item;
    aux->proximo = NULL;

    // Insere o novo elemento no fim da lista encadeada que representa a
    // fila
    if (fila->primeiro == NULL) { // Se a fila esta vazia
        fila->primeiro = aux;
        fila->ultimo = aux;
    }
    else { // Se a fila nao esta vazia
        fila->ultimo->proximo = aux;
        fila->ultimo = aux;
    }
}

void removeFila(Fila *fila, Item *item) {
    ElemFila *aux;

    // Verificar se a fila esta vazia!

    // Armazena o item a ser removido da fila
    *item = fila->primeiro->item; // ATENCAO: Depende da definicao do tipo do item

    // Armazena o primeiro elemento da lista encadeada que representa a fila e
    // remove este primeiro elemento da lista
    aux = fila->primeiro;
    if (fila->primeiro == fila->ultimo) {
        fila->primeiro = NULL;
        fila->ultimo = NULL;
    }
    else {
        fila->primeiro = fila->primeiro->proximo;
    }

    // Libera a memoria alocada para o elemento removido
    free(aux);
}

void inicializaFila(Fila *fila) {
    fila->primeiro = NULL;
    fila->ultimo = NULL;
}

int filaVazia(Fila *fila) {
    return (fila->primeiro == NULL);
}

void liberaFila(Fila *fila) {
    ElemFila *aux;

    while (fila->primeiro != NULL) {
        // Armazena o primeiro elemento da lista encadeada que representa a
        // fila e remove este primeiro elemento da lista
        aux = fila->primeiro;
        fila->primeiro = fila->primeiro->proximo;

        // Libera a memoria alocada para o elemento removido
        free(aux);
    }
    fila->ultimo = NULL;
}

int qtdItensFila(Fila *fila){
    ElemFila *aux;
    int contador = 0;

    for (aux = fila->primeiro; aux != NULL; aux = aux->proximo){
        contador++;
    }
    return contador;
}

int filaOrdemCrescente(Fila *fila){
    ElemFila *aux;
    for (aux = fila->primeiro; aux->proximo != NULL; aux = aux->proximo){
        if (aux->proximo->item >= aux->item){
            continue;
        }
        return 0;
    }
    return 1;
}

Fila copiaFila(Fila *fila){
    Fila fila2;
    ElemFila *aux;
    inicializaFila(&fila2);

    for (aux = fila->primeiro; aux != NULL; aux = aux->proximo){
        insereFila(&fila2, aux->item);
    }

    return fila2;
}

int main() {
    Fila fila;
    Fila fila2;
    Item item;

    inicializaFila(&fila);

    for (int i = 0; i < 10; i++) {
        item = i;

        printf("Inserindo na fila o item %d.\n", item);
        insereFila(&fila, item);
    }

    printf("A fila contém %d nodos.\n", qtdItensFila(&fila));
    printf("Deverá printar um se a fila for crescente: %d\n", filaOrdemCrescente(&fila));
    fila2 = copiaFila(&fila);

    while (filaVazia(&fila) == 0) { // Enquanto a fila nao esta vazia
        removeFila(&fila, &item);
        printf("Item %d removido da fila.\n", item);
    }

    printf("A fila 2 contém %d nodos.\n", qtdItensFila(&fila2));
    printf("Deverá printar um se a fila 2 for crescente: %d\n", filaOrdemCrescente(&fila2));

    liberaFila(&fila); // Sem efeito se a fila ja esta vazia

    return 0;
}
