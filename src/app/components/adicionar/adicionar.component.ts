import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { HistoriaService } from '../../services/historia.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-adicionar',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.scss'],
})
export class AdicionarComponent {
  historiaData = {
    titulo: '',
    autor: '',
    publicacao: '',
    historia_intro: '',
    historia_meio: '',
    historia_fim: '',
  };

  selectedFile: File | null = null;

  constructor(private historiaService: HistoriaService, private router: Router) { }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files?.length) {
      this.selectedFile = inputElement.files[0];
      console.log('Arquivo selecionado:', this.selectedFile);
    } else {
      console.log('Nenhum arquivo selecionado.');
    }
  }

  onSubmit(): void {
    // verificar se todos os campos estao preenchidos
    if (
      !this.historiaData.titulo ||
      !this.historiaData.autor ||
      !this.historiaData.publicacao ||
      !this.historiaData.historia_intro ||
      !this.historiaData.historia_meio ||
      !this.historiaData.historia_fim
    ) {
      this.historiaService.message('Por favor, preencha todos os campos!');
      return;
    }

    // verificar se a imagem foi selecionada
    if (!this.selectedFile) {
      this.historiaService.message('Por favor, adicione uma imagem!');
      return;
    }

    // enviar dados da historia
    this.historiaService.adicionarHistoria(this.historiaData).subscribe({
      next: (novaHistoria) => {
        // verificar se o file selecionado não é null
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('imagem', this.selectedFile); // adicionar imagem ao FormData

          // enviar a imagem
          this.historiaService.uploadImagem(novaHistoria.id, formData).subscribe({
            next: () => {
              this.historiaService.message('História adicionada com sucesso!');
              this.router.navigate(['/']);
            },
            error: () => this.historiaService.message('Erro ao enviar a imagem.'),
          });
        } else {
          this.historiaService.message('História adicionada sem imagem.');
          this.router.navigate(['/']);
        }
      },
      error: () => this.historiaService.message('Erro ao adicionar a história.'),
    });
  }

}
