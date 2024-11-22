import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle, MatCardContent } from '@angular/material/card';
import { historia } from '../../entities/historia';
import { HistoriaService } from '../../services/historia.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ler-historia',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardSubtitle, MatCardTitle, MatCardHeader, MatCardContent],
  templateUrl: './ler-historia.component.html',
  styleUrls: ['./ler-historia.component.scss']
})
export class LerHistoriaComponent implements OnInit {
  historiaLer: historia | null = null; // Armazenar a história selecionada

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Recuperar o estado da navegação
    const historiaState = history.state.historia;

    if (historiaState) {
      this.historiaLer = historiaState;
      console.log('História recebida:', this.historiaLer); // Debugging
    } else {
      console.error('Nenhuma história foi encontrada no estado.');
      // Redirecionar ou exibir uma mensagem de erro se nenhum estado for encontrado
    }
  }
}
