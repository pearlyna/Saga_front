package Saga.com.br.Repositorios;

import Saga.com.br.Entidades.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Logins extends JpaRepository<Login, Integer> {
}
