package exercíciopedido;


public class Pedido {
    private ItemPedido itens[];
    double valorTotal;
    //declarar quantiadade e implementar

    public Pedido() {
        this.itens = new ItemPedido[100];
    }

    //Como verificar se o item atual está vazio?
    public void adicionarItem(ItemPedido item){
        for (int i=0 ; i<this.itens.length ; i++){
            if (this.itens[i]==null){
                this.itens[i] = item;
            }
        }
    }
    
    public void obterTotal() {
        double soma = 0; //não funciona?
        for (int i=0 ; i<this.itens.length ; i++){
            soma += itens[i].getQtde() * itens[i].getProd().getValor();
        }
        System.out.println("Valor total do pedido: " + soma);
    }
    
    public ItemPedido[] getItens() {
        return itens;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void setItens(ItemPedido[] itens) {
        this.itens = itens;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }
    
    
}
