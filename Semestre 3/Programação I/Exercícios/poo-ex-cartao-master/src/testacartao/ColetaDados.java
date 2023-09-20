/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package testacartao;
import java.util.Scanner;
/**
 *
 * @author aluno
 */
public class ColetaDados {
    public static String getNome(){
        String aux;
        Scanner sc = new Scanner(System.in);
        System.out.printf("\nDigite o nome do titular do cartão: ");
        aux = sc.nextLine();
        sc.close();
        return aux;
    }
    
    public static String getBandeira(){
        String aux;
        Scanner sc1 = new Scanner(System.in);
        System.out.printf("\nDigite a bandeira do cartão: ");
        aux = sc1.nextLine();
        sc1.close();
        return aux;
    }
    
    public static int getAgencia(){
        int aux;
        Scanner sc2 = new Scanner(System.in);
        System.out.printf("\nDigite o número da agência bancária do titular: ");
        aux = sc2.nextInt();
        sc2.close();
        return aux;
    }
    
    public static int getNum(){
        int aux;
        Scanner sc3 = new Scanner(System.in);
        System.out.printf("\nDigite o número da conta do titular: ");
        aux = sc3.nextInt();
        sc3.close();
        return aux;
    }
}
