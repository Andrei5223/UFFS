package testacartao;

public class Cartao {
    private String titular;
    private String bandeira;
    private boolean bloqueado;
    private Operacao[] operacoes;
    private int qtdOp;
    
    public Cartao(String titular, String bandeira) {
        this.titular = titular;
        this.bandeira = bandeira;
        this.bloqueado = true;
        this.operacoes = new Operacao[100];
        this.qtdOp = 0;
    }
    
    public void setTitular(String titular) {
        this.titular = titular;
    }
    
    public String getTitular() {
        return this.titular;        
    }

    public String getBandeira() {
        return bandeira;
    }

    public void setBandeira(String bandeira) {
        this.bandeira = bandeira;
    }
    
    public void bloquear() {
        this.bloqueado = true;
    }
    
    public void desbloquear() {
        this.bloqueado = false;
    }
    
    public boolean estaBloqueado() {
        return this.bloqueado;
    }
    
    protected void registraOp(double valorOp, String loja, String data, String operacao){
        operacoes[qtdOp] = new Operacao(valorOp, loja, data, operacao);
        qtdOp++;
    }
    
    public void imprimeExtrato(){
        System.out.println("\nEXTRATO BANCÁRIO:\nTitular: " + titular + "\nQuantidade de operações registradas: " + qtdOp + "\n\nOperações:");
        for (int i = 0; i<qtdOp; i++){
            System.out.println("Operação: " + operacoes[i].getOperacao() + "  Data: " + operacoes[i].getData() + "  Loja: " + operacoes[i].getLoja() + "  Valor: " + operacoes[i].getValorOp());
        }
    }
}
