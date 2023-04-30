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
void imprimeVet(int *V, int size, int *sucesso);
void intercalaMerge(int *A, int inicio, int meio, int fim);
void MergeSort(int *A, int inicio, int fim);
int particiona(int *A, int inicio, int fim);
void QuickSort(int *A, int inicio, int fim);
void criaHeap(int *A, int i, int size);
int maiorElemento(int *A, int size);
void CountingSort(int *A, int size, int *sucesso);

void bubbleSort(int *A, int size);
void selectionSort(int *A, int size);
void insertionSort(int *A, int size);
void mergeSort(int *A, int fim);
void quickSort(int *A, int size);
void heapSort(int *A, int size);
void countingSort(int *A, int size);
// void radixSort(int *A, int size);

int sucesso = 1; 
//Como não é possível mudar a tipagem das funções declaradas eu n posso fazer elas retornarem um valor de flag
//então utilizarei uma variável global (a contra gosto) para passar como referencia dentro da função secundaria que criei para verificar se houve sucesso na ordenação.

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
    imprimeVet(bubbleVec, tamanhoVetor, &sucesso);

    // selection sort
    int selectionVec[tamanhoVetor];
    copia(vetor, selectionVec, tamanhoVetor);
    selectionSort(selectionVec, tamanhoVetor);
    printf("\nSelection sort: ");
    imprimeVet(selectionVec, tamanhoVetor, &sucesso);

    // insertion sort
    int insertionVec[tamanhoVetor];
    copia(vetor, insertionVec, tamanhoVetor);
    insertionSort(insertionVec, tamanhoVetor);
    printf("\nInsertion sort: ");
    imprimeVet(insertionVec, tamanhoVetor, &sucesso);

    // merge sort
    int mergeVec[tamanhoVetor];
    copia(vetor, mergeVec, tamanhoVetor);
    mergeSort(mergeVec, tamanhoVetor);
    printf("\nMerge sort: ");
    imprimeVet(mergeVec, tamanhoVetor, &sucesso);

    // quick sort
    int quickVec[tamanhoVetor];
    copia(vetor, quickVec, tamanhoVetor);
    mergeSort(quickVec, tamanhoVetor);
    printf("\nQuick sort: ");
    imprimeVet(quickVec, tamanhoVetor, &sucesso);

    // heap sort
    int heapVec[tamanhoVetor];
    copia(vetor, heapVec, tamanhoVetor);
    mergeSort(heapVec, tamanhoVetor);
    printf("\nHeap sort: ");
    imprimeVet(heapVec, tamanhoVetor, &sucesso);

    // counting sort
    int countingVec[tamanhoVetor];
    copia(vetor, countingVec, tamanhoVetor);
    countingSort(countingVec, tamanhoVetor);
    printf("\nCounting sort: ");
    imprimeVet(countingVec, tamanhoVetor, &sucesso);

    // radix sort

    return 0;
}
void imprimeVet(int *V, int size, int *sucesso){
    if (*sucesso == 0){
        printf("\nImpossível ordenar o vetor com o método selecionado:");
        *sucesso = 1;
        return;
    }
    
    for (int i = 0 ; i < size ; i++)
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

void intercalaMerge(int *A, int inicio, int meio, int fim){

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

void mergeSort(int *A, int fim){
    MergeSort(A, 0, fim);
}

void MergeSort(int *A, int inicio, int fim){
    int meio; 
    if (inicio < fim){                          //impede que a recurcividade continue infinitamente
        meio = (inicio + fim) / 2;              //salva onde vai ser feita a separação do vetor principal
        MergeSort(A, inicio, meio);             //chama a função para a metade da esquerda
        MergeSort(A, meio+1, fim);              //chama a função para a metade da direita
        intercalaMerge(A, inicio, meio, fim);   //efetua a ordenação em cada chamada recursiva, do micro ao macro
    }
}

int particiona(int *A, int inicio, int fim){
    int posPivo = fim;
    int k = inicio, i = inicio;
    for (i = inicio; i < fim; i++){
        if (A[i] <= A[posPivo]){
            troca(&A[i], &A[k]);
            k++;
        }
    }

    if (A[k]>A[posPivo]){
        troca(&A[i], &A[posPivo]);
    }
    return posPivo;
}

void QuickSort(int *A, int inicio, int fim){
    int posPivo;
    if (inicio < fim){
        posPivo = particiona(A, inicio, fim);
        QuickSort(A, inicio, posPivo+1);
        QuickSort(A, posPivo+1, fim);
    }
}

void quickSort(int *A, int size){
    QuickSort(A, 0, size);
}

void criaHeap(int *A, int i, int size){
    int maior = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < size && A[left] > A[i]){
        maior = left;
    }
    if (right < size && A[right] > A[maior]){
        maior = right;
    }

    if (maior != i){
        troca(&A[i], &A[maior]);
        criaHeap(A, maior, size);
    }
}

void heapSort(int *A, int size){
    int k;
    for (k = size/2-1; k == 0; k--){
        criaHeap(A, k, size);
    }

    for (k = size-1; k==1; k--){
        troca(&A[0], &A[k]);
        criaHeap(A, 0, k);
    }
}

int maiorElemento(int *A, int size){
    int maior = A[0];

    for (int i = 0; i < size; i++){
        if (A[i] > maior){
            maior = A[i];
        }
        if (A[i] < 0){
            return 0;
        }
    }
    return maior;
}

void countingSort(int *A, int size){
    CountingSort(A, size, &sucesso);
}

void CountingSort(int *A, int size, int *sucesso){
    int k = maiorElemento(A, size);
    int count[k+1];
    int aux[size];

    if (k < 0){
        *sucesso = 0;
        return;
    }

    for (int i = 0; i <= k; i++){
        count[i] = 0;
    }

    for (int i = 0; i < size; i++){
        count[A[i]]++;
    }

    for (int i = 1; i <= k; i++){
        count[i] += count[i-1];
    }

    for (int i = size-1; i >= 0; i--){
        count[A[i]] = count[A[i]] - 1;
        aux[count[A[i]]] = A[i];
    }

    for (int i = 0; i < size; i++){
        A[i] = aux[i];
    }

}