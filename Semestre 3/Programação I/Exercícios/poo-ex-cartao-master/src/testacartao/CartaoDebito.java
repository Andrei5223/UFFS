package testacartao;

public class CartaoDebito extends Cartao {
    private double saldo;
    private int agencia;
    private int conta;    
    
    public CartaoDebito(String titular, String bandeira, int agencia, int conta) {
        super(titular, bandeira);
        this.agencia = agencia;
        this.conta = conta;
        this.saldo = 0;
    }

    public int getAgencia() {
        return agencia;
    }

    public void setAgencia(int agencia) {
        this.agencia = agencia;
    }

    public int getConta() {
        return conta;
    }

    public void setConta(int conta) {
        this.conta = conta;
    }
    
    public void depositar(double valor, String loja, String data, String operacao) {
        if (estaBloqueado() == false){   
            this.saldo += valor;
            registraOp(valor, loja, data, operacao);
        }
    }
    
    public void pagar(double valor, String loja, String data, String operacao) {
        if(estaBloqueado() == false){
            if (valor <= saldo) {
                saldo -= valor;
                System.out.println("Pagamento efetuado com sucesso!");
            } else {
                System.out.println("Saldo insuficiente!");
            }
            registraOp(valor, loja, data, operacao);
        }

    }
}
