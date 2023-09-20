/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package listaderevisãoEx4a9;

/**
 *
 * @author andre
 */
public class Ex7CasaClass extends Ex9ImovelClass{
    private int totalAbertas;
    
    Ex7CasaClass() {
        super();
        totalAbertas = 0;
    }
    
    public int quantasPortasEstaoAbertas() {
        for (int i = 0; i < totalPortas; i++){
            if (portas[i].estaAberta() == true){
                totalAbertas++;
            }
        }
        return totalPortas;
    }
}
