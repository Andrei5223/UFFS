#include <stdio.h> // Para printf
#include <stdlib.h> // Para exit
#include <mqueue.h> // Para mq_open, mq_send, mq_close
#include <fcntl.h> // Para O_RDWR
#include <errno.h> // Para perror
#include <unistd.h> // Para sleep
#include <string.h> // Para memset

#define QUEUE "/my_queue"

int main() {
    mqd_t queue;
    int msg;

    // Abertura da fila
    if ((queue = mq_open(QUEUE, O_RDWR)) < 0) {
        perror("mq_open");
        exit(1);
    }

    // Loop infinito para enviar mensagens
    for (;;) {
        msg = random() % 100; // Gera um valor aleatório entre 0 e 99

        // Envio da mensagem
        if ((mq_send(queue, (void*)&msg, sizeof(msg), 0)) < 0) {
            perror("mq_send");
            exit(1);
        } else {
            printf("Sent message with value %d\n", msg);
            sleep(1); // Aguarda 1 segundo antes de enviar a próxima mensagem
        }
    }

    // Fechamento da fila (não será executado neste loop infinito)
    mq_close(queue);

    return 0;
}
