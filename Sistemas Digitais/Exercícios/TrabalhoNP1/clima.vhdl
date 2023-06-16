library ieee;
use ieee.std_logic_1164.all;

entity Clima is
    port(
        janelas: in std_logic_vector(2 downto 0);
        temperatura: in std_logic_vector(3 downto 0);
        portaAberta, chuva, dia: in std_logic;
        aviso: out std_logic
    );
end Clima;

architecture behav_clima of clima is
    begin
        PROCESS (janelas, portaAberta, dia, chuva, temperatura)
        begin
            aviso <= '0';
            if (janelas(0) = '1' or janelas(1) = '1' or janelas(2) = '1') or (portaAberta = '1') then
                if (chuva = '1') then
                    aviso <= '1';
                end if;
            end if;
            if dia = '1' and (janelas(0) = '1' or janelas(1) = '1' or janelas(2) = '1') then
                aviso <= '1';
            end if;

            --Considera-se que a saída do código fornecido seja "0001" para temperatura < 0
            --e seja "0010" para temperatura < 15
            if (janelas(0) = '1' or janelas(1) = '1' or janelas(2) = '1') and (temperatura = "0001" or temperatura = "0010") then
                aviso <= '1';
            end if;
        end PROCESS;
end behav_clima;