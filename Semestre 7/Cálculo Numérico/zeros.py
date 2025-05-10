import time
import math
import matplotlib.pyplot as plt
import pandas as pd


# Definições
f = lambda x: math.exp(-x**2) - math.cos(x)
phi = lambda x: math.cos(x) - math.exp(-x**2) + x
f_prime = lambda x:-2 * x * math.exp(-x**2) + math.sin(x)
a = 1
b = 2
x0 = 1.2
epsilon1 = 1e-4
epsilon2 = 1e-4


# Implementação abaixo:
def bisseccao(f, a, b, epsilon=1e-4, max_iter=1000):
    if f(a) * f(b) >= 0:
        raise ValueError("f(a) e f(b) devem ter sinais opostos.")

    x_old = None
    k = 1
    while (b - a) >= epsilon and k <= max_iter:
        x = (a + b) / 2
        M = f(a)
        fx = f(x)

        if M * fx > 0:
            a = x
        else:
            b = x

        erro = abs(x - x_old) if x_old is not None else None
        if (b - a) < epsilon:
            return x, k, erro

        x_old = x
        k += 1

    return (a + b) / 2, k, abs((a + b)/2 - x_old)



def posicao_falsa(f, a, b, epsilon1=1e-4, epsilon2=1e-4, max_iter=1000):
    x_old = None

    for k in range(1, max_iter + 1):
        if (b - a) < epsilon1:
            x = (a + b) / 2
            return x, k, abs(x - x_old) if x_old else None

        if abs(f(a)) < epsilon2:
            return a, k, abs(a - x_old) if x_old else None
        if abs(f(b)) < epsilon2:
            return b, k, abs(b - x_old) if x_old else None

        fa = f(a)
        fb = f(b)
        x = (a * fb - b * fa) / (fb - fa)
        fx = f(x)

        erro = abs(x - x_old) if x_old else None

        if abs(fx) < epsilon2:
            return x, k, erro

        if fa * fx > 0:
            a = x
        else:
            b = x

        if (b - a) < epsilon1:
            return (a + b) / 2, k, erro

        x_old = x

    return (a + b) / 2, max_iter, abs((a + b)/2 - x_old)



def ponto_fixo(f, phi, x0, epsilon1=1e-4, epsilon2=1e-4, max_iter=1000):
    if abs(f(x0)) < epsilon1:
        return x0, 0, 0.0

    for k in range(1, max_iter + 1):
        x1 = phi(x0)
        erro = abs(x1 - x0)

        if abs(f(x1)) < epsilon1 or erro < epsilon2:
            return x1, k, erro

        x0 = x1

    return x1, max_iter, abs(phi(x0) - x0)



def newton(f, f_prime, x0, epsilon1=1e-4, epsilon2=1e-4, max_iter=1000):
    if abs(f(x0)) < epsilon1:
        return x0, 0, 0.0

    for k in range(1, max_iter + 1):
        fpx = f_prime(x0)
        if fpx == 0:
            raise ZeroDivisionError("Derivada nula")

        x1 = x0 - f(x0) / fpx
        erro = abs(x1 - x0)

        if abs(f(x1)) < epsilon1 or erro < epsilon2:
            return x1, k, erro

        x0 = x1

    return x0, max_iter, erro



def secante(f, x0, x1, epsilon1=1e-4, epsilon2=1e-4, max_iter=1000):
    if abs(f(x0)) < epsilon1:
        return x0, 0, 0.0

    if abs(f(x1)) < epsilon1 or abs(x1 - x0) < epsilon2:
        return x1, 0, abs(x1 - x0)

    for k in range(1, max_iter + 1):
        fx0 = f(x0)
        fx1 = f(x1)

        if fx1 - fx0 == 0:
            raise ZeroDivisionError("Divisão por zero.")

        x2 = x1 - fx1 * (x1 - x0) / (fx1 - fx0)
        erro = abs(x2 - x1)

        if abs(f(x2)) < epsilon1 or erro < epsilon2:
            return x2, k, erro

        x0, x1 = x1, x2

    return x1, max_iter, abs(x1 - x0)

methods_data = {}

