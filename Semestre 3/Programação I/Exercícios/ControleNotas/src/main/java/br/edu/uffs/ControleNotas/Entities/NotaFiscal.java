/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.edu.uffs.ControleNotas.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity     //???
@Data   //gera getters, setters, toString
@AllArgsConstructor
@NoArgsConstructor
public class NotaFiscal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Produto produto;
    private Emissor emissor;
    private Comprador comprador;
    private int ValorTotal;
    
    public void NotaFiscal(Produto produto, Emissor emissor, Comprador comprador){
        this.produto = produto;
        this.emissor = emissor;
        this.comprador = comprador;
        this.ValorTotal = this.produto.getPeso() * this.produto.getPreco();
    }
    
    public void calculaTotal(){
        this.ValorTotal = this.produto.getPeso() * this.produto.getPreco();
    }
}
