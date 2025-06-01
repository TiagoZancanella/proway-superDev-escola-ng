import { HttpClient } from "@angular/common/http";
import { ProfessoresEditar } from "../models/professores-editar";
import { ProfessoresCadastro } from "../models/professores-cadastro";
import { Observable } from "rxjs";
import { Professores } from "../models/professores";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ProfessoresService {


  private urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = "http://localhost:8000/api/professores"
  }

  cadastrar(professoresCadastro: ProfessoresCadastro): Observable<Professores> {
    return this.http.post<Professores>(this.urlApi, professoresCadastro);
  }
  obterTodos(): Observable<Professores[]> {
    return this.http.get<Professores[]>(this.urlApi)
  }
  obterPorId(id: number): Observable<Professores> {
    return this.http.get<Professores>(`${this.urlApi}/${id}`);
  }
  apagar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/${id}`);
  }
  editar(id: number, professoresEditar: ProfessoresEditar): Observable<Professores> {
    return this.http.put<Professores>(`${this.urlApi}/${id}`, professoresEditar);
  }


}
