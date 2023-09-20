package controledenotas;

import java.time.LocalDate;

public class NotaFiscal {
    private int id;
    private static int qtdId = 1;
    private Produto produto;
    private Emissor emissor;
    private Comprador comprador;
    private double ValorTotal;
    private LocalDate data;
    
    public NotaFiscal(Produto produto, Emissor emissor, Comprador comprador){
        this.produto = produto;
        this.emissor = emissor;
        this.comprador = comprador;
        this.ValorTotal = this.produto.getPeso() * this.produto.getPreco();
        this.data = LocalDate.now();
        this.id = qtdId;
        this.qtdId++;
    }
    
    public void calculaTotal(){
        this.ValorTotal = this.produto.getPeso() * this.produto.getPreco();
    }

    public int getId() {
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

    public double getValorTotal() {
        return ValorTotal;
    }

    public LocalDate getData() {
        return data;
    }

    public void setId(int id) {
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

    public void setValorTotal(double ValorTotal) {
        this.ValorTotal = ValorTotal;
    }

    @Override
    public String toString() {
        return "NotaFiscal{" + "id= " + id + ", produto=" + produto.getNome() + ", emissor=" + emissor.getNome() + ", comprador=" + comprador.getNome() + '}';
    }
}
