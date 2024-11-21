package Saga.com.br.Repositorios;

import Saga.com.br.Entidades.Historia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Historias extends JpaRepository<Historia, Integer> {
    // Métodos adicionais podem ser declarados aqui, se necessário
}
