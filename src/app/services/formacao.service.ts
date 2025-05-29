import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Formacao } from "../models/formacao";
import { Injectable } from "@angular/core";

@Injectable({

  providedIn: "root"
})

export class FormacaoService {

  private urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = "http://localhost:8000/api/formacao"
  }

  cadastrar(formacaoCadastro: Formacao): Observable<Formacao> {
    return this.http.post<Formacao>(this.urlApi, formacaoCadastro);
  }
  //   obterTodos(): Observable<Curso[]> {
  //     return this.http.get<Curso[]>(this.urlApi)
  //   }
  //   obterPorId(id: number): Observable<Curso> {
  //     return this.http.get<Curso>(`${this.urlApi}/${id}`);
  //   }
  //   apagar(id: number): Observable<any> {
  //     return this.http.delete<any>(`${this.urlApi}/${id}`);
  //   }
  //   editar(id: number, cursoEditar: CursoEditar): Observable<Curso> {
  //     return this.http.put<Curso>(`${this.urlApi}/${id}`, cursoEditar);
  //   }
}