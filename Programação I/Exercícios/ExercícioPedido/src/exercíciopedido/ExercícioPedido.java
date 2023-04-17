package exercíciopedido;


public class ExercícioPedido {
    public static void main(String[] args) {
        Produto p1 = new Produto(1, 10.0, "Primeiro produto");
        
        ItemPedido itens[] = new ItemPedido(p1, 3)[];
        
        Pedido pedido1 = new Pedido(itens, 0);
        
    }
    
}
