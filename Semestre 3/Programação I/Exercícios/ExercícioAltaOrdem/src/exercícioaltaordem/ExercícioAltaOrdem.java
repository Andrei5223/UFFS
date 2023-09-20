/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package exercícioaltaordem;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;
import java.util.stream.Stream;

/**
 *
 * @author andre
 */
public class ExercícioAltaOrdem {

    /**
     * @param args the command line arguments
     */
    
    public static void mostraInfo(Pessoa p){
        System.out.println("Informações da pessoa:");
        System.out.println("Nome = " + p.getNome());
        System.out.println("Sobrenome = " + p.getSobrenome());
        System.out.println("Data de Nascimento = " + p.getDataNasc());
    }
    
    public static void main(String[] args) {
        List<Pessoa> pessoas = new ArrayList<>();
        
        Pessoa p1 = new Pessoa("João", "Silva");
        Pessoa p2 = new Pessoa("Marta", "Santos");
        
        pessoas.add(p1);
        pessoas.add(p2);
        
        System.out.println("Mostrando todas as informações:");
        pessoas.forEach(p -> System.out.println(p.toString()));
        
        List<Double> lista = Arrays.asList(4.5, 0.3, 2.1, 0.8, 3.6);
        
        System.out.println(lista);
        
        //define um limite para a filtragem
        Double LIMITE = 1.5;
        
        //obtem um stream a partir da lista
        Stream<Double> stream1 = lista.stream();
        
        //aplica o filtro com expressão lambda
        Stream<Double> maiores = stream1.filter(e -> e > LIMITE);
        
        //mostrando informações filtradas
        System.out.println("Maiores que o LIMITE");
        maiores.forEach(e -> System.out.println("\t" + e));
        lista.stream().filter(e -> e > LIMITE).forEach(e -> System.out.println("\t ::" + e));
        
        //obtem outro stream a partir da lista
        Stream<Double> stream2 = lista.stream();
        
        //Aplica filtro com lamba e adiciona a outra coleção
        List<Double> menores = stream2.filter(e -> e <= LIMITE).collect(Collectors.toList());
        
        System.out.println("Menores que o LIMITE");
        menores.forEach(e -> System.out.println("\t" + e));
        
        
        List<Integer> lista2 = Arrays.asList(1,2,3,4,5);
        
        System.out.println(lista2);
        
        //obtem stream dos quadrados dos elementos
        IntStream quadrados = lista2.stream().mapToInt(e -> e*e);
        quadrados.forEach(e -> System.out.println("\t" + e));
        
        //usando a classe Par
        Stream<Par> streamPares = Stream.of(new Par(81.5, 1.69), new Par(52.5, 1.62), new Par(72.1, 1.70));
        
        //obtem uma stream de IMC dos elementos
        
        DoubleStream imc = streamPares.mapToDouble(p -> p.getPrimeiro() / Math.pow(p.getSegundo(), 2));
        imc.forEach(e -> System.out.println("IMC " + e));
        
        
        
        List<Integer> lista3 = Arrays.asList(1,2,3,4);
        int total = 0;
        
        int soma = lista3.stream().reduce(0, (acum, e) -> acum + e);
        System.out.println("Soma: "+ soma);
    }
    
}
