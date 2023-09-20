library ieee;
use ieee.std_logic_1164.all;

entity Janela is
    port(
        janelas: in std_logic_vector(2 downto 0);
        portaAberta, portaTrancada: in std_logic;
        btn: in std_logic;
        alerta, aviso: out std_logic
    );
end Janela;

architecture behav_janela of Janela is
    begin
        PROCESS (janelas, portaAberta, portaTrancada, btn)
        begin
            alerta <= '0';
            aviso <= '0';
            if btn = '1' then
                if janelas(0) = '1' or janelas(1) = '1' or janelas(2) = '1' then
                    alerta <= '1';
                elsif portaAberta = '1' and portaTrancada = '0' then
                    alerta <= '1';
                end if;
            elsif portaAberta = '1' and portaTrancada = '0' then
                alerta <= '1';
            elsif janelas(0) = '1' or janelas(1) = '1' or janelas(2) = '1' then
                aviso <= '1';
            end if;
        end PROCESS;
end behav_janela;