module Interpreter where 

import Lexer 

isValue :: Expr -> Bool 
isValue BTrue       = True 
isValue BFalse      = True  
isValue (Num _)     = True 
isValue (Lam _ _ _) = True
isValue (ListaVazia) = True                                 -- Lista vazia é um valor
isValue (ListaSeparador e1 e2) = isValue e1 && isValue e2   -- Lista separador é um valor se ambos os elementos forem valores
isValue _           = False 

subst :: String -> Expr -> Expr -> Expr
subst v e BTrue = BTrue 
subst v e BFalse = BFalse 
subst v e (Num x) = Num x 
subst v e (Add e1 e2) = Add (subst v e e1) (subst v e e2)
subst v e (Sub e1 e2) = Sub (subst v e e1) (subst v e e2)
subst v e (Mul e1 e2) = Mul (subst v e e1) (subst v e e2)
subst v e (And e1 e2) = And (subst v e e1) (subst v e e2)
subst v e (Or e1 e2) = Or (subst v e e1) (subst v e e2)
subst v e (Not e1) = Not (subst v e e1)
subst v e (Maior e1 e2) = Maior (subst v e e1) (subst v e e2)
subst v e (MaiorIg e1 e2) = MaiorIg (subst v e e1) (subst v e e2)
subst v e (Igual e1 e2) = Igual (subst v e e1) (subst v e e2)
subst v e (If e1 e2 e3) = If (subst v e e1) (subst v e e2) (subst v e e3)
subst v e (Var x) = if v == x then 
                      e 
                    else 
                      Var x 
subst v e (Lam x t b) = Lam x t (subst v e b)
subst v e (App e1 e2) = App (subst v e e1) (subst v e e2)
subst v e (Paren e1) = Paren (subst v e e1)
subst v e (Let s e1 e2) = Let s e1 (subst v e e2)
subst v e (ListaSeparador e1 e2) = ListaSeparador (subst v e e1) (subst v e e2)
subst v e (ListaCabeça e1) = ListaCabeça (subst v e e1)
subst v e (ListaCauda e1) = ListaCauda (subst v e e1)


step :: Expr -> Expr 
-- Adição
step (Add (Num n1) (Num n2)) = Num (n1 + n2)     -- S-Add
step (Add (Num n1) e2) = let e2' = step e2       -- S-Add2
                           in Add (Num n1) e2' 
step (Add e1 e2) = Add (step e1) e2              -- S-Add1

-- Subtração
step (Sub (Num n1) (Num n2)) = Num (n1 - n2)     -- S-Sub
step (Sub (Num n1) e2) = let e2' = step e2       -- S-Sub2
                           in Sub (Num n1) e2' 
step (Sub e1 e2) = Sub (step e1) e2              -- S-Sub1

-- Multiplicação
step (Mul (Num n1) (Num n2)) = Num (n1 * n2)     -- S-Mul
step (Mul (Num n1) e2) = let e2' = step e2       -- S-Mul2
                           in Mul (Num n1) e2' 
step (Mul e1 e2) = Mul (step e1) e2              -- S-Mul1

-- Lógica
step (And BTrue e2) = e2 
step (And BFalse e2) = BFalse 
step (And e1 e2) = And (step e1) e2
step (Or BTrue e2) = BTrue
step (Or BFalse e2) = e2
step (Or e1 e2) = Or (step e1) e2
step (Not BTrue) = BFalse
step (Not BFalse) = BTrue
step (Not e) = Not (step e)
step (Maior (Num n1) (Num n2)) = if n1 > n2 then BTrue else BFalse
step (Maior (Num n1) e2) = let e2' = step e2
                           in Maior (Num n1) e2'
step (Maior e1 e2) = Maior (step e1) e2
step (MaiorIg (Num n1) (Num n2)) = if n1 >= n2 then BTrue else BFalse
step (MaiorIg (Num n1) e2) = let e2' = step e2
                           in MaiorIg (Num n1) e2'
step (MaiorIg e1 e2) = MaiorIg (step e1) e2
step (Igual (Num n1) (Num n2)) = if n1 == n2 then BTrue else BFalse
step (Igual (Num n1) e2) = let e2' = step e2
                           in Igual (Num n1) e2'
step (Igual e1 e2) = Igual (step e1) e2

-- If
step (If BTrue e1 e2) = e1 
step (If BFalse e1 e2) = e2
step (If e e1 e2) = If (step e) e1 e2

-- Lambda
step (App e1@(Lam x t b) e2) | isValue e2 = subst x e2 b
                             | otherwise  = App e1 (step e2)
step (App e1 e2) = App (step e1) e2

-- Parenteses
step (Paren e) = e

-- Variáveis
step (Let v e1 e2)
    | isValue e1 = subst v e1 e2
    | otherwise  = Let v (step e1) e2

-- Listas
-- Avalia os elementos da lista até que ambos sejam valores.
-- Só considera a lista como valor quando a cabeça (e1) e a cauda (e2) também forem valores.
step (ListaSeparador e1 e2) 
    | isValue e1 && isValue e2 = ListaSeparador e1 e2  -- Lista pronta: ambos são valores
    | isValue e1 = ListaSeparador e1 (step e2)         -- Avalia a cauda até virar valor
    | isValue e2 = ListaSeparador (step e1) e2         -- Avalia a cabeça até virar valor
    | otherwise = ListaSeparador (step e1) (step e2)   -- Avalia ambos se nenhum é valor ainda

-- ListaCabeça: retorna o primeiro elemento da lista (a cabeça), mas só quando a lista já está construída como ListaSeparador.
step (ListaCabeça (ListaSeparador e1 _)) = e1
-- Caso geral: reduz o argumento até virar um ListaSeparador, garantindo que só pega a cabeça de uma lista válida.
step (ListaCabeça e) 
    | isValue e = ListaCabeça e
    | otherwise = ListaCabeça (step e)
    
-- ListaCauda: retorna o restante da lista (a cauda), mas só quando a lista já está construída como ListaSeparador.
step (ListaCauda (ListaSeparador _ e2)) = e2
-- Caso geral: reduz o argumento até virar um ListaSeparador, garantindo que só pega a cauda de uma lista válida.
step (ListaCauda e) 
    | isValue e = ListaCauda e
    | otherwise = ListaCauda (step e)


eval :: Expr -> Expr 
eval e | isValue e = e 
       | otherwise = eval (step e)

