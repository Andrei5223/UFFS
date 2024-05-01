#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>
#include <semaphore.h>
#include <signal.h>
#include <math.h>
#define NUMFILO 5

pthread_t filosofo[NUMFILO]; // threads filósofos
sem_t hashi[NUMFILO];        // um semáforo para cada palito (iniciam em 1)

char *space[] = {"", "\t", "\t\t", "\t\t\t", "\t\t\t\t"};

volatile sig_atomic_t stop = 0;
int contador[NUMFILO] = {0}; // contador para cada filósofo
time_t inicio, fim;
double tempo_total;

double calcula_coeficiente_variacao(int *array, int tamanho) {
    double soma = 0.0, media, desvio_padrao = 0.0;

    for(int i = 0; i < tamanho; ++i) {
        soma += array[i];
    }

    media = soma / tamanho;

    for(int i = 0; i < tamanho; ++i) {
        desvio_padrao += pow(array[i] - media, 2);
    }

    double desvio_padrao_rel = sqrt(desvio_padrao / tamanho);

    return (desvio_padrao_rel / media) * 100; // Calcula o coeficiente de variação em percentagem
}

void handler(int signum) {
    stop = 1;

    time(&fim); // finaliza o contador de tempo
    tempo_total = difftime(fim, inicio);

    int total_comeu = 0;
    for (int i = 0; i < NUMFILO; i++) {
        total_comeu += contador[i];
        printf("Filosofo %d: %d\n", i, contador[i]);
    }

    double throughput = total_comeu / tempo_total;
    double fairness = calcula_coeficiente_variacao(contador, NUMFILO);

    printf("Programa encerrado.\n");
    printf("Throughput: %.5f filósofos por segundo\n", throughput);
    printf("Fairness (coeficiente de variaçao): %.5f%%\n", fairness);
}

void come(int f)
{
    printf("%sF%d COMENDO\n", space[f], f);
    contador[f]++; // incrementa o contador quando o filósofo come

    if (rand() % 10 == 0){
        printf("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\n");
        int total_comeu = 0;
        for (int i = 0; i < NUMFILO; i++) {
            total_comeu += contador[i];
            printf("Filosofo %d: %d\n", i, contador[i]);
        }


        double fairness = calcula_coeficiente_variacao(contador, NUMFILO);
        printf("total_comeu: %d\n", total_comeu);
        printf("Fairness (coeficiente de variaçao): %.5f%%\n", fairness);
    }

}

void pega_hashi(int f, int h1, int h2)
{
    int primeiro_hashi, segundo_hashi;
    if (h1 < h2)
    {
        primeiro_hashi = h1;
        segundo_hashi = h2;
    }
    else
    {
        primeiro_hashi = h2;
        segundo_hashi = h1;
    }

    printf("%sF%d quer  h%d\n", space[f], f, primeiro_hashi);
    sem_wait(&hashi[primeiro_hashi]);
    printf("%sF%d pegou h%d\n", space[f], f, primeiro_hashi);

    printf("%sF%d quer  h%d\n", space[f], f, segundo_hashi);
    sem_wait(&hashi[segundo_hashi]);
    printf("%sF%d pegou h%d\n", space[f], f, segundo_hashi);
}

void larga_hashi(int f, int h1, int h2)
{
    printf("%sF%d larga h%d\n", space[f], f, h1);
    sem_post(&hashi[h1]);

    printf("%sF%d larga h%d\n", space[f], f, h2);
    sem_post(&hashi[h2]);
}

void *threadFilosofo(void *arg)
{
    int i = (long int)arg;
    while (!stop)
    {
        pega_hashi(i, i, (i + 1) % NUMFILO);
        come(i);
        larga_hashi(i, i, (i + 1) % NUMFILO);
    }
    pthread_exit(NULL);
}

int main(int argc, char *argv[])
{
    long i, status;

    setvbuf(stdout, 0, _IONBF, 0);

    for (i = 0; i < NUMFILO; i++)
        sem_init(&hashi[i], 0, 1);

    for (i = 0; i < NUMFILO; i++)
    {
        status = pthread_create(&filosofo[i], NULL, threadFilosofo, (void *)i);
        if (status)
        {
            perror("pthread_create");
            exit(1);
        }
    }

    signal(SIGALRM, handler);
    time(&inicio);
    alarm(600); //  60 segundos

    // a main encerra aqui
    pthread_exit (NULL) ;
}
