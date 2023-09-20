from datetime import date

class produto:
    codigo = None
    nome = None
    tipo = None
    preco = None
    disponivel = None

class compra:
    login = None
    data = None
    valorTotal = None

#crio as listas e variáveis globais necessárias durante a execução do código
produtos = []
registroCompras = []
produtosFiltrados = []      #possui as listas de subprodutos
codigosUsados = []
nao_cadastrado = False      #necessária na função atualizar() para parar a execução caso a função consulta() returne "Não cadastrado"

def cadastro():             #cadastrar um novo produto
    global produtos
    global codigosUsados
    novoProduto = produto()

    #inserir código
    novoProduto.codigo = verificaInt(input("\nDigite o código do produto: "))
    while novoProduto.codigo in codigosUsados:
        novoProduto.codigo = verificaInt(input("Código já utilizado, digite outro valor: "))
    codigosUsados.append(novoProduto.codigo)

    #inserir nome
    novoProduto.nome = str(input("\nDigite o título do produto: "))

    #inserir tipo
    novoProduto.tipo = verificaInt(input("\nDigite a categoria do produto. \n1 para série.\n2 para filme.\n3 para documentário.\nDigite aqui: "))
    while novoProduto.tipo < 1 or novoProduto.tipo > 3:             #verifico se o valor inserido é válido
        novoProduto.tipo = verificaInt(input("\nDigite a categoria do produto. \n1 para série.\n2 para filme.\n3 para documentário.\nDigite aqui: "))
    if novoProduto.tipo == 1:
        novoProduto.tipo == "Série"
    elif novoProduto.tipo == 2:
        novoProduto.tipo = "Filme"
    else:
        novoProduto.tipo = "Documentário"

    #inserir preço
    novoProduto.preco = verificaFloat(input("\nDigite o preço do produto: "))
    while novoProduto.preco < 0:
        novoProduto.preco = verificaFloat(input("\nO preço precisa ser um valor positivo: "))

    #inserir disponibilidade
    novoProduto.disponivel = verificaInt(input("\nDigite se o produto estará disponível para venda.\nDigite 1 para Sim.\nDigite 0 para Não.\n"))
    while novoProduto.disponivel != 0 and novoProduto.disponivel != 1:
        novoProduto.disponivel = verificaInt(input("\nDigite 1 para Sim.\nDigite 0 para Não.\n"))
    if novoProduto.disponivel == 1:
        novoProduto.disponivel = "Disponível"
    else:
        novoProduto.disponivel = "Indisponível"
    
    produtos.append(novoProduto) #adiciono o produto cadastrado à lista de produtos

def consulta(codigo):       #consultar um produto já cadastrado, recebe o código do produto
    global nao_cadastrado
    global produtos
    nao_cadastrado = False  #é necessário resetar a variável para que consultas anteriores nao interfiram nas funções

    verificacao = 0    
    for i in range(len(produtos)):
        if codigo == produtos[i].codigo:
            print("\nProduto encontrado:")
            print(f"Título: {produtos[i].nome}")
            print(f"Categoria: {produtos[i].tipo}")
            print(f"Preço: R${produtos[i].preco}")
            print(f"Produto {produtos[i].disponivel}") 
            verificacao = 1
    if verificacao == 0:
        print("Produto não cadastrado.")
        nao_cadastrado = True

