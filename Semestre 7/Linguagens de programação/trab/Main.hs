module Main where 

import Lexer 
import Parser 
import Interpreter
import TypeChecker

-- Para testar o interpretador no Linux é possível rodar:
-- * runghc Main.hs < examples/ex1.txt
-- * echo "2 + 5" | runghc Main.hs

--PowerShell (Windows):
--Get-Content examples\ex1.txt | runghc -package array Main.hs

main = getContents >>= print . eval . typecheck . parser . lexer 