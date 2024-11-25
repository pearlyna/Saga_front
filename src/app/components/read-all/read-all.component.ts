import { Component, OnInit, HostListener } from '@angular/core';
import { historia } from '../../entities/historia';
import { HistoriaService } from '../../services/historia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.scss']
})
export class ReadAllComponent implements OnInit {
  list: historia[] = [];
  selectedHistoria: historia | null = null;
  baseUrl: string = 'http://localhost:8081/historia/imagem/';
  itensPorLinha: number = 3;

  constructor(private service: HistoriaService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe({
      next: (data) => {
        // atualiza as urls das imagens para a lista
        this.list = data.map((historia) => ({
          ...historia,
          imagem: `${this.baseUrl}${historia.imagem}`
        }));
        console.log('Histórias carregadas:', data);
      },
      error: (err) => {
        console.error('Erro ao carregar histórias:', err);
        this.service.message('Erro ao carregar as histórias.');
      }
    });
  }

  lerHistoria(historia: historia): void {
    this.router.navigate(['/ler-historia'], { state: { historiaId: historia.id } });
  }



  apagar(id: any): void {
    this.service.apagar(id).subscribe({
      next: () => {
        this.service.message('História excluída com sucesso.');
        this.list = this.list.filter(historia => historia.id !== id);
      },
      error: () => {
        this.service.message('Não foi possível excluir a história.');
      }
    });
  }

  editarHistoria(item: any) {
    this.router.navigate([`/editar/${item.id}`]);
  }

  // funcao para calcular a quantidade de itens que cabem na tela dependendo da largura da tela
  adjustItemsPerRow(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
      this.itensPorLinha = 3;
    } else if (screenWidth >= 800) {
      this.itensPorLinha = 3;
    } else if (screenWidth >= 400) {
      this.itensPorLinha = 2;
    } else {
      this.itensPorLinha = 1;
    }
  }

  // ouvir a mudanca de tamanho da tela para ajustar o layout
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.adjustItemsPerRow();  // recalcula o numero de itens por linha quando a tela for redimensionada
  }
}