def atualizar(codigo):      #atualizar o cadastro de um produto.
    global produtos
    global nao_cadastrado

    #imprimo as informações atuais do produto e se estiver cadastrado vai passar para a atualização
    consulta(codigo)
    print(nao_cadastrado)
    if nao_cadastrado:
        nao_cadastrado = False
    else:
        #peço qual das informações o usuário deseja atualizar e modifico apenas ela
        atualiza = verificaInt(input("\nQual informação deseja atualizar?\n1 para título.\n2 para categoria.\n3 para preço.\n4 para disponibilidade.\nQualquer outro número para sair.\n"))
        while atualiza > 0 and atualiza < 5:
            if atualiza == 1:
                for i in range(len(produtos)):
                    if codigo == produtos[i].codigo:
                        produtos[i].nome = input("Digite o novo título: ")
            if atualiza == 2:
                for i in range(len(produtos)):
                    if codigo == produtos[i].codigo:
                        produtos[i].tipo = verificaInt(input("Digite a nova categoria do produto. \n1 para série.\n2 para filme.\n3 para documentário.\n"))
                        while produtos[i].tipo < 1 or produtos[i].tipo > 3:
                            produtos[i].tipo = verificaInt(input("Digite a nova categoria do produto. \n1 para série.\n2 para filme.\n3 para documentário.\n"))
                        if produtos[i].tipo == 1:
                            produtos[i].tipo == "Série"
                        elif produtos[i].tipo == 2:
                            produtos[i].tipo = "Filme"
                        else:
                            produtos[i].tipo = "Documentário"
            if atualiza == 3:
                for i in range(len(produtos)):
                    if codigo == produtos[i].codigo:    
                        produtos[i].preco = verificaFloat(input("Digite o novo preço do produto: "))
                        while produtos[i].preco < 0:
                            produtos[i].preco = verificaFloat(input("O preço precisa ser um valor positivo: "))
            if atualiza == 4:
                for i in range(len(produtos)):
                    if codigo == produtos[i].codigo:        
                        produtos[i].disponivel = verificaInt(input("Digite se o produto estará disponível para venda.\nDigite 1 para Sim.\nDigite 0 para Não.\n"))
                        while produtos[i].disponivel != 0 and produtos[i].disponivel != 1:
                            produtos[i].disponivel = verificaInt(input("Digite 1 para Sim.\nDigite 0 para Não.\n"))
                        if produtos[i].disponivel == 1:
                            produtos[i].disponivel = "Disponível"
                        else:
                            produtos[i].disponivel = "Indisponível"
            atualiza = verificaInt(input("Qual informação deseja atualizar?\n1 para título.\n2 para categoria.\n3 para preço.\n4 para disponibilidade.\nQualquer outro número para sair.\n"))

def filtrarLista(dados, maiorcod, maiortit, maiorpreco, maiorcat):      #converte os dados das classes em listas
    global produtosFiltrados
    subproduto = []         #contém as informações de um produto fora de sua classe
    subproduto.append(dados.codigo)
    subproduto.append(dados.nome)
    subproduto.append(dados.tipo)
    subproduto.append(dados.preco)
    subproduto.append(dados.disponivel)
    produtosFiltrados.append(subproduto)

    #verificando o tamanho dos digitos para configurar a tabela na impressão
    if len(str(dados.codigo)) > maiorcod:
        maiorcod = len(str(dados.codigo))
    if len(str(dados.nome)) > maiortit:
        maiortit = len(str(dados.nome))
    if len(str(dados.preco)) > maiorpreco:
        maiorpreco = len(str(dados.preco))
    if len(str(dados.tipo)) > maiorcat:
        maiorcat = len(str(dados.tipo))

    return maiorcod, maiortit, maiorpreco, maiorcat

