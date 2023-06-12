/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package exercícioaltaordem;

/**
 *
 * @author andre
 */
public class Par {
    private Double primeiro;
    private Double segundo;
    
    public Par(){}
    public Par(Double p, Double s) {
        this.primeiro = p;
        this.segundo = s;
    }

    public Double getPrimeiro() {
        return primeiro;
    }

    public Double getSegundo() {
        return segundo;
    }

    public void setPrimeiro(Double primeiro) {
        this.primeiro = primeiro;
    }

    public void setSegundo(Double segundo) {
        this.segundo = segundo;
    }
    
}
