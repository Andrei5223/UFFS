package testacartao;

public class Operacao {

    private double valorOp;
    private String loja;
    private String data;
    private String operacao;

    public Operacao(double valorOp, String loja, String data, String operacao) {
        this.valorOp = valorOp;
        this.loja = loja;
        this.data = data;
        this.operacao = operacao;
    }

    public double getValorOp() {
        return valorOp;
    }

    public String getLoja() {
        return loja;
    }

    public String getData() {
        return data;
    }

    public String getOperacao() {
        return operacao;
    }
}
