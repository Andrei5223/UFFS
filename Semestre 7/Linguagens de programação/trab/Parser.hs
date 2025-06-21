{-# OPTIONS_GHC -w #-}
module Parser where 

import Lexer
import qualified Data.Array as Happy_Data_Array
import qualified Data.Bits as Bits
import Control.Applicative(Applicative(..))
import Control.Monad (ap)

-- parser produced by Happy Version 1.19.12

data HappyAbsSyn t4 t5 t6
	= HappyTerminal (Token)
	| HappyErrorToken Int
	| HappyAbsSyn4 t4
	| HappyAbsSyn5 t5
	| HappyAbsSyn6 t6

happyExpList :: Happy_Data_Array.Array Int Int
happyExpList = Happy_Data_Array.listArray (0,442) ([16832,10340,4121,0,0,0,0,65280,41375,100,0,0,0,0,7168,34372,402,37127,25761,0,0,0,2048,0,17436,37510,1793,41361,100,8192,0,4208,18969,7174,34372,402,0,0,0,0,0,0,128,32764,39558,1,0,49153,26623,6456,0,32,64512,34559,402,0,0,0,0,28672,6416,1610,17436,37510,1793,41361,49252,25665,6440,4208,18969,7174,34372,402,37127,25761,16832,10340,32793,3,0,0,0,14336,0,0,670,0,41856,0,0,0,0,32,0,2048,0,28672,6416,1610,0,608,0,0,0,0,0,4208,18969,7174,34372,402,40959,29857,0,0,0,16384,0,0,0,0,0,0,0,38,65520,18973,7174,34372,402,0,260,16832,11876,28697,6416,1610,0,0,0,0,0,0,0,4208,19353,6,24576,2,0,0,48640,2,0,0
	])

{-# NOINLINE happyExpListPerState #-}
happyExpListPerState st =
    token_strs_expected
  where token_strs = ["error","%dummy","%start_parser","Exp","ListaMembros","Type","num","true","false","'+'","'-'","'*'","\"&&\"","\"||\"","'!'","\"==\"","'>='","'>'","if","then","else","var","'\\\\'","':'","\"->\"","Number","Boolean","'('","')'","'['","']'","','","let","'='","in","head","tail","%eof"]
        bit_start = st * 38
        bit_end = (st + 1) * 38
        read_bit = readArrayBit happyExpList
        bits = map read_bit [bit_start..bit_end - 1]
        bits_indexed = zip bits [0..37]
        token_strs_expected = concatMap f bits_indexed
        f (False, _) = []
        f (True, nr) = [token_strs !! nr]

action_0 (7) = happyShift action_2
action_0 (8) = happyShift action_4
action_0 (9) = happyShift action_5
action_0 (15) = happyShift action_6
action_0 (19) = happyShift action_7
action_0 (22) = happyShift action_8
action_0 (23) = happyShift action_9
action_0 (28) = happyShift action_10
action_0 (30) = happyShift action_11
action_0 (33) = happyShift action_12
action_0 (36) = happyShift action_13
action_0 (37) = happyShift action_14
action_0 (4) = happyGoto action_3
action_0 _ = happyFail (happyExpListPerState 0)

action_1 (7) = happyShift action_2
action_1 _ = happyFail (happyExpListPerState 1)

action_2 _ = happyReduce_1

action_3 (7) = happyShift action_2
action_3 (8) = happyShift action_4
action_3 (9) = happyShift action_5
action_3 (10) = happyShift action_25
action_3 (11) = happyShift action_26
action_3 (12) = happyShift action_27
action_3 (13) = happyShift action_28
action_3 (14) = happyShift action_29
action_3 (15) = happyShift action_6
action_3 (16) = happyShift action_30
action_3 (17) = happyShift action_31
action_3 (18) = happyShift action_32
action_3 (19) = happyShift action_7
action_3 (22) = happyShift action_8
action_3 (23) = happyShift action_9
action_3 (28) = happyShift action_10
action_3 (30) = happyShift action_11
action_3 (33) = happyShift action_12
action_3 (36) = happyShift action_13
action_3 (37) = happyShift action_14
action_3 (38) = happyAccept
action_3 (4) = happyGoto action_24
action_3 _ = happyFail (happyExpListPerState 3)

action_4 _ = happyReduce_2

action_5 _ = happyReduce_3

action_6 (7) = happyShift action_2
action_6 (8) = happyShift action_4
action_6 (9) = happyShift action_5
action_6 (15) = happyShift action_6
action_6 (19) = happyShift action_7
action_6 (22) = happyShift action_8
action_6 (23) = happyShift action_9
action_6 (28) = happyShift action_10
action_6 (30) = happyShift action_11
action_6 (33) = happyShift action_12
action_6 (36) = happyShift action_13
action_6 (37) = happyShift action_14
action_6 (4) = happyGoto action_23
action_6 _ = happyFail (happyExpListPerState 6)

action_7 (7) = happyShift action_2
action_7 (8) = happyShift action_4
action_7 (9) = happyShift action_5
action_7 (15) = happyShift action_6
action_7 (19) = happyShift action_7
action_7 (22) = happyShift action_8
action_7 (23) = happyShift action_9
action_7 (28) = happyShift action_10
action_7 (30) = happyShift action_11
action_7 (33) = happyShift action_12
action_7 (36) = happyShift action_13
action_7 (37) = happyShift action_14
action_7 (4) = happyGoto action_22
action_7 _ = happyFail (happyExpListPerState 7)

action_8 _ = happyReduce_14

action_9 (22) = happyShift action_21
action_9 _ = happyFail (happyExpListPerState 9)

action_10 (7) = happyShift action_2
action_10 (8) = happyShift action_4
action_10 (9) = happyShift action_5
action_10 (15) = happyShift action_6
action_10 (19) = happyShift action_7
action_10 (22) = happyShift action_8
action_10 (23) = happyShift action_9
action_10 (28) = happyShift action_10
action_10 (30) = happyShift action_11
action_10 (33) = happyShift action_12
action_10 (36) = happyShift action_13
action_10 (37) = happyShift action_14
action_10 (4) = happyGoto action_20
action_10 _ = happyFail (happyExpListPerState 10)

action_11 (7) = happyShift action_2
action_11 (8) = happyShift action_4
action_11 (9) = happyShift action_5
action_11 (15) = happyShift action_6
action_11 (19) = happyShift action_7
action_11 (22) = happyShift action_8
action_11 (23) = happyShift action_9
action_11 (28) = happyShift action_10
action_11 (30) = happyShift action_11
action_11 (33) = happyShift action_12
action_11 (36) = happyShift action_13
action_11 (37) = happyShift action_14
action_11 (4) = happyGoto action_18
action_11 (5) = happyGoto action_19
action_11 _ = happyFail (happyExpListPerState 11)

action_12 (22) = happyShift action_17
action_12 _ = happyFail (happyExpListPerState 12)

action_13 (7) = happyShift action_2
action_13 (8) = happyShift action_4
action_13 (9) = happyShift action_5
action_13 (15) = happyShift action_6
action_13 (19) = happyShift action_7
action_13 (22) = happyShift action_8
action_13 (23) = happyShift action_9
action_13 (28) = happyShift action_10
action_13 (30) = happyShift action_11
action_13 (33) = happyShift action_12
action_13 (36) = happyShift action_13
action_13 (37) = happyShift action_14
action_13 (4) = happyGoto action_16
action_13 _ = happyFail (happyExpListPerState 13)

action_14 (7) = happyShift action_2
action_14 (8) = happyShift action_4
action_14 (9) = happyShift action_5
action_14 (15) = happyShift action_6
action_14 (19) = happyShift action_7
action_14 (22) = happyShift action_8
action_14 (23) = happyShift action_9
action_14 (28) = happyShift action_10
action_14 (30) = happyShift action_11
action_14 (33) = happyShift action_12
action_14 (36) = happyShift action_13
action_14 (37) = happyShift action_14
action_14 (4) = happyGoto action_15
action_14 _ = happyFail (happyExpListPerState 14)

action_15 (7) = happyShift action_2
action_15 (8) = happyShift action_4
action_15 (9) = happyShift action_5
action_15 (10) = happyShift action_25
action_15 (11) = happyShift action_26
action_15 (12) = happyShift action_27
action_15 (13) = happyShift action_28
action_15 (14) = happyShift action_29
action_15 (15) = happyShift action_6
action_15 (16) = happyShift action_30
action_15 (17) = happyShift action_31
action_15 (18) = happyShift action_32
action_15 (19) = happyShift action_7
action_15 (22) = happyShift action_8
action_15 (23) = happyShift action_9
action_15 (28) = happyShift action_10
action_15 (30) = happyShift action_11
action_15 (33) = happyShift action_12
action_15 (36) = happyShift action_13
action_15 (37) = happyShift action_14
action_15 (4) = happyGoto action_24
action_15 _ = happyReduce_21

action_16 (7) = happyShift action_2
action_16 (8) = happyShift action_4
action_16 (9) = happyShift action_5
action_16 (10) = happyShift action_25
action_16 (11) = happyShift action_26
action_16 (12) = happyShift action_27
action_16 (13) = happyShift action_28
action_16 (14) = happyShift action_29
action_16 (15) = happyShift action_6
action_16 (16) = happyShift action_30
action_16 (17) = happyShift action_31
action_16 (18) = happyShift action_32
action_16 (19) = happyShift action_7
action_16 (22) = happyShift action_8
action_16 (23) = happyShift action_9
action_16 (28) = happyShift action_10
action_16 (30) = happyShift action_11
action_16 (33) = happyShift action_12
action_16 (36) = happyShift action_13
action_16 (37) = happyShift action_14
action_16 (4) = happyGoto action_24
action_16 _ = happyReduce_20

action_17 (34) = happyShift action_46
action_17 _ = happyFail (happyExpListPerState 17)

action_18 (7) = happyShift action_2
action_18 (8) = happyShift action_4
action_18 (9) = happyShift action_5
action_18 (10) = happyShift action_25
action_18 (11) = happyShift action_26
action_18 (12) = happyShift action_27
action_18 (13) = happyShift action_28
action_18 (14) = happyShift action_29
action_18 (15) = happyShift action_6
action_18 (16) = happyShift action_30
action_18 (17) = happyShift action_31
action_18 (18) = happyShift action_32
action_18 (19) = happyShift action_7
action_18 (22) = happyShift action_8
action_18 (23) = happyShift action_9
action_18 (28) = happyShift action_10
action_18 (30) = happyShift action_11
action_18 (32) = happyShift action_45
action_18 (33) = happyShift action_12
action_18 (36) = happyShift action_13
action_18 (37) = happyShift action_14
action_18 (4) = happyGoto action_24
action_18 _ = happyReduce_23

action_19 (31) = happyShift action_44
action_19 _ = happyFail (happyExpListPerState 19)

action_20 (7) = happyShift action_2
action_20 (8) = happyShift action_4
action_20 (9) = happyShift action_5
action_20 (10) = happyShift action_25
action_20 (11) = happyShift action_26
action_20 (12) = happyShift action_27
action_20 (13) = happyShift action_28
action_20 (14) = happyShift action_29
action_20 (15) = happyShift action_6
action_20 (16) = happyShift action_30
action_20 (17) = happyShift action_31
action_20 (18) = happyShift action_32
action_20 (19) = happyShift action_7
action_20 (22) = happyShift action_8
action_20 (23) = happyShift action_9
action_20 (28) = happyShift action_10
action_20 (29) = happyShift action_43
action_20 (30) = happyShift action_11
action_20 (33) = happyShift action_12
action_20 (36) = happyShift action_13
action_20 (37) = happyShift action_14
action_20 (4) = happyGoto action_24
action_20 _ = happyFail (happyExpListPerState 20)

action_21 (24) = happyShift action_42
action_21 _ = happyFail (happyExpListPerState 21)

action_22 (7) = happyShift action_2
action_22 (8) = happyShift action_4
action_22 (9) = happyShift action_5
action_22 (10) = happyShift action_25
action_22 (11) = happyShift action_26
action_22 (12) = happyShift action_27
action_22 (13) = happyShift action_28
action_22 (14) = happyShift action_29
action_22 (15) = happyShift action_6
action_22 (16) = happyShift action_30
action_22 (17) = happyShift action_31
action_22 (18) = happyShift action_32
action_22 (19) = happyShift action_7
action_22 (20) = happyShift action_41
action_22 (22) = happyShift action_8
action_22 (23) = happyShift action_9
action_22 (28) = happyShift action_10
action_22 (30) = happyShift action_11
action_22 (33) = happyShift action_12
action_22 (36) = happyShift action_13
action_22 (37) = happyShift action_14
action_22 (4) = happyGoto action_24
action_22 _ = happyFail (happyExpListPerState 22)

action_23 (7) = happyShift action_2
action_23 (8) = happyShift action_4
action_23 (9) = happyShift action_5
action_23 (10) = happyShift action_25
action_23 (11) = happyShift action_26
action_23 (12) = happyShift action_27
action_23 (13) = happyShift action_28
action_23 (14) = happyShift action_29
action_23 (15) = happyShift action_6
action_23 (16) = happyShift action_30
action_23 (17) = happyShift action_31
action_23 (18) = happyShift action_32
action_23 (19) = happyShift action_7
action_23 (22) = happyShift action_8
action_23 (23) = happyShift action_9
action_23 (28) = happyShift action_10
action_23 (30) = happyShift action_11
action_23 (33) = happyShift action_12
action_23 (36) = happyShift action_13
action_23 (37) = happyShift action_14
action_23 (4) = happyGoto action_24
action_23 _ = happyReduce_9

action_24 (7) = happyShift action_2
action_24 (8) = happyShift action_4
action_24 (9) = happyShift action_5
action_24 (10) = happyShift action_25
action_24 (11) = happyShift action_26
action_24 (12) = happyShift action_27
action_24 (13) = happyShift action_28
action_24 (14) = happyShift action_29
action_24 (15) = happyShift action_6
action_24 (16) = happyShift action_30
action_24 (17) = happyShift action_31
action_24 (18) = happyShift action_32
action_24 (19) = happyShift action_7
action_24 (22) = happyShift action_8
action_24 (23) = happyShift action_9
action_24 (28) = happyShift action_10
action_24 (30) = happyShift action_11
action_24 (33) = happyShift action_12
action_24 (36) = happyShift action_13
action_24 (37) = happyShift action_14
action_24 (4) = happyGoto action_24
action_24 _ = happyReduce_16

action_25 (7) = happyShift action_2
action_25 (8) = happyShift action_4
action_25 (9) = happyShift action_5
action_25 (15) = happyShift action_6
action_25 (19) = happyShift action_7
action_25 (22) = happyShift action_8
action_25 (23) = happyShift action_9
action_25 (28) = happyShift action_10
action_25 (30) = happyShift action_11
action_25 (33) = happyShift action_12
action_25 (36) = happyShift action_13
action_25 (37) = happyShift action_14
action_25 (4) = happyGoto action_40
action_25 _ = happyFail (happyExpListPerState 25)

action_26 (7) = happyShift action_2
action_26 (8) = happyShift action_4
action_26 (9) = happyShift action_5
action_26 (15) = happyShift action_6
action_26 (19) = happyShift action_7
action_26 (22) = happyShift action_8
action_26 (23) = happyShift action_9
action_26 (28) = happyShift action_10
action_26 (30) = happyShift action_11
action_26 (33) = happyShift action_12
action_26 (36) = happyShift action_13
action_26 (37) = happyShift action_14
action_26 (4) = happyGoto action_39
action_26 _ = happyFail (happyExpListPerState 26)

action_27 (7) = happyShift action_2
action_27 (8) = happyShift action_4
action_27 (9) = happyShift action_5
action_27 (15) = happyShift action_6
action_27 (19) = happyShift action_7
action_27 (22) = happyShift action_8
action_27 (23) = happyShift action_9
action_27 (28) = happyShift action_10
action_27 (30) = happyShift action_11
action_27 (33) = happyShift action_12
action_27 (36) = happyShift action_13
action_27 (37) = happyShift action_14
action_27 (4) = happyGoto action_38
action_27 _ = happyFail (happyExpListPerState 27)

action_28 (7) = happyShift action_2
action_28 (8) = happyShift action_4
action_28 (9) = happyShift action_5
action_28 (15) = happyShift action_6
action_28 (19) = happyShift action_7
action_28 (22) = happyShift action_8
action_28 (23) = happyShift action_9
action_28 (28) = happyShift action_10
action_28 (30) = happyShift action_11
action_28 (33) = happyShift action_12
action_28 (36) = happyShift action_13
action_28 (37) = happyShift action_14
action_28 (4) = happyGoto action_37
action_28 _ = happyFail (happyExpListPerState 28)

action_29 (7) = happyShift action_2
action_29 (8) = happyShift action_4
action_29 (9) = happyShift action_5
action_29 (15) = happyShift action_6
action_29 (19) = happyShift action_7
action_29 (22) = happyShift action_8
action_29 (23) = happyShift action_9
action_29 (28) = happyShift action_10
action_29 (30) = happyShift action_11
action_29 (33) = happyShift action_12
action_29 (36) = happyShift action_13
action_29 (37) = happyShift action_14
action_29 (4) = happyGoto action_36
action_29 _ = happyFail (happyExpListPerState 29)

action_30 (7) = happyShift action_2
action_30 (8) = happyShift action_4
action_30 (9) = happyShift action_5
action_30 (15) = happyShift action_6
action_30 (19) = happyShift action_7
action_30 (22) = happyShift action_8
action_30 (23) = happyShift action_9
action_30 (28) = happyShift action_10
action_30 (30) = happyShift action_11
action_30 (33) = happyShift action_12
action_30 (36) = happyShift action_13
action_30 (37) = happyShift action_14
action_30 (4) = happyGoto action_35
action_30 _ = happyFail (happyExpListPerState 30)

action_31 (7) = happyShift action_2
action_31 (8) = happyShift action_4
action_31 (9) = happyShift action_5
action_31 (15) = happyShift action_6
action_31 (19) = happyShift action_7
action_31 (22) = happyShift action_8
action_31 (23) = happyShift action_9
action_31 (28) = happyShift action_10
action_31 (30) = happyShift action_11
action_31 (33) = happyShift action_12
action_31 (36) = happyShift action_13
action_31 (37) = happyShift action_14
action_31 (4) = happyGoto action_34
action_31 _ = happyFail (happyExpListPerState 31)

action_32 (7) = happyShift action_2
action_32 (8) = happyShift action_4
action_32 (9) = happyShift action_5
action_32 (15) = happyShift action_6
action_32 (19) = happyShift action_7
action_32 (22) = happyShift action_8
action_32 (23) = happyShift action_9
action_32 (28) = happyShift action_10
action_32 (30) = happyShift action_11
action_32 (33) = happyShift action_12
action_32 (36) = happyShift action_13
action_32 (37) = happyShift action_14
action_32 (4) = happyGoto action_33
action_32 _ = happyFail (happyExpListPerState 32)

action_33 (7) = happyShift action_2
action_33 (8) = happyShift action_4
action_33 (9) = happyShift action_5
action_33 (10) = happyShift action_25
action_33 (11) = happyShift action_26
action_33 (12) = happyShift action_27
action_33 (15) = happyShift action_6
action_33 (16) = happyFail []
action_33 (17) = happyShift action_31
action_33 (18) = happyFail []
action_33 (22) = happyShift action_8
action_33 (23) = happyShift action_9
action_33 (28) = happyShift action_10
action_33 (30) = happyShift action_11
action_33 (33) = happyShift action_12
action_33 (36) = happyShift action_13
action_33 (37) = happyShift action_14
action_33 (4) = happyGoto action_24
action_33 _ = happyReduce_10

action_34 (7) = happyShift action_2
action_34 (8) = happyShift action_4
action_34 (9) = happyShift action_5
action_34 (10) = happyShift action_25
action_34 (11) = happyShift action_26
action_34 (12) = happyShift action_27
action_34 (13) = happyShift action_28
action_34 (14) = happyShift action_29
action_34 (15) = happyShift action_6
action_34 (16) = happyShift action_30
action_34 (17) = happyShift action_31
action_34 (18) = happyShift action_32
action_34 (19) = happyShift action_7
action_34 (22) = happyShift action_8
action_34 (23) = happyShift action_9
action_34 (28) = happyShift action_10
action_34 (30) = happyShift action_11
action_34 (33) = happyShift action_12
action_34 (36) = happyShift action_13
action_34 (37) = happyShift action_14
action_34 (4) = happyGoto action_24
action_34 _ = happyReduce_11

action_35 (7) = happyShift action_2
action_35 (8) = happyShift action_4
action_35 (9) = happyShift action_5
action_35 (10) = happyShift action_25
action_35 (11) = happyShift action_26
action_35 (12) = happyShift action_27
action_35 (15) = happyShift action_6
action_35 (16) = happyFail []
action_35 (17) = happyShift action_31
action_35 (18) = happyFail []
action_35 (22) = happyShift action_8
action_35 (23) = happyShift action_9
action_35 (28) = happyShift action_10
action_35 (30) = happyShift action_11
action_35 (33) = happyShift action_12
action_35 (36) = happyShift action_13
action_35 (37) = happyShift action_14
action_35 (4) = happyGoto action_24
action_35 _ = happyReduce_12

action_36 (7) = happyShift action_2
action_36 (8) = happyShift action_4
action_36 (9) = happyShift action_5
action_36 (10) = happyShift action_25
action_36 (11) = happyShift action_26
action_36 (12) = happyShift action_27
action_36 (13) = happyShift action_28
action_36 (15) = happyShift action_6
action_36 (16) = happyShift action_30
action_36 (17) = happyShift action_31
action_36 (18) = happyShift action_32
action_36 (22) = happyShift action_8
action_36 (23) = happyShift action_9
action_36 (28) = happyShift action_10
action_36 (30) = happyShift action_11
action_36 (33) = happyShift action_12
action_36 (36) = happyShift action_13
action_36 (37) = happyShift action_14
action_36 (4) = happyGoto action_24
action_36 _ = happyReduce_8

action_37 (7) = happyShift action_2
action_37 (8) = happyShift action_4
action_37 (9) = happyShift action_5
action_37 (10) = happyShift action_25
action_37 (11) = happyShift action_26
action_37 (12) = happyShift action_27
action_37 (15) = happyShift action_6
action_37 (16) = happyShift action_30
action_37 (17) = happyShift action_31
action_37 (18) = happyShift action_32
action_37 (22) = happyShift action_8
action_37 (23) = happyShift action_9
action_37 (28) = happyShift action_10
action_37 (30) = happyShift action_11
action_37 (33) = happyShift action_12
action_37 (36) = happyShift action_13
action_37 (37) = happyShift action_14
action_37 (4) = happyGoto action_24
action_37 _ = happyReduce_7

action_38 (7) = happyShift action_2
action_38 (8) = happyShift action_4
action_38 (9) = happyShift action_5
action_38 (15) = happyShift action_6
action_38 (17) = happyShift action_31
action_38 (22) = happyShift action_8
action_38 (23) = happyShift action_9
action_38 (28) = happyShift action_10
action_38 (30) = happyShift action_11
action_38 (33) = happyShift action_12
action_38 (36) = happyShift action_13
action_38 (37) = happyShift action_14
action_38 (4) = happyGoto action_24
action_38 _ = happyReduce_6

action_39 (7) = happyShift action_2
action_39 (8) = happyShift action_4
action_39 (9) = happyShift action_5
action_39 (12) = happyShift action_27
action_39 (15) = happyShift action_6
action_39 (17) = happyShift action_31
action_39 (22) = happyShift action_8
action_39 (23) = happyShift action_9
action_39 (28) = happyShift action_10
action_39 (30) = happyShift action_11
action_39 (33) = happyShift action_12
action_39 (36) = happyShift action_13
action_39 (37) = happyShift action_14
action_39 (4) = happyGoto action_24
action_39 _ = happyReduce_5

action_40 (7) = happyShift action_2
action_40 (8) = happyShift action_4
action_40 (9) = happyShift action_5
action_40 (12) = happyShift action_27
action_40 (15) = happyShift action_6
action_40 (17) = happyShift action_31
action_40 (22) = happyShift action_8
action_40 (23) = happyShift action_9
action_40 (28) = happyShift action_10
action_40 (30) = happyShift action_11
action_40 (33) = happyShift action_12
action_40 (36) = happyShift action_13
action_40 (37) = happyShift action_14
action_40 (4) = happyGoto action_24
action_40 _ = happyReduce_4

action_41 (7) = happyShift action_2
action_41 (8) = happyShift action_4
action_41 (9) = happyShift action_5
action_41 (15) = happyShift action_6
action_41 (19) = happyShift action_7
action_41 (22) = happyShift action_8
action_41 (23) = happyShift action_9
action_41 (28) = happyShift action_10
action_41 (30) = happyShift action_11
action_41 (33) = happyShift action_12
action_41 (36) = happyShift action_13
action_41 (37) = happyShift action_14
action_41 (4) = happyGoto action_53
action_41 _ = happyFail (happyExpListPerState 41)

action_42 (26) = happyShift action_50
action_42 (27) = happyShift action_51
action_42 (30) = happyShift action_52
action_42 (6) = happyGoto action_49
action_42 _ = happyFail (happyExpListPerState 42)

action_43 _ = happyReduce_17

action_44 _ = happyReduce_19

action_45 (7) = happyShift action_2
action_45 (8) = happyShift action_4
action_45 (9) = happyShift action_5
action_45 (15) = happyShift action_6
action_45 (19) = happyShift action_7
action_45 (22) = happyShift action_8
action_45 (23) = happyShift action_9
action_45 (28) = happyShift action_10
action_45 (30) = happyShift action_11
action_45 (33) = happyShift action_12
action_45 (36) = happyShift action_13
action_45 (37) = happyShift action_14
action_45 (4) = happyGoto action_18
action_45 (5) = happyGoto action_48
action_45 _ = happyFail (happyExpListPerState 45)

action_46 (7) = happyShift action_2
action_46 (8) = happyShift action_4
action_46 (9) = happyShift action_5
action_46 (15) = happyShift action_6
action_46 (19) = happyShift action_7
action_46 (22) = happyShift action_8
action_46 (23) = happyShift action_9
action_46 (28) = happyShift action_10
action_46 (30) = happyShift action_11
action_46 (33) = happyShift action_12
action_46 (36) = happyShift action_13
action_46 (37) = happyShift action_14
action_46 (4) = happyGoto action_47
action_46 _ = happyFail (happyExpListPerState 46)

action_47 (7) = happyShift action_2
action_47 (8) = happyShift action_4
action_47 (9) = happyShift action_5
action_47 (10) = happyShift action_25
action_47 (11) = happyShift action_26
action_47 (12) = happyShift action_27
action_47 (13) = happyShift action_28
action_47 (14) = happyShift action_29
action_47 (15) = happyShift action_6
action_47 (16) = happyShift action_30
action_47 (17) = happyShift action_31
action_47 (18) = happyShift action_32
action_47 (19) = happyShift action_7
action_47 (22) = happyShift action_8
action_47 (23) = happyShift action_9
action_47 (28) = happyShift action_10
action_47 (30) = happyShift action_11
action_47 (33) = happyShift action_12
action_47 (35) = happyShift action_57
action_47 (36) = happyShift action_13
action_47 (37) = happyShift action_14
action_47 (4) = happyGoto action_24
action_47 _ = happyFail (happyExpListPerState 47)

action_48 _ = happyReduce_22

action_49 (25) = happyShift action_56
action_49 _ = happyFail (happyExpListPerState 49)

action_50 _ = happyReduce_25

action_51 _ = happyReduce_24

action_52 (26) = happyShift action_50
action_52 (27) = happyShift action_51
action_52 (30) = happyShift action_52
action_52 (6) = happyGoto action_55
action_52 _ = happyFail (happyExpListPerState 52)

action_53 (7) = happyShift action_2
action_53 (8) = happyShift action_4
action_53 (9) = happyShift action_5
action_53 (10) = happyShift action_25
action_53 (11) = happyShift action_26
action_53 (12) = happyShift action_27
action_53 (13) = happyShift action_28
action_53 (14) = happyShift action_29
action_53 (15) = happyShift action_6
action_53 (16) = happyShift action_30
action_53 (17) = happyShift action_31
action_53 (18) = happyShift action_32
action_53 (19) = happyShift action_7
action_53 (21) = happyShift action_54
action_53 (22) = happyShift action_8
action_53 (23) = happyShift action_9
action_53 (28) = happyShift action_10
action_53 (30) = happyShift action_11
action_53 (33) = happyShift action_12
action_53 (36) = happyShift action_13
action_53 (37) = happyShift action_14
action_53 (4) = happyGoto action_24
action_53 _ = happyFail (happyExpListPerState 53)

action_54 (7) = happyShift action_2
action_54 (8) = happyShift action_4
action_54 (9) = happyShift action_5
action_54 (15) = happyShift action_6
action_54 (19) = happyShift action_7
action_54 (22) = happyShift action_8
action_54 (23) = happyShift action_9
action_54 (28) = happyShift action_10
action_54 (30) = happyShift action_11
action_54 (33) = happyShift action_12
action_54 (36) = happyShift action_13
action_54 (37) = happyShift action_14
action_54 (4) = happyGoto action_64
action_54 _ = happyFail (happyExpListPerState 54)

action_55 (25) = happyShift action_62
action_55 (31) = happyShift action_63
action_55 _ = happyFail (happyExpListPerState 55)

action_56 (7) = happyShift action_2
action_56 (8) = happyShift action_4
action_56 (9) = happyShift action_5
action_56 (15) = happyShift action_6
action_56 (19) = happyShift action_7
action_56 (22) = happyShift action_8
action_56 (23) = happyShift action_9
action_56 (26) = happyShift action_50
action_56 (27) = happyShift action_51
action_56 (28) = happyShift action_10
action_56 (30) = happyShift action_61
action_56 (33) = happyShift action_12
action_56 (36) = happyShift action_13
action_56 (37) = happyShift action_14
action_56 (4) = happyGoto action_59
action_56 (6) = happyGoto action_60
action_56 _ = happyFail (happyExpListPerState 56)

action_57 (7) = happyShift action_2
action_57 (8) = happyShift action_4
action_57 (9) = happyShift action_5
action_57 (15) = happyShift action_6
action_57 (19) = happyShift action_7
action_57 (22) = happyShift action_8
action_57 (23) = happyShift action_9
action_57 (28) = happyShift action_10
action_57 (30) = happyShift action_11
action_57 (33) = happyShift action_12
action_57 (36) = happyShift action_13
action_57 (37) = happyShift action_14
action_57 (4) = happyGoto action_58
action_57 _ = happyFail (happyExpListPerState 57)

action_58 (7) = happyShift action_2
action_58 (8) = happyShift action_4
action_58 (9) = happyShift action_5
action_58 (10) = happyShift action_25
action_58 (11) = happyShift action_26
action_58 (12) = happyShift action_27
action_58 (13) = happyShift action_28
action_58 (14) = happyShift action_29
action_58 (15) = happyShift action_6
action_58 (16) = happyShift action_30
action_58 (17) = happyShift action_31
action_58 (18) = happyShift action_32
action_58 (19) = happyShift action_7
action_58 (22) = happyShift action_8
action_58 (23) = happyShift action_9
action_58 (28) = happyShift action_10
action_58 (30) = happyShift action_11
action_58 (33) = happyShift action_12
action_58 (36) = happyShift action_13
action_58 (37) = happyShift action_14
action_58 (4) = happyGoto action_24
action_58 _ = happyReduce_18

action_59 (7) = happyShift action_2
action_59 (8) = happyShift action_4
action_59 (9) = happyShift action_5
action_59 (10) = happyShift action_25
action_59 (11) = happyShift action_26
action_59 (12) = happyShift action_27
action_59 (13) = happyShift action_28
action_59 (14) = happyShift action_29
action_59 (15) = happyShift action_6
action_59 (16) = happyShift action_30
action_59 (17) = happyShift action_31
action_59 (18) = happyShift action_32
action_59 (19) = happyShift action_7
action_59 (22) = happyShift action_8
action_59 (23) = happyShift action_9
action_59 (28) = happyShift action_10
action_59 (30) = happyShift action_11
action_59 (33) = happyShift action_12
action_59 (36) = happyShift action_13
action_59 (37) = happyShift action_14
action_59 (4) = happyGoto action_24
action_59 _ = happyReduce_15

action_60 (25) = happyShift action_62
action_60 _ = happyReduce_26

action_61 (7) = happyShift action_2
action_61 (8) = happyShift action_4
action_61 (9) = happyShift action_5
action_61 (15) = happyShift action_6
action_61 (19) = happyShift action_7
action_61 (22) = happyShift action_8
action_61 (23) = happyShift action_9
action_61 (26) = happyShift action_50
action_61 (27) = happyShift action_51
action_61 (28) = happyShift action_10
action_61 (30) = happyShift action_61
action_61 (33) = happyShift action_12
action_61 (36) = happyShift action_13
action_61 (37) = happyShift action_14
action_61 (4) = happyGoto action_18
action_61 (5) = happyGoto action_19
action_61 (6) = happyGoto action_55
action_61 _ = happyFail (happyExpListPerState 61)

action_62 (26) = happyShift action_50
action_62 (27) = happyShift action_51
action_62 (30) = happyShift action_52
action_62 (6) = happyGoto action_60
action_62 _ = happyFail (happyExpListPerState 62)

action_63 _ = happyReduce_27

action_64 (7) = happyShift action_2
action_64 (8) = happyShift action_4
action_64 (9) = happyShift action_5
action_64 (10) = happyShift action_25
action_64 (11) = happyShift action_26
action_64 (12) = happyShift action_27
action_64 (13) = happyShift action_28
action_64 (14) = happyShift action_29
action_64 (15) = happyShift action_6
action_64 (16) = happyShift action_30
action_64 (17) = happyShift action_31
action_64 (18) = happyShift action_32
action_64 (19) = happyFail []
action_64 (22) = happyShift action_8
action_64 (23) = happyShift action_9
action_64 (28) = happyShift action_10
action_64 (30) = happyShift action_11
action_64 (33) = happyShift action_12
action_64 (36) = happyShift action_13
action_64 (37) = happyShift action_14
action_64 (4) = happyGoto action_24
action_64 _ = happyReduce_13

happyReduce_1 = happySpecReduce_1  4 happyReduction_1
happyReduction_1 (HappyTerminal (TokenNum happy_var_1))
	 =  HappyAbsSyn4
		 (Num happy_var_1
	)
happyReduction_1 _  = notHappyAtAll 

happyReduce_2 = happySpecReduce_1  4 happyReduction_2
happyReduction_2 _
	 =  HappyAbsSyn4
		 (BTrue
	)

happyReduce_3 = happySpecReduce_1  4 happyReduction_3
happyReduction_3 _
	 =  HappyAbsSyn4
		 (BFalse
	)

happyReduce_4 = happySpecReduce_3  4 happyReduction_4
happyReduction_4 (HappyAbsSyn4  happy_var_3)
	_
	(HappyAbsSyn4  happy_var_1)
	 =  HappyAbsSyn4
		 (Add happy_var_1 happy_var_3
	)
happyReduction_4 _ _ _  = notHappyAtAll 

happyReduce_5 = happySpecReduce_3  4 happyReduction_5
happyReduction_5 (HappyAbsSyn4  happy_var_3)
	_
	(HappyAbsSyn4  happy_var_1)
	 =  HappyAbsSyn4
		 (Sub happy_var_1 happy_var_3
	)
happyReduction_5 _ _ _  = notHappyAtAll 

happyReduce_6 = happySpecReduce_3  4 happyReduction_6
happyReduction_6 (HappyAbsSyn4  happy_var_3)
	_
	(HappyAbsSyn4  happy_var_1)
	 =  HappyAbsSyn4
		 (Mul happy_var_1 happy_var_3
	)
happyReduction_6 _ _ _  = notHappyAtAll 

happyReduce_7 = happySpecReduce_3  4 happyReduction_7
happyReduction_7 (HappyAbsSyn4  happy_var_3)
	_
	(HappyAbsSyn4  happy_var_1)
	 =  HappyAbsSyn4
		 (And happy_var_1 happy_var_3
	)
happyReduction_7 _ _ _  = notHappyAtAll 

happyReduce_8 = happySpecReduce_3  4 happyReduction_8
happyReduction_8 (HappyAbsSyn4  happy_var_3)
	_
	(HappyAbsSyn4  happy_var_1)
	 =  HappyAbsSyn4
		 (Or happy_var_1 happy_var_3
	)
happyReduction_8 _ _ _  = notHappyAtAll 

happyReduce_9 = happySpecReduce_2  4 happyReduction_9
happyReduction_9 (HappyAbsSyn4  happy_var_2)
	_
	 =  HappyAbsSyn4
		 (Not happy_var_2
	)
happyReduction_9 _ _  = notHappyAtAll 

happyReduce_10 = happySpecReduce_3  4 happyReduction_10
happyReduction_10 (HappyAbsSyn4  happy_var_3)
	_
	(HappyAbsSyn4  happy_var_1)
	 =  HappyAbsSyn4
		 (Maior happy_var_1 happy_var_3
	)
happyReduction_10 _ _ _  = notHappyAtAll 

happyReduce_11 = happySpecReduce_3  4 happyReduction_11
happyReduction_11 (HappyAbsSyn4  happy_var_3)
	_
	(HappyAbsSyn4  happy_var_1)
	 =  HappyAbsSyn4
		 (MaiorIg happy_var_1 happy_var_3
	)
happyReduction_11 _ _ _  = notHappyAtAll 

happyReduce_12 = happySpecReduce_3  4 happyReduction_12
happyReduction_12 (HappyAbsSyn4  happy_var_3)
	_
	(HappyAbsSyn4  happy_var_1)
	 =  HappyAbsSyn4
		 (Igual happy_var_1 happy_var_3
	)
happyReduction_12 _ _ _  = notHappyAtAll 

happyReduce_13 = happyReduce 6 4 happyReduction_13
happyReduction_13 ((HappyAbsSyn4  happy_var_6) `HappyStk`
	_ `HappyStk`
	(HappyAbsSyn4  happy_var_4) `HappyStk`
	_ `HappyStk`
	(HappyAbsSyn4  happy_var_2) `HappyStk`
	_ `HappyStk`
	happyRest)
	 = HappyAbsSyn4
		 (If happy_var_2 happy_var_4 happy_var_6
	) `HappyStk` happyRest

happyReduce_14 = happySpecReduce_1  4 happyReduction_14
happyReduction_14 (HappyTerminal (TokenVar happy_var_1))
	 =  HappyAbsSyn4
		 (Var happy_var_1
	)
happyReduction_14 _  = notHappyAtAll 

happyReduce_15 = happyReduce 6 4 happyReduction_15
happyReduction_15 ((HappyAbsSyn4  happy_var_6) `HappyStk`
	_ `HappyStk`
	(HappyAbsSyn6  happy_var_4) `HappyStk`
	_ `HappyStk`
	(HappyTerminal (TokenVar happy_var_2)) `HappyStk`
	_ `HappyStk`
	happyRest)
	 = HappyAbsSyn4
		 (Lam happy_var_2 happy_var_4 happy_var_6
	) `HappyStk` happyRest

happyReduce_16 = happySpecReduce_2  4 happyReduction_16
happyReduction_16 (HappyAbsSyn4  happy_var_2)
	(HappyAbsSyn4  happy_var_1)
	 =  HappyAbsSyn4
		 (App happy_var_1 happy_var_2
	)
happyReduction_16 _ _  = notHappyAtAll 

happyReduce_17 = happySpecReduce_3  4 happyReduction_17
happyReduction_17 _
	(HappyAbsSyn4  happy_var_2)
	_
	 =  HappyAbsSyn4
		 (Paren happy_var_2
	)
happyReduction_17 _ _ _  = notHappyAtAll 

happyReduce_18 = happyReduce 6 4 happyReduction_18
happyReduction_18 ((HappyAbsSyn4  happy_var_6) `HappyStk`
	_ `HappyStk`
	(HappyAbsSyn4  happy_var_4) `HappyStk`
	_ `HappyStk`
	(HappyTerminal (TokenVar happy_var_2)) `HappyStk`
	_ `HappyStk`
	happyRest)
	 = HappyAbsSyn4
		 (Let happy_var_2 happy_var_4 happy_var_6
	) `HappyStk` happyRest

happyReduce_19 = happySpecReduce_3  4 happyReduction_19
happyReduction_19 _
	(HappyAbsSyn5  happy_var_2)
	_
	 =  HappyAbsSyn4
		 (happy_var_2
	)
happyReduction_19 _ _ _  = notHappyAtAll 

happyReduce_20 = happySpecReduce_2  4 happyReduction_20
happyReduction_20 (HappyAbsSyn4  happy_var_2)
	_
	 =  HappyAbsSyn4
		 (ListaCabeça happy_var_2
	)
happyReduction_20 _ _  = notHappyAtAll 

happyReduce_21 = happySpecReduce_2  4 happyReduction_21
happyReduction_21 (HappyAbsSyn4  happy_var_2)
	_
	 =  HappyAbsSyn4
		 (ListaCauda happy_var_2
	)
happyReduction_21 _ _  = notHappyAtAll 

happyReduce_22 = happySpecReduce_3  5 happyReduction_22
happyReduction_22 (HappyAbsSyn5  happy_var_3)
	_
	(HappyAbsSyn4  happy_var_1)
	 =  HappyAbsSyn5
		 (ListaSeparador happy_var_1 happy_var_3
	)
happyReduction_22 _ _ _  = notHappyAtAll 

happyReduce_23 = happySpecReduce_1  5 happyReduction_23
happyReduction_23 (HappyAbsSyn4  happy_var_1)
	 =  HappyAbsSyn5
		 (ListaSeparador happy_var_1 ListaVazia
	)
happyReduction_23 _  = notHappyAtAll 

happyReduce_24 = happySpecReduce_1  6 happyReduction_24
happyReduction_24 _
	 =  HappyAbsSyn6
		 (TBool
	)

happyReduce_25 = happySpecReduce_1  6 happyReduction_25
happyReduction_25 _
	 =  HappyAbsSyn6
		 (TNum
	)

happyReduce_26 = happySpecReduce_3  6 happyReduction_26
happyReduction_26 (HappyAbsSyn6  happy_var_3)
	_
	(HappyAbsSyn6  happy_var_1)
	 =  HappyAbsSyn6
		 (TFun happy_var_1 happy_var_3
	)
happyReduction_26 _ _ _  = notHappyAtAll 

happyReduce_27 = happySpecReduce_3  6 happyReduction_27
happyReduction_27 _
	(HappyAbsSyn6  happy_var_2)
	_
	 =  HappyAbsSyn6
		 (TLista happy_var_2
	)
happyReduction_27 _ _ _  = notHappyAtAll 

happyNewToken action sts stk [] =
	action 38 38 notHappyAtAll (HappyState action) sts stk []

happyNewToken action sts stk (tk:tks) =
	let cont i = action i i tk (HappyState action) sts stk tks in
	case tk of {
	TokenNum happy_dollar_dollar -> cont 7;
	TokenTrue -> cont 8;
	TokenFalse -> cont 9;
	TokenAdd -> cont 10;
	TokenSub -> cont 11;
	TokenMul -> cont 12;
	TokenAnd -> cont 13;
	TokenOr -> cont 14;
	TokenNot -> cont 15;
	TokenIgual -> cont 16;
	TokenMaiorIg -> cont 17;
	TokenMaior -> cont 18;
	TokenIf -> cont 19;
	TokenThen -> cont 20;
	TokenElse -> cont 21;
	TokenVar happy_dollar_dollar -> cont 22;
	TokenLam -> cont 23;
	TokenColon -> cont 24;
	TokenArrow -> cont 25;
	TokenTNum -> cont 26;
	TokenTBool -> cont 27;
	TokenLParen -> cont 28;
	TokenRParen -> cont 29;
	TokenLColchete -> cont 30;
	TokenRColchete -> cont 31;
	TokenListaSeparador -> cont 32;
	TokenLet -> cont 33;
	TokenAtrib -> cont 34;
	TokenIn -> cont 35;
	TokenListaCabeça -> cont 36;
	TokenListaCauda -> cont 37;
	_ -> happyError' ((tk:tks), [])
	}

happyError_ explist 38 tk tks = happyError' (tks, explist)
happyError_ explist _ tk tks = happyError' ((tk:tks), explist)

newtype HappyIdentity a = HappyIdentity a
happyIdentity = HappyIdentity
happyRunIdentity (HappyIdentity a) = a

instance Functor HappyIdentity where
    fmap f (HappyIdentity a) = HappyIdentity (f a)

instance Applicative HappyIdentity where
    pure  = HappyIdentity
    (<*>) = ap
instance Monad HappyIdentity where
    return = pure
    (HappyIdentity p) >>= q = q p

happyThen :: () => HappyIdentity a -> (a -> HappyIdentity b) -> HappyIdentity b
happyThen = (>>=)
happyReturn :: () => a -> HappyIdentity a
happyReturn = (return)
happyThen1 m k tks = (>>=) m (\a -> k a tks)
happyReturn1 :: () => a -> b -> HappyIdentity a
happyReturn1 = \a tks -> (return) a
happyError' :: () => ([(Token)], [String]) -> HappyIdentity a
happyError' = HappyIdentity . (\(tokens, _) -> parseError tokens)
parser tks = happyRunIdentity happySomeParser where
 happySomeParser = happyThen (happyParse action_0 tks) (\x -> case x of {HappyAbsSyn4 z -> happyReturn z; _other -> notHappyAtAll })

happySeq = happyDontSeq


parseError :: [Token] -> a 
parseError _ = error "Erro sintático!"
{-# LINE 1 "templates/GenericTemplate.hs" #-}
-- $Id: GenericTemplate.hs,v 1.26 2005/01/14 14:47:22 simonmar Exp $










































data Happy_IntList = HappyCons Int Happy_IntList








































infixr 9 `HappyStk`
data HappyStk a = HappyStk a (HappyStk a)

-----------------------------------------------------------------------------
-- starting the parse

happyParse start_state = happyNewToken start_state notHappyAtAll notHappyAtAll

-----------------------------------------------------------------------------
-- Accepting the parse

-- If the current token is ERROR_TOK, it means we've just accepted a partial
-- parse (a %partial parser).  We must ignore the saved token on the top of
-- the stack in this case.
happyAccept (1) tk st sts (_ `HappyStk` ans `HappyStk` _) =
        happyReturn1 ans
happyAccept j tk st sts (HappyStk ans _) = 
         (happyReturn1 ans)

-----------------------------------------------------------------------------
-- Arrays only: do the next action









































indexShortOffAddr arr off = arr Happy_Data_Array.! off


{-# INLINE happyLt #-}
happyLt x y = (x < y)






readArrayBit arr bit =
    Bits.testBit (indexShortOffAddr arr (bit `div` 16)) (bit `mod` 16)






-----------------------------------------------------------------------------
-- HappyState data type (not arrays)



newtype HappyState b c = HappyState
        (Int ->                    -- token number
         Int ->                    -- token number (yes, again)
         b ->                           -- token semantic value
         HappyState b c ->              -- current state
         [HappyState b c] ->            -- state stack
         c)



-----------------------------------------------------------------------------
-- Shifting a token

happyShift new_state (1) tk st sts stk@(x `HappyStk` _) =
     let i = (case x of { HappyErrorToken (i) -> i }) in
--     trace "shifting the error token" $
     new_state i i tk (HappyState (new_state)) ((st):(sts)) (stk)

happyShift new_state i tk st sts stk =
     happyNewToken new_state ((st):(sts)) ((HappyTerminal (tk))`HappyStk`stk)

-- happyReduce is specialised for the common cases.

happySpecReduce_0 i fn (1) tk st sts stk
     = happyFail [] (1) tk st sts stk
happySpecReduce_0 nt fn j tk st@((HappyState (action))) sts stk
     = action nt j tk st ((st):(sts)) (fn `HappyStk` stk)

happySpecReduce_1 i fn (1) tk st sts stk
     = happyFail [] (1) tk st sts stk
happySpecReduce_1 nt fn j tk _ sts@(((st@(HappyState (action))):(_))) (v1`HappyStk`stk')
     = let r = fn v1 in
       happySeq r (action nt j tk st sts (r `HappyStk` stk'))

happySpecReduce_2 i fn (1) tk st sts stk
     = happyFail [] (1) tk st sts stk
happySpecReduce_2 nt fn j tk _ ((_):(sts@(((st@(HappyState (action))):(_))))) (v1`HappyStk`v2`HappyStk`stk')
     = let r = fn v1 v2 in
       happySeq r (action nt j tk st sts (r `HappyStk` stk'))

happySpecReduce_3 i fn (1) tk st sts stk
     = happyFail [] (1) tk st sts stk
happySpecReduce_3 nt fn j tk _ ((_):(((_):(sts@(((st@(HappyState (action))):(_))))))) (v1`HappyStk`v2`HappyStk`v3`HappyStk`stk')
     = let r = fn v1 v2 v3 in
       happySeq r (action nt j tk st sts (r `HappyStk` stk'))

happyReduce k i fn (1) tk st sts stk
     = happyFail [] (1) tk st sts stk
happyReduce k nt fn j tk st sts stk
     = case happyDrop (k - ((1) :: Int)) sts of
         sts1@(((st1@(HappyState (action))):(_))) ->
                let r = fn stk in  -- it doesn't hurt to always seq here...
                happyDoSeq r (action nt j tk st1 sts1 r)

happyMonadReduce k nt fn (1) tk st sts stk
     = happyFail [] (1) tk st sts stk
happyMonadReduce k nt fn j tk st sts stk =
      case happyDrop k ((st):(sts)) of
        sts1@(((st1@(HappyState (action))):(_))) ->
          let drop_stk = happyDropStk k stk in
          happyThen1 (fn stk tk) (\r -> action nt j tk st1 sts1 (r `HappyStk` drop_stk))

happyMonad2Reduce k nt fn (1) tk st sts stk
     = happyFail [] (1) tk st sts stk
happyMonad2Reduce k nt fn j tk st sts stk =
      case happyDrop k ((st):(sts)) of
        sts1@(((st1@(HappyState (action))):(_))) ->
         let drop_stk = happyDropStk k stk





             _ = nt :: Int
             new_state = action

          in
          happyThen1 (fn stk tk) (\r -> happyNewToken new_state sts1 (r `HappyStk` drop_stk))

happyDrop (0) l = l
happyDrop n ((_):(t)) = happyDrop (n - ((1) :: Int)) t

happyDropStk (0) l = l
happyDropStk n (x `HappyStk` xs) = happyDropStk (n - ((1)::Int)) xs

-----------------------------------------------------------------------------
-- Moving to a new state after a reduction









happyGoto action j tk st = action j j tk (HappyState action)


-----------------------------------------------------------------------------
-- Error recovery (ERROR_TOK is the error token)

-- parse error if we are in recovery and we fail again
happyFail explist (1) tk old_st _ stk@(x `HappyStk` _) =
     let i = (case x of { HappyErrorToken (i) -> i }) in
--      trace "failing" $ 
        happyError_ explist i tk

{-  We don't need state discarding for our restricted implementation of
    "error".  In fact, it can cause some bogus parses, so I've disabled it
    for now --SDM

-- discard a state
happyFail  ERROR_TOK tk old_st CONS(HAPPYSTATE(action),sts) 
                                                (saved_tok `HappyStk` _ `HappyStk` stk) =
--      trace ("discarding state, depth " ++ show (length stk))  $
        DO_ACTION(action,ERROR_TOK,tk,sts,(saved_tok`HappyStk`stk))
-}

-- Enter error recovery: generate an error token,
--                       save the old token and carry on.
happyFail explist i tk (HappyState (action)) sts stk =
--      trace "entering error recovery" $
        action (1) (1) tk (HappyState (action)) sts ((HappyErrorToken (i)) `HappyStk` stk)

-- Internal happy errors:

notHappyAtAll :: a
notHappyAtAll = error "Internal Happy error\n"

-----------------------------------------------------------------------------
-- Hack to get the typechecker to accept our action functions







-----------------------------------------------------------------------------
-- Seq-ing.  If the --strict flag is given, then Happy emits 
--      happySeq = happyDoSeq
-- otherwise it emits
--      happySeq = happyDontSeq

happyDoSeq, happyDontSeq :: a -> b -> b
happyDoSeq   a b = a `seq` b
happyDontSeq a b = b

-----------------------------------------------------------------------------
-- Don't inline any functions from the template.  GHC has a nasty habit
-- of deciding to inline happyGoto everywhere, which increases the size of
-- the generated parser quite a bit.









{-# NOINLINE happyShift #-}
{-# NOINLINE happySpecReduce_0 #-}
{-# NOINLINE happySpecReduce_1 #-}
{-# NOINLINE happySpecReduce_2 #-}
{-# NOINLINE happySpecReduce_3 #-}
{-# NOINLINE happyReduce #-}
{-# NOINLINE happyMonadReduce #-}
{-# NOINLINE happyGoto #-}
{-# NOINLINE happyFail #-}

-- end of Happy Template.
