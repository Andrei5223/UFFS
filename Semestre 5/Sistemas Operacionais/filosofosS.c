#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>
#include <semaphore.h>

#include <signal.h>
#include <math.h>
#include <time.h>
#include <stdbool.h>

#define NUMFILO 5

pthread_t filosofo[NUMFILO]; // threads filosofos
sem_t hashi[NUMFILO];        // um semaforo para cada palito (iniciam em 1)

// espaços para separar as colunas de impressão
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

    printf("total_comeu: %d\n", total_comeu);

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
}

// espera um tempo aleatório entre 0 e n segundos (float)
void espera(int n)
{
    sleep(random() % n);     // pausa entre 0 e n segundos (inteiro)
    usleep(random() % 10); // pausa entre 0 e 1 segundo (float)
}

// filósofo meditando
void medita(int f)
{
    printf("%sF%d meditando\n", space[f], f);
    // espera(1);
}

// pega o hashi
void pega_hashi (int f, int h)
{
  printf ("%sF%d quer  h%d\n", space[f], f, h) ;
  sem_wait (&hashi [h]) ;
  printf ("%sF%d pegou h%d\n", space[f], f, h) ;
}

// larga o hashi
void larga_hashi (int f, int h)
{
  printf ("%sF%d larga h%d\n", space[f], f, h) ;
  sem_post (&hashi [h]) ;
}

// corpo da thread filosofo
void *threadFilosofo(void *arg)
{
    int i = (long int)arg;
    while (1)
    {
        medita(i);
        int primeiro_hashi = i;
        int segundo_hashi = (i + 1) % NUMFILO;

        // Randomiza a ordem dos hashis a serem pegos
        if (rand() % 2 == 0)
        {
            int temp = primeiro_hashi;
            primeiro_hashi = segundo_hashi;
            segundo_hashi = temp;
        }

        pega_hashi(i, primeiro_hashi);
        pega_hashi(i, segundo_hashi);
        come(i);
        larga_hashi(i, primeiro_hashi);
        larga_hashi(i, segundo_hashi);
    }
    pthread_exit(NULL);
}

// programa principal
int main(int argc, char *argv[])
{
    long i, status;

    // Seed para a função rand()
    srand(time(NULL));

    // para o printf não se confundir com a threads
    setvbuf(stdout, 0, _IONBF, 0);

    // inicia os hashis
    for (i = 0; i < NUMFILO; i++)
        sem_init(&hashi[i], 0, 1);

    // inicia os filosofos
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
    alarm(5); //  60 segundos

    // a main encerra aqui
    pthread_exit(NULL);
}
