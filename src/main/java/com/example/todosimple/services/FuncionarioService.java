package com.example.todosimple.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.todosimple.models.Funcionario;
import com.example.todosimple.repositories.FuncionarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {
    
    @Autowired
    private FuncionarioRepository funcionarioRepository;


    public Funcionario findbyId(Long id){
        Optional<Funcionario> Funcionario = this.funcionarioRepository.findById(id);
        return Funcionario.orElseThrow(() -> new RuntimeException("Funcionario não encontrado! Id: " + id + ", Type: " + Funcionario.class.getName()));
    }


    
    public List<Funcionario> findAll(){
        return funcionarioRepository.findAll();
    }

    @Transactional
    public Funcionario create(Funcionario obj){
        obj.setId(null);
        obj = this.funcionarioRepository.save(obj);
        return obj;
    }

    @Transactional
    public Funcionario update(Funcionario obj){
        try{

            Funcionario newObj = findbyId(obj.getId());
            System.err.println(newObj);
            newObj.setCpf(obj.getCpf());
            newObj.setDataAdmissao(obj.getDataAdmissao());
            newObj.setTipoCNH(obj.getTipoCNH());
            newObj.setCargo(obj.getCargo());
            newObj.setUsername(obj.getUsername());
            newObj.setStatus(obj.getStatus());
            newObj.setObservacoes(obj.getObservacoes());
            return this.funcionarioRepository.save(newObj);
        }
        catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public void delete(Long id){
        findbyId(id);
        try {
            this.funcionarioRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Funcionario não poe ser deletado, pois tem entidades dependentes relacionadas!");
        }
    }


}
