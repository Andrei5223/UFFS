/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package listaderevisão;

/**
 *
 * @author andrei
 */
public class ListaDeRevisão {
    public static void main(String[] args) {
        
        Ex6PortaClass porta1 = new Ex6PortaClass(), porta2 = new Ex6PortaClass(), porta3 = new Ex6PortaClass();
        Ex7CasaClass Casa = new Ex7CasaClass();
        
        porta1.abre();
        porta1.pinta("amarelo");
        porta1.setDimensaoX(2.5);
        porta1.setDimensaoY(5);
        porta1.setDimensaoZ(0.03);
        System.out.println("Cor da porta1: " + porta1.getCor());
        System.out.println("Porta1 aberta? " + porta1.estaAberta() + "\n");
        
        porta2.abre();
        porta2.pinta("vermelho");
        porta2.setDimensaoX(2.5);
        porta2.setDimensaoY(5);
        porta2.setDimensaoZ(0.03);
        porta2.fecha();
        
        porta3.abre();
        porta3.pinta("branco");
        porta3.setDimensaoX(2.5);
        porta3.setDimensaoY(5);
        porta3.setDimensaoZ(0.03);
        
        Casa.setPorta1(porta1);
        Casa.setPorta2(porta2);
        Casa.setPorta3(porta3);
        Casa.pinta("cinza");
        System.out.println("Cor da casa: " + Casa.getCor());
        System.out.println("Portas abertas: " + Casa.quantasPortasEstaoAbertas());
    }
    
}
