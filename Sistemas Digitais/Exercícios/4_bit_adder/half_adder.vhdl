library ieee;
use ieee.std_logic_1164.all;

entity four_bits is
    port(
        a, b: in std_logic_vector(3 downto 0);
        carry_in: in std_logic;
        carry_out: out std_logic;
        sum_out: out std_logic_vector(3 downto 0)
    );
end four_bits;

architecture behav_four_bits of four_bits is
    component full_add is
            port(
                a, b, carry_in: in std_logic;
                carry, sum: out std_logic
            );
        end component full_add;

    signal x, y, z: std_logic; --usados para ligar os carrys entre os FA 

    begin
        fa1: full_add
            PORT MAP (
                a => a(0),              --liga a entrada 'a' do fa1 à entrada 'a(0)' do somador 4 bits
                b => b(0),              --liga a entrada 'b' do fa1 à entrada 'b(0)' do somador 4 bits
                carry_in => carry_in,   --liga a entrada 'carry_in' do fa1 à entrada 'carry_in' do somador 4 bits
                sum => sum_out(0),      --liga a saida 'sum' do fa1 à saida 'sum_out9(0)' do somador 4 bits
                carry => x              --liga a saida 'carry' do fa1 ao signal 'x'
            );

        fa2: full_add
            PORT MAP (
                a => a(1),
                b => b(1),
                carry_in => x,          --liga a entrada 'carry_in' do fa2 ao signal 'x'
                sum => sum_out(1),
                carry => y
            );

        fa3: full_add
            PORT MAP (
                a => a(2),
                b => b(2),
                carry_in => y,
                sum => sum_out(2),
                carry => z
            );

        fa4: full_add
            PORT MAP (
                a => a(3),
                b => b(3),
                carry_in => z,
                sum => sum_out(3),
                carry => carry_out
            );
        
end behav_four_bits;

library ieee;
use ieee.std_logic_1164.all;

entity full_add is
    port(
        a, b, carry_in: in std_logic;
        carry, sum: out std_logic
    );
end full_add;


architecture behav_full_add of full_add is
    component half_add is
            port(
                a, b: in std_logic;
                carry, sum: out std_logic
            );
        end component half_add;

    signal x, y, z: std_logic;

    begin
        ha1: half_add
            PORT MAP (
                a => a,         --ligando a entrada 'a' do half adder 1 na entrada 'a' do full adder
                b => b,         --ligando a entrada 'b' do half adder 1 na entrada 'b' do full adder
                sum => x,       --ligando a saida 'sum' do half adder 1 no signal 'x' (fio)
                carry => y      --ligando a saida 'carry' do half adder 1 no signal 'y'
            );
        ha2: half_add
            PORT MAP (
                a => x,         --ligando a entrada 'a' do half adder 2 no signal x
                b => carry_in,  --ligando a entrada 'b' do half adder 2 na entrada carry_in do full adder
                sum => sum,     --ligando a saida 'sum' do half adder 2 na saida 'sum' do full adder
                carry => z      --ligando a saida 'carry' do half adder 2 no signal 'z'
            );
        
        carry <= y OR z;    --ligando os singal dos carrys ('y' e 'z') em um OR e passando pra saida 'carry_out' do full adder
end behav_full_add;


library ieee;
use ieee.std_logic_1164.all;

entity half_add is
    port(
        a, b: in std_logic;
        carry, sum: out std_logic
    );
end half_add;

architecture behav_add of half_add is
    begin
        carry <= a AND b;
        sum <= a XOR b;
end behav_add;
