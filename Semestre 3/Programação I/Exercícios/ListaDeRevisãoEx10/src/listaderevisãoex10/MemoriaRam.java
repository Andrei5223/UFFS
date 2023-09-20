/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package listaderevisãoex10;

/**
 *
 * @author andre
 */
public class MemoriaRam extends PecaComputador{
    private int tam;
    private int frequencia;

    public MemoriaRam() {
        super();
        tam = 0;
        frequencia = 0;
    }
    
    public int getTam() {
        return tam;
    }

    public int getFrequencia() {
        return frequencia;
    }

    public void setTam(int tam) {
        this.tam = tam;
    }

    public void setFrequencia(int frequencia) {
        this.frequencia = frequencia;
    }
  
}
