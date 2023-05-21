/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package exercíciocartas;

/**
 *
 * @author andre
 */
public class ExercícioCartas {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Baralho baralho = new Baralho();
        
        baralho.adicionaCarta(1, "copas");
        baralho.adicionaCarta(5, "copas");
        baralho.adicionaCarta(0, "paus");
        baralho.adicionaCarta(2, "paus");
        baralho.adicionaCarta(7, "ouro");
        baralho.adicionaCarta(10, "copas");
        
        baralho.imprimeBaralho();
        baralho.embaralha();
        baralho.imprimeBaralho();
    }
    
}