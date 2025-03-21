fat 0 = 1
fat n = n * fat (n - 1)


let l = [[], [1,2]]

--2
null l || null (head l)

--3
not (null l) && null (tail l)

--4
let l = ["ab", "cde"]
head l ++ head (tail l)