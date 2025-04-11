import random

valor = [44, 46, 90, 72, 91, 40, 75, 35, 8, 54, 78, 40, 77, 15, 61, 17, 75, 29, 75, 63]
massa = [92, 4, 43, 83, 84, 68, 92, 82, 6, 44, 32, 18, 56, 83, 25, 96, 70, 48, 14, 58]
valor_massa = []
mochila = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

for i in range(0,20):
    valor_massa.append(valor[i]-massa[i]) 

print(valor_massa)

limite = 500
peso = 0
saldo = 0

while True:
    menor = min(valor_massa)
    indice = valor_massa.index(menor)
    peso += massa[indice]
    if peso > limite:
        peso -= massa[indice]
        break
    else:
        mochila[indice] = 1
        saldo += valor[indice]
        valor_massa[indice] = 100000

print(f'peso: {peso}')
print(f'saldo: {saldo}')
print(f'mochila: {mochila}')

# Função para calcular o saldo total da mochila
def calcular_saldo(mochila, valor):
    saldo = sum(valor[i] for i in range(len(mochila)) if mochila[i] == 1)
    return saldo

# Função para calcular o peso total da mochila
def calcular_peso(mochila, massa):
    peso = sum(massa[i] for i in range(len(mochila)) if mochila[i] == 1)
    return peso

def mochila_aleatoria(valor, massa, limite):
    nova_mochila = [0] * 20
    novo_peso = 0
    novo_saldo = 0

    while True:
        indice = random.randint(0, 19)
        if nova_mochila[indice] == 0:  # Verifica se o item já está na mochila
            novo_peso += massa[indice]
            if novo_peso > limite:
                novo_peso -= massa[indice]
                break
            else:
                nova_mochila[indice] = 1
                novo_saldo += valor[indice]

    print(f'\nNova mochila gerada aleatoriamente:')
    print(f'Peso: {novo_peso}')
    print(f'Saldo: {novo_saldo}')
    print(f'Mochila: {nova_mochila}')

# Chamada da função
# mochila_aleatoria(valor, massa, limite)
mochilaAleatorio = [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1]
pesoAleatorio = calcular_peso(mochilaAleatorio, massa)
saldoAleatorio = calcular_saldo(mochilaAleatorio, valor)

def cruzar_mochilas(mochila1, mochila2, valor, massa, limite):

    # Gerar mochilas filhas
    meio = len(mochila1) // 2
    mochilaFilha1 = mochila1[:meio] + mochila2[meio:]
    mochilaFilha2 = mochila2[:meio] + mochila1[meio:]

    # Função para ajustar mochila ao limite de peso
    def ajustar_mochila(mochila, valor, massa, limite):
        while calcular_peso(mochila, massa) > limite:
            for i in range(len(mochila)):
                if mochila[i] == 1:
                    mochila[i] = 0
                    if calcular_peso(mochila, massa) <= limite:
                        break
        return mochila

    # Função para aplicar mutação
    def aplicar_mutacao(mochila):
        if random.random() < 0.5:  # 50% de chance de mutação
            indice = random.randint(0, len(mochila) - 1)
            mochila[indice] = 1 - mochila[indice]  # Inverte o valor (0 -> 1 ou 1 -> 0)
        return mochila

    # Aplicar mutação nas mochilas filhas
    mochilaFilha1 = aplicar_mutacao(mochilaFilha1)
    mochilaFilha2 = aplicar_mutacao(mochilaFilha2)

    # Ajustar mochilas filhas ao limite de peso
    mochilaFilha1 = ajustar_mochila(mochilaFilha1, valor, massa, limite)
    mochilaFilha2 = ajustar_mochila(mochilaFilha2, valor, massa, limite)

    # Calcular peso e saldo das mochilas filhas
    pesoFilha1 = calcular_peso(mochilaFilha1, massa)
    saldoFilha1 = calcular_saldo(mochilaFilha1, valor)
    pesoFilha2 = calcular_peso(mochilaFilha2, massa)
    saldoFilha2 = calcular_saldo(mochilaFilha2, valor)

    # Imprimir resultados
    print(f'\nMochila Filha 1: {mochilaFilha1}')
    print(f'Peso Filha 1: {pesoFilha1}')
    print(f'Saldo Filha 1: {saldoFilha1}')
    print(f'\nMochila Filha 2: {mochilaFilha2}')
    print(f'Peso Filha 2: {pesoFilha2}')
    print(f'Saldo Filha 2: {saldoFilha2}')

    return mochilaFilha1, mochilaFilha2

