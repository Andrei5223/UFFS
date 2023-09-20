#include <stdio.h>

int main(){
    float salarios = 0, input = 0, filhos = 0, count = 0;    //3
    float salariosm, filhosm;

    printf("\nDigite o salário: ");             //1
    scanf("%f", &input);                        //1

    while (input>0){                            //n+1
        count++;                                //1
        salarios = salarios + input;

        printf("\nDigite o n° de filhos: ");    //1
        scanf("%f", &input);                    //1

        filhos = filhos + input;                //1

        printf("\nDigite o salário: ");         //1
        scanf("%f", &input);                    //1
    }
    
    salariosm = salarios / count;               //1
    filhosm = filhos / count;                   //1

    printf("\nA media de salarios é: %f", salariosm);     //1
    printf("\nA media de filhos é: %f", filhosm);         //1

    return 0;
}

//n