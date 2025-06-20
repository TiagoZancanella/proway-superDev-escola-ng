import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matricula, MatriculaCadastar } from '../models/matriculas';
import { Observable } from 'rxjs';
''
@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  private urlApi: string;


  constructor(private http: HttpClient) {
    this.urlApi = "http://localhost:8000/api/matriculas";
  }
  cadastrar(form: MatriculaCadastar): Observable<Matricula> {
    return this.http.post<Matricula>(this.urlApi, form);
  }

  obterTodos(idCurso: number): Observable<Matricula[]> {
    let params = new HttpParams()
      .set("idCurso", idCurso.toString());
    // http://localhost:8000/api/matricula?idCurso=20
    return this.http.get<Matricula[]>(this.urlApi, { params });
  }

  obterPorId(id: number): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(`${this.urlApi}`);
  }

  apagar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`);
  }
}
