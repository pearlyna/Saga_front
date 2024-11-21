package Saga.com.br.Servicos;

import Saga.com.br.Entidades.Login;
import Saga.com.br.Repositorios.Logins;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Service
public class FuncaoLogin {
    @Autowired
    Logins logins;

    public Login findyById(Integer id) {
        Optional<Login> login = logins.findById(id);
        return login.orElse(null);
    }

    public List<Login> findAll() {

        return logins.findAll();
    }

    @RestController
    @RequestMapping(value = "Login")
    public class logar {
        @Autowired
        private FuncaoLogin funcaoLogin;

        @GetMapping(value = "{id}")
        public ResponseEntity<Login> findById(@PathVariable Integer id){
            Login login = funcaoLogin.findyById(id);
            return ResponseEntity.ok().body(login);
        }

        @GetMapping
        public ResponseEntity<List<Login>> findAll() {
            List<Login> login = funcaoLogin.findAll();
            return ResponseEntity.ok().body(login);
        }

    }


    public Login salvarLogin(Login login){
        return logins.save(login);
    }

    public void deletarLogin(Integer id){
        logins.deleteById(id);
    }

    public Login atualizarLogin(Integer id, Login login){
        Login alterado = findyById(id);
        if(alterado!=null){
            alterado.setNome(login.getNome());
            alterado.setEmail(login.getEmail());
            alterado.setCep(login.getCep());
            alterado.setSenha(login.getSenha());
            alterado.setCpf(login.getCpf());

            return logins.save(alterado);
        }
        return null;
    }
}
