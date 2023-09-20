/**
 * @file 01OrdenacaoExterna.c
 * @author Andrei Camilotto e Djonatan Bonelli
 * @version 0.1
 * @date 2023-06-10
 *
 * @copyright Copyright (c) 2023
 *
 * @brief Arquivo template para Questão 02 do trabalho de Pesquisa e Ordenação T2.
 *
 *      Implemente uma ordenação externa utilizando a restrição de que somente 5
 *  elementos podem ser armazenados em memória (vetores de teste no template). A
 *  definição deste limite está na variável MAX_IN_MEMORY abaixo.
 *
 *      Utilize os vetores comentados no código para realizar seus testes.
 *
 * Atenção: Antes de entregar, conferir se dos dados de documentação no início
 * do arquivo estão preenchidos corretamente.
 *
 */



#include <stdio.h>

#define MAX_IN_MEMORY 5


// FEITO funcao para gravar as chaves em um txt na memoria
// FEITO funcao para criar os 10 arquivos na memoria

//funcao recursiva para ler os dados e gravar nos arquivos de saida, parar quando os dados da entrada acabarem
    //identificar se está lendo da raiz ou dos arquivos de entrada
        //funcao que le direto da raiz (vai ser utilizada para identificar se já terminou de ordenar ou não)
        //funcao que le dos 5 arquivos de entrada
//funcao recursiva que so vai para de chamar a anterior quando estiver ordenado em apenas um arquivo de saída

void gravaNaMemoria(int chaves[], int tamanho){
    //cria o arquivo e escreve uma string
    FILE *fp = fopen("entrada.txt", "wt");

    if (fp == NULL) {
        printf("Erro na abertura do arquivo 1!");
        exit(1); // aborta o programa
    }

    for (size_t i = 0; i < tamanho; i++){
        fputc(chaves[i], fp);
    }

    fclose(fp);
}

void criaArquivos(char arquivos[MAX_IN_MEMORY][8]){

    
    FILE *fp = fopen("A1.txt", "wt");
    fclose(fp);
    fp = fopen("A2.txt", "wt");
    fclose(fp);
    fp = fopen("A3.txt", "wt");
    fclose(fp);
    fp = fopen("A4.txt", "wt");
    fclose(fp);
    fp = fopen("A5.txt", "wt");
    fclose(fp);
    fp = fopen("A6.txt", "wt");
    fclose(fp);
    fp = fopen("A7.txt", "wt");
    fclose(fp);
    fp = fopen("A8.txt", "wt");
    fclose(fp);
    fp = fopen("A9.txt", "wt");
    fclose(fp);
    fp = fopen("A10.txt", "wt");
    fclose(fp);
}

void lerArquivoRaiz(){

}

int main() {

    int chaves = {3, 98, 61, 62,  1, 99, 57, 98, 58, 18, 59, 35, 82, 91, 52, 95, 46,
        69, 48, 82, 52,  4, 87, 38, 44, 42, 72,  2, 95, 84, 34, 40, 23, 11, 75,
        37, 62, 96, 12, 22, 56, 20, 64,  2, 30, 48,  6, 19, 34, 31};
    int chaves = {57, 91, 21, 89, 72, 74, 46, 61, 26, 50, 85, 76, 53, 22, 15, 40, 90, 2, 94, 54};
    int chaves = {9,  2, 15, 19, 10, 14,  4, 13,  2, 19};
    int chaves = {178, 231, 244, 292, 321, 356, 389, 421, 482, 488, 490, 502, 546, 641, 694, 786, 841, 890, 899, 922};

    char arquivos[MAX_IN_MEMORY][8];

    return 0;
}