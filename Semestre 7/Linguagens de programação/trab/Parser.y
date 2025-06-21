{
module Parser where 

import Lexer
}

%name parser 
%tokentype { Token }
%error { parseError }

%token 
    num             { TokenNum $$ }
    true            { TokenTrue }
    false           { TokenFalse }
    '+'             { TokenAdd }
    '-'             { TokenSub }
    '*'             { TokenMul }
    "&&"            { TokenAnd }
    "||"            { TokenOr }
    '!'             { TokenNot }
    "=="            { TokenIgual }
    '>='            { TokenMaiorIg }
    '>'             { TokenMaior }
    if              { TokenIf }
    then            { TokenThen }
    else            { TokenElse }
    var             { TokenVar $$ }
    '\\'            { TokenLam }
    ':'             { TokenColon }
    "->"            { TokenArrow }
    Number          { TokenTNum }
    Boolean         { TokenTBool }
    '('             { TokenLParen }
    ')'             { TokenRParen }
    '['             { TokenLColchete }
    ']'             { TokenRColchete }
    ','             { TokenListaSeparador }
    let             { TokenLet }
    '='             { TokenAtrib }
    in              { TokenIn }
    head            { TokenListaCabeça }
    tail            { TokenListaCauda }

%nonassoc if then else 
%left "||"
%left "&&"
%nonassoc "==" '>' ">="
%left '+' '-'
%left '*'

%% 

Exp     : num                           { Num $1 }
        | true                          { BTrue }
        | false                         { BFalse }
        | Exp '+' Exp                   { Add $1 $3 }
        | Exp '-' Exp                   { Sub $1 $3 }
        | Exp '*' Exp                   { Mul $1 $3 }
        | Exp "&&" Exp                  { And $1 $3 }
        | Exp "||" Exp                  { Or $1 $3 }
        | '!' Exp                       { Not $2 }
        | Exp '>' Exp                   { Maior $1 $3 }
        | Exp '>=' Exp                  { MaiorIg $1 $3 }
        | Exp "==" Exp                  { Igual $1 $3 }
        | if Exp then Exp else Exp      { If $2 $4 $6 }
        | var                           { Var $1 }
        | '\\' var ':' Type "->" Exp    { Lam $2 $4 $6 }
        | Exp Exp                       { App $1 $2 }
        | '(' Exp ')'                   { Paren $2 }
        | let var '=' Exp in Exp        { Let $2 $4 $6 }
        | '[' ListaMembros ']'          { $2 }
        | head Exp                      { ListaCabeça $2 }
        | tail Exp                      { ListaCauda $2 }

ListaMembros : Exp ',' ListaMembros     { ListaSeparador $1 $3 }
             | Exp                      { ListaSeparador $1 ListaVazia }

Type    : Boolean                       { TBool }
        | Number                        { TNum }
        | Type "->" Type                { TFun $1 $3 }
        | '[' Type ']'                  { TLista $2 }
{ 

parseError :: [Token] -> a 
parseError _ = error "Erro sintático!"

}