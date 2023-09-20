/**
 * @file 01OrdenacaoExterna.c
 * @author Andrei Camilotto e Djonatan Bonelli
 * @version 0.1
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

// Função para ordenar um bloco de dados na memória
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

int somarElementosVetor(int vetor[], int tamanho) {
    int soma = 0;
    for (int i = 0; i < tamanho; i++) {
        soma += vetor[i];
    }
    return soma;
}

// Função para mesclar arquivos ordenados. Ela lê um elemento de cada arquivo e salva no vetor de numeros, também mantém salva a posição do leitor de cada arquivo
// Sabendo a posição do leitor ela mescla dado por dado em um arquivo de saida 
void mergeFiles(FILE* files[], FILE* output, int coluna) {
    int numeros[MAX_SIZE]; //guarda um numero de cada arquivo
    int posicoes[MAX_SIZE] = {1}; //guarda a posição atual do ponteiro de cada arquivo
    int aux = 0;
    int index = 0;

    while (somarElementosVetor(posicoes, MAX_SIZE) == (MAX_SIZE + 1) * MAX_SIZE){
        
        //le um numero de cada arquivo e salva no vetor de numeros
        for (int i = 0; i <= MAX_SIZE; i++){
            
            if (posicoes[i] > MAX_SIZE || feof(files[i]) != 0){     //garante que serão lidos apenas o numero de elementos especificados em MAX_SIZE ou parará se alcançar o final do arquivo
                rewind(files[i]);
                numeros[i] = INT_MAX;
            } else {
                //fseek(files[i], posicoes[i] * sizeof(int), coluna * sizeof(int) * MAX_SIZE);
                fseek(files[i], posicoes[i] * sizeof(int) + coluna * sizeof(int) * MAX_SIZE, SEEK_SET);      //garante que a leitura será iniciada na coluna especificada
                //aux = fread(numeros[i], sizeof(int), 1, files[i]);
                aux = fread(&numeros[i], sizeof(int), 1, files[i]);

            }
        }

        //encontra o index do menor numero
        index = encontraMenor(numeros, MAX_SIZE);

        //escreve no output
        aux = fwrite(numeros[index], sizeof(int), 1, output);
        posicoes[index]++;
    }
}

void gravaNaMemoria(int chaves[], int tamanho){
    int aux = 0;

    //cria o arquivo e escreve os valores
    FILE *fp = fopen("dados.txt", "wb");
    aux = fwrite(chaves, sizeof(int), tamanho, fp);
    fclose(fp);
}

// Função principal
int main() {

    // int chaves = {3, 98, 61, 62,  1, 99, 57, 98, 58, 18, 59, 35, 82, 91, 52, 95, 46,
    //     69, 48, 82, 52,  4, 87, 38, 44, 42, 72,  2, 95, 84, 34, 40, 23, 11, 75,
    //     37, 62, 96, 12, 22, 56, 20, 64,  2, 30, 48,  6, 19, 34, 31};
    // int chaves = {57, 91, 21, 89, 72, 74, 46, 61, 26, 50, 85, 76, 53, 22, 15, 40, 90, 2, 94, 54};
    // int chaves = {9,  2, 15, 19, 10, 14,  4, 13,  2, 19};
    int chaves[] = {178, 231, 244, 292, 321, 356, 389, 421, 482, 488, 490, 502, 546, 641, 694, 786, 841, 890, 899, 922};
    int size = (int)sizeof(chaves)/sizeof(int);

    gravaNaMemoria(chaves, size);

    FILE *inputFile, *outputFile;
    int i, numFiles;

    // Abra o arquivo de entrada
    inputFile = fopen("dados.txt", "r");
    if (inputFile == NULL) {
        printf("Erro ao abrir o arquivo de entrada.\n");
        return 1;
    }

    // Divida o arquivo de entrada em arquivos menores
    int count = 0;
    int num;
    while (fscanf(inputFile, "%d", &num) != EOF) {
        int arr[MAX_SIZE];
        arr[count++] = num;
        if (count == MAX_SIZE) {
            // Classifique e grave os dados em um novo arquivo
            bubbleSort(arr, count);
            char fileName[10];
            sprintf(fileName, "temp%d.dat", numFiles);
            FILE *tempFile = fopen(fileName, "w");
            if (tempFile == NULL) {
                printf("Erro ao criar o arquivo temporário.\n");
                return 1;
            }
            fwrite(arr, sizeof(int), count, tempFile);
            fclose(tempFile);
            count = 0;
            numFiles++;
        }
    }

    fclose(inputFile);

    // Mesclar os arquivos menores
    if (numFiles > 1) {
        int currentNumFiles = numFiles;
        int pass = 1;
        while (currentNumFiles > 1) {
            int mergeCount = 0;
            for (i = 0; i < currentNumFiles; i += 2) {
                char inputFile1[10];
                char inputFile2[10];
                char outputFile[10];

                sprintf(inputFile1, "temp%d.dat", i);
                sprintf(inputFile2, "temp%d.dat", i + 1);
                sprintf(outputFile, "temp%d.dat", numFiles + mergeCount);

                FILE *file1 = fopen(inputFile1, "r");
                FILE *file2 = fopen(inputFile2, "r");
                FILE *output = fopen(outputFile, "w");

                mergeFiles(file1, file2, output);

                fclose(file1);
                fclose(file2);
                fclose(output);

                mergeCount++;
            }
            currentNumFiles = mergeCount;
            numFiles += mergeCount;
            pass++;
        }
    }

    // Renomear arquivo final
    char finalOutputFile[10];
    sprintf(finalOutputFile, "sorted_data.txt");
    rename("temp0.dat", finalOutputFile);

    printf("Ordenação concluída com sucesso!\n");

    return 0;
}
