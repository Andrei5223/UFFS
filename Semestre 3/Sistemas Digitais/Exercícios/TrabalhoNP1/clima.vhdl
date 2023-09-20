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

library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;

--------------------------------------------------

entity test_int is
port(	
    a: in std_logic_vector(6 downto 0);
    b: in std_logic_vector(6 downto 0);
	t_out: out std_logic_vector(3 downto 0)
);
end test_int;  

--------------------------------------------------

architecture behav_add of test_int is
    
begin
    process(a,b)
    variable vl1 : integer range  -20 to 50;
    variable vl2 : integer range  -20 to 50;
    variable vl_avg : integer range  -20 to 100;
    begin
        vl1 := to_integer(signed(a));
        vl2 := to_integer(signed(b));

        vl_avg := (vl1+vl2)/2;

        if vl_avg < 0 then
            t_out <= "0001";
        elsif vl_avg < 15 then 
            t_out <= "0010";
        elsif vl_avg < 20 then
            t_out <= "0100";
	ELSE 
	        t_out <= "1000";
        end if;
            
    end process;

end behav_add;

--------------------------------------------------