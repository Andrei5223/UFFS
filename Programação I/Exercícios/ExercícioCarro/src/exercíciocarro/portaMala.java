/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package exercíciocarro;

public class portaMala {
    private int angulo;
    private boolean aberto;
    private boolean limpador;
    
    public portaMala() {
        this.aberto = false;
        this.angulo = 0;
        this.limpador = false;
}
    
    public void abrirMala(int abertura) {
        if (angulo+abertura >= 0 || angulo+abertura < 60){
            aberto = true;
            angulo += abertura;
        }
    }
    
    public void fecharMala(int abertura) {
        angulo -= abertura;
        if (angulo <= 0){
            aberto = false;
            angulo = 0;
        }
    }
    
    public int getAngulo() {
        return angulo;
    }
    
    public boolean getLimpador() {
        return limpador;
    }
    
    public void setLimpador(boolean estado) {
        limpador = estado;
    }
}
