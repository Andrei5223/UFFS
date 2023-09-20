library ieee;
use ieee.std_logic_1164.all;

entity Caixa is
    port(
        caixaA: in std_logic_vector(3 downto 0);
        sensorB: in std_logic;
        bombaB, eletroA: out std_logic
    );
end Caixa;

architecture behav_caixa of Caixa is
    begin
        PROCESS (caixaA, sensorB)
        begin
            eletroA <= '0';
            bombaB <= '1';
            if caixaA(0) = '0' then
                bombaB <= '0';
                eletroA <= '1';
            end if;
            if sensorB = '1' then
                bombaB <= '0';
            end if;
        end PROCESS;
end behav_caixa;