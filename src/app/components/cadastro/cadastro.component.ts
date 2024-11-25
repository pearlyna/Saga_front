import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { CadastroService } from '../../services/cadastro.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  cadastro = { nome: '', cpf: '', senha: '', email: '' };

  constructor(private router: Router, private cadastroService: CadastroService) { }

  irParaTelaLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (!this.cadastro.nome || !this.cadastro.cpf || !this.cadastro.senha || !this.cadastro.email) {
      this.cadastroService.message('Todos os campos devem ser preenchidos.');
      return;
    }

    // chama o servico para fazer o cadastro
    this.cadastroService.realizarCadastro(this.cadastro).subscribe({
      next: (response) => {
        this.cadastroService.message('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.cadastroService.message('Erro ao realizar cadastro. Tente novamente!');
      },
      complete: () => {
        console.log('Requisição completada');
      }
    });

  }
}
