/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.edu.uffs.ControleNotas.Controllers;

import br.edu.uffs.ControleNotas.Entities.NotaFiscal;
import br.edu.uffs.ControleNotas.Repositories.NotaRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class NotasControler {
    NotaRepository repository;
    private float valorMedio;
    
    @GetMapping("/notas")
    public List<NotaFiscal> getAllNotas(){
        return repository.findAll();
    }
    
    @GetMapping("/notas{id}")
    public NotaFiscal getTarefaById(@PathVariable Long id) {
        return repository.findById(id).get();
    }
    
    @PostMapping("/notas")
    public NotaFiscal saveNota(@RequestBody NotaFiscal nota) {
        return repository.save(nota);
    }
    
    @DeleteMapping("/notas/{id}")
    public void deleteNota(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
