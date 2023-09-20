/*
 Este é um esqueleto que deve ser utilizado como base para implementação do trabalho;
	- As funções não têm os parâmetros definidos; se necessário, estes devem ser incluídos; Os tipos de retorno podem ser alterados, se necessário;
 	- Devem ser respeitados os nomes atribuídos às funções e estruturas, porém, novas estruturas e funções podem ser criadas, caso julgue necessário;
	- Faça os includes necessários;
	- A organização das funções fica a critério do programador;
	- A indentação correta faz parte da nota;
	- Não são permitidas variáveis globais;
	- Caso seja detectado plágio, os grupos envolvidos receberão nota 0.
*/

#include <stdio.h> 
#include <stdlib.h>
#include <string.h>

#define EXIT 10  // valor fixo para a opção que finaliza a aplicação

// Struct que representa um item de uma lista de compras armazenada em uma arvore binaria de busca
struct item {
	char produto[50];
	int quantidade;
     struct item  *esquerdo; 
	struct item  *direito;
};
typedef struct item Item;

// Struct que representa um item de uma lista de compras armazenada em uma lista encadeada simples.
struct lista {
     char produto[50];
     int quantidade;
     struct lista *proximo;
};
typedef struct lista Lista;

// Adiciona um novo nodo no início de uma lista encadeada
Lista* adicionaLista(Lista *primeiro, char produto[10], int quantidade){
     Lista *aux;

     aux = malloc(sizeof(Lista));
     aux->quantidade = quantidade;
     strcpy(aux->produto, produto);

     aux->proximo = primeiro;
     primeiro = aux;

     return primeiro;
}

// Imprime uma lista encadeada e a deleta
void imprimeLista(Lista *primeiro) {
     Lista *aux;

     printf("\nImprimindo lista de produtos repetidos:\n\n");
     while (primeiro != NULL){
          aux = primeiro;
          printf("Produto: %s", aux->produto);
          printf(" | Quantidade em A: %d\n", aux->quantidade);
          primeiro = primeiro->proximo;
          free(aux);
     }
}

// Apresenta o primeiro menu da aplicação e retorna a opção selecionada
int menu1()
{
     int op = 0;
     printf("\nMenu principal\n");
     printf("Gerenciar lista de compras A: 1\n");
     printf("Gerenciar lista de compras B: 2\n");
     printf("Fazer a interseção das duas listas: 3\n");
     printf("Sair do programa: %d",EXIT);
     printf("\nDigite a opcao: ");
     scanf("%d",&op);
     printf("\n");
     return op;
}

// Apresenta o segundo menu da aplicação e retorna a opção selecionada
int menu2()
{
     int op = 0;
     printf("Submenu - Gerenciar lista de compras\n");

     printf("\nInserir um novo produto: 1\n");
     printf("Pesquisar um produto: 2\n");
     printf("Atualizar a quantidade de um produto: 3\n");
     printf("Listar os produtos: 4\n");
     printf("Deletar um produto: 5\n");

     printf("Retornar para o menu principal: %d",EXIT);
     printf("\nDigite a opcao: ");
     scanf("%d",&op); 
     printf("\n");
     return op;
}

// Cria um novo produto coletando as informações do usuário
Item* novoProduto()
{
     //Define as variáveis utilizadas
     char produto[50];
     int quantidade;
     Item *novoProduto;

     //Coleta os dados
     printf("Digite o nome do produto: ");
     scanf("%s", produto);
     printf("\nDigite a quantidade do produto: ");
     scanf("%d", &quantidade);
     printf("\n");

     //Cria um novo nodo e armazena as informações
     novoProduto = malloc(sizeof(Item));
     strcpy(novoProduto->produto, produto);
     novoProduto->quantidade = quantidade;
     novoProduto->direito =  NULL;
     novoProduto->esquerdo = NULL;

     return novoProduto;
}

// Permite o cadastro de um item (caso o produto ainda não exista) em uma lista de compras, retorna a raiz da nova árvore com o produto
Item* insert(Item *raiz, Item *novoProduto)
{
     //Caso a árvore esteja vazia ou a função tenha percorrido até encontrar uma posição livre
     if (raiz == NULL){
         raiz = novoProduto;
         return raiz;
     }
     // Produto já existe na lista
     if (strcmp(raiz->produto, novoProduto->produto) == 0){
          printf("Produto já cadastrado.\n");
          return raiz;
     }
     //Caso o nome do produto venha antes na ordem alfabética do produto do nodo atual, a função irá percorrer para o filho direito
     if (strcmp(raiz->produto, novoProduto->produto)<0){
          raiz->esquerdo = insert(raiz->esquerdo, novoProduto);
     }
     //Caso o nome do produto venha depois na ordem alfabética do produto do nodo atual, a função irá percorrer para o filho esquerdo
     else{
          raiz->direito = insert(raiz->direito, novoProduto);
     }
     return raiz;
}

