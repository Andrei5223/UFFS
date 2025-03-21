f b = b + 1

dobro x = x * x

quadruplo x = dobro (dobro x)

fat 0 = 1
fat n = n * fat (n - 1)

vabs :: Integer -> Integer
vabs n  | n >= 0 = n
        | n < 0 = -n

sinal :: Int -> Int
sinal n | n < 0 = -1
        | n == 0 = 0
        | otherwise = 1

firstOrEmpty :: [[Char]] -> [Char]
firstOrEmpty lst = if not (null lst)
    then head lst
    else "empty"