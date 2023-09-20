/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package br.edu.uffs.ControleNotas.Repositories;

import br.edu.uffs.ControleNotas.Entities.NotaFiscal;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author aluno
 */
public interface NotaRepository extends JpaRepository<NotaFiscal, Long>{
    
}
