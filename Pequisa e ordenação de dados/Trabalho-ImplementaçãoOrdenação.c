/**
 * @file algoritmosorg.c
 * @author Andrei Carlesso Camilotto
 * @version 0.3
 * @date 2023-03-30
 *
 * @copyright Copyright (c) 2023
 *
 *
 * @brief Arquivo template para trabalho de Pesquisa e Ordenação.
 *
 *      Cada estudante deve implementar as funções conforme as assinaturas
 * abaixo e realizar as impressões dos vetores após a ordenação. Desta forma,
 * o(a) estudante deve implementar o trecho de código para impressão dos vetores
 * ordenados dentro da função `main` conforme o exemplo do Bubble Sort abaixo.
 *
 * Se necessário, declare e implemente funções auxiliares para realizar as
 * ordenações.
 *
 * Importante:Não altere as assinaturas dos métodos de ordenação!
 *
 * Caso o vetor não possa ser ordenado por algum método, imprima uma mensagem de
 * aviso e o vetor original.
 *
 * Atenção: Antes de entregar, conferir se dos dados de documentação no início
 * do arquivo estão preenchidos corretamente.
 *
 */
#include <stdio.h>

void troca(int *A, int *B);
void copia(int *A, int *v, int size); //copia o vetor original (A) para outro (v)
void imprimeVet(int *V, int size);
void bubbleSort(int *A, int size);
void selectionSort(int *A, int size);
void insertionSort(int *A, int size);
// void mergeSort(int *A, int size);
// void quickSort(int *A, int size);
// void heapSort(int *A, int size);
// void countingSort(int *A, int size);
// void radixSort(int *A, int size);


int main(){

    int i;
    int vetor[] = {1, 22, -10, 38, 5, 7};
    int tamanhoVetor = (int)sizeof(vetor)/sizeof(int);

    printf("\nVetor original: ");
    for (i = 0 ; i < tamanhoVetor ; i++)
        printf("%d ", vetor[i]);

    printf("\nVetor tamanho = %d\n", tamanhoVetor);

    // bubble sort
    int bubbleVec[tamanhoVetor];
    copia(vetor, bubbleVec, tamanhoVetor);
    bubbleSort(bubbleVec, tamanhoVetor);
    printf("\nBubble sort: ");
    imprimeVet(bubbleVec, tamanhoVetor);

    // selection sort
    int selectionVec[tamanhoVetor];
    copia(vetor, selectionVec, tamanhoVetor);
    selectionSort(selectionVec, tamanhoVetor);
    printf("\nSelection sort: ");
    imprimeVet(selectionVec, tamanhoVetor);

    // insertion sort
    int insertionVec[tamanhoVetor];
    copia(vetor, insertionVec, tamanhoVetor);
    insertionSort(insertionVec, tamanhoVetor);
    printf("\nInsertion sort: ");
    imprimeVet(insertionVec, tamanhoVetor);

    // merge sort

    // quick sort

    // heap sort

    // counting sort

    // radix sort

    return 0;
}
void imprimeVet(int *V, int size){
    int i;
    for (i = 0 ; i < size ; i++)
        printf("%d ", V[i]);
    printf("\n");
}

void troca(int *A, int *B){
    int aux = *A;
    *A = *B;
    *B = aux;
}

void copia(int *A, int *V, int size){
    int i;
    for (i = 0 ; i < size ; i++)
        V[i] = A[i];
}

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

void selectionSort(int *A, int size){
    int i, j, menor;

    for(i=0;i<size;i++){
        menor = i;

        for(j=i+1;j<size;j++){
            if(A[menor]>A[j]){
                menor = j;
            }
        }
        troca(&A[i], &A[menor]);
    }
}

void insertionSort(int *A, int size) {
    int i, j, p;

    for (i = 1; i < size; i++) {
        p = A[i];

        for (j = i; j > 0 && p < A[j-1]; j--) {
            A[j] = A[j-1];
        }
        A[j] = p;
    }
}
