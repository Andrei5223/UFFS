fatorial :: Integer -> Integer
fatorial 0 = 1
fatorial n = fatorial (n - 1) * n

mul :: Int -> Int -> Int
mul m n
    |n == 0 = 0
    |n > 0 = m + mul m (n-1)

tamanho :: [Int] -> Int
tamanho [] = 0
tamanho (x:xs) = 1 + tamanho xs

somaLista :: [Int] -> Int
somaLista [] = 0
somaLista (x:xs) = x + somaLista xs

concat' :: [a] -> [a] -> [a]
concat' [] l = l
concat' (x:xs) l = x : concat' xs l