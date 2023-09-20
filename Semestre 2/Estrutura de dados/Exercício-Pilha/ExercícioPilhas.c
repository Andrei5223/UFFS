#include <stdio.h>
#include <stdlib.h>

typedef struct elemPilha {
    char item;
    struct elemPilha *proximo;
} ElemPilha;

typedef struct {
    ElemPilha *topo;
} Pilha;

void inserePilha(Pilha *pilha, char item) {
    printf("Adicionando %c\n", item);
    ElemPilha *aux;

    aux = malloc(sizeof(ElemPilha));
    aux->item = item;

    aux->proximo = pilha->topo;
    pilha->topo = aux;
}

int pilhaVazia(Pilha *pilha) {
    if (pilha->topo == NULL)
    return 0;
}

int removePilha(Pilha *pilha, char item) {
    ElemPilha *aux;

    if (pilhaVazia(pilha) == 0){
        printf("Pilha vazia!");
        return 1;
    }

    /*
    40  = (
    41  = )
    91  = [
    93  = ]
    123 = {
    125 = }
    */

    if (item == 41 && pilha->topo->item == 40){
        printf("Removendo %c\n", item);
        aux = pilha->topo;
        pilha->topo = pilha->topo->proximo;

        free(aux);
        return 0;
    }
    if (item == 93 && pilha->topo->item == 91){
        printf("Removendo %c\n", item);
        aux = pilha->topo;
        pilha->topo = pilha->topo->proximo;

        free(aux);
        return 0;
    }
    if (item == 125 && pilha->topo->item == 123){
        printf("Removendo %c\n", item);
        aux = pilha->topo;
        pilha->topo = pilha->topo->proximo;

        free(aux);
        return 0;
    }
    printf("Nenhum removido\n");
    return 1;

}


void inicializaPilha(Pilha *pilha) {
    pilha->topo = NULL;
}

void liberaPilha(Pilha *pilha) {
    printf("Liberando pilha.\n");
    ElemPilha *aux;

    while (pilha->topo != NULL) {
        aux = pilha->topo;
        pilha->topo = pilha->topo->proximo;

        free(aux);
    }
}

int main() {
    Pilha pilha;
    int saida = 0;
    char item;

    inicializaPilha(&pilha);

    inserePilha(&pilha, '(');
    inserePilha(&pilha, '[');
    inserePilha(&pilha, '{');
    saida = removePilha(&pilha, '}');
    saida = removePilha(&pilha, ']');
    saida = removePilha(&pilha, ')');


    saida = pilhaVazia(&pilha);

    liberaPilha(&pilha);

    if (saida == 0)
        printf("Correto");
    else
        printf("Incorreto");


    return 0;
}
