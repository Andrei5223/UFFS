#include <stdio.h>

int main(){
    int total = 0, input = 0, validos = 0;              //3
    float resultado;

    printf("\nDigite um número: ");                     //1
    scanf("%d", &input);                                //1

    while (input>0){                                    //n+1
        total++;                                        //1

        if(input>=10 && input<=20){                     //2
            validos++;                                  //1
        }

        printf("\nDigite um número: ");                 //1
        scanf("%d", &input);                            //1
    }
    
    resultado = (validos * 100) / total;                //1

    printf("\nA porcentagem é: %f", resultado);         //1

    return 0;
}

//n