{-# OPTIONS_GHC -w #-}
module Parser where 

import Lexer
import qualified Data.Array as Happy_Data_Array
import qualified Data.Bits as Bits
import Control.Applicative(Applicative(..))
import Control.Monad (ap)

-- parser produced by Happy Version 1.19.12

data HappyAbsSyn t4 t5
	= HappyTerminal (Token)
	| HappyErrorToken Int
	| HappyAbsSyn4 t4
	| HappyAbsSyn5 t5

happyExpList :: Happy_Data_Array.Array Int Int
happyExpList = Happy_Data_Array.listArray (0,326) ([8416,5170,32,0,0,0,65504,5171,0,0,0,0,8416,5170,8416,5170,0,0,0,16,8416,5170,0,16,0,8192,65504,7219,0,64,65504,5175,0,0,0,0,8416,5170,8416,5170,8416,5170,8416,5170,8416,5170,8416,5170,8416,5170,8416,5170,1792,0,0,0,1792,0,20224,1,18176,1,0,0,1024,0,1024,0,8416,5170,0,768,0,0,8416,5170,65504,21555,0,128,0,0,0,0,65504,5179,8416,5170,8416,5938,8416,5170,0,0,0,0,0,0,24320,1,0,768,0
	])

{-# NOINLINE happyExpListPerState #-}
happyExpListPerState st =
    token_strs_expected
  where token_strs = ["error","%dummy","%start_parser","Exp","Type","num","true","false","'+'","'-'","'*'","\"&&\"","\"||\"","'!'","\"==\"","'>='","'>'","if","then","else","var","'\\\\'","':'","\"->\"","Number","Boolean","'('","')'","let","'='","in","%eof"]
        bit_start = st * 32
        bit_end = (st + 1) * 32
        read_bit = readArrayBit happyExpList
        bits = map read_bit [bit_start..bit_end - 1]
        bits_indexed = zip bits [0..31]
        token_strs_expected = concatMap f bits_indexed
        f (False, _) = []
        f (True, nr) = [token_strs !! nr]

action_0 (6) = happyShift action_2
action_0 (7) = happyShift action_4
action_0 (8) = happyShift action_5
action_0 (14) = happyShift action_6
action_0 (18) = happyShift action_7
action_0 (21) = happyShift action_8
action_0 (22) = happyShift action_9
action_0 (27) = happyShift action_10
action_0 (29) = happyShift action_11
action_0 (4) = happyGoto action_3
action_0 _ = happyFail (happyExpListPerState 0)

action_1 (6) = happyShift action_2
action_1 _ = happyFail (happyExpListPerState 1)

action_2 _ = happyReduce_1

action_3 (6) = happyShift action_2
action_3 (7) = happyShift action_4
action_3 (8) = happyShift action_5
action_3 (9) = happyShift action_18
action_3 (10) = happyShift action_19
action_3 (11) = happyShift action_20
action_3 (12) = happyShift action_21
action_3 (13) = happyShift action_22
action_3 (14) = happyShift action_6
action_3 (15) = happyShift action_23
action_3 (16) = happyShift action_24
action_3 (17) = happyShift action_25
action_3 (18) = happyShift action_7
action_3 (21) = happyShift action_8
action_3 (22) = happyShift action_9
action_3 (27) = happyShift action_10
action_3 (29) = happyShift action_11
action_3 (32) = happyAccept
action_3 (4) = happyGoto action_17
action_3 _ = happyFail (happyExpListPerState 3)

action_4 _ = happyReduce_2

action_5 _ = happyReduce_3

action_6 (6) = happyShift action_2
action_6 (7) = happyShift action_4
action_6 (8) = happyShift action_5
action_6 (14) = happyShift action_6
action_6 (18) = happyShift action_7
action_6 (21) = happyShift action_8
action_6 (22) = happyShift action_9
action_6 (27) = happyShift action_10
action_6 (29) = happyShift action_11
action_6 (4) = happyGoto action_16
action_6 _ = happyFail (happyExpListPerState 6)

action_7 (6) = happyShift action_2
action_7 (7) = happyShift action_4
action_7 (8) = happyShift action_5
action_7 (14) = happyShift action_6
action_7 (18) = happyShift action_7
action_7 (21) = happyShift action_8
action_7 (22) = happyShift action_9
action_7 (27) = happyShift action_10
action_7 (29) = happyShift action_11
action_7 (4) = happyGoto action_15
action_7 _ = happyFail (happyExpListPerState 7)

action_8 _ = happyReduce_14

action_9 (21) = happyShift action_14
action_9 _ = happyFail (happyExpListPerState 9)

action_10 (6) = happyShift action_2
action_10 (7) = happyShift action_4
action_10 (8) = happyShift action_5
action_10 (14) = happyShift action_6
action_10 (18) = happyShift action_7
action_10 (21) = happyShift action_8
action_10 (22) = happyShift action_9
action_10 (27) = happyShift action_10
action_10 (29) = happyShift action_11
action_10 (4) = happyGoto action_13
action_10 _ = happyFail (happyExpListPerState 10)

action_11 (21) = happyShift action_12
action_11 _ = happyFail (happyExpListPerState 11)

action_12 (30) = happyShift action_37
action_12 _ = happyFail (happyExpListPerState 12)

action_13 (6) = happyShift action_2
action_13 (7) = happyShift action_4
action_13 (8) = happyShift action_5
action_13 (9) = happyShift action_18
action_13 (10) = happyShift action_19
action_13 (11) = happyShift action_20
action_13 (12) = happyShift action_21
action_13 (13) = happyShift action_22
action_13 (14) = happyShift action_6
action_13 (15) = happyShift action_23
action_13 (16) = happyShift action_24
action_13 (17) = happyShift action_25
action_13 (18) = happyShift action_7
action_13 (21) = happyShift action_8
action_13 (22) = happyShift action_9
action_13 (27) = happyShift action_10
action_13 (28) = happyShift action_36
action_13 (29) = happyShift action_11
action_13 (4) = happyGoto action_17
action_13 _ = happyFail (happyExpListPerState 13)

action_14 (23) = happyShift action_35
action_14 _ = happyFail (happyExpListPerState 14)

action_15 (6) = happyShift action_2
action_15 (7) = happyShift action_4
action_15 (8) = happyShift action_5
action_15 (9) = happyShift action_18
action_15 (10) = happyShift action_19
action_15 (11) = happyShift action_20
action_15 (12) = happyShift action_21
action_15 (13) = happyShift action_22
action_15 (14) = happyShift action_6
action_15 (15) = happyShift action_23
action_15 (16) = happyShift action_24
action_15 (17) = happyShift action_25
action_15 (18) = happyShift action_7
action_15 (19) = happyShift action_34
action_15 (21) = happyShift action_8
action_15 (22) = happyShift action_9
action_15 (27) = happyShift action_10
action_15 (29) = happyShift action_11
action_15 (4) = happyGoto action_17
action_15 _ = happyFail (happyExpListPerState 15)

action_16 (6) = happyShift action_2
action_16 (7) = happyShift action_4
action_16 (8) = happyShift action_5
action_16 (9) = happyShift action_18
action_16 (10) = happyShift action_19
action_16 (11) = happyShift action_20
action_16 (12) = happyShift action_21
action_16 (13) = happyShift action_22
action_16 (14) = happyShift action_6
action_16 (15) = happyShift action_23
action_16 (16) = happyShift action_24
action_16 (17) = happyShift action_25
action_16 (18) = happyShift action_7
action_16 (21) = happyShift action_8
action_16 (22) = happyShift action_9
action_16 (27) = happyShift action_10
action_16 (29) = happyShift action_11
action_16 (4) = happyGoto action_17
action_16 _ = happyReduce_9

action_17 (6) = happyShift action_2
action_17 (7) = happyShift action_4
action_17 (8) = happyShift action_5
action_17 (9) = happyShift action_18
action_17 (10) = happyShift action_19
action_17 (11) = happyShift action_20
action_17 (12) = happyShift action_21
action_17 (13) = happyShift action_22
action_17 (14) = happyShift action_6
action_17 (15) = happyShift action_23
action_17 (16) = happyShift action_24
action_17 (17) = happyShift action_25
action_17 (18) = happyShift action_7
action_17 (21) = happyShift action_8
action_17 (22) = happyShift action_9
action_17 (27) = happyShift action_10
action_17 (29) = happyShift action_11
action_17 (4) = happyGoto action_17
action_17 _ = happyReduce_16

action_18 (6) = happyShift action_2
action_18 (7) = happyShift action_4
action_18 (8) = happyShift action_5
action_18 (14) = happyShift action_6
action_18 (18) = happyShift action_7
action_18 (21) = happyShift action_8
action_18 (22) = happyShift action_9
action_18 (27) = happyShift action_10
action_18 (29) = happyShift action_11
action_18 (4) = happyGoto action_33
action_18 _ = happyFail (happyExpListPerState 18)

action_19 (6) = happyShift action_2
action_19 (7) = happyShift action_4
action_19 (8) = happyShift action_5
action_19 (14) = happyShift action_6
action_19 (18) = happyShift action_7
action_19 (21) = happyShift action_8
action_19 (22) = happyShift action_9
action_19 (27) = happyShift action_10
action_19 (29) = happyShift action_11
action_19 (4) = happyGoto action_32
action_19 _ = happyFail (happyExpListPerState 19)

action_20 (6) = happyShift action_2
action_20 (7) = happyShift action_4
action_20 (8) = happyShift action_5
action_20 (14) = happyShift action_6
action_20 (18) = happyShift action_7
action_20 (21) = happyShift action_8
action_20 (22) = happyShift action_9
action_20 (27) = happyShift action_10
action_20 (29) = happyShift action_11
action_20 (4) = happyGoto action_31
action_20 _ = happyFail (happyExpListPerState 20)

action_21 (6) = happyShift action_2
action_21 (7) = happyShift action_4
action_21 (8) = happyShift action_5
action_21 (14) = happyShift action_6
action_21 (18) = happyShift action_7
action_21 (21) = happyShift action_8
action_21 (22) = happyShift action_9
action_21 (27) = happyShift action_10
action_21 (29) = happyShift action_11
action_21 (4) = happyGoto action_30
action_21 _ = happyFail (happyExpListPerState 21)

action_22 (6) = happyShift action_2
action_22 (7) = happyShift action_4
action_22 (8) = happyShift action_5
action_22 (14) = happyShift action_6
action_22 (18) = happyShift action_7
action_22 (21) = happyShift action_8
action_22 (22) = happyShift action_9
action_22 (27) = happyShift action_10
action_22 (29) = happyShift action_11
action_22 (4) = happyGoto action_29
action_22 _ = happyFail (happyExpListPerState 22)

action_23 (6) = happyShift action_2
action_23 (7) = happyShift action_4
action_23 (8) = happyShift action_5
action_23 (14) = happyShift action_6
action_23 (18) = happyShift action_7
action_23 (21) = happyShift action_8
action_23 (22) = happyShift action_9
action_23 (27) = happyShift action_10
action_23 (29) = happyShift action_11
action_23 (4) = happyGoto action_28
action_23 _ = happyFail (happyExpListPerState 23)

action_24 (6) = happyShift action_2
action_24 (7) = happyShift action_4
action_24 (8) = happyShift action_5
action_24 (14) = happyShift action_6
action_24 (18) = happyShift action_7
action_24 (21) = happyShift action_8
action_24 (22) = happyShift action_9
action_24 (27) = happyShift action_10
action_24 (29) = happyShift action_11
action_24 (4) = happyGoto action_27
action_24 _ = happyFail (happyExpListPerState 24)

action_25 (6) = happyShift action_2
action_25 (7) = happyShift action_4
action_25 (8) = happyShift action_5
action_25 (14) = happyShift action_6
action_25 (18) = happyShift action_7
action_25 (21) = happyShift action_8
action_25 (22) = happyShift action_9
action_25 (27) = happyShift action_10
action_25 (29) = happyShift action_11
action_25 (4) = happyGoto action_26
action_25 _ = happyFail (happyExpListPerState 25)

action_26 (6) = happyShift action_2
action_26 (7) = happyShift action_4
action_26 (8) = happyShift action_5
action_26 (9) = happyShift action_18
action_26 (10) = happyShift action_19
action_26 (11) = happyShift action_20
action_26 (14) = happyShift action_6
action_26 (15) = happyFail []
action_26 (16) = happyShift action_24
action_26 (17) = happyFail []
action_26 (21) = happyShift action_8
action_26 (22) = happyShift action_9
action_26 (27) = happyShift action_10
action_26 (29) = happyShift action_11
action_26 (4) = happyGoto action_17
action_26 _ = happyReduce_10

action_27 (6) = happyShift action_2
action_27 (7) = happyShift action_4
action_27 (8) = happyShift action_5
action_27 (9) = happyShift action_18
action_27 (10) = happyShift action_19
action_27 (11) = happyShift action_20
action_27 (12) = happyShift action_21
action_27 (13) = happyShift action_22
action_27 (14) = happyShift action_6
action_27 (15) = happyShift action_23
action_27 (16) = happyShift action_24
action_27 (17) = happyShift action_25
action_27 (18) = happyShift action_7
action_27 (21) = happyShift action_8
action_27 (22) = happyShift action_9
action_27 (27) = happyShift action_10
action_27 (29) = happyShift action_11
action_27 (4) = happyGoto action_17
action_27 _ = happyReduce_11

action_28 (6) = happyShift action_2
action_28 (7) = happyShift action_4
action_28 (8) = happyShift action_5
action_28 (9) = happyShift action_18
action_28 (10) = happyShift action_19
action_28 (11) = happyShift action_20
action_28 (14) = happyShift action_6
action_28 (15) = happyFail []
action_28 (16) = happyShift action_24
action_28 (17) = happyFail []
action_28 (21) = happyShift action_8
action_28 (22) = happyShift action_9
action_28 (27) = happyShift action_10
action_28 (29) = happyShift action_11
action_28 (4) = happyGoto action_17
action_28 _ = happyReduce_12

action_29 (6) = happyShift action_2
action_29 (7) = happyShift action_4
action_29 (8) = happyShift action_5
action_29 (9) = happyShift action_18
action_29 (10) = happyShift action_19
action_29 (11) = happyShift action_20
action_29 (12) = happyShift action_21
action_29 (14) = happyShift action_6
action_29 (15) = happyShift action_23
action_29 (16) = happyShift action_24
action_29 (17) = happyShift action_25
action_29 (21) = happyShift action_8
action_29 (22) = happyShift action_9
action_29 (27) = happyShift action_10
action_29 (29) = happyShift action_11
action_29 (4) = happyGoto action_17
action_29 _ = happyReduce_8

action_30 (6) = happyShift action_2
action_30 (7) = happyShift action_4
action_30 (8) = happyShift action_5
action_30 (9) = happyShift action_18
action_30 (10) = happyShift action_19
action_30 (11) = happyShift action_20
action_30 (14) = happyShift action_6
action_30 (15) = happyShift action_23
action_30 (16) = happyShift action_24
action_30 (17) = happyShift action_25
action_30 (21) = happyShift action_8
action_30 (22) = happyShift action_9
action_30 (27) = happyShift action_10
action_30 (29) = happyShift action_11
action_30 (4) = happyGoto action_17
action_30 _ = happyReduce_7

action_31 (6) = happyShift action_2
action_31 (7) = happyShift action_4
action_31 (8) = happyShift action_5
action_31 (14) = happyShift action_6
action_31 (16) = happyShift action_24
action_31 (21) = happyShift action_8
action_31 (22) = happyShift action_9
action_31 (27) = happyShift action_10
action_31 (29) = happyShift action_11
action_31 (4) = happyGoto action_17
action_31 _ = happyReduce_6

action_32 (6) = happyShift action_2
action_32 (7) = happyShift action_4
action_32 (8) = happyShift action_5
action_32 (11) = happyShift action_20
action_32 (14) = happyShift action_6
action_32 (16) = happyShift action_24
action_32 (21) = happyShift action_8
action_32 (22) = happyShift action_9
action_32 (27) = happyShift action_10
action_32 (29) = happyShift action_11
action_32 (4) = happyGoto action_17
action_32 _ = happyReduce_5

action_33 (6) = happyShift action_2
action_33 (7) = happyShift action_4
action_33 (8) = happyShift action_5
action_33 (11) = happyShift action_20
action_33 (14) = happyShift action_6
action_33 (16) = happyShift action_24
action_33 (21) = happyShift action_8
action_33 (22) = happyShift action_9
action_33 (27) = happyShift action_10
action_33 (29) = happyShift action_11
action_33 (4) = happyGoto action_17
action_33 _ = happyReduce_4

action_34 (6) = happyShift action_2
action_34 (7) = happyShift action_4
action_34 (8) = happyShift action_5
action_34 (14) = happyShift action_6
action_34 (18) = happyShift action_7
action_34 (21) = happyShift action_8
action_34 (22) = happyShift action_9
action_34 (27) = happyShift action_10
action_34 (29) = happyShift action_11
action_34 (4) = happyGoto action_42
action_34 _ = happyFail (happyExpListPerState 34)

action_35 (25) = happyShift action_40
action_35 (26) = happyShift action_41
action_35 (5) = happyGoto action_39
action_35 _ = happyFail (happyExpListPerState 35)

action_36 _ = happyReduce_17

action_37 (6) = happyShift action_2
action_37 (7) = happyShift action_4
action_37 (8) = happyShift action_5
action_37 (14) = happyShift action_6
action_37 (18) = happyShift action_7
action_37 (21) = happyShift action_8
action_37 (22) = happyShift action_9
action_37 (27) = happyShift action_10
action_37 (29) = happyShift action_11
action_37 (4) = happyGoto action_38
action_37 _ = happyFail (happyExpListPerState 37)

action_38 (6) = happyShift action_2
action_38 (7) = happyShift action_4
action_38 (8) = happyShift action_5
action_38 (9) = happyShift action_18
action_38 (10) = happyShift action_19
action_38 (11) = happyShift action_20
action_38 (12) = happyShift action_21
action_38 (13) = happyShift action_22
action_38 (14) = happyShift action_6
action_38 (15) = happyShift action_23
action_38 (16) = happyShift action_24
action_38 (17) = happyShift action_25
action_38 (18) = happyShift action_7
action_38 (21) = happyShift action_8
action_38 (22) = happyShift action_9
action_38 (27) = happyShift action_10
action_38 (29) = happyShift action_11
action_38 (31) = happyShift action_45
action_38 (4) = happyGoto action_17
action_38 _ = happyFail (happyExpListPerState 38)

action_39 (24) = happyShift action_44
action_39 _ = happyFail (happyExpListPerState 39)

action_40 _ = happyReduce_20

action_41 _ = happyReduce_19

action_42 (6) = happyShift action_2
action_42 (7) = happyShift action_4
action_42 (8) = happyShift action_5
action_42 (9) = happyShift action_18
action_42 (10) = happyShift action_19
action_42 (11) = happyShift action_20
action_42 (12) = happyShift action_21
action_42 (13) = happyShift action_22
action_42 (14) = happyShift action_6
action_42 (15) = happyShift action_23
action_42 (16) = happyShift action_24
action_42 (17) = happyShift action_25
action_42 (18) = happyShift action_7
action_42 (20) = happyShift action_43
action_42 (21) = happyShift action_8
action_42 (22) = happyShift action_9
action_42 (27) = happyShift action_10
action_42 (29) = happyShift action_11
action_42 (4) = happyGoto action_17
action_42 _ = happyFail (happyExpListPerState 42)

action_43 (6) = happyShift action_2
action_43 (7) = happyShift action_4
action_43 (8) = happyShift action_5
action_43 (14) = happyShift action_6
action_43 (18) = happyShift action_7
action_43 (21) = happyShift action_8
action_43 (22) = happyShift action_9
action_43 (27) = happyShift action_10
action_43 (29) = happyShift action_11
action_43 (4) = happyGoto action_49
action_43 _ = happyFail (happyExpListPerState 43)

action_44 (6) = happyShift action_2
action_44 (7) = happyShift action_4
action_44 (8) = happyShift action_5
action_44 (14) = happyShift action_6
action_44 (18) = happyShift action_7
action_44 (21) = happyShift action_8
action_44 (22) = happyShift action_9
action_44 (25) = happyShift action_40
action_44 (26) = happyShift action_41
action_44 (27) = happyShift action_10
action_44 (29) = happyShift action_11
action_44 (4) = happyGoto action_47
action_44 (5) = happyGoto action_48
action_44 _ = happyFail (happyExpListPerState 44)

action_45 (6) = happyShift action_2
action_45 (7) = happyShift action_4
action_45 (8) = happyShift action_5
action_45 (14) = happyShift action_6
action_45 (18) = happyShift action_7
action_45 (21) = happyShift action_8
action_45 (22) = happyShift action_9
action_45 (27) = happyShift action_10
action_45 (29) = happyShift action_11
action_45 (4) = happyGoto action_46
action_45 _ = happyFail (happyExpListPerState 45)

action_46 (6) = happyShift action_2
action_46 (7) = happyShift action_4
action_46 (8) = happyShift action_5
action_46 (9) = happyShift action_18
action_46 (10) = happyShift action_19
action_46 (11) = happyShift action_20
action_46 (12) = happyShift action_21
action_46 (13) = happyShift action_22
action_46 (14) = happyShift action_6
action_46 (15) = happyShift action_23
action_46 (16) = happyShift action_24
action_46 (17) = happyShift action_25
action_46 (18) = happyShift action_7
action_46 (21) = happyShift action_8
action_46 (22) = happyShift action_9
action_46 (27) = happyShift action_10
action_46 (29) = happyShift action_11
action_46 (4) = happyGoto action_17
action_46 _ = happyReduce_18

action_47 (6) = happyShift action_2
action_47 (7) = happyShift action_4
action_47 (8) = happyShift action_5
action_47 (9) = happyShift action_18
action_47 (10) = happyShift action_19
action_47 (11) = happyShift action_20
action_47 (12) = happyShift action_21
action_47 (13) = happyShift action_22
action_47 (14) = happyShift action_6
action_47 (15) = happyShift action_23
action_47 (16) = happyShift action_24
action_47 (17) = happyShift action_25
action_47 (18) = happyShift action_7
action_47 (21) = happyShift action_8
action_47 (22) = happyShift action_9
action_47 (27) = happyShift action_10
action_47 (29) = happyShift action_11
action_47 (4) = happyGoto action_17
action_47 _ = happyReduce_15

action_48 (24) = happyShift action_50
action_48 _ = happyFail (happyExpListPerState 48)

action_49 (6) = happyShift action_2
action_49 (7) = happyShift action_4
action_49 (8) = happyShift action_5
action_49 (9) = happyShift action_18
action_49 (10) = happyShift action_19
action_49 (11) = happyShift action_20
action_49 (12) = happyShift action_21
action_49 (13) = happyShift action_22
action_49 (14) = happyShift action_6
action_49 (15) = happyShift action_23
action_49 (16) = happyShift action_24
action_49 (17) = happyShift action_25
action_49 (18) = happyFail []
action_49 (21) = happyShift action_8
action_49 (22) = happyShift action_9
action_49 (27) = happyShift action_10
action_49 (29) = happyShift action_11
action_49 (4) = happyGoto action_17
action_49 _ = happyReduce_13

action_50 (25) = happyShift action_40
action_50 (26) = happyShift action_41
action_50 (5) = happyGoto action_48
action_50 _ = happyFail (happyExpListPerState 50)

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
	(HappyAbsSyn5  happy_var_4) `HappyStk`
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

happyReduce_19 = happySpecReduce_1  5 happyReduction_19
happyReduction_19 _
	 =  HappyAbsSyn5
		 (TBool
	)

happyReduce_20 = happySpecReduce_1  5 happyReduction_20
happyReduction_20 _
	 =  HappyAbsSyn5
		 (TNum
	)

happyReduce_21 = happySpecReduce_3  5 happyReduction_21
happyReduction_21 (HappyAbsSyn5  happy_var_3)
	_
	(HappyAbsSyn5  happy_var_1)
	 =  HappyAbsSyn5
		 (TFun happy_var_1 happy_var_3
	)
happyReduction_21 _ _ _  = notHappyAtAll 

happyNewToken action sts stk [] =
	action 32 32 notHappyAtAll (HappyState action) sts stk []

happyNewToken action sts stk (tk:tks) =
	let cont i = action i i tk (HappyState action) sts stk tks in
	case tk of {
	TokenNum happy_dollar_dollar -> cont 6;
	TokenTrue -> cont 7;
	TokenFalse -> cont 8;
	TokenAdd -> cont 9;
	TokenSub -> cont 10;
	TokenMul -> cont 11;
	TokenAnd -> cont 12;
	TokenOr -> cont 13;
	TokenNot -> cont 14;
	TokenIgual -> cont 15;
	TokenMaiorIg -> cont 16;
	TokenMaior -> cont 17;
	TokenIf -> cont 18;
	TokenThen -> cont 19;
	TokenElse -> cont 20;
	TokenVar happy_dollar_dollar -> cont 21;
	TokenLam -> cont 22;
	TokenColon -> cont 23;
	TokenArrow -> cont 24;
	TokenTNum -> cont 25;
	TokenTBool -> cont 26;
	TokenLParen -> cont 27;
	TokenRParen -> cont 28;
	TokenLet -> cont 29;
	TokenAtrib -> cont 30;
	TokenIn -> cont 31;
	_ -> happyError' ((tk:tks), [])
	}

happyError_ explist 32 tk tks = happyError' (tks, explist)
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
