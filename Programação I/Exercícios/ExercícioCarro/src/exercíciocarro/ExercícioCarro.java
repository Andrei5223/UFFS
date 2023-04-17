/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package exercíciocarro;

/**
 *
 * @author andrei camilotto
 */
public class ExercícioCarro {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        portaMala carro = new portaMala();
    
        carro.abrirMala(60);
        System.out.println(carro.getAngulo());
        carro.fecharMala(45);
        System.out.println(carro.getAngulo());
        System.out.println(carro.getLimpador());
        carro.setLimpador(true);
        System.out.println(carro.getLimpador());
    }
}
