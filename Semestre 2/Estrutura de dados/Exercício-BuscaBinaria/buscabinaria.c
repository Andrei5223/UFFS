#include <stdio.h>

int buscaBinaria (int *vet, int inicio, int fim, int chave){
   int meio;
   if (inicio > fim)
       return -1;
   meio = (inicio+fim)/2;
  
   if (vet[meio] == chave) {
       return meio;
   }
  
   if (chave > vet[meio] )
       return buscaBinaria(vet, meio+1, fim, chave);
   else
       return buscaBinaria(vet, inicio, meio-1, chave);
}

int main{
    int vetor[10]={23, 12, 3, 5, 8, 54, 32, 87, 34, 14};
    int fim = 10, resultado = 0;
    resultado = buscaBinaria(vetor, 0, fim, 87);

    if (resultao != -1)
        printf("O valor encontrado é %d\n", vetor[resultado]);
    else
        printf("Valor não encontrado!\n");

    return 0;
}