# Testando a função bisseccao
start_time = time.time()
raiz, k, erro = bisseccao(f, a=a, b=b, epsilon=epsilon1)
end_time = time.time()
methods_data['Bissecção'] = ['[1, 2]', f"{raiz:.10e}", f"{f(raiz):.10e}", f"{erro:.10e}", k, (end_time - start_time) * 1000]

print("Bissecção:")
print(f"Aproximação: {raiz} \t f(raiz): {f(raiz)} \t iterações: {k} \t erro estimado: {erro}")
print(f"Tempo de execução: {end_time - start_time:.6f} segundos\n")

# Testando a função posicao_falsa
start_time = time.time()
raiz, k, erro = posicao_falsa(f, a=a, b=b, epsilon1=epsilon1, epsilon2=epsilon2)
end_time = time.time()
methods_data['Posição Falsa'] = ['[1, 2]', f"{raiz:.10e}", f"{f(raiz):.10e}", f"{erro:.10e}", k, (end_time - start_time) * 1000]

print("Posição Falsa:")
print(f"Aproximação: {raiz} \t f(raiz): {f(raiz)} \t iterações: {k} \t erro estimado: {erro}")
print(f"Tempo de execução: {end_time - start_time:.6f} segundos\n")

# Testando o método de ponto fixo
start_time = time.time()
raiz, k, erro = ponto_fixo(f, phi, x0=x0, epsilon1=epsilon1, epsilon2=epsilon2)
end_time = time.time()
methods_data['Ponto Fixo'] = ['1.2', f"{raiz:.10e}", f"{f(raiz):.10e}", f"{erro:.10e}", k, (end_time - start_time) * 1000]

print("Ponto Fixo:")
print(f"Aproximação: {raiz} \t f(raiz): {f(raiz)} \t iterações: {k} \t erro estimado: {erro}")
print(f"Tempo de execução: {end_time - start_time:.6f} segundos\n")

# Testando o método de Newton
try:
    start_time = time.time()
    raiz, k, erro = newton(f, f_prime, x0=x0, epsilon1=epsilon1, epsilon2=epsilon2)
    end_time = time.time()
    methods_data['Newton'] = ['1.2', f"{raiz:.10e}", f"{f(raiz):.10e}", f"{erro:.10e}", k, (end_time - start_time) * 1000]


    print("Newton:")
    print(f"Aproximação: {raiz} \t f(raiz): {f(raiz)} \t iterações: {k} \t erro estimado: {erro}")
    print(f"Tempo de execução: {end_time - start_time:.6f} segundos\n")

except Exception as e:
    print(f"Erro no método de Newton: {e}")

# Testando o método da secante
try:
    start_time = time.time()
    raiz, k, erro = secante(f, x0=a, x1=b, epsilon1=epsilon1, epsilon2=epsilon2)
    end_time = time.time()
    methods_data['Secante'] = ['x0 = 1, x1 = 1', f"{raiz:.10e}", f"{f(raiz):.10e}", f"{erro:.10e}", k, (end_time - start_time) * 1000]


    print("Secante:")
    print(f"Aproximação: {raiz} \t f(raiz): {f(raiz)} \t iterações: {k} \t erro estimado: {erro}")
    print(f"Tempo de execução: {end_time - start_time:.6f} segundos\n")
except Exception as e:
    print(f"Erro no método da secante: {e}")


# Criar DataFrame e imagem
df = pd.DataFrame(methods_data, index=[
    "Dados iniciais", "Aproximação da raiz x'", "f(x')", "Erro em x", "Iterações", "Tempo (ms)"
])

# Plotando tabela como imagem
fig, ax = plt.subplots(figsize=(12, 4))
ax.axis('tight')
ax.axis('off')
table = ax.table(cellText=df.values, colLabels=df.columns, rowLabels=df.index, cellLoc='center', loc='center')
table.auto_set_font_size(False)
table.set_fontsize(10)
table.scale(1.2, 1.2)

# Salvar como imagem
output_path = "./tabela_metodos_raizes.png"
plt.savefig(output_path, bbox_inches='tight', dpi=300)
output_path