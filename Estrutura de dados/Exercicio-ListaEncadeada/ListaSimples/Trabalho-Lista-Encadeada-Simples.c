#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct funcionario {
    int id;
    char nome[31];
    double salario;
    struct funcionario *proximo;
}; 
typedef struct funcionario Funcionario;

Funcionario *insereNodoInicio(Funcionario *primeiro, int id, char nome[], double salario) {
    printf("Adicionando no inicio.\n");

    Funcionario *aux;
    aux = malloc(sizeof(Funcionario));
    aux->id = id;
    aux->salario = salario;
    strcpy(aux->nome, nome);

    aux->proximo = primeiro;
    primeiro = aux;

    return primeiro;
}

Funcionario *insereNodoFim(Funcionario *primeiro, int id, char nome[], double salario) {
    printf("Adicionando no fim.\n");

    Funcionario *aux, *anterior, *ultimo;
    for(aux = primeiro; aux != NULL; aux = aux->proximo){
        anterior = aux;
    }

    aux = malloc(sizeof(Funcionario));
    aux->id = id;
    aux->salario = salario;
    strcpy(aux->nome, nome);

    ultimo = NULL;
    anterior->proximo = aux;
    aux->proximo = ultimo;

    return primeiro;
}

Funcionario *deletaNodo(Funcionario *primeiro, int idDelete) {
    printf("\nDeletando id %d.\n", idDelete);

    Funcionario *aux, *anterior;
    for (aux = primeiro; aux->id != idDelete; aux = aux->proximo){
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

void imprimeLista(Funcionario *primeiro) {
    printf("\nExecutando impressao.\n");

    Funcionario *aux;
    for(aux = primeiro; aux != NULL; aux = aux->proximo){
        printf("Id: %d | Nome: %s | Salário: %.2lf\n", aux->id, aux->nome, aux->salario);
    }
}

void imprimeAoContrario(Funcionario *primeiro) {
    Funcionario *aux;
    aux = primeiro->proximo;

    /*Quando o if retornar True o código encerra a execução como se a main tivesse retornado 0.
    Não sei o motivo, porém após dezenas de testes tenho certeza que é esse o problema, especificamente
    quando faço um if condicionando com o NULL, se o resultado é True o programa encerra como se tudo
    tivesse funcionado perfeitamente. Esse problema foi o motivo do atraso na entrega do trabalho*/
    if (aux == NULL){
        printf("Id: %d | Nome: %s | Salário: %.2lf\n", aux->id, aux->nome, aux->salario);
        return;
    }
    else{
        imprimeAoContrario(aux);
        printf("Id: %d | Nome: %s | Salário: %.2lf\n", aux->id, aux->nome, aux->salario);
    }
}

void contaNodos(Funcionario *primeiro) {
    int contador;
    Funcionario *aux;
    for (aux=primeiro; aux != NULL; aux = aux->proximo){
        contador++;
    }
    printf("\nForam contabilizados %d nodos.\n", contador);
}

void destroiLista(Funcionario *primeiro) {
    Funcionario *aux;

    while (primeiro != NULL){
        aux = primeiro;
        primeiro = primeiro->proximo;
        free(aux);
    }
    printf("\nLista deletada.\n");
}

int main() {
    Funcionario *primeiro;
    primeiro = NULL;

    primeiro = insereNodoInicio(primeiro, 54, "Bety ", 5000);
    primeiro = insereNodoFim(primeiro, 60, "Bill ", 3500);
    primeiro = insereNodoFim(primeiro, 65, "Billy", 2000);
    primeiro = insereNodoFim(primeiro, 64, "Bili ", 2500);
    primeiro = insereNodoInicio(primeiro, 57, "Betti", 4000);
    primeiro = insereNodoInicio(primeiro, 55, "Bete ", 5500);

    imprimeLista(primeiro);

    /*Em outro arquivo que eu montei do início (sem pegar seu modelo) esse método recursivo
    funcionou perfeitamente. Apenas nesse que o If condicionando usando o NULL está encerrando
    o programa, por isso comentei a chamada da função. Porém a função está programada e o método
    funcionou em outro arquivo, não entendo o porque não funciona aqui. Deixei um comentário na
    função explicando com mais detalhes.*/

    //imprimeAoContrario(primeiro);

    primeiro = deletaNodo(primeiro, 54);

    imprimeLista(primeiro);

    contaNodos(primeiro);

    destroiLista(primeiro);

    return 0;
}
