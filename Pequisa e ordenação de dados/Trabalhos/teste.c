#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_SIZE 5

void bubbleSort(int arr[], int size);
void mergeFiles(FILE* file1, FILE* file2, FILE* output);
void splitFile(FILE* inputFile);
void mergeTempFiles(int numFiles);
void renameFinalFile();

int main() {
    FILE *inputFile;

    inputFile = fopen("dados.txt", "r");
    if (inputFile == NULL) {
        printf("Erro ao abrir o arquivo de entrada.\n");
        return 1;
    }

    splitFile(inputFile);
    fclose(inputFile);

    mergeTempFiles(0);
    renameFinalFile();

    printf("Ordenação concluída com sucesso!\n");

    return 0;
}

void bubbleSort(int arr[], int size) {
    int i, j, temp;
    for (i = 0; i < size-1; i++) {
        for (j = 0; j < size-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

void mergeFiles(FILE* file1, FILE* file2, FILE* output) {
    int num1, num2;
    int arr[MAX_SIZE];
    int i, j, k;

    i = fread(arr, sizeof(int), MAX_SIZE, file1);
    j = fread(&num2, sizeof(int), 1, file2);

    while (i > 0 && j > 0) {
        bubbleSort(arr, i);

        k = 0;
        while (k < i && arr[k] <= num2) {
            fwrite(&arr[k], sizeof(int), 1, output);
            k++;
        }

        if (k == i) {
            i = fread(arr, sizeof(int), MAX_SIZE, file1);
        } else {
            num1 = arr[k];
            arr[k] = num2;
            num2 = num1;
            fwrite(&arr[k], sizeof(int), 1, output);
            j = fread(&num2, sizeof(int), 1, file2);
        }
    }

    while (i > 0) {
        bubbleSort(arr, i);
        fwrite(arr, sizeof(int), i, output);
        i = fread(arr, sizeof(int), MAX_SIZE, file1);
    }

    if (j > 0) {
        fwrite(&num2, sizeof(int), 1, output);
        while (fread(&num2, sizeof(int), 1, file2) > 0) {
            fwrite(&num2, sizeof(int), 1, output);
        }
    }
}

void splitFile(FILE* inputFile) {
    int numFiles = 0;
    int count = 0;
    char line[100];
    int arr[MAX_SIZE];
    FILE *tempFile;

    while (fgets(line, sizeof(line), inputFile) != NULL) {
        int num = atoi(line);
        arr[count++] = num;
        if (count == MAX_SIZE) {
            bubbleSort(arr, count);
            char fileName[10];
            sprintf(fileName, "temp%d.txt", numFiles);
            tempFile = fopen(fileName, "w");
            if (tempFile == NULL) {
                printf("Erro ao criar o arquivo temporário.\n");
                exit(1);
            }
            for (int i = 0; i < count; i++) {
                fprintf(tempFile, "%d\n", arr[i]);
            }
            fclose(tempFile);
            count = 0;
            numFiles++;
        }
    }

    if (count > 0) {
        bubbleSort(arr, count);
        char fileName[10];
        sprintf(fileName, "temp%d.txt", numFiles);
        tempFile = fopen(fileName, "w");
        if (tempFile == NULL) {
            printf("Erro ao criar o arquivo temporário.\n");
            exit(1);
        }
        for (int i = 0; i < count; i++) {
            fprintf(tempFile, "%d\n", arr[i]);
        }
        fclose(tempFile);
        numFiles++;
    }
}

void mergeTempFiles(int numFiles) {
    if (numFiles <= 1) {
        return;
    }

    int currentNumFiles = numFiles;
    int pass = 1;
    int i, mergeCount;
    FILE *file1, *file2, *output;
    char inputFile1[10], inputFile2[10], outputFile[10];

    while (currentNumFiles > 1) {
        mergeCount = 0;
        for (i = 0; i < currentNumFiles; i += 2) {
            sprintf(inputFile1, "temp%d.txt", i);
            sprintf(inputFile2, "temp%d.txt", i + 1);
            sprintf(outputFile, "temp%d.txt", numFiles + mergeCount);

            file1 = fopen(inputFile1, "r");
            file2 = fopen(inputFile2, "r");
            output = fopen(outputFile, "w");

            mergeFiles(file1, file2, output);

            fclose(file1);
            fclose(file2);
            fclose(output);

            mergeCount++;
        }
        currentNumFiles = mergeCount;
        numFiles += mergeCount;
        pass++;
    }
}

void renameFinalFile() {
    char finalOutputFile[20];
    sprintf(finalOutputFile, "sorted_data.txt");
    rename("temp0.txt", finalOutputFile);
}
