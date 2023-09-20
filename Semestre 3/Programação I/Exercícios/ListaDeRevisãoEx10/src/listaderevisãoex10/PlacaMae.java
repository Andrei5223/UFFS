/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package listaderevisãoex10;

public class PlacaMae extends PecaComputador{
    private String Socket;
    private String tam;

    public PlacaMae(String Socket, String tam) {
        this.Socket = Socket;
        this.tam = tam;
    }

    public String getSocket() {
        return Socket;
    }

    public String getTam() {
        return tam;
    }

    public void setSocket(String Socket) {
        this.Socket = Socket;
    }

    public void setTam(String tam) {
        this.tam = tam;
    }
    
    @Override
    public String toString(){
        return "Socket: " + Socket + " Tamanho: " + tam;
    }
}
