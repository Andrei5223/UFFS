library ieee;
use ieee.std_logic_1164.all;

entity contabits is
    port(
        clock, reset, w: in std_logic;
        z: out std_logic
    );
end contabits;

architecture behav_contabits of contabits is
    
    TYPE Tipo_estado IS (A, B) ;
    SIGNAL y: Tipo_estado ;

    begin

        PROCESS (reset, clock)
        begin
            if reset = '1' then
                y <= A;
            elsif (Clock'EVENT AND Clock = '1') then
                case y is
                    when A =>
                        if w = '0' then
                            y <= A;
                        else
                            y <= B;
                        end if;
                    when B =>
                        if w = '0' then
                            y <= A;
                        else
                            Y <= B;
                        end if;
                end case;
            end if;
        end PROCESS;

        PROCESS (y, w)
        begin
            case y is
                when A =
                    z <= '0';
                when B =
                    z <= w;
            end case;
        end PROCESS;

end behav_contabits;