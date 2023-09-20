library ieee;
use ieee.std_logic_1164.all;

entity teste is
    port(
		sw: in std_logic_vector(9 downto 0);
		ledr: out std_logic_vector(9 downto 0);
		key: in std_logic_vector(3 downto 0)
    );
end teste;

architecture behav_arbitro of teste is

    TYPE Tipo_estado IS (A, B, C, D) ;
    SIGNAL estado: Tipo_estado ;

begin

    process (sw,key)
    begin

        if (sw(9) = '1') then
            estado <= A;
            ledr(0) <= '0';
            ledr(1) <= '0';
            ledr(2) <= '0';
        elsif (key(0)'EVENT AND key(0) = '1') then
            case estado is

                --logica A para B, C e D
                when A =>
                    --logica A para B
                    if (sw(0) = '1') then
                        ledr(0) <= '1';
                        ledr(1) <= '0';
                        ledr(2) <= '0';
                        estado <= B;
                    
                    --logica A para C
                    elsif (sw(1) = '1') then
                        ledr(0) <= '0';
                        ledr(1) <= '1';
                        ledr(2) <= '0';
                        estado <= C;
                    
                    --logica A para D
                    elsif (sw(2) = '1') then
                        ledr(0) <= '0';
                        ledr(1) <= '0';
                        ledr(2) <= '1';
                        estado <= D;
                    end if;

                --logica B para A
                when B =>
                    if (sw(0) = '0') then
                        ledr(0) <= '0';
                        ledr(1) <= '0';
                        ledr(2) <= '0';
                        estado <= A;
                    end if;
                --logica C para A
                when C =>
                    if (sw(1) = '0') then
                        ledr(0) <= '0';
                        ledr(1) <= '0';
                        ledr(2) <= '0';
                        estado <= A;
                    end if;
                --logica D para A
                when D =>
                    if (sw(2) = '0') then
                        ledr(0) <= '0';
                        ledr(1) <= '0';
                        ledr(2) <= '0';
                        estado <= A;
                    end if;
            end case;
        end if;
        
    end process;

end behav_arbitro;