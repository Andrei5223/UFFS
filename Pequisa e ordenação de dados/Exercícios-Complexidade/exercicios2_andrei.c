#include <stdio.h>

int main(){
    int num1, num2, i, resultado;

    printf("Digite um número para somar: ");    //1
    scanf("%d", &num1);                         //1

    printf("Digite a quantidade de somas: ");   //1
    scanf("%d", &num2);                         //1

    for (i=0; i!=num2; i++){                    //2+(n-1)+(n-1)
        resultado = resultado + num1;           //1
    }
    
    printf("O resultado é: %d\n", resultado);   //1
    return 0;
}

//1 + 1 + 1 + 1 + 2 + n - 1 + n - 1 + 1
//1 + 1 + 1 + 2 + n + n
//2n + 5
//n
