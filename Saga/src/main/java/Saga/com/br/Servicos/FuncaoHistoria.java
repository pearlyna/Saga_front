package Saga.com.br.Servicos;

import Saga.com.br.Entidades.Historia;
import Saga.com.br.Repositorios.Historias;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuncaoHistoria {

    @Autowired
    private Historias historias; // Este é o repositório de Historias

    // Encontrar história por ID
    public Historia findyById(Integer id) {
        return historias.findById(id).orElseThrow(() -> new RuntimeException("História não encontrada"));
    }

    // Encontrar todas as histórias
    public List<Historia> findAll() {
        return historias.findAll();
    }

    // Salvar nova história
    public Historia salvarHistoria(Historia historia) {
        return historias.save(historia);
    }

    // Deletar história por ID
    public void deletarHistoria(Integer id) {
        if (!historias.existsById(id)) {
            throw new RuntimeException("História não encontrada para deletar");
        }
        historias.deleteById(id);
    }

    // Atualizar uma história existente
    public Historia atualizarHistoria(Integer id, Historia novaHistoria) {
        Historia existente = findyById(id);
        existente.setTitulo(novaHistoria.getTitulo());
        existente.setHistoria_intro(novaHistoria.getHistoria_intro());
        existente.setHistoria_meio(novaHistoria.getHistoria_meio());
        existente.setHistoria_fim(novaHistoria.getHistoria_fim());
        existente.setAutor(novaHistoria.getAutor());
        existente.setImagem(novaHistoria.getImagem());
        existente.setPublicacao(novaHistoria.getPublicacao());
        return historias.save(existente);
    }
}
