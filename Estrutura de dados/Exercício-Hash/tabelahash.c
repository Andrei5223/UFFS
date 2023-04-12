#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// definicoes:

#define SIZE 11

typedef struct elemento {
    int valor;
    struct elemento *proximo;
} Elemento;

typedef struct {
    Elemento *tab[SIZE];
} TabelaHash;

// funcoes:

int calculaHash(int valor){
    return valor % SIZE;
}

void inicializaTabelaHash(TabelaHash *th) {
    for(int i = 0; i < SIZE; i++){
        th->tab[i] = NULL;
    }
}

void insereTabelaHash(TabelaHash *th, int valor) {
    int i = calculaHash(valor);

    Elemento *aux;
    aux = malloc(sizeof(Elemento));
    aux->valor = valor;

    aux->proximo = th->tab[i];
    th->tab[i] = aux;
}

void busca(TabelaHash *th, int chave){
    int i = calculaHash(chave);
    Elemento *aux;

    for(aux = th->tab[i]; aux != NULL; aux = aux->proximo){
        if(chave == aux->valor){
            printf("Valor encontrado.\n");
            return;
        }
    }
    printf("Valor não encontrado.\n");
}

void removeElemento(TabelaHash *th, int chave){
    int i = calculaHash(chave);
    Elemento *aux, *anterior;
    for (aux = th->tab[i]; aux->valor != chave; aux = aux->proximo){
        anterior = aux;
    }
    
    if (aux == th->tab[i]){
        th->tab[i] = th->tab[i]->proximo;

        free(aux);
        printf("Valor deletado.\n");
        return;
    }
    else{
        anterior->proximo = aux->proximo;

        free(aux);
        printf("Valor deletado.\n");
        return;
    }
    printf("Valor não encontrado.\n");
}

void printa(TabelaHash *th){
    Elemento *aux;
    int cont = 0;
    for (int i = 0; i<SIZE; i++){
        for(aux = th->tab[i]; aux != NULL; aux = aux->proximo){
            printf("Índice %d, valor %d\n", i, aux->valor);
            cont=1;
        }
    }
    if (cont == 1) return;
    printf("Hash vazia.\n");
}

int main(){
    TabelaHash th;
    inicializaTabelaHash(&th);
    printf("\n\nTabela vazia: \n");
    printa(&th);

    insereTabelaHash(&th, 7);
    insereTabelaHash(&th, 17);
    insereTabelaHash(&th, 36);
    insereTabelaHash(&th, 100);
    insereTabelaHash(&th, 106);
    insereTabelaHash(&th, 205);
    printf("\n\nTabela apos insercoes: \n");
    printa(&th);
    
    printf("\n\nBuscando elementos: \n");
    busca(&th, 14);
    busca(&th, 205);

    removeElemento(&th, 205);
    removeElemento(&th, 7);
    removeElemento(&th, 106);
    printf("\n\nTabela apos remocoes: \n");
    printa(&th);

    return 0;
}