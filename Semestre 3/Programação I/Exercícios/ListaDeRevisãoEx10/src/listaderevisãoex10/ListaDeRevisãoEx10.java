/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package listaderevisãoex10;

/**
 *
 * @author andre
 */
public class ListaDeRevisãoEx10 {
    public static void main(String[] args) {
        MemoriaRam Ram1 = new MemoriaRam();
        MemoriaHD HD1 = new MemoriaHD(1024);
        PlacaMae PL = new PlacaMae("AM4", "ATX");
        
        Ram1.setConsumo(50);
        Ram1.setTam(8);
        
        System.out.println("Consumo: " + Ram1.getConsumo());
        System.out.println("Capacidade Ram: " + Ram1.getTam());
        
        System.out.println("Capacidade HD: " + HD1.getCapacidade());
        System.out.println(PL.toString());
    }
    
}