// Permite consultar se um item está em uma lista de compras, retorna um ponteiro para o produto encontrado
Item* query(Item *raiz, char produto[50]) 
{
     if (raiz == NULL){
        return NULL; // se a raiz for NULL, significa que o produto não está cadastrado
     }    
     if (strcmp(raiz->produto, produto) == 0){
        return raiz; // se achou o item, retorna o ponteiro para ele
     }
     if (strcmp(raiz->produto, produto) < 0){
        return query(raiz->esquerdo, produto); // se o item vem depois na ordem alfabética, vai para a subárvore esquerda
     } 
     else {
        return query(raiz->direito, produto); // se o item vem antes na ordem alfabética, vai para a subárvore direita
     }
}

// Permite a atualização da quantidade de um produto (caso exista) na lista de compras
void update(Item* raiz)
{
    // Definindo as variáveis
    char produto[50];

    // Coletando dados 
    printf("Digite o nome do produto que deseja atualizar: ");
    scanf("%s", produto);
    printf("\n");

    // Verificando se está inserido e atualizando
    Item *aux = query(raiz, produto);
    if(aux == NULL){
        printf("Produto não cadastrado.\n");
    }
    else{
        printf("Digite a nova quantidade: ");
        scanf("%d", &aux->quantidade);
        printf("\n");
    }
}

// Listar todos os itens da lista de compras em ordem alfabética;
void list(Item* raiz)
{
     //Utiliza o método in-ordem para percorrer a árvore, primeiro pelo lado direito começando a imprimir pelos nodos que vem antes na ordem alfabética e segue em ordem crescente
     if (raiz != NULL) {
        list(raiz->direito);
        printf("Produto: %s ", raiz->produto);
        printf("| Quantidade: %d\n", raiz->quantidade);
        list(raiz->esquerdo);
     }
}

// Utilizada na função delete para encontrar um nodo sucessor
Item* encontraSucessor(Item* raiz) {
    Item* aux = raiz;
    while (aux->esquerdo != NULL)  // Percorre a árvore até chegar no nodo mais a esquerda
        aux = aux->esquerdo;
    return aux;
}

// Permite excluir um item de uma lista de compras
Item* delete(Item* raiz, char produto[50])
{
     // Verifica se o nodo atual é nulo
     if (raiz == NULL){
          printf("Produto não cadastrado.\n");
          return raiz;
     }
     // Se o valor do produto a ser deletado vem depois na ordem alfabética, acessa o filho esquerdo
     if (strcmp(raiz->produto, produto) < 0){
          raiz->esquerdo = delete(raiz->esquerdo, produto);
     }
     // Se o valor do produto a ser deletado vem antes na ordem alfabética, acessa o filho direito
     else if (strcmp(raiz->produto, produto) > 0){
          raiz->direito = delete(raiz->direito, produto);
     }
     // Quando encontrar o nodo é preciso verificar se o nodo é uma folha, se ele tem um filho ou se ele tem 2 filhos e tratar cada caso individualmente
     else if (strcmp(raiz->produto, produto) == 0) {
          // Caso o nodo a ser deletado é uma folha.
          printf("Produto %s deletado.\n", raiz->produto);
          if (raiz->esquerdo == NULL && raiz->direito == NULL) {
               free(raiz);
               return NULL; //O NULL é retornado para a chamada anterior e o nodo pai se torna uma folha
          }
          // Caso o nodo a ser deletado tenha um filho, cria-se um nodo auxiliar para salvar o filho e retornar ao nodo pai.
          else if (raiz->esquerdo == NULL) {
               Item* aux = raiz->direito;
               free(raiz);
               return aux;
          } else if (raiz->direito == NULL) {
               Item* aux = raiz->esquerdo;
               free(raiz);
               return aux;
          }
          // Caso o nodo tenha 2 filhos, é preciso encontrar um sucessor.
          else {
               Item* sucessor = encontraSucessor(raiz->direito); //Encontra o nodo mais a esquerda da subárvore a direita

               //Copia os valores do sucessor para o nodo atual
               strcpy(raiz->produto, sucessor->produto);
               raiz->quantidade = sucessor->quantidade;

               //Deleta o nodo que foi escolhido como sucessor
               raiz->direito = delete(raiz->direito, sucessor->produto);
          }
     }
     return raiz;
}

