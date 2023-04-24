/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package listaderevisão;

/**
 *
 * @author andre
 */
public class Ex6PortaClass {
    private boolean aberta;
    private String cor;
    private double dimensaoX, dimensaoY, dimensaoZ;
    
    public void abre() {
        aberta = true;
    }
    
    public void fecha() {
        aberta = false;
    }
    
    public void pinta(String cor) {
        this.cor = cor;
    }
    
    public boolean estaAberta() {
        return aberta;
    }
    
    public void setDimensaoX(double dimensaoX) {
        this.dimensaoX = dimensaoX;
    }
    
    public void setDimensaoY(double dimensaoY) {
        this.dimensaoY = dimensaoY;
    }
    
    public void setDimensaoZ(double dimensaoZ) {
        this.dimensaoZ = dimensaoZ;
    }
    
    public double getDimensaoX() {
        return dimensaoX;
    }
    
    public double getDimensaoY() {
        return dimensaoY;
    }
    
    public double getDimensaoZ() {
        return dimensaoZ;
    }
    
    public String getCor() {
        return cor;
    }
}
