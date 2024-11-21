package Saga.com.br.Recursos;

import Saga.com.br.DTO.HistoriaCapaDTO;
import Saga.com.br.Entidades.Historia;
import Saga.com.br.Servicos.FuncaoHistoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/historia")
public class EscreverHistorias {

    @Autowired
    private FuncaoHistoria funcaoHistoria;

    // Diretório onde as imagens serão salvas
    private final String uploadDirectory = "uploads/";

    // Get by ID
    @GetMapping(value = "/{id}")
    public ResponseEntity<Historia> findById(@PathVariable Integer id) {
        Historia historia = funcaoHistoria.findyById(id);
        return ResponseEntity.ok().body(historia);
    }

    // Get all historias
    @GetMapping
    public ResponseEntity<List<HistoriaCapaDTO>> findAll() {
        // Obtém todas as histórias do serviço
        List<Historia> historias = funcaoHistoria.findAll();

        // Converte cada História para um DTO contendo id, título e imagem
        List<HistoriaCapaDTO> historiaDTOs = historias.stream()
                .map(historia -> new HistoriaCapaDTO(historia.getId(), historia.getTitulo(), historia.getImagem()))
                .toList();

        // Retorna a lista de DTOs
        return ResponseEntity.ok().body(historiaDTOs);
    }


    // Create a new historia (sem imagem inicialmente)
    @PostMapping
    public ResponseEntity<Historia> salvarHistoria(@RequestBody Historia historia) {
        historia = funcaoHistoria.salvarHistoria(historia);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(historia.getId()).toUri();
        return ResponseEntity.created(uri).body(historia);
    }

    // Upload de imagem para uma história existente
    @PostMapping(value = "/{id}/imagem")
    public ResponseEntity<Void> uploadImagem(@PathVariable Integer id, @RequestParam("imagem") MultipartFile imagem) throws IOException {
        // Validar a existência da história
        Historia historia = funcaoHistoria.findyById(id);

        // Salvar a imagem no sistema de arquivos
        String imagemNome = salvarImagem(imagem);

        // Atualizar a história com o nome da imagem
        historia.setImagem(imagemNome);
        funcaoHistoria.atualizarHistoria(id, historia);

        return ResponseEntity.ok().build();
    }

    // Update a historia (sem atualizar imagem)
    @PutMapping(value = "/{id}")
    public ResponseEntity<Historia> atualizarHistoria(@PathVariable Integer id, @RequestBody Historia historia) {
        Historia alterado = funcaoHistoria.atualizarHistoria(id, historia);
        return ResponseEntity.ok().body(alterado);
    }

    // Atualizar uma imagem de uma história existente
    @PutMapping(value = "/{id}/imagem")
    public ResponseEntity<Void> atualizarImagem(@PathVariable Integer id, @RequestParam("imagem") MultipartFile imagem) throws IOException {
        // Validar a existência da história
        Historia historia = funcaoHistoria.findyById(id);

        // Salvar a nova imagem no sistema de arquivos
        String imagemNome = salvarImagem(imagem);

        // Atualizar o campo de imagem da história no banco de dados
        historia.setImagem(imagemNome);
        funcaoHistoria.atualizarHistoria(id, historia);

        return ResponseEntity.ok().build();
    }

    // Delete a historia by ID
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deletarHistoria(@PathVariable Integer id) {
        funcaoHistoria.deletarHistoria(id);
        return ResponseEntity.noContent().build();
    }

    // Método auxiliar para salvar a imagem no disco
    private String salvarImagem(MultipartFile imagem) throws IOException {
        // Gerar o caminho do arquivo
        String imagemNome = imagem.getOriginalFilename();
        Path caminho = Paths.get(uploadDirectory, imagemNome);

        // Criar o diretório de uploads, se não existir
        Files.createDirectories(caminho.getParent());

        // Escrever o arquivo no disco
        Files.write(caminho, imagem.getBytes());

        return imagemNome;
    }
}
