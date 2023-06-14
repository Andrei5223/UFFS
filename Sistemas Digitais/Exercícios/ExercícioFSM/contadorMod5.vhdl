library ieee;
use ieee.std_logic_1164.all;

entity Contador is
    port(
        clock, reset, S: in std_logic;
        S_out: out std_logic_vector(2 downto 0)
    );
end Contador;

architecture behav_contador of Contador is
    TYPE Tipo_estado IS (A, B, C, D, E) ;
    SIGNAL estado: Tipo_estado ;

    begin
        PROCESS (reset, clock)
        begin
            if reset = '1' then
                estado <= A;
                S_out = "000";
            elsif (Clock'EVENT AND Clock = '1') then
                case estado is
                    when A =>
                        if S = '1' then
                            S_out <= "001";
                            estado <= B;
                        else
                            S_out <= "100";
                            estado <= E;
                        end if;
                    when B =>
                        if S = '1' then
                            S_out <= "010";
                            estado <= C;
                        else
                            S_out <= "000";
                            estado <= A;
                        end if;
                    when C =>
                        if S = '1' then
                            S_out <= "011";
                            estado <= D;
                        else
                            S_out <= "001";
                            estado <= B;
                        end if;
                    when D =>
                        if S = '1' then
                            S_out <= "100";
                            estado <= E;
                        else
                            S_out <= "010";
                            estado <= C;
                        end if;
                    when E =>
                        if S = '1' then
                            S_out <= "000";
                            estado <= A;
                        else
                            S_out <= "011";
                            estado <= D;
                        end if;
                end case;
            end if;
        end PROCESS;
end behav_contador;