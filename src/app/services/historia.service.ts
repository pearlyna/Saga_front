import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { historia } from '../entities/historia';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {
  baseUrl = environment.baseUrl;  // A URL base para o backend

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  // Método para buscar todas as histórias
  findAll(): Observable<historia[]> {
    return this.http.get<historia[]>(this.baseUrl);
  }

  // Método para buscar uma história específica pelo ID
  findById(id: number): Observable<historia> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<historia>(url);
  }  

  // Método para exibir mensagens de feedback
  message(msg: string): void {
    this.snack.open(`${msg}`, `OK`, {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      duration: 5000
    });
  }

  // Método para apagar uma história pelo ID
  apagar(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  // Método para atualizar uma história (usando o ID para localizar)
  atualizar(historia: historia): Observable<historia> {
    const url = `${this.baseUrl}/${historia.id}`;
    return this.http.put<historia>(url, historia);
  }

  // Método para fazer upload da imagem
  uploadImagem(id: number, imagem: FormData): Observable<void> {
    const url = `${this.baseUrl}/${id}/imagem`;
    return this.http.post<void>(url, imagem);
  }
  
}
