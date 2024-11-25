import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { historia } from '../../entities/historia';
import { HistoriaService } from '../../services/historia.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ler-historia',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardHeader, MatCardContent],
  templateUrl: './ler-historia.component.html',
  styleUrls: ['./ler-historia.component.scss']
})
export class LerHistoriaComponent implements OnInit {
  historiaLer: historia | null = null; // armazenar a história carregada
  loading: boolean = true;
  error: boolean = false;

  constructor(private router: Router, private historiaService: HistoriaService) { }

  ngOnInit(): void {
    const historiaId = history.state.historiaId; // recuperar o ID do estado

    if (historiaId) {
      this.carregarHistoria(historiaId);
    } else {
      console.error('Nenhum ID foi encontrado no estado.');
      this.error = true;
      this.loading = false;
    }
  }

  carregarHistoria(id: number): void {
    this.historiaService.findById(id).subscribe({
      next: (historia) => {
        const baseUrl = 'http://localhost:8081/historia/imagem/'; // URL para imagens
        this.historiaLer = {
          ...historia,
          imagem: historia.imagem ? `${baseUrl}${historia.imagem}` : undefined,
        };
        console.log('História carregada com imagem atualizada:', this.historiaLer);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar a história:', err);
        this.error = true;
        this.loading = false;
        this.historiaService.message('Erro ao carregar a história.');
      }
    });
  }
}
