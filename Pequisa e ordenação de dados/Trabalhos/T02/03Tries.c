/**
 * @file 03Tries.c
 * @author Andrei Camilotto
 * @version 0.1
 * @date 2023-06-15
 *
 * @copyright Copyright (c) 2023
 *
 * @brief Arquivo template para Questão 03 do trabalho de Pesquisa e Ordenação T2.
 *
 *      Implemente uma estrutura de Trie para armazenar chaves em formato de
 * caractere. Inclua operações de inserção, remoção e busca completa e busca
 * parcial na estrutura do Trie.
 *      Para a busca completa, o algoritmo deve apenas informar se a chave foi
 * encontrada ou não dentro da estrutura. Para a busca parcial, o algoritmo deve
 * retornar todas as chaves armazenadas abaixo da string informada para a busca.
 *
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define ALFABETO_SIZE 26
#define TAMANHO 13
#define true  1
#define false  0

//estrutura que contem os filhos e um terminal. O caractere é identificado pela existência do nó no índice do vetor
typedef struct TrieNo {
    struct TrieNo* filho[ALFABETO_SIZE];
    int terminal;
} TrieNo;


TrieNo* criaNo() {
    //aloca memoria pra um novo nó
    TrieNo* node = (TrieNo*) malloc(sizeof(TrieNo));
    node->terminal = false;

    //define os filhos como null
    for (int i = 0; i < ALFABETO_SIZE; i++) {
        node->filho[i] = NULL;
    }
    return node;
}

//recebe a raiz e a string a ser inserida
void inserir(TrieNo* raiz, char* palavra) {
    TrieNo* atual = raiz;

    //percorre a trie
    for (int i = 0; palavra[i] != '\0'; i++) {
        //- 'a' vai converter o int do char para uma localização no vetor
        int index = palavra[i] - 'a';
        
        //se não existe é criado um nó e a letra passa a existir na estrutura
        if (atual->filho[index] == NULL) {      
            atual->filho[index] = criaNo();
        }

        //responsável por percorrer a arvore pelo for
        atual = atual->filho[index];
    }

    //ao sair do for indica o fim da palavra, então o terminal é indicado
    atual->terminal = true;
}

int pesquisaPalavra(TrieNo* raiz, char* palavra) {
    TrieNo* atual = raiz;

    //percorre a trie
    for (int i = 0; palavra[i] != '\0'; i++) {
        //converte a letra para um index
        int index = palavra[i] - 'a';

        //se o próximo caractere não existir a palavra não existe
        if (atual->filho[index] == NULL) {
            return false;
        }

        //percorre a trie
        atual = atual->filho[index];
    }

    //se o nó atual existe, retorna o terminal
    if (atual != NULL){
        return (atual->terminal);
    }

    //garante que não da merda em algum caso previsto apenas por Deus
    return false;
}

int removePalavra(TrieNo* raiz, char* palavra, int size) {

    // retorna falso em caso de erro
    if (raiz == NULL || palavra == NULL) {
        return false;
    }

    TrieNo* atual = raiz;
    TrieNo* caminho[26] = { NULL };  // rastreia o caminho percorrido
    int index;

    // encontra o nó terminal da palavra 
    for (int i = 0; palavra[i] != '\0'; i++) {
        //converte a letra para um index
        index = palavra[i] - 'a';

        // retorna falso em caso de erro
        if (atual->filho[index] == NULL) {
            return false;
        }

        //preenche o vetor com os nós percorridos para ter acesso a todos eles
        caminho[i] = atual;
        atual = atual->filho[index];
    }

    // retorna falso em caso de erro (não encontrou a palavra)
    if (!atual->terminal) {
        return false;
    }

    //começa removendo o terminal
    atual->terminal = false;

    // verifica se tem filhos percorrendo o vetor
    int temfilhos = false;
    for (int i = 0; i < 26; i++) {
        if (atual->filho[i] != NULL) {
            temfilhos = true;
            break;
        }
    }

    // percorre em ordem inversa até encontrar um no com filhos ou chegar no fim da palavra
    int tamanho = size - 1;
    for (int i = tamanho; i >= 0 && temfilhos == true; i--) {
        //converte a letra para um index
        index = palavra[i] - 'a';

        //apaga o nó atual
        free(atual);

        //converte o atual para o proximo nó a ser analisado
        atual = caminho[i];

        //remove o endereçamento do atual
        atual->filho[index] = NULL;

        // Verifica se o nó atual é tem filhos, se tiver sairá do for
        for (int j = 0; j < 26; j++) {
            if (atual->filho[j] != NULL) {
                temfilhos = true;
                break;
            }
        }
    }

    return true;
}

//recebe um nó da arvore (inicialmente raiz)
//o prefixo a ser pesquisado
//o vetor de strings para salvar as q encontrar
//um int pra salvar a quantia de strings encontradas
void buscaChavesRecursivo(TrieNo* no, char* prefixo, int indice, char** vetor, int* contador) {
    //encerra caso o nó atual seja nulo
    if (no == NULL) {
        return;
    }

    //caso encontre um terminal copia o prefixo para o vetor
    if (no->terminal == true) {
        vetor[*contador] = strdup(prefixo);
        (*contador)++;
    }

    //percorre os filhos do no atual
    for (int i = 0; i < ALFABETO_SIZE; i++) {
        if (no->filho[i] != NULL) {
            //adiciona no prefixo a letra do nó atual
            prefixo[indice] = 'a' + i;

            //adiciona a marcação de fim de string
            prefixo[indice + 1] = '\0';

            //chama a função para o filho atual e com o prefixo modificado
            buscaChavesRecursivo(no->filho[i], prefixo, indice + 1, vetor, contador);

            //desfaz a mudança no prefixo
            prefixo[indice] = '\0';
        }
    }
}

// verifica se um prefixo existe e retorna o nodo dele
TrieNo* busca(TrieNo* raiz, char* prefixo) {
    TrieNo* atual = raiz;

    for (int i = 0; prefixo[i] != '\0'; i++) {
        //converte o char para um index
        int index = prefixo[i] - 'a';

        //se ele não existe retorna NULL
        if (atual->filho[index] == NULL) {
            return NULL;
        }

        //percorre o trie
        atual = atual->filho[index];
    }

    return atual;
}

//busca todas as palavras com um determinado prefixo
//recebe um vetor de chars como prefixo a ser pesquisado e uma variavel para armazenar a quantidade de chaves encontradas
char** buscaChaves(TrieNo* raiz, char* prefixo, int* tamanhoVetor) {
    TrieNo* atual = busca(raiz, prefixo);

    //retorna NULL em caso de erro
    if (raiz == NULL || prefixo == NULL) {
        return NULL;
    }

    //retorna NULL em caso do prefixo nao existir
    if (atual == NULL) {
        return NULL;
    }

    //aloca espaço para um vetor 
    char** vetor = (char**)malloc(sizeof(char*) * 100);  // tamanho inicial arbitrário
    int contador = 0;

    //faz a busca das strings começando pelo prefixo
    int indice = strlen(prefixo);
    buscaChavesRecursivo(atual, prefixo, indice, vetor, &contador);

    *tamanhoVetor = contador;
    return vetor;
}


int main(){

    char chaves[][20] = {"amy", "ann", "emma", "rob" , "roger", "robert", "bob", "emmily"};

    //cria a raiz
    TrieNo* raiz = criaNo();

    int numChaves = sizeof(chaves) / sizeof(chaves[0]);

    printf("INSERINDO CHAVES:\n");
    for (int i = 0; i < numChaves; i++){
        inserir(raiz, chaves[i]);
        printf("%s adicionada\n", chaves[i]);
    }

    printf("\nPESQUISANDO CHAVES:\n");
    if (pesquisaPalavra(raiz, "amy") == true){
        printf("amy encontrada\n");
    } else {
        printf("amy nao encontrada\n");
    }
    if (pesquisaPalavra(raiz, "emmily") == true){
        printf("emmily encontrada\n");
    } else {
        printf("emmily nao encontrada\n");
    }
    if (pesquisaPalavra(raiz, "emily") == true){
        printf("emily encontrada\n");
    } else {
        printf("emily nao encontrada\n");
    }

    printf("\nPESQUISANDO PREFIXOS:\n");
    char prefixo[] = "ro";
    int tamanhoVetor;
    char** vetorChaves = buscaChaves(raiz, prefixo, &tamanhoVetor);

    if (vetorChaves != NULL) {
        printf("Chaves encontradas com prefixo '%s':\n", prefixo);
        for (int i = 0; i < tamanhoVetor; i++) {
            printf("%s\n", vetorChaves[i]);
        }
    } else {
        printf("Nenhuma chave encontrada com prefixo '%s'.\n", prefixo);
    }


    return 0;
}