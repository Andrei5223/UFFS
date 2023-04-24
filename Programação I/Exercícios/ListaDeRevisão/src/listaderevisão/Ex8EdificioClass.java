/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package listaderevisão;

/**
 *
 * @author andre
 */
public class Ex8EdificioClass {
    private String cor;
    private int totalPortas, totalAndares;
    private Ex6PortaClass portas[];
    
    public Ex8EdificioClass(){
        this.cor = null;
        this.totalAndares = 0;
        this.totalPortas = 0;
        portas = new Ex6PortaClass[100];
    }
    
    public void pinta(String cor) {
        this.cor = cor;
    }
    
    public int getTotalPortas() {
        return totalPortas;
    }
    
    public void adicionarAndar() {
        totalAndares++;
    }
    
    public int getTotalAndares() {
        return totalAndares;
    }

    public String getCor() {
        return cor;
    }

    public void setPortas(Ex6PortaClass porta) {
        portas[totalPortas] = porta;
        totalPortas++;
    }
    
    
}
