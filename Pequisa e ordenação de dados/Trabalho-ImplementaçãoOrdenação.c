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
void intercala(int *A, int inicio, int meio, int fim);
void mergeSort(int *A, int inicio, int fim);
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
    int mergeVec[tamanhoVetor];
    copia(vetor, mergeVec, tamanhoVetor);
    insertionSort(mergeVec, tamanhoVetor);
    printf("\nMerge sort: ");
    imprimeVet(mergeVec, tamanhoVetor);

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

void intercala(int *A, int inicio, int meio, int fim){

    int auxiliar[fim-inicio+1];
    int i = inicio; /* i: posição atual no vetor da esquerda */
    int j = meio+1; /* j: posição atual no vetor da direita */
    int k = 0;      /* k: posição atual no vetor auxiliar */

    //percorre o vetor A dividido em 2 partes, o i percorre a esquerda e j a direita até que um deles chegue ao fim
    //Compara cada valor e salva num segundo vetor o menor
    while (i<=meio && j <= fim){
        if (A[i] <= A[j]){
            auxiliar[k] = A[i];
            i++;
        } else {
            auxiliar[k] = A[j];
            j++;
        }
        k++;
    }

    //verifica se sobraram elementos na esquerda
    while (i <= meio){
        auxiliar[k] = A[i];
        k++;
        i++;
    }

    //verifica se sobraram elementos na direita
    while (j <= fim){
        auxiliar[k] = A[j];
        k++;
        j++;
    }

    //transfere os elementos da auxiliar para o principal
    for (k = inicio; k <= fim; k++){
        A[k] = auxiliar[k - inicio];
    }
}

void mergeSort(int *A, int inicio, int fim){
    int meio; 
    if (inicio < fim){                      //impede que a recurcividade continue infinitamente
        meio = (inicio + fim) / 2;          //salva onde vai ser feita a separação do vetor principal
        mergeSort(A, inicio, meio);         //chama a função para a metade da esquerda
        mergeSort(A, meio+1, fim);          //chama a função para a metade da direita
        intercala(A, inicio, meio, fim);    //efetua a ordenação em cada chamada recursiva, do micro ao macro
    }
}