#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main (){

    //cria o arquivo e escreve uma string
    FILE *fp = fopen("banana.txt", "wt");

    if (fp == NULL) {
        printf("Erro na abertura do arquivo 1!");
        exit(1); // aborta o programa
    }

    while (1==1){
        char texto[20] = "banana ";
        for (size_t i = 0; i < strlen(texto); i++){
            fputc(texto[i], fp);
        }
    }

    fclose(fp);
    
    return 0;
}