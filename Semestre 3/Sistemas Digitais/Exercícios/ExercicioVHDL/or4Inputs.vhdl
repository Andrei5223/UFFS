library ieee;
use ieee.std_logic_1164.all;

entity OR4 is
    port(
        a, b, c, d: in std_logic;
        s: out std_logic
    );
end OR4;

architecture behav_OR of OR4 is
    begin
        s <= a OR b OR c OR d;
end behav_OR;
