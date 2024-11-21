import { Component, OnInit } from '@angular/core';
import { historia } from '../../entities/historia';
import { HistoriaService } from '../../services/historia.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.scss']
})
export class ReadAllComponent implements OnInit {
  list: historia[] = [];  // Lista para armazenar as histórias
  selectedHistoria: historia | null = null;  // Armazenar história selecionada
  baseUrl: string = 'http://localhost:8081/historia/imagem/';  // URL base para acessar a imagem

  constructor(private service: HistoriaService) { }

  ngOnInit(): void {
    // Buscar todas as histórias ao iniciar o componente
    this.findAll();
  }

  // Método para buscar todas as histórias
  findAll(): void {
    this.service.findAll().subscribe({
      next: (data) => {
        // Atualiza as URLs das imagens para a lista
        this.list = data.map((historia) => ({
          ...historia,
          imagem: `${this.baseUrl}${historia.imagem}`  // Prepend the base URL to the image filename
        }));
        console.log('Histórias carregadas:', data);
      },
      error: (err) => {
        console.error('Erro ao carregar histórias:', err);
        this.service.message('Erro ao carregar as histórias.');
      }
    });
  }

  // Método para apagar uma história
  apagar(id: any): void {
    this.service.apagar(id).subscribe((resposta) => {
      if (resposta === null) {
        this.service.message('História excluída com sucesso.');
        this.list = this.list.filter(historia => historia.autor !== id);  // Remove da lista
      } else {
        this.service.message('Não foi possível excluir a história.');
      }
    });
  }

  // Método para ler a história
  lerHistoria(item: historia): void {
    this.selectedHistoria = item;  // Armazena a história selecionada
    console.log('História selecionada:', item);
  }
  
}
