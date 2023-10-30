	.data
mensagem:  .asciz "\nDigite um número: "
mensagem_maior: .asciz "\nO maior número digitado é: "
mensagem_menor: .asciz "\nO menor número digitado é: "
mensagem_media:  .asciz "\nA média dos números digitados é: "

	.text
main:
	# valor lido sera armazenado em s0
	# menor valor sera armazenado em s1
	# maior valor sera armazenado em s2
	# quantidade de valores lidos em s3
	# acumlador é o s4
	li s4, 0
	
	# Imprime a mensagem "Digite um número: "
	li a7, 4
	la a0, mensagem
	ecall

	# Le o input e armazena em s0
	li a7, 5
	ecall
	mv s0, a0
	
	# Se o primeiro valor lido for negativo ele encerra o programa
	blt s0, zero, fim
	
	# atualiza os valores de menor, maior, quantidade e acumulador
	mv s1, s0
	mv s2, s0
	addi s3, s3, 1
	add s4, s4, s0
	
laco:
	# Imprime a mensagem "Digite um número: "
	li a7, 4
	la a0, mensagem
	ecall

	# Le o input e armazena em s0
	li a7, 5
	ecall
	mv s0, a0
	
	# Testa se é negativo
	blt s0, zero, fim_laco
	
	# Soma no acumulador e incrementa 1 no contador
	add s4, s4, s0
	addi s3, s3, 1
	
	# Testa se é menor que s1
	blt s0, s1, if_menor
	
	# Testa se é maior que s2
	bgt s0, s2, if_maior
	
	j laco
	
if_menor:
	mv s1, s0
	j laco
	
if_maior:
	mv s2, s0
	j laco
	
	
fim_laco:
	# Calcula a media e armazena em s4
	div s4, s4, s3

	# Imprime a mensagem "O maior..: "
	li a7, 4
	la a0, mensagem_maior
	ecall
	# Imprime o maior
	li a7, 1
	mv a0, s2
	ecall
	
	# Imprime a mensagem "O menor...: "
	li a7, 4
	la a0, mensagem_menor
	ecall
	# Imprime o menor
	li a7, 1
	mv a0, s1
	ecall
	
	# Imprime a mensagem "A media...: "
	li a7, 4
	la a0, mensagem_media
	ecall
	# Imprime a media (em inteiro)
	li a7, 1
	mv a0, s4
	ecall
fim: