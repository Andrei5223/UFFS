#include <stdio.h>

int main(){
    int num1, i, resultado;

    resultado = 1;                              //1

    printf("Digite um número para fatoriar: "); //1
    scanf("%d", &num1);                         //1

    if (num1==0){
        printf("O resultado é: 1\n");           //1
    }
    else{
        for (i=num1; i!=0; i--){                    //2+(n-1)+(n-1)
            resultado = resultado * i;              //1
        }
        
        printf("O resultado é: %d\n", resultado);   //1
    }

    return 0;
}

//n