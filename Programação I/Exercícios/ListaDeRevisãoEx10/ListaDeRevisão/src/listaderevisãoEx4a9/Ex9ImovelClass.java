/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package listaderevisãoEx4a9;

/**
 *
 * @author andre
 */
public class Ex9ImovelClass {
    protected String cor;
    protected Ex6PortaClass portas[];
    protected int totalPortas;
    
    public Ex9ImovelClass() {
        this.cor = "branco";
        this.portas = new Ex6PortaClass[100];
    }
    
    public void pinta(String cor) {
        this.cor = cor;
    }
    
    public int getTotalPortas() {
        return totalPortas;
    }
    
    public void setPorta(Ex6PortaClass porta) {
        portas[totalPortas] = porta;
        totalPortas++;
    }
    
    public Ex6PortaClass getPorta(int index) {
        return portas[index];
    }
    
    public String getCor() {
        return cor;
    }
}
