import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { CadastroService } from '../../services/cadastro.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  cpf: string = '';
  senha: string = '';
  mensagemErro: string = '';

  constructor(
    private router: Router,
    private cadastroService: CadastroService,
    private snack: MatSnackBar
  ) { }

  onSubmit() {
    this.cadastroService.realizarLogin(this.cpf, this.senha).subscribe({
      next: (response) => {
        this.snack.open('Login realizado com sucesso!', 'OK', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      error: (error) => {
        this.mensagemErro = 'CPF ou senha inválidos. Tente novamente!';
      }
    });
  }
  irParaTelaCadastro() {
    this.router.navigate(['/cadastro']);
  }

}
