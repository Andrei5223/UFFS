
-- Ex1
salary :: Double -> Double
salary s = s * 1.1 - s * 0.07

-- Ex 2
student_grade :: Double -> Double -> Double -> Double
student_grade lab av ex = lab * 0.2 + av * 0.3 + ex * 0.5

student_result :: Double -> Double -> Double -> Char
student_result n1 n2 n3 | grade >= 8 && grade <= 10 = 'A'
                        | grade >= 7 = 'B'
                        | grade >= 6 = 'C'
                        | grade >= 5 = 'D'
                        | otherwise = 'E'
  where grade = student_grade n1 n2 n3

-- Ex 3

photo_price_amount :: Int -> Double
photo_price_amount 1 = 100
photo_price_amount 2 = 130
photo_price_amount 3 = 150
photo_price_amount 4 = 165
photo_price_amount 5 = 175
photo_price_amount 6 = 180
photo_price_amount _ = 185

photo_price :: Int -> String -> Double
photo_price n day 
    | day == "sabado" || day == "domingo" = photo_price_amount n * 1.2
    | otherwise = photo_price_amount n

-- Ex 4
double_fat :: Integer -> Integer
double_fat 0 = 1
double_fat 1 = 1
double_fat n = n * double_fat (n - 2)

-- Ex 5
power :: Integer -> Integer -> Integer
power x 0 = 1
power x e = x * (power x (e - 1))

-- Ex 6 
career :: Double -> Double -> Int -> Int -> Double
career s a ac aa = if (ac == aa) then
                     s
                   else 
                     career (sal_inc s a) (2 * a) (ac + 1) aa
    where 
        sal_inc s p = s + s * p/100

career' :: Double -> Int -> Int -> Double
career' s ac aa = career s 1.5 ac aa 

-- Ex 7
get_last :: [a] -> a 
get_last l = head (reverse l)

get_last' :: [a] -> a 
get_last' [] = error "Lista nao pode ser vazia" 
get_last' [x] = x 
get_last' (x:xs) = get_last' xs 

get_last'' :: [a] -> Maybe a 
get_last'' [] = Nothing
get_last'' [x] = Just x 
get_last'' (x:xs) = get_last'' xs 

-- Ex 8
get_firsts :: [a] -> [a]
get_firsts l = reverse (tail (reverse l))

get_firsts' :: [a] -> [a]
get_firsts' [] = []
get_firsts' [x] = [] 
get_firsts' (x:xs) = x : get_firsts' xs 

-- Ex 9
prod_elem :: Num a => [a] -> [a] -> [a]
prod_elem [] [] = []
prod_elem (x:xs) (y:ys) = (x * y) : prod_elem xs ys

-- Ex 10 e 11

data FormaCom = Un | Peso
              deriving Show

data Produto = Perecivel Int String Int Bool FormaCom
             | NaoPerecivel Int String String Int FormaCom
             deriving Show

prod1 = Perecivel 1 "Carne Moída" 2022 True Un
prod2 = NaoPerecivel 2 "Sal" "Sal Marinho" 2021 Peso

-- Ex 12
is_valid :: Produto -> Int -> Bool
is_valid (Perecivel _ _ av _ _) aa = av >= aa 
is_valid _ _ = True

-- Ex 13
my_and :: Bool -> Bool -> Bool
my_and True True = True
my_and _ _ = False

my_or :: Bool -> Bool -> Bool
my_or False False = False
my_or _ _ = True

-- Ex 14
calc_list :: Num a => [a] -> a 
calc_list [] = 0
calc_list [x] = x 
calc_list (x:y:_) = x + y

-- Ex 15
count_list :: [a] -> Int
count_list l = foldl (\x y -> x + 1) 0 l 

-- Ex 16

b = let pot_dois x | x <= 0 = 1
                   | otherwise = 2 * pot_dois (x-1)
      in pot_dois 6


