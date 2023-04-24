/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package listaderevisão;

/**
 *
 * @author andre
 */
public class Ex7CasaClass {
    private String cor;
    private Ex6PortaClass porta1, porta2, porta3;
    
    public void pinta(String cor) {
        this.cor = cor;
    }
    
    public int quantasPortasEstaoAbertas() {
        int abertas = 0;
        if (porta1.estaAberta() == true){
            abertas++;
        }
        if (porta2.estaAberta() == true) {
            abertas++;
        }
        if (porta3.estaAberta() == true) {
            abertas++;
        }
        return abertas;
    }

    public String getCor() {
        return cor;
    }

    public Ex6PortaClass getPorta1() {
        return porta1;
    }

    public Ex6PortaClass getPorta2() {
        return porta2;
    }

    public Ex6PortaClass getPorta3() {
        return porta3;
    }

    public void setPorta1(Ex6PortaClass porta1) {
        this.porta1 = porta1;
    }

    public void setPorta2(Ex6PortaClass porta2) {
        this.porta2 = porta2;
    }

    public void setPorta3(Ex6PortaClass porta3) {
        this.porta3 = porta3;
    }
    
}
