#include <stdio.h>

int main(){
    int num, i;

    printf("Digite o número: ");
    scanf("%d", &num);              //1
    printf("\n");                   //1

    for (i=0; i<=num; i++){         //2+(n-1)+(n-1)
        if(i == ((num+1) / 2)){     //1
            if(i == num / 2){       //1
                printf("Metade: "); //1
                printf("%d\n", i);  //1
                continue;
            }
            printf("Metade\n");     //1
        }
        printf("%d\n", i);          //1
    }
    
    return 0;
}

//1 + 1 + (2+(n-1)+(n-1)) * (1+1+1+1+1+1)
//2 + 2+n-1+n-1 + 2+n-1+n-1 + 2+n-1+n-1 + 2+n-1+n-1 + 2+n-1+n-1 + 2+n-1+n-1
//12n + 14 - 12
//12n + 2
//n