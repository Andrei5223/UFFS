/**
 * @file 02Hash.c
 * @author Andrei Camilotto
 * @version 0.1
 * @date 2023-06-16
 *
 * @copyright Copyright (c) 2023
 *
 * @brief Arquivo template para Questão 02 do trabalho de Pesquisa e Ordenação T2.
 *
 *      Implemente uma tabela hash contendo 13 posições. O índice das chaves
 *  deve ser gerado utilizando a fórmula k mod M, onde k é a chave e M a
 *  quantidade de chaves. Resolva as colisões utilizando uma Lista Encadeada.
 *  Inclua operações de inserção, remoção e busca da chave nesta tabela hash,
 *  informando se a chave foi encontrada ou não.  Atenção: os elementos da
 *  lista encadeada não precisam estar ordenados/em ordem.
 *
 *      Utilize os vetores comentados no código para realizar seus testes.
 *
 * Atenção: Antes de entregar, conferir se dos dados de documentação no início
 * do arquivo estão preenchidos corretamente.
 *
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TAMANHO 13

typedef struct elemento {
    int valor;
    struct elemento *proximo;
} Elemento;

typedef struct {
    Elemento *tab[TAMANHO];
} TabelaHash;

// funcoes:

int calculaHash(int valor){
    return valor % TAMANHO;
}

void inicializaTabelaHash(TabelaHash *th) {
    for(int i = 0; i < TAMANHO; i++){
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
    for (int i = 0; i<TAMANHO; i++){
        for(aux = th->tab[i]; aux != NULL; aux = aux->proximo){
            printf("Índice %d, valor %d\n", i, aux->valor);
            cont=1;
        }
    }
    if (cont == 1) return;
    printf("Hash vazia.\n");
}

int main(){
    int chaves[] = {7, 13, 33, 12, 5, 1, 0};
    // int chaves[] = {5, 6, 9, 19, 24, 32, 41, 42, 43, 58};
    // int chaves[] = {178, 231, 244, 292, 321, 356, 389, 421, 482, 488, 490, 502, 546, 641, 694, 786, 841, 890, 899, 922};
    // int chaves[] = {3, 29, 43, 45,  3, 17,  2,  7, 33, 17};

    TabelaHash th;
    inicializaTabelaHash(&th);
    printf("\n\nTabela vazia: \n");
    printa(&th);

    int tamanho = sizeof(chaves) / sizeof(chaves[0]);
    for (int i = 0; i < tamanho; i++){
        insereTabelaHash(&th, chaves[i]);
    }

    printf("\n\nTabela apos insercoes: \n");
    printa(&th);

    busca(&th, chaves[0]);
    busca(&th, 14);

    removeElemento(&th, chaves[0]);
    removeElemento(&th, chaves[1]);

    printf("\n\nTabela apos remocoes: \n");
    printa(&th);
    return 0;
}