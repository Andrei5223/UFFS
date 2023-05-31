/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package listaderevisãoEx4a9;

/**
 *
 * @author andre
 */
public class Ex8EdificioClass extends Ex9ImovelClass {
    private int totalAndares;
    
    public Ex8EdificioClass(){
        super();
        this.totalAndares = 0;
    }
    
    public void adicionarAndar() {
        totalAndares++;
    }
    
    public int getTotalAndares() {
        return totalAndares;
    }
}
