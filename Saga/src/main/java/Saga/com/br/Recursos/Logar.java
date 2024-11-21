package Saga.com.br.Recursos;

import Saga.com.br.Entidades.Login;
import Saga.com.br.Repositorios.Logins;
import Saga.com.br.Servicos.FuncaoHistoria;
import Saga.com.br.Servicos.FuncaoLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/login")
public class Logar {

    @Autowired
    private FuncaoLogin funcaoLogin;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Login> findById(@PathVariable Integer id) {
        Login login = funcaoLogin.findyById(id);
        return ResponseEntity.ok().body(login);
    }

    @PostMapping
    public ResponseEntity<Login> salvarLogin(@RequestBody Login login) {
        login = funcaoLogin.salvarLogin(login);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(login.getId()).toUri();
        return ResponseEntity.created(uri).body(login);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deletarLogin(@PathVariable Integer id){
        funcaoLogin.deletarLogin(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Login> atualizarLogin(@PathVariable Integer id, @RequestBody Login login){
        Login alterado = funcaoLogin.atualizarLogin(id, login);
        return ResponseEntity.ok().body(alterado);
    }

}
