/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package listaderevisãoEx4a9;

/**
 *
 * @author andrei
 */
public class ListaDeRevisão {
    public static void main(String[] args) {
        
        Ex6PortaClass porta1 = new Ex6PortaClass(), porta2 = new Ex6PortaClass(), porta3 = new Ex6PortaClass();
        Ex7CasaClass Casa = new Ex7CasaClass();
        Ex8EdificioClass Edificio = new Ex8EdificioClass();
        
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
        
        Casa.setPorta(porta1);
        Casa.setPorta(porta2);
        Casa.setPorta(porta3);
        Casa.pinta("cinza");
        System.out.println("Cor da casa: " + Casa.getCor());
        System.out.println("Portas abertas: " + Casa.getTotalPortas() + "\n");
    
        Edificio.pinta("Amarelo");
        Edificio.adicionarAndar();
        System.out.println("Num de andares: " + Edificio.getTotalAndares());
        Edificio.setPorta(porta1);
        Edificio.setPorta(porta2);
        System.out.println("Num de portas: " + Edificio.getTotalPortas());
        System.out.println("Cor do edificio: " + Edificio.getCor());
        System.out.println("Primera porta aberta? " + Edificio.getPorta(0).estaAberta());
    }
    
}
