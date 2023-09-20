x = int(input())
y = int(input())
soma = 0
while x <= y:
    if y % 13 == 0:
        y -= 1
        continue
    else:
        soma += y
        y -= 1
print(soma)