def relatorio():            #exibe um relatorios dos produtos cadastrados
    global produtos
    global produtosFiltrados
    maiortit = 6            
    maiorcod = 6            #essas 4 guardam o numero de digitos da maior string da coluna de impressao, o valor inicial sao os digitos do cabeçalho
    maiorpreco = 5
    maiorcat = 9

    #inicio o processo de filtragem
    opcao = verificaInt(input("\nDigite um número para escolher um filtro para a pesquisa:\n0 para todas opções.\n1 para filmes.\n2 para séries.\n3 para documentários.\n4 para diponíveis para venda\n5 para indisponíves para venda.\nOutro número para sair.\n"))
    if opcao < 0 or opcao > 5:
        return
    if opcao == 0:                   #todas opções
        for i in range(len(produtos)):
            maiorcod, maiortit, maiorpreco, maiorcat = filtrarLista(produtos[i], maiorcod, maiortit, maiorpreco, maiorcat)
    elif opcao == 1:                 #filmes
        for i in range(len(produtos)):
            if produtos[i].tipo == "Filme":
                maiorcod, maiortit, maiorpreco, maiorcat = filtrarLista(produtos[i], maiorcod, maiortit, maiorpreco, maiorcat)
    elif opcao == 2:                 #series
        for i in range(len(produtos)):
            if produtos[i].tipo == "Série":
                maiorcod, maiortit, maiorpreco, maiorcat = filtrarLista(produtos[i], maiorcod, maiortit, maiorpreco, maiorcat)
    elif opcao == 3:                 #documentarios
        for i in range(len(produtos)):
            if produtos[i].tipo == "Documentário":
                maiorcod, maiortit, maiorpreco, maiorcat = filtrarLista(produtos[i], maiorcod, maiortit, maiorpreco, maiorcat)
    elif opcao == 4:                 #disponiveis
        for i in range(len(produtos)):
            if produtos[i].disponivel == "Disponível":
                maiorcod, maiortit, maiorpreco, maiorcat = filtrarLista(produtos[i], maiorcod, maiortit, maiorpreco, maiorcat)
    else:                            #indisponiveis
        for i in range(len(produtos)):
            if produtos[i].disponivel == "Indisponível":
                maiorcod, maiortit, maiorpreco, maiorcat = filtrarLista(produtos[i], maiorcod, maiortit, maiorpreco, maiorcat)
    
    #inicio o processo para printar em tabela

    #lista contendo o cabeçalho do print
    cabecalho = ["Código", "Título", "Categoria", "Preço", "Disponibilidade"]

    #definindo os espaçamentos por meio das 4 variáveis declaradas no início da função
    cod = "{:<"+str(maiorcod + 3)+"}"
    tit = "{:<"+str(maiortit + 3)+"}"
    cat = "{:<"+str(maiorcat + 3)+"}"
    preco = "{:<"+str(maiorpreco + 3)+"}"
    formacao = cod+tit+cat+preco+"{:<15}"

    #printo a tabela
    print(formacao.format(*cabecalho))
    for dados in produtosFiltrados:
        print(formacao.format(*dados))

    #zerar a lista para poder ser reutilizada se a função for chamada de novo
    produtosFiltrados = []

def comprar():              #efetua a compra de produtos
    global registroCompras
    global nao_cadastrado
    global produtos
    compras = compra
    ano, mes, dia = str(date.today()).split("-")

    compras.login = input("\nDigite o seu nome de usuário: ")
    compras.data = dia + "/" + mes + "/" + ano
    compras.valorTotal = 0

    listaCompra = []
    subCompras = []
    validacao = 0           #guarda quantas compras foram feitas para imprimir o cupom fiscal

    maiortit = 6            
    maiorcod = 6            #essas 4 guardam o numero de digitos da maior string da coluna de impressao, o valor inicial sao os digitos do cabeçalho
    maiorpreco = 5
    maiorcat = 9

    codigo = verificaInt(input("\nDigite o código do produto que deseja comprar, ou -1 para sair: "))
    while codigo != -1:
        consulta(codigo)                #consulta o codigo
        if nao_cadastrado:
            nao_cadastrado = False
        else:
            confirmacao = verificaInt(input("\nConfirma a compra?\nDigite 1 para sim.\nDigite 0 para não.\n"))          #pede confirmação da compra
            while confirmacao != 1 and confirmacao!= 0:
                confirmacao = verificaInt(input("\nConfirma a compra?\nDigite 1 para sim.\nDigite 0 para não.\n"))
            if confirmacao == 1:
                for i in range(len(produtos)):
                    if codigo == produtos[i].codigo:
                        if produtos[i].disponivel == "Indisponível":                                            #verifica se está disponível e cancela o processo se falso
                            print('\nO produto escolhido não está disponível no momento.')
                            break
                        else:
                            subCompras.append(produtos[i].codigo)
                            subCompras.append(produtos[i].nome)
                            subCompras.append(produtos[i].tipo)
                            subCompras.append(produtos[i].preco)
                            listaCompra.append(subCompras)
                            compras.valorTotal += produtos[i].preco
                            subCompras = []
                            validacao += 1

                            #verificando o tamanho das strings
                            if len(str(produtos[i].codigo)) > maiorcod:
                                maiorcod = len(str(produtos[i].codigo))
                            if len(str(produtos[i].nome)) > maiortit:
                                maiortit = len(str(produtos[i].nome))
                            if len(str(produtos[i].preco)) > maiorpreco:
                                maiorpreco = len(str(produtos[i].preco))
                            if len(str(produtos[i].tipo)) > maiorcat:
                                maiorcat = len(str(produtos[i].tipo))

        codigo = verificaInt(input("\nDigite o código do produto que deseja comprar, ou -1 para sair e obter o cupom fiscal: "))
    
    if validacao > 0:
        #inicio o processo para printar em tabela

        #lista contendo o cabeçalho do print
        cabecalho = ["Código", "Título", "Categoria", "Preço"]

        #definindo os espaçamentos por meio das 4 variáveis declaradas no início da função
        cod = "{:<"+str(maiorcod + 3)+"}"
        tit = "{:<"+str(maiortit + 3)+"}"
        cat = "{:<"+str(maiorcat + 3)+"}"
        preco = "{:<"+str(maiorpreco + 3)+"}"
        formacao = cod+tit+cat+preco

        #printo a tabela
        print(f"\nNome do comprador: {compras.login}")
        print(formacao.format(*cabecalho))
        for dados in listaCompra:
            print(formacao.format(*dados))
        print(f"Valor total: {compras.valorTotal:.2f}")

        registroCompras.append(compras)
    else:
        print("Nenhuma compra efetuada")

