/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package expressaolambda;

import java.util.function.BiFunction;

/**
 *
 * @author aluno
 */
public class ExpressaoLambda {

    /**
     * @param args the command line arguments
     */
    
    //usa a interface como uma "variavel" para receber a função
    //usa o metodo dela para passar os argumentos
    public static double efetuarCalculo(Calculavel f, double a, double b){
        return f.calcular(a, b); 
    }
    
    public static double efetuarCalculoo(BiFunction<Double, Double, Double> f, double a, double b){
        return f.apply(a, b); 
    }
    
    public static void main(String[] args) {
        //escreve a expressao diretamente nos parametros
        System.out.println("Resultado 1: " + efetuarCalculo((a, b) -> a + b, 10, 15));
        
        Calculavel c = (x, y) -> x*2+y*2;
    
        //atribui a função numa variavel
        System.out.println("Resultado 2: " + c.calcular(2, 3));
    
        //passa uma função já existente como parametro
        System.out.println("Resultado 3: " + efetuarCalculo(Math::max, 10, 15));
        
        //usa uma interface pronta com parametro generico
        System.out.println("Resultado 4: " + efetuarCalculoo((a, b) -> a + b, 10, 16));
    }
    
}
