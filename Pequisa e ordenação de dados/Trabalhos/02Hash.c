/**
 * @file 02Hash.c
 * @author Nome_do_Aluno
 * @version 0.1
 * @date 2023-06-10
 *
 * @copyright Copyright (c) 2023
 *
 * @brief Arquivo template para Questão 02 do trabalho de Pesquisa e Ordenação T2.
 *
 *      Implemente uma tabela hash contendo 13 posições. O índice das chaves
 *  deve ser gerado utilizando a fórmula k mod M, onde k é a chave e M a
 *  quantidade de chaves. Resolva as colisões utilizando uma Lista Encadeada.
 *  Inclua operações de inserção, remoção e busca da chave nesta tabela hash,
 *  informando se a chave foi encontrada ou não.  Atenção: os elementos da
 *  lista encadeada não precisam estar ordenados/em ordem.
 *
 *      Utilize os vetores comentados no código para realizar seus testes.
 *
 * Atenção: Antes de entregar, conferir se dos dados de documentação no início
 * do arquivo estão preenchidos corretamente.
 *
 */
#include <stdio.h>

#define TAMANHO 13

int main(){

    int chaves = {7, 13, 33, 12, 5, 1, 0};
    int chaves = {5, 6, 9, 19, 24, 32, 41, 42, 43, 58};
    int chaves = {178, 231, 244, 292, 321, 356, 389, 421, 482, 488, 490, 502, 546, 641, 694, 786, 841, 890, 899, 922};
    int chaves = {3, 29, 43, 45,  3, 17,  2,  7, 33, 17};

    return 0;
}