def relatorioCompras():     #exibe o relatório de compras feitas
    global registroCompras
    compras = []
    subcompra = []
    maiorlogin = 5
    maiorvalor = 5

    for i in range(len(registroCompras)):
        login = registroCompras[i].login
        data = registroCompras[i].data
        valor = registroCompras[i].valorTotal
        subcompra.append(login)
        subcompra.append(data)
        subcompra.append(valor)
        compras.append(subcompra)
        subcompra = []

        if len(str(registroCompras[i].login)) > maiorlogin:
            maiorlogin = len(str(registroCompras[i].login))
        if len(str(registroCompras[i].valorTotal)) > maiorvalor:
            maiorvalor = len(str(registroCompras[i].valorTotal))

    #inicio o processo para printar em tabela

    cabecalho = ["Login", "Data", "Valor"]

    #definindo os espaçamentos por meio das 2 variáveis declaradas no início da função
    login = "{:<"+str(maiorlogin + 3)+"}"
    valor = "{:<"+str(maiorvalor + 3)+"}"

    formacao = login+"{:<13}"+valor

    #printo a tabela
    print(formacao.format(*cabecalho))
    for dados in compras:
        print(formacao.format(*dados))

def prodtestes():           #adiciona produtos às listas para testes
    global produtos
    global registroCompras
    global codigosUsados

    #1
    teste = produto()
    teste.codigo = 1
    teste.nome = "As Branquelas"
    teste.tipo = "Filme"
    teste.preco = 7.99
    teste.disponivel = "Disponível"
    produtos.append(teste)
    codigosUsados.append(teste.codigo)
    #2
    teste = produto()
    teste.codigo = 2
    teste.nome = "Velozes e Furiosos"
    teste.tipo = "Filme"
    teste.preco = 8.99
    teste.disponivel = "Disponível"
    produtos.append(teste)
    codigosUsados.append(teste.codigo)
    #3
    teste = produto()
    teste.codigo = 3
    teste.nome = "La casa de Papel"
    teste.tipo = "Série"
    teste.preco = 19.99
    teste.disponivel = "Disponível"
    produtos.append(teste)
    codigosUsados.append(teste.codigo)
    #4
    teste = produto()
    teste.codigo = 4
    teste.nome = "Big Bang Theory"
    teste.tipo = "Série"
    teste.preco = 22.99
    teste.disponivel = "Indisponível"
    produtos.append(teste)
    codigosUsados.append(teste.codigo)
    #5
    teste = produto()
    teste.codigo = 5
    teste.nome = "One Piece"
    teste.tipo = "Série"
    teste.preco = 49.99
    teste.disponivel = "Disponível"
    produtos.append(teste)
    codigosUsados.append(teste.codigo)
    #6
    teste = produto()
    teste.codigo = 6
    teste.nome = "Pray Away"
    teste.tipo = "Documentário"
    teste.preco = 9.99
    teste.disponivel = "Disponível"
    produtos.append(teste)
    codigosUsados.append(teste.codigo)
    #7
    teste = produto()
    teste.codigo = 7
    teste.nome = "Um documentário com um nome muito longo"
    teste.tipo = "Documentário"
    teste.preco = 6.99
    teste.disponivel = "Indisponível"
    produtos.append(teste)
    codigosUsados.append(teste.codigo)
    #8
    teste = produto()
    teste.codigo = 8
    teste.nome = "A Era do Gelo"
    teste.tipo = "Filme"
    teste.preco = 11.99
    teste.disponivel = "Disponível"
    produtos.append(teste)
    codigosUsados.append(teste.codigo)
    #9
    teste = produto()
    teste.codigo = 9
    teste.nome = "Mob Psycho 100"
    teste.tipo = "Série"
    teste.preco = 13.99
    teste.disponivel = "Indisponível"
    produtos.append(teste)
    codigosUsados.append(teste.codigo)
    #10
    teste = produto()
    teste.codigo = 10
    teste.nome = "Sword Art Online"
    teste.tipo = "Série"
    teste.preco = 10.99
    teste.disponivel = "Indisponível"
    produtos.append(teste)
    codigosUsados.append(teste.codigo)

    #compras
    teste = compra()
    teste.login = "Carlos"
    teste.data = "23/06/2022"
    teste.valorTotal = 159.99
    registroCompras.append(teste)

    teste = compra()
    teste.login = "Jacinto Dores"
    teste.data = "07/07/2022"
    teste.valorTotal = 140.67
    registroCompras.append(teste)

