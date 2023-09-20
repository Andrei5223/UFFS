//Nome: Andrei Carlesso Camilotto --- Matricula: 2211100026

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef int Codigo;

typedef struct elemFila {
    Codigo codigo;
    char nome[20];
    struct elemFila *proximo;
} ElemFila;

typedef struct {
    ElemFila *primeiro;
    ElemFila *ultimo;
} Fila;

//Adicionar a fila
void insereFila(Fila *fila, Codigo codigo, char nome[20]) {
    //printf("Inserindo a fila: %d e %s\n", codigo, nome);
    ElemFila *aux;

    aux = malloc(sizeof(ElemFila));
    aux->codigo = codigo;
    strcpy(aux->nome, nome);
    aux->proximo = NULL;


    if (fila->primeiro == NULL) { 
        fila->primeiro = aux;
        fila->ultimo = aux;
    }
    else { 
        fila->ultimo->proximo = aux;
        fila->ultimo = aux;
    }
}

//Autorizar decolagem
void removeFila(Fila *fila, Codigo *codigo) {
    //printf("Removendo fila\n");
    ElemFila *aux;

    *codigo = fila->primeiro->codigo;


    aux = fila->primeiro;
    if (fila->primeiro == fila->ultimo) {
        fila->primeiro = NULL;
        fila->ultimo = NULL;
    }
    else {
        fila->primeiro = fila->primeiro->proximo;
    }

    free(aux);
}

void inicializaFila(Fila *fila) {
    //printf("Iniciando fila\n");
    fila->primeiro = NULL;
    fila->ultimo = NULL;
}

int filaVazia(Fila *fila) {
    //printf("Verificando vazia\n");
    return (fila->primeiro == NULL);
}

void liberaFila(Fila *fila) {
    //printf("Liberando fila\n");
    ElemFila *aux;

    while (fila->primeiro != NULL) {
        aux = fila->primeiro;
        fila->primeiro = fila->primeiro->proximo;

        free(aux);
    }
    fila->ultimo = NULL;
}

//Quantidade de avições para decolagem
void qtdAvioes(Fila *fila){
    //printf("Contando avioes\n");
    ElemFila *aux;
    int contador = 0;

    for (aux = fila->primeiro; aux != NULL; aux = aux->proximo){
        contador++;
    }
    printf("O numero de avioes aguardando na lista de decolagem e: %d\n", contador);
}

//Lista os avioes aguardando decolagem
void listarAvioes(Fila *fila){
    printf("\nLista de avioes em espera:\n");
    ElemFila *aux;
    for (aux = fila->primeiro; aux != NULL; aux = aux->proximo){
        printf("Codigo: %d --- Nome: %s\n", aux->codigo, aux->nome);
    }
    printf("\n");
}

//Informa o aviao em primeiro na fila
void primeiroAviao(Fila *fila){
    //printf("Entrou primeiro aviao\n");
    printf("Primeiro aviao: Cod: %d --- Nome: %s", fila->primeiro->codigo, fila->primeiro->nome);
}

int main() {
    Fila fila;
    Codigo codigo;

    inicializaFila(&fila);
    insereFila(&fila, 1, "Latam");
    insereFila(&fila, 2, "Gol");
    insereFila(&fila, 3, "Pinheiro");

    qtdAvioes(&fila);

    listarAvioes(&fila);

    removeFila(&fila, &codigo);
    printf("Codigo %d autorizada decolagem.\n", codigo);

    qtdAvioes(&fila);

    listarAvioes(&fila);

    primeiroAviao(&fila);

    liberaFila(&fila);
    return 0;
}
