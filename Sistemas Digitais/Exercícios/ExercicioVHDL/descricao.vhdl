library ieee;
use ieee.std_logic_1164.all;

entity Componente1 is
    port(
        a, b, c: in std_logic;
        d, e, f: out std_logic
    );
end Componente1;

architecture behav_componente1 of Componente1 is

    signal x, y, z, notb, notc: std_logic;

    begin
        --inverte entradas
        notb <= not b;
        notc <= not c;

        --passa pelo primeiro nivel de portas
        x <= not (a OR notb);
        y <= not (notb AND notc);
        z <= notb AND notc;

        --passa pelo segundo nivel de portas
        d <= x XOR (not y);
        e <= y OR notb;
        f <= y XOR z;
end behav_componente1;

library ieee;
use ieee.std_logic_1164.all;

entity Componente2 is
    port(
        a, b, c: in std_logic;
        d, e: out std_logic
    );
end Componente2;

architecture behav_componente2 of Componente2 is

    signal x, y, z, w: std_logic;

    begin
        x <= (not a) AND b;
        y <= (not a) AND c;
        z <= b AND c;
        w <= a XOR b;

        d <= x OR y OR z;
        e <= w XOR c;
end behav_componente2;
