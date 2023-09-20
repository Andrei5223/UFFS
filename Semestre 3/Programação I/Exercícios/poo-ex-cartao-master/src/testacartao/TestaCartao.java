package testacartao;

public class TestaCartao {

    public static void main(String[] args) {
        CartaoDebito debito1;
        
        debito1 = new CartaoDebito("Andrei", "Visa", 055, 001);
        
        debito1.desbloquear();
        debito1.depositar(150, "Caixa Eletronico", "15/10/2023", "Deposito");
        debito1.pagar(100, "Americanas", "16/10/2023", "PagarViaDebito");
        
        debito1.imprimeExtrato();
    }
}
