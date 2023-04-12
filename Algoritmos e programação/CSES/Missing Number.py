numv = int(input())
nums = list(map(int, input().split()))
somnumv = 0
n = 0
while numv > n:
    n += 1
    somnumv += n

somnums = 0
numz = numv - 2
while numz >= 0:
    somnums += nums[numz]
    numz -= 1

num = somnumv - somnums
print(num)