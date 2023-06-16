#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct TrieNo {
    struct TrieNo* filho[26];  // cada index = uma letra
    int terminal;  // fim de uma palavra
} TrieNo;


TrieNo* criaNo() {
    //aloca memoria pra um novo nó
    TrieNo* node = (TrieNo*) malloc(sizeof(TrieNo));
    node->terminal = false;

    //define os filhos como null
    for (int i = 0; i < 26; i++) {
        node->filho[i] = NULL;
    }
    return node;
}

// insere uma palavra na Trie
void insert(TrieNo* raiz, char* palavra) {
    TrieNo* atual = raiz;
    for (int i = 0; palavra[i] != '\0'; i++) {
        int index = palavra[i] - 'a';           // o (- 'a') serve para mapear cada letra em seu índice no vetor
        if (atual->filho[index] == NULL) {      // através do código ascii. Todas as letras têm seu código subtraído de 97 (a), 
            atual->filho[index] = createNode(); // ou seja, a = 0, b = 1, etc. Assim, cada letra vai para seu lugar no vetor.
        }
        atual = atual->filho[index];
    }
    atual->terminal = true;
}

// verifica se uma palavra está presente
bool search(TrieNode* root, char* palavra) {
    TrieNode* atual = root;
    for (int i = 0; palavra[i] != '\0'; i++) {
        int index = palavra[i] - 'a';
        if (atual->filho[index] == NULL) {
            return false;
        }
        atual = atual->filho[index];
    }
    return (atual != NULL && atual->terminal);
}

bool prefix(TrieNode* root, char* prefix) {
    TrieNode* atual = root;
    for (int i = 0; prefix[i] != '\0'; i++) {
        int index = prefix[i] - 'a';
        if (atual->filho[index] == NULL) {
            return false;
        }
        atual = atual->filho[index];
    }
    return (atual != NULL);
}


bool prefixes(TrieNode* root, char* prefix, char** palavras, int* contagem) {
    TrieNode* atual = root;
    for (int i = 0; prefix[i] != '\0'; i++) {
        int index = prefix[i] - 'a';
        if (atual->filho[index] == NULL) {
            return false;
        }
        atual = atual->filho[index];
    }
    getAllWords(atual, prefix, palavras, contagem);
    return (atual != NULL);
}

// Função auxiliar recursiva para obter todas as palavras com um determinado prefixo
void getAllWords(TrieNode* node, char* prefix, char** palavras, int* contagem) {
    if (node->terminal) {
        palavras[*contagem] = (char*)malloc((strlen(prefix) + 1) * sizeof(char));
        strcpy(palavras[*contagem], prefix);
        (*contagem)++;
    }

    for (int i = 0; i < 26; i++) {
        if (node->filho[i] != NULL) {
            char* newPrefix = (char*)malloc((strlen(prefix) + 2) * sizeof(char));
            sprintf(newPrefix, "%s%c", prefix, 'a' + i);
            getAllWords(node->filho[i], newPrefix, palavras, contagem);
            free(newPrefix);
        }
    }
}


// remove uma palavra 
bool removeWord(TrieNode* root, char* palavra) {
    if (root == NULL || palavra == NULL) {
        return false;
    }

    TrieNode* atual = root;
    TrieNode* caminho[26] = { NULL };  // rastreia o caminho percorrido
    int index;

    // encontra o último nó do prefixo da palavra
    for (int i = 0; palavra[i] != '\0'; i++) {
        index = palavra[i] - 'a';
        if (atual->filho[index] == NULL) {
            return false;  // não encontrado
        }
        caminho[i] = atual;
        atual = atual->filho[index];
    }

    if (!atual->terminal) {
        return false;  // não encontrado
    }

    atual->terminal = false;  // deixa de ser terminal

    // verifica se tem filhos ou é prefixo
    bool temfilhos = false;
    for (int i = 0; i < 26; i++) {
        if (atual->filho[i] != NULL) {
            temfilhos = true;
            break;
        }
    }

    // remove nós sem filhos e que não são prefixos
    int tamanho = strlen(palavra) - 1;
    for (int i = tamanho; i >= 0 && !temfilhos; i--) {
        index = palavra[i] - 'a';
        free(atual);
        atual = caminho[i];
        atual->filho[index] = NULL;

        // Verifica se o nó atual é prefixo de outra palavra
        for (int j = 0; j < 26; j++) {
            if (atual->filho[j] != NULL) {
                temfilhos = true;
                break;
            }
        }
    }

    return true;  // palavra removida
}

// libera a memória
void freeTrie(TrieNode* root) {
    if (root == NULL) {
        return;
    }
    for (int i = 0; i < 26; i++) {
        freeTrie(root->filho[i]);
    }
    free(root);
}

int main() {
    TrieNode* root = createNode();

// teste de inserção
    insert(root, "teste");
    insert(root, "testando");

    // busca palavras
    printf("%s\n", search(root, "teste") ? "Palavra encontrada!" : "Palavra não encontrada!");  // a função retorna o resultado direto no print
    printf("%s\n", search(root, "testando") ? "Palavra encontrada!" : "Palavra não encontrada!");
    printf("%s\n", search(root, "tes") ? "Palavra encontrada!" : "Palavra não encontrada!");

    // verifica se o prefixo está na estrututra
    printf("%s\n", prefix(root, "test") ? "Prefixo encontrado!" : "Prefixo não encontrado!");

    // obtêm todas as palavras com o seguinte prefixo:
    char palavra_teste[50] = "test";

    char* palavras[100];
    int contagem = 0;
    prefixes(root, palavra_teste, palavras, &contagem);           //
    printf("\nPalavras com o prefixo '%s':\n", palavra_teste);
    for (int i = 0; i < contagem; i++) {
        printf("%s\n", palavras[i]);
        free(palavras[i]);
    }

    printf("\n#################\n");

    // remove
    printf("%s\n", removeWord(root, "testando") ? "\nPalavra removida!" : "\nPalavra não encontrada!");

    // confirma remoção
    printf("%s\n", search(root, "testando") ? "Palavra encontrada!" : "Palavra não encontrada!");

    // Libera a memória
    freeTrie(root);

    return 0;
}