package exercíciopedido;


public class ExercícioPedido {
    public static void main(String[] args) {
        Produto p1 = new Produto(1, 10.0, "Primeiro produto");
        Produto p2 = new Produto(2, 15.0, "Segundo produto");
        
        ItemPedido item1 = new ItemPedido(p1, 1);
        ItemPedido item2 = new ItemPedido(p2, 1);
        
        Pedido pedido1 = new Pedido();
        
        pedido1.adicionarItem(item1);
        pedido1.adicionarItem(item2);
        
        p1.setValor(100);
        
        System.out.println("Quantidade de itens: " + pedido1.getQntdItens());
        System.out.println("Valor total: " + pedido1.getvalorTotal());
        
        System.out.println("Preço de p1: " + p1.getValor());
    }
}