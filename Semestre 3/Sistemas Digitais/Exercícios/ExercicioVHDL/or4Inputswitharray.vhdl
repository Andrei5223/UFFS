library ieee;
use ieee.std_logic_1164.all;

entity OR4 is
    port(
        a: in std_logic_vector(3 downto 0);
        s: out std_logic
    );
end OR4;

architecture behav_OR of OR4 is
    begin
        s <= a(0) OR a(1) OR a(2) OR a(3);
end behav_OR;
