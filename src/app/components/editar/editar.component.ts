import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriaService } from '../../services/historia.service';
import { historia } from '../../entities/historia';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule,],
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  historia: historia = {};  // historia que esta sendo editada
  imagemUrl: string | undefined; // url da imagem atual
  novaImagem: File | null = null; // para armazenar nova imagem se tiver

  constructor(
    private route: ActivatedRoute,
    private historiaService: HistoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const historiaIdString = this.route.snapshot.paramMap.get('id');

    if (historiaIdString) {
      const historiaId = +historiaIdString; // converter para numero
      this.historiaService.findById(historiaId).subscribe({
        next: (data) => {
          this.historia = data;
          if (data.imagem) {
            this.imagemUrl = `${this.historiaService.baseUrl}/imagem/${data.imagem}`; // url da imagem atual
          }
        },
        error: (error) => {
          console.error('Erro ao carregar história', error);
        }
      });
    }
  }

  // metodo chamado quando o user faca um upload de uma nova imagem
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.novaImagem = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemUrl = reader.result as string; // atualizar a visualizacao da imagem
      };
      reader.readAsDataURL(file);
    }
  }

  salvar(): void {
    // salva a historia sem a imagem primeiro
    this.historiaService.atualizar(this.historia.id, this.historia).subscribe(
      (data) => {

        if (this.novaImagem) {
          const formData = new FormData();
          formData.append('imagem', this.novaImagem);

          // faz o upload da nova imagem
          this.historiaService.uploadImagem(this.historia.id, formData).subscribe(
            () => {
              this.router.navigate(['/']);
            },
            (error) => {
              console.error('Erro ao atualizar imagem', error);
            }
          );
        } else {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.error('Erro ao atualizar história', error);
      }
    );
  }
}
