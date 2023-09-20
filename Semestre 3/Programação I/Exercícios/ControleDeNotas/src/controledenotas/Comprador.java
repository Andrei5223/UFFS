package controledenotas;

public class Comprador {
    private String nome;
    private String cnpj;

    public Comprador(String nome, String cnpj) {
        this.nome = nome;
        this.cnpj = cnpj;
    }
    
    public String getNome() {
        return nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }
    
    
}
