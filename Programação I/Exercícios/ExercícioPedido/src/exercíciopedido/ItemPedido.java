package exercíciopedido;

public class ItemPedido {
    private Produto prod;
    private int qtde;

    public ItemPedido(Produto prod, int qtde) {
        this.prod = prod;
        this.qtde = qtde;
    }
    
    public ItemPedido() {
    }

    public Produto getProd() {
        return prod;
    }

    public int getQtde() {
        return qtde;
    }

    public void setProd(Produto prod) {
        this.prod = prod;
    }

    public void setQtde(int qtde) {
        this.qtde = qtde;
    }
    
    
}
