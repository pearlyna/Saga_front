package Saga.com.br.DTO;

public class HistoriaCapaDTO {

    private Long id;
    private String titulo;
    private String imagem;

    public HistoriaCapaDTO() {}

    public HistoriaCapaDTO(Long id, String titulo, String imagem) {
        this.id = id;
        this.titulo = titulo;
        this.imagem = imagem;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }
}
