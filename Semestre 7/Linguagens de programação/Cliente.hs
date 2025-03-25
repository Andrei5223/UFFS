module Cliente where

data Cliente = OrgGov String
                | Empresa String Integer String String
                | Individuo Pessoa Bool
                deriving Show

data Pessoa = Pessoa String String
                deriving Show

nomeCliente :: Cliente -> String
nomeCliente c = case c of 
                OrgGov n -> n
                Empresa n _ _ _ -> n --nomeCliente (Empresa "Sadia" 111 "aaa" "nnn")
                Individuo (Pessoa n s) True -> n ++ " " ++ s
                Individuo (Pessoa n s) False -> n

nomeEmpresa :: Cliente -> Maybe String
nomeEmpresa c = case c of
                Empresa n _ _ _ -> Just nnn
                _               -> Nothing