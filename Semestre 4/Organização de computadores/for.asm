	.data
z: .word 0
x: .word 10
numero_x:  .asciz "Entre com o valor de x: "
numero_y:  .ascii "Entre com o valor de y: "

	.text
main:
	la t0, z
	lw s0, 0(t0)
	
	# Imprime a mensagem "Entre com o valor de x: "
	li a7, 4
	la a0, numero_x
	ecall
	
	# Le o input e armazena em s1
	li a7, 5
	ecall
	mv s1, a0
	
	# Le o valor de x da memoria e armazena em s1
	#la t1, x
	#lw s1, 0(t1)

teste:
	beq s1, zero, fim_laco
	add s0, s0, s1
	
	li a7, 1
	add a0,s0,zero
	ecall
	
	addi s1, s1, -1
	j teste

fim_laco:
	sw s0, 0(t0)
