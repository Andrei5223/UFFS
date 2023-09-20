//01 – Implemente uma ordenação externa utilizando a restrição de que somente 5 elementos podem ser armazenados em memória (vetores de teste no template). 
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main (){

    //cria o arquivo e escreve uma string
    FILE *fp = fopen("entrada.txt", "wt");

    if (fp == NULL) {
        printf("Erro na abertura do arquivo 1!");
        exit(1); // aborta o programa
    }

    char texto[20] = "Exemplo de texto";
    for (size_t i = 0; i < strlen(texto); i++){
        fputc(texto[i], fp);
    }

    fclose(fp);

    //abre o arquivo e imprime a string escrita
    fp = fopen("entrada.txt", "rt");

    char c;
    printf("Imprimindo Chars: ");
    while(!feof(fp)) {
        c = fgetc(fp);
        printf("%c", c);
    }
    printf("\n");

    fclose(fp);







    //Repete para um segundo arquivo
    FILE *fp2 = fopen("entrada2.txt", "wt");

    if (fp2 == NULL) {
        printf("Erro na abertura do arquivo 2!");
        exit(1); // aborta o programa
    }

    char texto3[20] = "Exemplo de texto 2";
    fputs(texto3, fp2);

    fclose(fp2);

    fp2 = fopen("entrada2.txt", "rt");

    char texto2[20];
    fgets(texto2, 20, fp2);
    printf("Imprimindo String: %s\n", texto2);

    fclose(fp2);










    FILE *fp3 = fopen("entrada3.txt", "wt");

    if (fp3 == NULL) {
        printf("Erro na abertura do arquivo 3!");
        exit(1); // aborta o programa
    }

    char nome[40] = "Pesquisa";
    char cod[7] = "GEX609";
    int cr = 4;
    fprintf(fp3, "%s - %s (%d créditos)\n", cod, nome, cr);

    fclose(fp3);

    fp3 = fopen("entrada3.txt", "rt");

    char nome2[40];
    char cod2[7];
    int cr2;

    fscanf(fp3, "%s - %s (%d créditos)\n", cod2, nome2, &cr2);
    printf("Leu: %s\n%s\n%d\n", cod2, nome2, cr2);
    





    FILE *fp4 = fopen("entrada", "wb");

    int total = 0, v[5] = {1, 2, 3, 4, 5};

    total = fwrite(v, sizeof(int), 5, fp4);

    if(total != 5){
        printf("Erro na gravação");
    }
        
    fclose(fp4);
    fp4 = fopen("entrada", "rb");

    int total2, v2[5];
    total2 = fread(v2, sizeof(int), 5, fp4);
    printf("%d %d %d %d %d\n",v2[0],v2[1],v2[2],v2[3],v2[4]);

    fseek(fp4, 2 * sizeof(int), SEEK_SET);
    total2 = fread(v2, sizeof(int), 3, fp4);
    printf("%d %d %d\n",v2[0],v2[1],v2[2]);


    FILE *files[5];

    return 0;
}