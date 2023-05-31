/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package listaderevisãoex10;

public class PecaComputador {
    private double consumo;
    private double preco;
    private String nome;
    
    public PecaComputador() {
        this.consumo = 0;
        this.preco = 0;
        this.nome = null;
    }

    public double getConsumo() {
        return consumo;
    }

    public double getPreco() {
        return preco;
    }

    public String getNome() {
        return nome;
    }

    public void setConsumo(double consumo) {
        this.consumo = consumo;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }    
    
}
