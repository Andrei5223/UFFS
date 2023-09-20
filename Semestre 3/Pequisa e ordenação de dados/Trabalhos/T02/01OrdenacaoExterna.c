/**
 * @file 01OrdenacaoExterna.c
 * @author Andrei Camilotto
 * @version 0.6
 * @date 2023-06-10
 *
 * @copyright Copyright (c) 2023
 *
 * @brief Arquivo template para Questão 02 do trabalho de Pesquisa e Ordenação T2.
 *
 *      Implemente uma ordenação externa utilizando a restrição de que somente 5
 *  elementos podem ser armazenados em memória (vetores de teste no template). A
 *  definição deste limite está na variável MAX_IN_MEMORY abaixo.
 *
 *      Utilize os vetores comentados no código para realizar seus testes.
 *
 * Atenção: Antes de entregar, conferir se dos dados de documentação no início
 * do arquivo estão preenchidos corretamente.
 *
 */



#include <stdio.h>
#include <limits.h>

#define MAX_IN_MEMORY 5


// CÓDIGO INCOMPLETO!!! OPTEI POR NÃO TERMINAR POIS ESTAVA TENDO MUITA DIFICULTADE E NÃO TINHA EXPECTATIVA DE RESOLVER OS PROBLEMAS QUE CONSIGO PREVER NO PROBLEMA
// NOTAÇÃO (COMPLETA) NAS FUNÇÕES FINALIZADAS E FUNCIONAM COMO O PLANEJADO
// ENTREGANDO APENAS PRA DIZER QUE TENTEI












// FEITO funcao para gravar as chaves em um txt na memoria
// FEITO funcao para criar os 10 arquivos na memoria

//funcao recursiva para ler os dados e gravar nos arquivos de saida, parar quando os dados da entrada acabarem
    //identificar se está lendo da raiz ou dos arquivos de entrada
        //funcao que le direto da raiz (vai ser utilizada para identificar se já terminou de ordenar ou não)
        //funcao que le dos 5 arquivos de entrada
//funcao recursiva que so vai para de chamar a anterior quando estiver ordenado em apenas um arquivo de saída

#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 5

void troca(int *A, int *B){
    int aux = *A;
    *A = *B;
    *B = aux;
}

// (COMPLETA) Função para ordenar um bloco de dados na memória
void bubbleSort(int *A, int size){
    int i, j;

    for(i=0;i<size-1;i++){

        for(j=size-1;j>i;j--){

            if(A[j-1]>A[j]){
                troca(&A[j-1], &A[j]);
            }
        }
    }
}

// (COMPLETA) encontra o index do menor valor em um vetor
int encontraMenor(int numeros[], int size){
    int menor = numeros[0];
    int index = 0;
    for (int i = 1; i <= size; i++){
        if (numeros[i] < menor){
            menor = numeros[i];
            index = i;
        }
    }
    return index;
}

// (COMPLETA) usada para verificar o fim de uma coluna
int verificaINT_MAX(int vetor[], int tamanho) {
    for (int i = 0; i < tamanho; i++) {
        if (vetor[i] != INT_MAX) {return 1;}
    }
    return 0;
}

// (COMPLETA)
// Função para mesclar arquivos ordenados.
// Considera-se que existe um valor INT_MAX dividindo as colunas
void mergeFiles(FILE* files[], FILE* output[], int coluna) {
    int numeros[MAX_SIZE]; //guarda um numero de cada arquivo
    int index = 0;

    //le um numero de cada arquivo e salva no vetor de numeros
    //quando a funçao for chamada recursivamente a cabeça de leitura vai ter lido um INT_MAX, e, portanto, estará no primeiro valor da proxima coluna
    for (int i = 0; i <= MAX_SIZE; i++){
        if (feof(files[i]) != 0){
            fread(&numeros[i], sizeof(int), 1, files[i]);
        } else {
            numeros[i] = INT_MAX;
        }
    }

    //vai ler os arquivos de entrada até que todos cheguem num INT_MAX e grava no arquivo de saida especificado
    while (verificaINT_MAX(numeros, MAX_SIZE != 0)){

        //encontra o index do menor numero
        index = encontraMenor(numeros, MAX_SIZE);

        //escreve no output
        fwrite(&numeros[index], sizeof(int), 1, output[coluna]);

        //atualiza para a proxima leitura, se chegou no fim da linha ou arquivo vai salvar INT_MAX
        if (feof(files[index]) != 0){
            fread(&numeros[index], sizeof(int), 1, files[index]);
        } else {
            numeros[index] = INT_MAX;
        }
    }
}

// (COMPLETA) CRIA O ARQUIVO E ESCREVE AS CHAVES PASSADAS NO TEMPLATE
void gravaNaMemoria(int chaves[], int tamanho){
    //cria o arquivo e escreve os valores
    FILE *fp = fopen("dados.txt", "wb");
    fwrite(chaves, sizeof(int), tamanho, fp);
    fclose(fp);
}

// (INCOMPLETA) cria e escreve os valores iniciais nos arquivos temporarios
void criaArquivos(FILE* input){
    FILE* filesA[MAX_SIZE];
    FILE* filesB[MAX_SIZE];
    int numeros[MAX_SIZE];

    while (fread(numeros, sizeof(int), MAX_SIZE, input) == MAX_SIZE){
        for (int i=1; i <= MAX_SIZE; i++){
            //cria os nomes de arquivo
            char fileNameA[10];
            char fileNameB[10];
            sprintf(fileNameA, "fileA%d", i);
            sprintf(fileNameB, "fileB%d", i);


            filesA[i] = fopen(fileNameA, "wb");                         //cria os arquivos no diretorio
            filesB[i] = fopen(fileNameB, "wb");

            fread(numeros, sizeof(int), MAX_SIZE, input);               //le os dados no input

            bubbleSort(numeros, MAX_SIZE);

            fwrite(numeros, sizeof(int), MAX_SIZE, filesA[i]);          //escreve no temporario 

            int INT_MAX_VALOR = INT_MAX;
            fwrite(&INT_MAX_VALOR, sizeof(int), 1, filesA[i]);          //adiciona o INT_MAX para demarcação

            fclose(filesA[i]);
            fclose(filesB[i]);
        }

        // if (fread(numeros, sizeof(int), MAX_SIZE, input) < MAX_SIZE) {
        //     break; // Interromper o laço
        // }

    }
}



// Função principal
int main() {

    // int chaves = {3, 98, 61, 62,  1, 99, 57, 98, 58, 18, 59, 35, 82, 91, 52, 95, 46, 69, 48, 82, 52,  4, 87, 38, 44, 42, 72,  2, 95, 84, 34, 40, 23, 11, 75, 37, 62, 96, 12, 22, 56, 20, 64,  2, 30, 48,  6, 19, 34, 31};
    // int chaves = {57, 91, 21, 89, 72, 74, 46, 61, 26, 50, 85, 76, 53, 22, 15, 40, 90, 2, 94, 54};
    // int chaves = {9,  2, 15, 19, 10, 14,  4, 13,  2, 19};
    int chaves[] = {178, 231, 244, 292, 321, 356, 389, 421, 482, 488, 490, 502, 546, 641, 694, 786, 841, 890, 899, 922};
    int size = (int)sizeof(chaves)/sizeof(int);

    gravaNaMemoria(chaves, size);
    
    FILE *inputFile;

    // Abra o arquivo de entrada
    inputFile = fopen("dados.txt", "rb");
    if (inputFile == NULL) {
        printf("Erro ao abrir o arquivo de entrada.\n");
        return 1;
    }

    criaArquivos(inputFile);

    return 0;
}
