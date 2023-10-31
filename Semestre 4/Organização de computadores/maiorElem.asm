# criar funcao que retorna o maior valor de um vetor

	.data
vector: .word -3, 5, 4, 11, 12 ,15
tamanho: .word 6

	.text
main:
	# Carrega o valor do vetor e o seu tamanho
	la a0, vector
	la t0, tamanho
	lw a1, 0(t0)
	
	
	call funcao
	
	# Imprime o valor de a0
	li a7, 1
	ecall
	
	# Encerra o programa
	li a7, 10
	ecall
	
funcao:
	# Carrega um valor do vetor para comparações
	lw s0,0(a0)
	# Inicializa o contador em 1
	li t1, 0
laco:
	# Verifica se acabou comparando o tamanho ao contador
	beq t1, a1, fim
	
	# Incrementa o contador para o próximo
	addi t1, t1, 1
	
	# Carrega o valor do endereço atual
	lw s1,0(a0)
	
	# Calcula o proximo endereço
	addi a0, a0, 4
	
	# Troca o valor do maior com o atual se maior
	bgt s1, s0, troca
	
	j laco
troca:
	mv s0, s1
	j laco
fim:
	mv a0, s0
	ret