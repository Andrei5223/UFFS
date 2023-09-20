package br.edu.uffs.ControleNotas.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data   //gera getters, setters, toString
@AllArgsConstructor
@NoArgsConstructor
public class Emissor {
    private String nome;
    private String cpf;
}
