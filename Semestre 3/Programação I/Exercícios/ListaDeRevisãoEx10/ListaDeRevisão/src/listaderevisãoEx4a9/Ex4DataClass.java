/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package listaderevisãoEx4a9;
public class Ex4DataClass {
    private int dia;
    private int mes;
    private int ano;
    
    public int getDia(){
        return dia;
    }
    
    public int getMes() {
        return mes;
    }
    
    public int getAno() {
        return ano;
    }
    
    public void setDia(int dia) {
        this.dia = dia;
    }
    
    public void setMes(int mes) {
        this.mes = mes;
    }
    
    public void setAno(int ano) {
        this.ano = ano;
    }
    
    public String toStringBr() {
        return dia + "-" + mes + "-" + ano;
    }
    
    public String toStringAm() {
        return mes + "-" + dia + "-" + ano;
    }
}
