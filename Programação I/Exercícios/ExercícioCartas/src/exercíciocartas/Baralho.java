/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package exercíciocartas;

/**
 *
 * @author andre
 */
public class Baralho {
    private Carta baralho[];
    private int qtdCartas;
    
    public Baralho() {
        baralho = new Carta[52];
        qtdCartas = 0;
    }
    
    public Carta getCarta(int index){
        return baralho[index];
    }
    
    public void embaralha(){
        Carta baralhoMenor[] = new Carta[qtdCartas];
        
        for (int i = 0; i < qtdCartas; i++) {
            baralhoMenor[i] = baralho[i];
        }

        java.util.Collections.shuffle(java.util.Arrays.asList(baralhoMenor));
        
        for (int i = 0; i < qtdCartas; i++) {
            baralho[i] = baralhoMenor[i];
        }
    }
    
    public void imprimeBaralho(){
        System.out.println("\nImprimindo Baralho:");
        for (int i = 0; i<qtdCartas; i++){
            System.out.println(baralho[i].toString());
        }
    }
    
    public void verificaExistencia(int numero, String naipe) throws Exception {
        for (int i = 0; i<qtdCartas; i++){
            if (baralho[i].getNumero() == numero && baralho[i].getNaipe().equals(naipe)){
                throw new Exception("Carta já existe!");
            }
        }
    }
    
    public void adicionaCarta(int numero, String naipe){
        try{
            verificaExistencia(numero, naipe);
            baralho[qtdCartas] = new Carta(numero, naipe);
            qtdCartas++;
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
