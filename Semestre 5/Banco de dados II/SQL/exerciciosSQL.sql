select table_name, column_name, is_nullable, data_type from information_schema.columns where table_name = 'product';
select table_schema, table_name from information_schema.tables where table_schema = 'exercicio';

-- de um esquema, lista as tabelas, suas colunas, tipos e obrigadoriedades
select table_name, column_name, is_nullable, data_type from information_schema.columns where table_schema = 'exercicio' order by 1;
