#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// estrutura do nodo (item de uma lista de compras)
struct item {
  char nome[31];
  int quantidade;
  struct item *anterior, *proximo;
}; 
typedef struct item Item;

//estrutura da lista
struct lista {
  Item *primeiro;
  Item *ultimo;
};
typedef struct lista Lista;
  
void inicializaLista(Lista *lista){
  // inicializa a cabeca e cauda da lista como NULL  
  lista->primeiro = NULL;
  lista->ultimo = NULL;
}

Item* encontraPosicao(Lista *lista, char *nomeNovo){
    // encontra a posicao de insercao de um novo produto na lista, considerando a ordem alfabetica crescente
    // retorna o nodo que se tornara o proximo do que esta sendo inserido, ou NULL se o novo produto deve entrar no final da lista
    // equivale a funcao "magia" dos slides
  for (Item *aux = lista->primeiro; aux != NULL; aux = aux->proximo){ // percorre a lista
    if(strcmp(nomeNovo, aux->nome) <= 0){ // novo nome eh igual ou vem antes do atual no percurso
      return aux; // retorna o atual
    }
  }
  return NULL; // chegou ao fim da lista e o novo nome deve ficar no final
}

void insereNodo(Lista *lista, char *nome, int quantidade){
  // prepara o novo nodo
  Item *novo = malloc(sizeof(Item));
  strcpy(novo->nome, nome);
  novo->quantidade = quantidade;
  novo->anterior = NULL;
  novo->proximo = NULL;

  // verifica o local de insercao  
  if(lista->primeiro == NULL){ // lista vazia
    lista->primeiro = novo;
    lista->ultimo = novo;
  }
  else{ // lista nao vazia
      Item *elemento = encontraPosicao(lista, nome);
      if(elemento != NULL){ // encontrou produto com nome maior ou igual na ordem alfabetica; insere antes dele
        if (elemento == lista->primeiro){ // o encontrado era o primeiro, entao insere no inicio
          novo->proximo = elemento; 
          elemento->anterior = novo;
          lista->primeiro = novo;          
        }
        else { // o encontrado nao era o primeiro, entao insere entre ele e seu antecessor
          novo->proximo = elemento;
          novo->anterior = elemento->anterior;
          elemento->anterior->proximo = novo;
          elemento->anterior = novo;
        }  
      }
      else { // nao encontrou posicao de insercao no meio da lista, entao insere no fim
        novo->anterior = lista->ultimo;
        lista->ultimo->proximo = novo;
        lista->ultimo = novo;       
      }
  }  
}

void imprimeCrescente(Lista *lista){
  if(lista->primeiro == NULL)
    printf("\n\nLista vazia\n");
  else{
    printf("\n\nLista de compras (ordem crescente):\n");
    for (Item *aux = lista->primeiro; aux != NULL; aux = aux->proximo){
      printf("%s - Quantidade: %d\n", aux->nome, aux->quantidade);
    }
  }
}

void imprimeDecrescente(Lista *lista){
  if(lista->primeiro == NULL)
    printf("\n\nLista vazia\n");
  else{
    printf("\n\nLista de compras (ordem decrescente):\n");
    for (Item *aux = lista->ultimo; aux != NULL; aux = aux->anterior){
      printf("%s - Quantidade: %d\n", aux->nome, aux->quantidade);
    }
  }
}

void destroiLista(Lista *lista){
  Item *aux; 
  while (lista->primeiro != NULL){
    aux = lista->primeiro;
    lista->primeiro = lista->primeiro->proximo;
    free(aux);
  }
}

int main(){
  Lista lista;
  inicializaLista(&lista);
  insereNodo(&lista, "Detergente", 2);
  insereNodo(&lista, "Laranja", 10);
  insereNodo(&lista, "Arroz", 1);
  insereNodo(&lista, "Pao", 5);
  insereNodo(&lista, "Manteiga", 1);
  insereNodo(&lista, "Abacaxi", 3);
  insereNodo(&lista, "Shampoo", 1);
  insereNodo(&lista, "Xarope de milho", 2);
  insereNodo(&lista, "Amendoim torrado", 2);
  imprimeCrescente(&lista);
  imprimeDecrescente(&lista);
  destroiLista(&lista);
  return 0;
}