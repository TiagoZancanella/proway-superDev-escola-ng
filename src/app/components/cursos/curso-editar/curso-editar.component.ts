import { Component } from '@angular/core';
import { CursoEditar } from '../../../models/curso-editar';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Curso } from '../../../models/curso';
import { TableModule } from 'primeng/table';
import { Matricula, MatriculaCadastar } from '../../../models/matriculas';

@Component({
  selector: 'app-curso-editar',
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    InputMaskModule,
    ButtonModule,
    ToastModule,
    TableModule,
  ],
  providers:[MessageService],
  templateUrl: './curso-editar.component.html',
  styleUrl: './curso-editar.component.css'
})
export class CursoEditarComponent {
  curso: CursoEditar;
  idEditar: number;
  matriculaCadastrar: MatriculaCadastar;
  modalCadastrarVisible: boolean;
  matriculas: Matricula[];


  constructor(
    private router: Router,
    private cursoService: CursoService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
  ){
    this.curso = new CursoEditar();
    this.idEditar = parseInt(this.activateRoute.snapshot.paramMap.get("id")!.toString());
  
    this.matriculaCadastrar = new MatriculaCadastar();
    this.modalCadastrarVisible = false;
    this.matriculas = [];
  }
  
  ngOnInit(){
    this.cursoService.obterPorId(this.idEditar).subscribe({
      next:curso => this.preencherCamposParaEditar(curso),
      error: erro => console.log("Ocorreu um erro ao carregar dados do curso:" + erro),
    });
  }
  
  redirecionarEditar(IdCurso: number){
      this.router.navigate(["/cursos/editar/" + IdCurso])
    }
  private preencherCamposParaEditar(curso: Curso){
    this.curso.nome = curso.nome;
    this.curso.sigla = curso.sigla;
  }

  // cadastrar(){
  //   this.cursoService.cadastrar(this.curso).subscribe({
  //     next: aluno => this.apresentarMensagemCadastrado(),
  //     error: erro => console.log("Ocorreu um erro ao editar o aluno:" + erro),
  //   })

  editar(){
    this.cursoService.editar(this.idEditar, this.curso).subscribe({
      next: curso => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao editar o curso:" + erro),
    })
  }

  // private apresentarMensagemCadastrado(){
  //   this.messageService.add({ severity:"sucess", summary: "sucesso", detail: "Curso alterado com sucesso"});
  //   this.router.navigate(["/cursos"]);
  //   }
  


  private apresentarMensagemCadastrado(){
    this.messageService.add({ severity:"sucess", summary: "sucesso", detail: "Curso alterado com sucesso"});
    this.router.navigate(["/cursos"]);
    }

  abrirModalRegistrarMatricula(){

    }
}