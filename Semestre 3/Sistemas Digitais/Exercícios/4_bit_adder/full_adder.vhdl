architecture behav1 of full_adder is
    component half_adder is
        port(	
            a,b: in std_logic;
            carry, sum: out std_logic
        );
        end component half_adder;  

    signal x,y,z :std_logic;
begin

    ha1: half_adder
            PORT MAP (
                a => a, 
                b => b, 
                sum => x, 
                carry => y
            );

    ha2: half_adder
        PORT MAP (
            a => x,
            b => carry_in,
            sum => sum,
            carry => z
        );

        carry <= z OR y;
    
end behav1;