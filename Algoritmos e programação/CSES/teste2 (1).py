x = int(input())
y = int(input())
if y % 2 == 0:
    y += 1
soma = 0
for n in range(y, x, 2):
    soma = soma + n
print(soma)