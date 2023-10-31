# criar funcao que retorna o maior valor de um vetor

	.data
string:  .asciz "batata"
vogais: .ascii "aeiou"
new_string: .space 32

	.text
main:
	la a0, string
	
	la a1, vogais
	
	la a2, new_string
	
	call funcao_1
	
	# Imprime a string
	li a7, 4
	mv a0, a2
	ecall
	
	# Encerra o programa
	li a7, 10
	ecall

funcao_1:
	mv t0, a2
funcao:
	# Verifica se acabou comparado o caractere de fim de string
	lb s0, 0(a0)
	beq zero, s0, fim
	
	# Calcula o proximo endereço
	addi a0, a0, 1
	
	# Verifica se é vogal
	lb s1, 0(a1)
	beq s0, s1, funcao
	lb s1, 1(a1)
	beq s0, s1, funcao
	lb s1, 2(a1)
	beq s0, s1, funcao
	lb s1, 3(a1)
	beq s0, s1, funcao
	lb s1, 4(a1)
	beq s0, s1, funcao
	
	# Salva a consoante na nova string
	sb s0, 0(t0)
	addi t0, t0, 1
	
	j funcao
fim:
	# Adiciona \0 no final da string (\0 = NULL = 0b0000 = 0)
	sb zero, 0(t0)
	ret