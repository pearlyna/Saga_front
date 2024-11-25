import { environment } from '../environments/environments,cadastro';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cadastro } from '../entities/cadastro';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  message(msg: string): void {
    this.snack.open(`${msg}`, `OK`, {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      duration: 5000
    });
  }

  realizarCadastro(cadastro: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, cadastro);
  }

  realizarLogin(cpf: string, senha: string): Observable<cadastro> {
    const loginPayload = { cpf, senha };
    return this.http.post<cadastro>(`${this.baseUrl}/login`, loginPayload);
  }

}
