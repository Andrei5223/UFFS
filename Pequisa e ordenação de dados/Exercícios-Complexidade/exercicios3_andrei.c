#include <stdio.h>

int main(){
    int num1, i, resultado;

    resultado = 0;                              //1

    printf("Digite um número para somar: ");    //1
    scanf("%d", &num1);                         //1

    for (i=0; i!=num1+1; i++){                  //2+(n-1)+(n-1)
        resultado = resultado + i;              //1
    }
    
    printf("O resultado é: %d\n", resultado);   //1
    return 0;
}

//n