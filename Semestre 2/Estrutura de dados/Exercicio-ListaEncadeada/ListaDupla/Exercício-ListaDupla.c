#include <stdio.h>
#include <string.h>
#include <stdlib.h>

struct dia{
    int dia;
    char mes[10];
    int ano;
    struct dia *proximo;
    struct dia *anterior;
};
typedef struct dia Dia;

Dia* adiciona_inicio(Dia *primeiro, int dia, char mes[10], int ano){
    printf("Adicionando no inicio.\n");

    Dia *aux;
    aux = malloc(sizeof(Dia));
    aux->ano = ano;
    aux->dia = dia;
    strcpy(aux->mes, mes);

    aux->proximo = primeiro;
    primeiro->anterior = aux;
    primeiro = aux;

    return primeiro;
}

Dia* adiciona_fim(Dia *ultimo, int dia, char mes[10], int ano){
    printf("Adicionando no fim.\n");

    Dia *aux;
    aux = malloc(sizeof(Dia));
    aux->ano = ano;
    aux->dia = dia;
    strcpy(aux->mes, mes);

    aux->anterior = ultimo;
    ultimo->proximo = aux;
    ultimo = aux;

    return ultimo;

}

Dia* deletar(Dia *primeiro, int ano){
    printf("\nDeletando ano %d.\n", ano);

    Dia *aux, *anterior;
    for (aux = primeiro; aux->ano != ano; aux = aux->proximo){
        anterior = aux;
    }
    
    if (aux == primeiro){
        primeiro = primeiro->proximo;
    }
    else{
        anterior->proximo = aux->proximo;
    }

    free(aux);

    return primeiro;
}

void imprimir(Dia *primeiro){
    printf("\nExecutando impressao.\n");

    Dia *aux;
    for(aux = primeiro; aux->proximo != NULL; aux = aux->proximo){
        printf("%d de %s de %d\n", aux->dia, aux->mes, aux->ano);
    }
}

imprimir_contrario(Dia *primeiro){
    Dia *aux;
    aux = primeiro->proximo;
    if (aux == NULL){
        printf("%d de %s de %d\n", primeiro->dia, primeiro->mes, primeiro->ano);
    }
    else{
        imprimir_contrario(aux);
        printf("%d de %s de %d\n", primeiro->dia, primeiro->mes, primeiro->ano);
    }
}

void contador(Dia *primeiro){
    printf("\nExecutando contagem.\n");

    int contador;
    Dia *aux;
    for (aux=primeiro; aux != NULL; aux = aux->proximo){
        contador++;
    }
    printf("Foram contabilizados %d nodos.\n", contador);
}

void deleta(Dia *primeiro){
    printf("\nDeletando lista.\n");
    Dia *aux;

    while (primeiro != NULL){
        aux = primeiro;
        primeiro = primeiro->proximo;
        free(aux);
    }
    printf("Lista deletada.\n");
}

int main(){
    Dia *primeiro;

    primeiro->proximo = NULL;
    primeiro->anterior = NULL;


    primeiro = adiciona_inicio(primeiro, 10, "Fevereiro", 2022);
    primeiro = adiciona_inicio(primeiro, 25, "Marco", 2018);
    primeiro = adiciona_inicio(primeiro, 16, "Junho", 2003);
    primeiro = adiciona_inicio(primeiro, 28, "Dezembro", 2013);
    primeiro = adiciona_inicio(primeiro, 2, "Janeiro", 2023);
    primeiro = adiciona_inicio(primeiro, 3, "Maio", 2014);
    primeiro = adiciona_inicio(primeiro, 9, "Novembro", 2043);

    //primeiro = adiciona_fim(primeiro, 18, "NOFIM", 2073);
    //primeiro = adiciona_fim(primeiro, 19, "NOFINAL", 2015);

    imprimir(primeiro);


    //imprimir_contrario(primeiro);

    //deleta(primeiro);

    printf("\nEncerrando o codigo.");
    return 0;
}
