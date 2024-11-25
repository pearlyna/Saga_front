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
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<historia[]> {
    return this.http.get<historia[]>(this.baseUrl);
  }

  findById(id: number): Observable<historia> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<historia>(url);
  }

  message(msg: string): void {
    this.snack.open(`${msg}`, `OK`, {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      duration: 5000
    });
  }

  apagar(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  atualizar(id: number, historia: any): Observable<historia> {
    const url = `${this.baseUrl}/${historia.id}`;
    return this.http.put<historia>(url, historia);
  }

  adicionarHistoria(historia: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, historia);
  }

  uploadImagem(id: number, formData: FormData): Observable<void> {
    const url = `${this.baseUrl}/${id}/imagem`;
    return this.http.post<void>(url, formData);
  }
}
