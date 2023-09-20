/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package exercícioaltaordem;

import java.text.DateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 *
 * @author andre
 */
public class Pessoa {
    private String nome;
    private String sobrenome;
    private Calendar dataNasc;

    public Pessoa(String nome, String sobrenome) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dataNasc = Calendar.getInstance();
    }

    public String getNome() {
        return nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public String getDataNasc() {
        Date dataNasc = this.dataNasc.getTime();
        DateFormat f = DateFormat.getDateInstance(DateFormat.MEDIUM);
        return f.format(dataNasc);
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public void setDataNasc(int dia, int mes, int ano) {
        this.dataNasc = Calendar.getInstance();
        this.dataNasc.set(ano, mes, dia);
    }
    
    @Override
    public String toString(){
        return "Nome: " + this.nome + " Sobrenome: " + this.sobrenome + " Data de Nascimento: " + this.getDataNasc();
    }
    
}