// Faz a interseção das duas arvores percorendo uma e pesquisando os valores na outra, adiciona os valores encontrados numa lista encadeada e a retorna.
Lista* intersect(Item* raizA, Item* raizB, Lista *primeiro)
{
     //Percorre a árvore da mesma maneira que a função list
     if (raizA != NULL) {
          primeiro = intersect(raizA->esquerdo, raizB, primeiro);
          if (query(raizB, raizA->produto) != NULL){
               primeiro = adicionaLista(primeiro, raizA->produto, raizA->quantidade);
          }
          primeiro = intersect(raizA->direito, raizB, primeiro);
     }
     return primeiro;
}

// Programa principal
int main()
{
     int opcao1;
     int opcao2;
     char produto[50];
     Item *raizA = NULL;
     Item *raizB = NULL;
     Item *aux = NULL;
     Lista *primeiro = NULL;

     opcao1 = 0;
     while (opcao1 != EXIT)
     {
          opcao1 = menu1();
               
          switch(opcao1)
          {
               case 1 : // gerenciar lista de compras A
                    opcao2 = 0;
                    while(opcao2 != EXIT){
                         printf("\n** Lista de Compras A **\n");
                         opcao2 = menu2();
                         switch(opcao2){ // operacoes sobre a arvore A

                              //Inserir um novo nodo
                              case 1 : 
                                   raizA = insert(raizA, novoProduto());
                                   break;

                              //Pesquisa um nodo
                              case 2 : 
                                   // Coletando dados 
                                   printf("Digite o nome do produto que deseja pesquisar: ");
                                   scanf("%s", produto);
                                   printf("\n");

                                   // Verificando se está inserido e imprimindo
                                   aux = query(raizA, produto);
                                   if(aux == NULL){
                                        printf("Produto não cadastrado.\n");
                                   }
                                   else{
                                        printf("Produto encontrado:\n");
                                        printf("Nome: %s\n", aux->produto);
                                        printf("Quantidade: %d\n", aux->quantidade);
                                   }
                                   break;

                              //Atualiza um nodo
                              case 3 : 
                                   update(raizA);
                                   break;

                              //Imprime um nodo
                              case 4 : 
                                   printf("TODOS PRODUTOS NA LISTA A:\n");
                                   list(raizA);
                                   break;

                              //Deleta um nodo
                              case 5 : 
                                   printf("Digite o nome do produto que deseja deletar: ");
                                   scanf("%s", produto);
                                   printf("\n");

                                   raizA = delete(raizA, produto);
                         }    
                    }
                    break;
               case 2 : // gerenciar lista de compras B
                    opcao2 = 0;
                    while(opcao2 != EXIT){
                         printf("\n** Lista de Compras B **\n");
                         opcao2 = menu2();
                         switch(opcao2){ // operacoes sobre a arvore B

                              //Inserir um novo nodo
                              case 1 : 
                                   raizB = insert(raizB, novoProduto());
                                   break;

                              //Pesquisa um nodo
                              case 2 : 
                                   // Coletando dados 
                                   printf("Digite o nome do produto que deseja pesquisar: ");
                                   scanf("%s", produto);
                                   printf("\n");

                                   // Verificando se está inserido e imprimindo
                                   aux = query(raizB, produto);
                                   if(aux == NULL){
                                        printf("Produto não cadastrado.\n");
                                   }
                                   else{
                                        printf("Produto encontrado:\n");
                                        printf("Nome: %s\n", aux->produto);
                                        printf("Quantidade: %d\n", aux->quantidade);
                                   }
                                   break;

                              //Atualiza um nodo
                              case 3 : 
                                   update(raizB);
                                   break;

                              //Imprime um nodo
                              case 4 : 
                                   list(raizB);
                                   break;

                              //Deleta um nodo
                              case 5 : 
                                   printf("Digite o nome do produto que deseja deletar: ");
                                   scanf("%s", produto);
                                   printf("\n");

                                   raizB = delete(raizB, produto);
                         }    
                    }
                    break;
               case 3 : // Visualizar itens duplicados
                    primeiro = intersect(raizA, raizB, primeiro);
                    imprimeLista(primeiro);
          }
     }
     return 0;
}
