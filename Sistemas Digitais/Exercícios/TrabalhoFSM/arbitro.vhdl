library ieee;
use ieee.std_logic_1164.all;

entity arbitro is
    port(
        rec0, rec1, rec2, reset, clock: in std_logic;
        aut0, aut1, aut2: out std_logic
    );
end arbitro;

architecture behav_arbitro of arbitro is

    TYPE Tipo_estado IS (A, B, C, D) ;
    SIGNAL estado: Tipo_estado ;

begin

    process (rec0, rec1, rec2, reset, clock)
    begin

        if (reset = '1') then
            estado <= A;
            aut0 <= '0';
            aut1 <= '0';
            aut2 <= '0';
        elsif (Clock'EVENT AND Clock = '1') then
            case estado is

                --logica A para B, C e D
                when A =>
                    --logica A para B
                    if (rec0 = '1') then
                        aut0 <= '1';
                        aut1 <= '0';
                        aut2 <= '0';
                        estado <= B;
                    
                    --logica A para C
                    elsif (rec1 = '1') then
                        aut0 <= '0';
                        aut1 <= '1';
                        aut2 <= '0';
                        estado <= C;
                    
                    --logica A para D
                    elsif (rec2 = '1') then
                        aut0 <= '0';
                        aut1 <= '0';
                        aut2 <= '1';
                        estado <= D;
                    end if;

                --logica B para A
                when B =>
                    if (rec0 = '0') then
                        aut0 <= '0';
                        aut1 <= '0';
                        aut2 <= '0';
                        estado <= A;
                    end if;
                --logica C para A
                when C =>
                    if (rec1 = '0') then
                        aut0 <= '0';
                        aut1 <= '0';
                        aut2 <= '0';
                        estado <= A;
                    end if;
                --logica D para A
                when D =>
                    if (rec2 = '0') then
                        aut0 <= '0';
                        aut1 <= '0';
                        aut2 <= '0';
                        estado <= A;
                    end if;
            end case;
        end if;
        
    end process;

end behav_arbitro;