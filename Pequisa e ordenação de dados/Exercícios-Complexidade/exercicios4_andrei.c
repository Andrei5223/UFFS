#include <stdio.h>

int main(){
    int num1, num2, i, resultado, seletor;

    printf("\n0 - Sair\n1 - Soma\n2 - Subtração\n3 - Divisão\n4 - Multiplicação\n"); //1
    scanf("%d", &seletor);                              //1

    while (seletor!=0){                                 //n+1
        resultado = 0;                                  //1

        printf("Digite o primeiro número: ");           //1
        scanf("%d", &num1);                             //1
        printf("\nDigite o segundo número: ");          //1
        scanf("%d", &num2);                             //1

        switch (seletor)
        {
        case 0:
            break;
        case 1:
            resultado = num1 + num2;                    //1
            printf("O resultado é: %d\n", resultado);   //1
            break;
        case 2:
            resultado = num1 - num2;                    //1
            printf("O resultado é: %d\n", resultado);   //1
            break;
        case 3:
            resultado = num1 / num2;                    //1
            printf("O resultado é: %d\n", resultado);   //1
            break;
        case 4:
            resultado = num1 * num2;                    //1
            printf("O resultado é: %d\n", resultado);   //1
            break;
        }
        printf("\n0 - Sair\n1 - Soma\n2 - Subtração\n3 - Divisão\n4 - Multiplicação\n"); //1
        scanf("%d", &seletor);                          //1
    }
    
    return 0;
}

//n