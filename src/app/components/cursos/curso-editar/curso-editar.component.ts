import { Component } from '@angular/core';
import { CursoEditar } from '../../../models/curso-editar';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Curso } from '../../../models/curso';
import { TableModule } from 'primeng/table';
import { Matricula, MatriculaCadastar } from '../../../models/matriculas';
import { DialogModule } from 'primeng/dialog';
import { AlunoSelect } from '../../../models/aluno';
import { SelectModule } from 'primeng/select';
import { AlunoService } from '../../../services/aluno.service';
import { MatriculaService } from '../../../services/matricula.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DataHoraCustomizadaPipe } from "../../../pipes/data-hora-customizada.pipe";
import { DatePipe } from '@angular/common';

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
    DialogModule,
    SelectModule,
    ConfirmDialog,
    DataHoraCustomizadaPipe
],
  providers: [MessageService, MatriculaService, DataHoraCustomizadaPipe,ConfirmationService, DatePipe],
  templateUrl: './curso-editar.component.html',
  styleUrl: './curso-editar.component.css'
})
export class CursoEditarComponent {
  curso: CursoEditar;
  idEditar: number;
  matriculaCadastrar: MatriculaCadastar;
  modalCadastrarVisible: boolean;
  matriculas: Matricula[];
  alunos: AlunoSelect[];


  constructor(
    private matriculaService: MatriculaService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private cursoService: CursoService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private alunoService: AlunoService,
  ) {
    this.curso = new CursoEditar();
    this.idEditar = parseInt(this.activateRoute.snapshot.paramMap.get("id")!.toString());

    this.matriculaCadastrar = new MatriculaCadastar();
    this.modalCadastrarVisible = false;
    this.matriculas = [];
    this.alunos = [];
  }

  ngOnInit() {
    this.cursoService.obterPorId(this.idEditar).subscribe({
      next: curso => this.preencherCamposParaEditar(curso),
      error: erro => console.log("Ocorreu um erro ao carregar dados do curso:" + erro),
    });
    this.carregarMatriculas();
  }

  redirecionarEditar(IdCurso: number) {
    this.router.navigate(["/cursos/editar/" + IdCurso])
  }
  private preencherCamposParaEditar(curso: Curso) {
    this.curso.nome = curso.nome;
    this.curso.sigla = curso.sigla;
  }

  // cadastrar(){
  //   this.cursoService.cadastrar(this.curso).subscribe({
  //     next: aluno => this.apresentarMensagemCadastrado(),
  //     error: erro => console.log("Ocorreu um erro ao editar o aluno:" + erro),
  //   })

  editar() {
    this.cursoService.editar(this.idEditar, this.curso).subscribe({
      next: curso => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao editar o curso:" + erro),
    })
  }

  // private apresentarMensagemCadastrado(){
  //   this.messageService.add({ severity:"sucess", summary: "sucesso", detail: "Curso alterado com sucesso"});
  //   this.router.navigate(["/cursos"]);
  //   }



  private apresentarMensagemCadastrado() {
    this.messageService.add({ severity: "sucess", summary: "sucesso", detail: "Curso alterado com sucesso" });
    this.router.navigate(["/cursos"]);
  }




  abrirModalRegistrarMatricula() {
    this.carregarAlunos();
    this.modalCadastrarVisible = true
  }
  matricular() {
    this.matriculaCadastrar.cursoId = this.idEditar;
    this.matriculaService.cadastrar(this.matriculaCadastrar).subscribe({
      next: matricula => this.finalizarCadastrarMatricula(matricula),
      error: erro => this.apresentarMensagemErroCadastrarMatricula(erro)
    })
  }

  finalizarCadastrarMatricula(matricula: Matricula) {
    this.apresentarMensagemMatriculaCadastradaComSucesso(matricula)
    this.limparModalMatricula();
    this.carregarMatriculas();
    this.modalCadastrarVisible = false
  }


  limparModalMatricula() {
    this.matriculaCadastrar = new MatriculaCadastar();
  }

  apresentarMensagemErroCadastrarMatricula(error: any) {
    this.messageService.add({ detail: "Erro ao cadastar matricula", severity: "error" });
    console.error(error);
  }



  apresentarMensagemMatriculaCadastradaComSucesso(matricula: Matricula) {
    this.messageService.add({
      detail: `Marticula cadastrado com sucesso para o aluno '${matricula.aluno.nome}'`,
      severity: "sucess"
    })
  }



  private carregarAlunos() {
    this.alunoService.obterTodos().subscribe({
      next: alunos => this.alunos = alunos.map(aluno => new AlunoSelect(
        `${aluno.nome} ${aluno.sobrenome} ${aluno.cpf}`, aluno.id!
      )).sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto)),
      error: erro => this.apresentarMensagemErroCarregarAlunos(erro)
    })
  }
  apresentarMensagemErroCarregarAlunos(error: any) {
    this.messageService.add({ detail: "Erro ao carregar os alunos", severity: "Error" });
    console.error(error)
  }

  carregarMatriculas() {
    this.matriculaService.obterTodos(this.idEditar).subscribe({
      next: matriculas => this.matriculas = matriculas,
      error: erro => this.aprensentarMensagemErroCarregarMatriculas(erro)
    })
  }
  aprensentarMensagemErroCarregarMatriculas(error: any) {
    this.messageService.add({ detail: "Erro ao carregar as matriculas", severity: "error" });
    console.error(error);
  }
















  confirmarParaApagar(event: Event, matriculaId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente apagar?',
      header: 'CUIDADO',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Deletar',
        severity: 'danger',
      },
      accept: () => this.apagarMatricula(matriculaId)
    });
  }
  private apagarMatricula(matriculaId: number) {
    this.matriculaService.apagar(matriculaId).subscribe({
      next: () => this.finalizarMatriculaApagada(),
      error: erro => console.log("Ocorreu um erro ao apagar: " + erro),
    })
  }


  private finalizarMatriculaApagada(): void {
    this.apresentarMensagemMatriculaApagado();
    this.carregarMatriculas();
  }

  private apresentarMensagemMatriculaApagado() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Matricula removida com sucesso' });
    this.carregarAlunos();
  }




}