# Exemplo de uso
mochila1 = [0,1,0,0,1,0,1,0,0,1,0,0,0,1,1,1,0,1,1,1]
mochila2 = [0,0,0,0,0,1,0,0,1,0,0,0,1,1,1,0,0,0,1,1]
cruzar_mochilas(mochila1, mochila2, valor, massa, limite)


def otimizar_mochila(mochila, peso, saldo, valor, massa, limite, ntrocas=1):
    contador = 0
    loop = 1

    while True:
        for i in range(0, 20):
            if mochila[i] == 1:
                for j in range(0, 20):
                    if mochila[j] == 0:
                        novoPeso = peso - massa[i] + massa[j]
                        novoSaldo = saldo - valor[i] + valor[j]
                        if novoPeso > limite:
                            continue
                        elif novoSaldo > saldo:
                            saldo = novoSaldo
                            peso = novoPeso
                            mochila[i] = 0
                            mochila[j] = 1
                            contador += 1
                            loop = 0
                            print(f'\nNumero trocas: {contador}')
                            print(f'peso: {peso}')
                            print(f'saldo: {saldo}')
                            print(f'mochila: {mochila}')
                            break

            if ntrocas <= contador:
                break
        if ntrocas <= contador or loop == 1:
            break
        loop = 1

    return mochila, peso, saldo
        
# otimizar_mochila(mochilaAleatorio, pesoAleatorio, saldoAleatorio, valor, massa, limite, ntrocas=1)


def gerar_populacao_inicial(valor, massa, limite, tamanho=100):
    populacao = []
    for _ in range(tamanho):
        nova_mochila = [0] * len(valor)
        peso = 0
        while True:
            indice = random.randint(0, len(valor) - 1)
            if nova_mochila[indice] == 0:
                peso += massa[indice]
                if peso > limite:
                    break
                nova_mochila[indice] = 1
        saldo = calcular_saldo(nova_mochila, valor)
        populacao.append((nova_mochila, saldo))
    return populacao

def selecionar_melhores_e_piores(populacao, n=10):
    populacao.sort(key=lambda x: x[1], reverse=True)  # Ordena por saldo (decrescente)
    melhores = populacao[:n]
    piores = populacao[-n:]
    return melhores, piores

def gerar_nova_geracao(melhores, piores, valor, massa, limite, tamanho=100):
    nova_populacao = []
    while len(nova_populacao) < tamanho:
        for melhor, pior in zip(melhores, piores):
            mochila1, _ = melhor
            mochila2, _ = pior
            filhos = cruzar_mochilas(mochila1, mochila2, valor, massa, limite)
            nova_populacao.extend([(filhos[0], calcular_saldo(filhos[0], valor)),
                                   (filhos[1], calcular_saldo(filhos[1], valor))])
            if len(nova_populacao) >= tamanho:
                break
    return nova_populacao[:tamanho]

def algoritmo_genetico(valor, massa, limite, geracoes=10, tamanho_populacao=100):
    populacao = gerar_populacao_inicial(valor, massa, limite, tamanho_populacao)
    melhor_resultado = None

    for geracao in range(geracoes):
        melhores, piores = selecionar_melhores_e_piores(populacao)
        populacao = gerar_nova_geracao(melhores, piores, valor, massa, limite, tamanho_populacao)

        # Atualiza o melhor resultado
        melhor_da_geracao = max(populacao, key=lambda x: x[1])
        if not melhor_resultado or melhor_da_geracao[1] > melhor_resultado[1]:
            melhor_resultado = melhor_da_geracao

        print(f'Geração {geracao + 1}: Melhor saldo = {melhor_da_geracao[1]}')

    print('\nMelhor resultado final:')
    print(f'Mochila: {melhor_resultado[0]}')
    print(f'Saldo: {melhor_resultado[1]}')
    print(f'Peso: {calcular_peso(melhor_resultado[0], massa)}')

# Executa o algoritmo genético
algoritmo_genetico(valor, massa, limite)


