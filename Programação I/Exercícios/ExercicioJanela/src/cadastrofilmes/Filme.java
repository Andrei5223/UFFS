/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cadastrofilmes;

/**
 *
 * @author aluno
 */
public class Filme {
    private String titulo;
    private String tituloOrignal;
    private String sinopse;

    public Filme(String titulo, String tituloOrignal, String sinopse) {
        this.titulo = titulo;
        this.tituloOrignal = tituloOrignal;
        this.sinopse = sinopse;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getTituloOrignal() {
        return tituloOrignal;
    }

    public String getSinopse() {
        return sinopse;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setTituloOrignal(String tituloOrignal) {
        this.tituloOrignal = tituloOrignal;
    }

    public void setSinopse(String sinopse) {
        this.sinopse = sinopse;
    }
    
    
}
