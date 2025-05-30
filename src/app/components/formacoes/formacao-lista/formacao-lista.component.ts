import { Component } from "@angular/core";
import { Formacao } from "../../../models/formacao";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { FormacaoService } from "../../../services/formacao.service";
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-formacao-lista',
  templateUrl: './formacao-lista.component.html',
  styleUrls: ['./formacao-lista.component.css'],
  imports: [ TableModule, CommonModule, ToastModule, ConfirmDialogModule,ButtonModule],
  providers: [MessageService, ConfirmationService,]
})
export class FormacaoListaComponent {
  formacao: Array<Formacao> = [];
  carregandoFormacoes?: boolean;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formacaoService: FormacaoService
  ) { }

  ngOnInit(): void {
    this.carregarFormacoes();
  }

  private carregarFormacoes() {
    this.carregandoFormacoes = true;
    this.formacaoService.obterTodos().subscribe({
      next: (formacoes) => this.formacao = formacoes,
      error: (erro) => console.log("Ocorreu um erro ao carregar a lista de formações: " + erro),
      complete: () => this.carregandoFormacoes = false
    });
  }

  redirecionarPaginaCadastro() {
    this.router.navigate(["/formacoes/formacao-cadastro"]);
  }

  confirmarParaApagar(event: Event, id: number) {
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
        label: 'Apagar',
      },
      accept: () => this.apagar(id)
    });
  }

  private apagar(id: number) {
    this.formacaoService.apagar(id).subscribe({
      next: () => this.apresentarMensagemApagando(),
      error: (erro) => console.log(`Ocorreu um erro ao apagar a formação: ${erro}`)
    });
  }

  private apresentarMensagemApagando() {
    this.messageService.add({
      severity: "success",
      summary: "Sucesso",
      detail: "Formação removida com sucesso",
    });
    this.carregarFormacoes();
  }

  redirecionarEditar(idFormacao: number) {
    this.router.navigate(["/formacoes/editar/" + idFormacao]);
  }
}
