#include <stdio.h> // Para printf
#include <stdlib.h> // Para exit
#include <mqueue.h> // Para mq_open, mq_receive, mq_close, mq_unlink
#include <fcntl.h> // Para O_RDWR, O_CREAT
#include <errno.h> // Para perror
#include <unistd.h> // Para _exit
#include <string.h> // Para memset

#define QUEUE "/my_queue"

int main() {
    mqd_t queue;
    struct mq_attr attr;
    int msg;

    // Atributos da fila
    attr.mq_flags = 0;
    attr.mq_maxmsg = 10; // Número máximo de mensagens na fila
    attr.mq_msgsize = sizeof(int); // Tamanho máximo de uma mensagem

    // Criação ou abertura da fila
    if ((queue = mq_open(QUEUE, O_RDWR | O_CREAT, 0666, &attr)) < 0) {
        perror("mq_open");
        exit(1);
    }

    // Loop infinito para receber mensagens
    for (;;) {
        if ((mq_receive(queue, (void*)&msg, sizeof(msg), 0)) < 0) {
            perror("mq_receive");
        } else {
            printf("Received msg value %d\n", msg);
        }
    }

    // Fechamento da fila (não será executado neste loop infinito)
    mq_close(queue);

    return 0;
}
