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
    this.urlApi = "http://localhost:8000/api/formacao/"
  }

  cadastrar(formacaoCadastro: Formacao): Observable<Formacao> {
    return this.http.post<Formacao>(this.urlApi, formacaoCadastro);
  }
  obterTodos(): Observable<Formacao[]> {
    return this.http.get<Formacao[]>(this.urlApi)
  }
  obterPorId(id: number): Observable<Formacao> {
    return this.http.get<Formacao>(`${this.urlApi}/${id}`);
  }
  apagar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/${id}`);
  }
  // editar(id: number, formacaoEditar: FormacaoEditar): Observable<Formacao> {
  //   return this.http.put<Formacao>(`${this.urlApi}/${id}`, formacaoEditar);
  // }
}