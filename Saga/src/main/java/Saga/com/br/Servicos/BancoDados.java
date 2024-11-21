package Saga.com.br.Servicos;

import Saga.com.br.Entidades.Login;
import Saga.com.br.Repositorios.Historias;
import Saga.com.br.Repositorios.Logins;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import static java.util.Arrays.asList;

@Service
public class BancoDados {
    @Autowired
    private Historias historias;

    @Autowired
    private Logins logins;

    @Bean
    public void instaciarBD() {
        Login loginteste = new Login();
        loginteste.setCep("012301230");
        loginteste.setCpf(1231232);
        loginteste.setEmail("maumau@123.com");
        loginteste.setNome("Mauricio");
        loginteste.setSenha("123");

        logins.saveAll(asList(loginteste));

    }

}