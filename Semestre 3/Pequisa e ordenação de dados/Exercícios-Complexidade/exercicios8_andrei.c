#include <stdio.h>

int main(){
    int antonio = 150, carlos = 110, count = 0; //3


    while (antonio>carlos){         //n+1
        antonio = antonio + 2;      //1
        carlos = carlos + 3;        //1
        count++;                    //1
    }
    
    printf("%d anos.\n", count);    //1

    return 0;
}

//n