package Saga.com.br.Entidades;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity(name = "Historia")
public class Historia implements Serializable {

    private static final long serivalVersionUID = 1l;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    Long id;

    @Column(name = "Titulo")
    String titulo;

    @Column(name = "Imagem")
    String imagem;

    @Column(name = "Historia_intro")
    String historia_intro;

    @Column(name = "Historia_meio")
    String historia_meio;

    @Column(name = "Historia_fim")
    String historia_fim;

    @Column(name = "Autor")
    String autor;

    @Column(name = "Publicacao")
    String publicacao;

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

    public String getHistoria_intro() {
        return historia_intro;
    }

    public void setHistoria_intro(String historia_intro) {
        this.historia_intro = historia_intro;
    }

    public String getHistoria_meio() {
        return historia_meio;
    }

    public void setHistoria_meio(String historia_meio) {
        this.historia_meio = historia_meio;
    }

    public String getHistoria_fim() {
        return historia_fim;
    }

    public void setHistoria_fim(String historia_fim) {
        this.historia_fim = historia_fim;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getPublicacao() {
        return publicacao;
    }

    public void setPublicacao(String publicacao) {
        this.publicacao = publicacao;
    }

    @Override
    public String toString() {
        return "Historia{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", imagem='" + imagem + '\'' +
                ", historia_intro='" + historia_intro + '\'' +
                ", historia_meio='" + historia_meio + '\'' +
                ", historia_fim='" + historia_fim + '\'' +
                ", autor='" + autor + '\'' +
                ", publicacao='" + publicacao + '\'' +
                '}';
    }
}
