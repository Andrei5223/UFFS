module Lexer where 

import Data.Char

data Expr = BTrue 
          | BFalse 
          | Num Int 
          | Add Expr Expr 
          | Sub Expr Expr
          | Mul Expr Expr
          | And Expr Expr 
          | Or Expr Expr
          | Not Expr
          | Maior Expr Expr
          | MaiorIg Expr Expr
          | Igual Expr Expr
          | If Expr Expr Expr 
          | Var String 
          | Lam String Ty Expr 
          | App Expr Expr 
          | Paren Expr
          | Let String Expr Expr
          | ListaVazia
          | ListaSeparador Expr Expr
          | ListaCabeça Expr
          | ListaCauda Expr
          deriving Show 

data Ty = TBool 
        | TNum 
        | TFun Ty Ty 
        | TLista Ty
        deriving (Show, Eq)

data Token = TokenTrue 
           | TokenFalse 
           | TokenNum Int 
           | TokenAdd 
           | TokenSub
           | TokenMul
           | TokenAnd 
           | TokenOr
           | TokenMaior
           | TokenMaiorIg
           | TokenIgual
           | TokenNot
           | TokenIf 
           | TokenThen
           | TokenElse
           | TokenVar String
           | TokenLam
           | TokenColon
           | TokenArrow
           | TokenTNum
           | TokenTBool
           | TokenLParen
           | TokenRParen
           | TokenLColchete
           | TokenRColchete
           | TokenListaSeparador
           | TokenListaCabeça
           | TokenListaCauda
           | TokenListaVazia
           | TokenLet
           | TokenAtrib
           | TokenIn
           deriving Show 

lexer :: String -> [Token]
lexer [] = [] 
lexer ('[':cs) = TokenLColchete : lexer cs
lexer (']':cs) = TokenRColchete : lexer cs
lexer (',':cs) = TokenListaSeparador : lexer cs
lexer ('=':'=':cs) = TokenIgual : lexer cs
lexer ('>':'=':cs) = TokenMaiorIg : lexer cs
lexer ('>':cs) = TokenMaior : lexer cs
lexer ('-':'>':cs) = TokenArrow : lexer cs
lexer ('+':cs) = TokenAdd : lexer cs 
lexer ('-':cs) = TokenSub : lexer cs
lexer ('*':cs) = TokenMul : lexer cs
lexer ('\\':cs) = TokenLam : lexer cs
lexer (':':cs) = TokenColon : lexer cs
lexer ('(':cs) = TokenLParen : lexer cs
lexer (')':cs) = TokenRParen : lexer cs 
lexer ('&':'&':cs) = TokenAnd : lexer cs
lexer ('|':'|':cs) = TokenOr : lexer cs
lexer ('!':cs) = TokenNot : lexer cs
lexer ('=':cs) = TokenAtrib : lexer cs
lexer (c:cs) | isSpace c = lexer cs 
             | isDigit c = lexNum (c:cs) 
             | isAlpha c = lexKW (c:cs)

lexNum :: String -> [Token]
lexNum cs = case span isDigit cs of 
              (num, rest) -> TokenNum (read num) : lexer rest 

lexKW :: String -> [Token]
lexKW cs = case span isAlpha cs of 
             ("head", rest) -> TokenListaCabeça : lexer rest 
             ("tail", rest) -> TokenListaCauda : lexer rest 
             ("true", rest) -> TokenTrue : lexer rest 
             ("false", rest) -> TokenFalse : lexer rest 
             ("if", rest) -> TokenIf : lexer rest 
             ("then", rest) -> TokenThen : lexer rest 
             ("else", rest) -> TokenElse : lexer rest 
             ("Number", rest) -> TokenTNum : lexer rest
             ("Boolean", rest) -> TokenTBool : lexer rest 
             ("let", rest) -> TokenLet : lexer rest
             ("in", rest) -> TokenIn : lexer rest
             (var, rest) -> TokenVar var : lexer rest

