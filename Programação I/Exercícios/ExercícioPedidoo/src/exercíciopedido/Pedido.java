package exercíciopedido;


public class Pedido {
    private ItemPedido itens[];
    private double valorTotal;
    private int qntdItens;

    public Pedido() {
        this.itens = new ItemPedido[100];
        this.qntdItens = 0;
        this.valorTotal = 0;
    }

    public void adicionarItem(ItemPedido item){
        this.itens[this.qntdItens] = item;
        this.qntdItens++;
    }
    
    public double getvalorTotal() {
        for (int i=0; i<qntdItens; i++){
            this.valorTotal += itens[i].getQtde() * itens[i].getProd().getValor();
        }
        return valorTotal;
    }

    public int getQntdItens() {
        return qntdItens;
    }
    
    
}
