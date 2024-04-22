
--Crie duas tablespaces

--Execute no terminal (fora do spql):
--cd /
--sudo mkdir tablespace
--cd tablespace
--sudo mkdir tbspc1
--sudo mkdir tbspc2
--cd ..
--sudo chown postgres.postgres tablespace/
--sudo chown postgres.postgres tablespace/tbspc1/
--sudo chown postgres.postgres tablespace/tbspc2/

create tablespace tbspc1 location '/tablespace/tbspc1';
create tablespace tbspc2 location '/tablespace/tbspc2';

--Crie dois usuários
create user usuario1 password 'usuario1';
create user usuario2 password 'usuario2';

--Crie um banco de dados utilizando uma das tablespaces criadas como default, no esquema criado (procure na documentação as opções de create database)
--Altere o dono do BD para um dos usuários criados (procure na documentação as opções do alter database)
--Acesse o BD
create database app tablespace tbspc1;
alter database app owner to usuario1;
\c app usuario1

--Crie um esquema
create schema exercicio;

--Aponte o esquema criado como padrão para um dos usuários
alter database app set search_path = exercicio;

\c app postgres
alter user usuario1 set search_path to exercicio;

\c app usuario1

--Crie o script do banco de dados utilizado em aulas anteriores (produto x venda) - a tabela sales foi alterada (acerte o script)
DROP TABLE IF EXISTS sale_item;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS sale;

CREATE TABLE product (					
	pid integer not null primary key,				
	name varchar(30) not null,					
	pqty  integer not null
);

CREATE TABLE sale (
	sid integer not null primary key,
	sdate date not null,
	address varchar(30)
);
   
CREATE TABLE sale_item (
	sid integer not null,
	pid integer not null,
	sqty integer not null,
	CONSTRAINT pk_sale_item PRIMARY KEY (sid,pid),
	CONSTRAINT fk_sale_item_sale FOREIGN KEY (sid) REFERENCES sale(sid),
	CONSTRAINT fk_sale_item_product FOREIGN KEY (pid) REFERENCES product(pid)
);

--Popule o BD com os scripts implementados em sala de aula (1000 produtos, 500 cupons e +1000 produtos vendidos) - a tabela foi alterada, acerte o script
create or replace procedure ins_product(qttup int ) Language plpgsql
as $$
declare
   prd_tup product%rowtype;
   counter int:=0;
   stock int[5]:='{3,5,8,10,15}';
begin
   raise notice 'Range ids: %',100*qttup;
   -- Or stock:=Array[3,5,8,10,15];
   loop
      prd_tup.pid:=(random()*100*(qttup))::int;
      prd_tup.name:=left(MD5(random()::text),20);
      prd_tup.pqty:=stock[(random()*4)::int+1];
      raise notice 'product: %',prd_tup;
      if (not exists (select 1 from product where pid=prd_tup.pid))
      then
        insert into product (pid,name,pqty) values (prd_tup.pid,prd_tup.name,prd_tup.pqty);
        counter:=counter+1;
      end if;
      exit when counter >= qttup;
   end loop;
end; $$;


create or replace procedure ins_sale(qttup int) Language plpgsql
as $$
declare
   sale_tup sale%rowtype;
   counter int:=0;
begin
   raise notice 'Range ids: %',100*qttup;
   loop
      sale_tup.sid:=(random()*100*qttup)::int;
      sale_tup.sdate:='2023-01-01 00:00:00'::timestamp + random()*(now()-timestamp '2023-01-01 00:00:00');
      sale_tup.address:=left(MD5(random()::text),20);
      raise notice 'Sale: %',sale_tup;
      if (not exists (select 1 from sale where sid=sale_tup.sid))
      then
        insert into sale (sid,sdate,address) values (sale_tup.sid,sale_tup.sdate,sale_tup.address);
        counter:=counter+1;
      end if;
      exit when counter >= qttup;
   end loop;
end; $$;

