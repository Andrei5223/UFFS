library ieee;
use ieee.std_logic_1164.all;

entity arbitro is
    port(
        rec0, rec1, rec2, reset, clock: in std_logic;
        aut0, aut1, aut2: out std_logic
    );
end arbitro;

architecture behav_arbitro of arbitro is
begin

    process (rec0, rec1, rec2, reset, clock)
    begin

        if (reset = '1') then
            aut0 <= '0';
            aut1 <= '0';
            aut2 <= '0';
        elsif (Clock'EVENT AND Clock = '1') then
            --Passa do estado A ao B. Note que apenas vai estar no A se (aut1 = '0') and (aut2 = '0')
            if (rec0 = '1') and (aut1 = '0') and (aut2 = '0') then
                aut0 <= '1';
                aut1 <= '0';
                aut2 <= '0';
            elsif (rec1 = '1') and (aut0 = '0') and (aut2 = '0') then
                aut0 <= '0';
                aut1 <= '1';
                aut2 <= '0';
            elsif (rec2 = '1') and (aut0 = '0') and (aut1 = '0') then
                aut0 <= '0';
                aut1 <= '0';
                aut2 <= '1';
            else
                aut0 <= '0';
                aut1 <= '0';
                aut2 <= '0';    
            end if;
        end if;
        
    end process;

end behav_arbitro;


library ieee;
use ieee.std_logic_1164.all;

entity disp is
    port(
        in_rec, in_aut: in std_logic;
        out_rec, out_aut: out std_logic
    );
end disp;

architecture behav_disp of disp is
    begin
        process (in_aut, in_rec)
        begin

            out_rec <= in_rec;

            if ((in_aut = '1') and (out_rec = '1'))  then
                out_aut <= '1';
            else
                out_aut <= '0';
            end if;

        end process;
end behav_disp;
