/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.edu.uffs.ControleNotas.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data   //gera getters, setters, toString
@AllArgsConstructor
@NoArgsConstructor
public class Produto {
    private String nome;
    private int peso;
    private int preco;
}
