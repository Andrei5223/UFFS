module TypeChecker where 

import Lexer 

type Ctx = [(String, Ty)]

typeof :: Ctx -> Expr -> Maybe Ty 
typeof ctx (Num _) = Just TNum 
typeof ctx BFalse = Just TBool 
typeof ctx BTrue = Just TBool 
typeof ctx (Add e1 e2) = case (typeof ctx e1, typeof ctx e2) of 
                       (Just TNum, Just TNum) -> Just TNum 
                       _                      -> Nothing
typeof ctx (Sub e1 e2) = case (typeof ctx e1, typeof ctx e2) of 
                       (Just TNum, Just TNum) -> Just TNum 
                       _                      -> Nothing
typeof ctx (Mul e1 e2) = case (typeof ctx e1, typeof ctx e2) of 
                       (Just TNum, Just TNum) -> Just TNum 
                       _                      -> Nothing
typeof ctx (And e1 e2) = case (typeof ctx e1, typeof ctx e2) of 
                       (Just TBool, Just TBool) -> Just TBool 
                       _                        -> Nothing 
typeof ctx (Or e1 e2) = case (typeof ctx e1, typeof ctx e2) of 
                       (Just TBool, Just TBool) -> Just TBool 
                       _                        -> Nothing 
typeof ctx (Not e) = case (typeof ctx e) of 
                       Just TBool -> Just TBool
                       _          -> Nothing
typeof ctx (Maior e1 e2) = case (typeof ctx e1, typeof ctx e2) of 
                       (Just TNum, Just TNum) -> Just TBool
                       _                      -> Nothing
typeof ctx (MaiorIg e1 e2) = case (typeof ctx e1, typeof ctx e2) of 
                       (Just TNum, Just TNum) -> Just TBool
                       _                      -> Nothing
typeof ctx (Igual e1 e2) = case (typeof ctx e1, typeof ctx e2) of 
                       (Just TNum, Just TNum) -> Just TBool
                       (Just TBool, Just TBool) -> Just TBool
                       _                      -> Nothing
typeof ctx (If e1 e2 e3) = 
    case (typeof ctx e1) of 
      Just TBool -> case (typeof ctx e2, typeof ctx e3) of 
                      (Just t1, Just t2) | t1 == t2  -> Just t1  
                                         | otherwise -> Nothing 
                      _ -> Nothing 
      _ -> Nothing
typeof ctx (Var v) = lookup v ctx 
typeof ctx (Lam x t1 b) = let ctx' = (x, t1) : ctx in 
                            case typeof ctx' b of 
                              Just t2 -> Just (TFun t1 t2)
                              _       -> Nothing 
typeof ctx (App e1 e2) = 
  case (typeof ctx e1) of 
    Just (TFun t11 t12) -> case typeof ctx e2 of 
                             Just t2 -> if t11 == t2 then 
                                          Just t12 
                                        else 
                                          Nothing 
                             _ -> Nothing 
    _ -> Nothing 
typeof ctx (Paren e) = typeof ctx e
                             
typeof ctx (Let v e1 e2) = case typeof ctx e1 of        -- tipo do e1
                            Just t1 -> 
                              let ctx' = (v, t1) : ctx in  -- adiciona v ao contexto
                              typeof ctx' e2              -- tipo do e2 com o novo contexto
                            _ -> Nothing  -- se e1 não tem tipo, retorna Nothing

-- Listas, garantem que operações de listas sejam feitas com tipos corretos.

-- ListaVazia: não tem tipo próprio, só serve como base para listas
typeof ctx ListaVazia = Nothing

-- ListaSeparador garante que o tipo dos elementos da lista é o mesmo
-- Caso especial para cauda vazia
typeof ctx (ListaSeparador e1 ListaVazia) =
  case typeof ctx e1 of
    Just t1 -> Just (TLista t1)
    _       -> Nothing

-- Verifica se o tipo do elemento (e1) e o tipo dos elementos da lista (e2) são iguais.
-- Se forem, retorna o tipo de lista do elemento, caso contrário, retorna Nothing.
typeof ctx (ListaSeparador e1 e2) = case (typeof ctx e1, typeof ctx e2) of
                                    (Just t1, Just (TLista t2)) | t1 == t2 -> Just (TLista t1)
                                    _ -> Nothing

-- ListaCabeça retorna o tipo do elemento na cabeça da lista.
-- Só é válido se o tipo de e for uma lista (TLista t), retornando o tipo t dos elementos.
typeof ctx (ListaCabeça e) = case typeof ctx e of 
                              Just (TLista t) -> Just t
                              _ -> Nothing

-- ListaCauda retorna o tipo da cauda de uma lista.
-- Se e for do tipo TLista t, retorna TLista t, ou seja, uma lista do mesmo tipo dos elementos.
typeof ctx (ListaCauda e) = case typeof ctx e of 
                              Just (TLista t) -> Just (TLista t)
                              _ -> Nothing

typecheck :: Expr -> Expr  
typecheck e = case typeof [] e of 
                Just _ -> e 
                _      -> error "Erro de tipo!"