def verificaInt(entrada):   #verifica se o parâmetro recebido pode ser int e o transforma
    while True:
        try:
            entrada = int(entrada)
        except:
            entrada = input("Valor inválido, digite um número: ")
            continue
        if type(entrada) == int:
            break
    return entrada

def verificaFloat(entrada): #verifica se o parâmetro recebido pode ser float, o transforma e arredonda para 2 casas
    while True:
        try:
            entrada = round(float(entrada), 2)
        except:
            entrada = input("Valor inválido, digite um número: ")
            continue
        if type(entrada) == float:
            break
    return entrada

prodtestes() #adicionando os produtos e compras feitas de teste nas listas

print("Bem vindo ao novo sistema interno para cadastro de compras na Nerdflix!")
print("\nMENU PRINCIPAL:\n")
ação = verificaInt(input('Opções disponíveis:\n1 para cadastrar um novo produto;\n2 para consultar um produto cadastrado;\n3 para atualizar os dados de um produto cadastrado;\n4 para exibir relatórios dos produtos cadastrados;\n5 para comprar produtos;\n6 para exibir o histórico de compras efetuadas;\nOu qualquer outro número para sair do programa.\nDigite aqui: '))
while ação > 0 and ação < 7:
    if ação == 1:
        cadastro()
        while True:
            continuar = verificaInt(input("\nDigite 1 para iniciar outro cadastro ou qualquer número para sair: "))
            if continuar == 1:
                cadastro()
            else:
                break

    elif ação == 2:
        while True:
            continuar = verificaInt(input("\nDigite o código do produto para consulta ou -1 para retornar ao menu: "))
            if continuar == -1:
                break
            else:
                consulta(continuar)

    elif ação == 3:
        while True:
            continuar = verificaInt(input("\nDigite o código do produto para atualizá-lo ou -1 para retornar ao menu: "))
            if continuar == -1:
                break
            else:
                atualizar(continuar)

    elif ação == 4:
        relatorio()
        confirmacao = input("Digite algo para retornar ao menu: ")

    elif ação == 5:
        comprar()
        confirmacao = input("Digite algo para retornar ao menu: ")

    elif ação == 6:
        relatorioCompras()
        confirmacao = input("Digite algo para retornar ao menu: ")

    print("\nMENU PRINCIPAL:\n")
    ação = verificaInt(input('Opções disponíveis:\n1 para cadastrar um novo produto;\n2 para consultar um produto cadastrado;\n3 para atualizar os dados de um produto cadastrado;\n4 para exibir relatórios dos produtos cadastrados;\n5 para comprar produtos;\n6 para exibir o histórico de compras efetuadas;\nOu qualquer outro número para sair do programa.\nDigite aqui: '))
