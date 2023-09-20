/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package exercíciocartas;

/**
 *
 * @author andre
 */
public class Carta {
    private int numero;
    private String naipe;

    public Carta(int numero, String naipe) throws Exception {
        if (numero <= 13 && numero >= 1){
            this.numero = numero;
        } else {
            throw new Exception("Numero inválido: '" + numero + "'! É necessário que seja entre 1 a 13.");
        }
        if (naipe.equals("copas") || naipe.equals("ouro") || naipe.equals("espada") || naipe.equals("paus")){
            this.naipe = naipe;
        } else {
            throw new Exception("Naipe inválido: '" + naipe + "' ! É necessário que seja igual a 'copas', 'ouro', 'espada' ou 'paus'.");
        }
    }
    
    @Override
    public String toString(){
        return "Numero: " + this.numero + " - Naipe: " + this.naipe;
    }
    
    public int getNumero() {
        return numero;
    }

    public String getNaipe() {
        return naipe;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public void setNaipe(String naipe) {
        this.naipe = naipe;
    }
}
