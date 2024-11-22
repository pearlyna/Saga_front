import { FormsModule } from '@angular/forms'; // Adicione essa linha
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoriaService } from '../../services/historia.service';
import { historia } from '../../entities/historia';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, 
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.scss'
})
export class EditarComponent implements OnInit {
  historia: historia = {
    id: 0,
    titulo: '',
    imagem: '',
    autor: '',
    historia_intro: '',
    historia_meio: '',
    historia_fim: '',
    publicacao: ''
  };
  novaImagem: File | null = null;

  constructor(private service: HistoriaService, private router: Router) { }

  ngOnInit(): void {
    const historiaState = history.state.historia;
    if (historiaState) {
      this.historia = historiaState;
    } else {
      this.router.navigate(['/']);
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.novaImagem = file;
      const reader = new FileReader();
      reader.onload = (e: any) => (this.historia.imagem = e.target.result);
      reader.readAsDataURL(file);
    }
  }

  salvarHistoria(): void {
    if (this.historia.id && this.novaImagem) {
      const formData = new FormData();
      formData.append('imagem', this.novaImagem);
      this.service.uploadImagem(this.historia.id, formData).subscribe({
        next: () => this.atualizarDados(),
        error: (err) => console.error('Erro ao atualizar imagem:', err)
      });
    } else {
      this.atualizarDados();
    }
  }

  atualizarDados(): void {
    this.service.atualizar(this.historia).subscribe({
      next: () => {
        console.log('História atualizada com sucesso');
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Erro ao atualizar a história:', err)
    });
  }
}
