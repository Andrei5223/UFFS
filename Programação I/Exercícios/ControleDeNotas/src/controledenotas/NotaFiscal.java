package controledenotas;

import java.time.LocalDate;

public class NotaFiscal {
    private Long id;
    private Produto produto;
    private Emissor emissor;
    private Comprador comprador;
    private int ValorTotal;
    private LocalDate data;
    
    public void NotaFiscal(Produto produto, Emissor emissor, Comprador comprador){
        this.produto = produto;
        this.emissor = emissor;
        this.comprador = comprador;
        this.ValorTotal = this.produto.getPeso() * this.produto.getPreco();
        this.data = LocalDate.now();
    }
    
    public void calculaTotal(){
        this.ValorTotal = this.produto.getPeso() * this.produto.getPreco();
    }

    public Long getId() {
        return id;
    }

    public Produto getProduto() {
        return produto;
    }

    public Emissor getEmissor() {
        return emissor;
    }

    public Comprador getComprador() {
        return comprador;
    }

    public int getValorTotal() {
        return ValorTotal;
    }

    public LocalDate getData() {
        return data;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public void setEmissor(Emissor emissor) {
        this.emissor = emissor;
    }

    public void setComprador(Comprador comprador) {
        this.comprador = comprador;
    }

    public void setValorTotal(int ValorTotal) {
        this.ValorTotal = ValorTotal;
    }
}