create or replace procedure ins_sale_item (qttup int) language plpgsql
as $$
declare
    itBySale int[6]:='{2,4,7,8,9,10}';
    nprod int;
    counter_nprod int := 0;
    sale_item_tup sale_item%rowtype;
    array_prod int[];
    array_sale int[];
    qt_prod int;
    qt_sale int;
    counter int:=0;
    n int;
begin
   select array_agg(pid) into array_prod from product;
   select count(pid) into qt_prod from product;

   select array_agg(sid) into array_sale from sale;
   select count(sid) into qt_sale from sale;
   --raise notice 'qt_sale: %',qt_sale;
   -- executa qttup vezes
   loop
        -- seleciona um sid
        n:=floor(random() * qt_sale) + 1;
        --raise notice 'N: %',n;
        sale_item_tup.sid := array_sale[n];
        --raise notice 'sid: %', sale_item_tup.sid;

        nprod := itBySale[(random()*5 +1)::int];

      --executa nprod vezes (vindo de itBySale)
      loop
         -- seleciona um pid e um sqty
         sale_item_tup.pid := array_prod[floor(random() * qt_prod) + 1];
         --raise notice 'pid: %', sale_item_tup.pid;
         sale_item_tup.sqty := (random()*1000)::int;

         -- insere em sale item
         if (not exists (select 1 from sale_item where sid=sale_item_tup.sid and pid=sale_item_tup.pid))
            then
            raise notice 'Sale item: %', sale_item_tup;
            insert into sale_item (sid, pid, sqty) values (sale_item_tup.sid, sale_item_tup.pid, sale_item_tup.sqty);
            counter_nprod := counter_nprod + 1;
         end if;

         exit when counter_nprod > nprod;
      end loop;

	   counter := counter +1;
      exit when counter >= qttup;
   end loop;
end; $$;

create or replace procedure call_all (qtprod int, qtsale int, qtitem int) language plpgsql
as $$
begin
   call ins_product(qtprod);
   call ins_sale(qtsale);
   call ins_sale_item(qtitem);
end; $$;

call call_all(1000, 500, 1000);


--Crie uma trigger que armazene em uma tabela de auditoria todas as vezes que a quantidade vendida de um produto for alterada (ou uma venda de produto for excluída). A tabela de auditoria deverá ter a operação, o valor antigo e novo (se for o caso), data e hora da operação e usuário. Esta tabela não tem PK
create table venda_item (
    op char(1),
    sid int,
    pid int,
    last_qt int,
    new_qt int,
    op_date date,
    op_time time,
    user_name varchar(30)
);

create or replace function changes_sale_item() returns trigger as $$
begin
   if TG_OP = 'INSERT' then
      insert into venda_item (op, sid, pid, new_qt, op_date, op_time, user_name)
      values ('I', NEW.sid, NEW.pid, NEW.sqty, current_date, current_time, current_user);
   
   elsif TG_OP = 'UPDATE' then
      insert into venda_item_audit (op, sid, pid, last_qt, new_qt, op_date, op_time, user_name)
      values ('U', OLD.sid, OLD.pid, OLD.sqty, NEW.qty, current_date, current_time, current_user);
   
   elsif TG_OP = 'DELETE' then
      insert into venda_item_audit (op, sid, pid, last_qt, op_date, op_time, user_name)
      values ('D', OLD.sid, OLD.pid, OLD.sqty, current_date, current_time, current_user);
   end if;
   RAISE NOTICE 'Auditoria atualizada.';

   return null;
end;
$$ Language plpgsql;


create trigger changes_sale_item_trigger
after insert or update or delete on sale_item
for each row
execute function changes_sale_item();

--Crie um índice não único para a data da venda, neste índice, inclua o endereço.
create index index_data_endereco on sale (sdate) include (address);

--Para o usuário não dono do BD, dê alguns privilégios: select em product e sale, todos para sale_item.
grant select on product to usuario1;
grant select on sale to usuario1;
grant all privileges on sale_item to usuario1;
