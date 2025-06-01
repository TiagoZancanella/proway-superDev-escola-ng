import { Component, Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { ProfessoresService } from '../../../services/professores.service';
import { Professores } from '../../../models/professores';



@Component({
  selector: 'app-professores-lista',
  imports: [TableModule, CommonModule, ToastModule, ConfirmDialogModule, ButtonModule],
  providers: [MessageService, ConfirmationService,],
  templateUrl: './professores-lista.component.html',
  styleUrl: './professores-lista.component.css',
  standalone: true,
})

export class ProfessoresListaComponent {
  professores: Array<Professores> = [];
  carregandoProfessores?: boolean;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private professoresService: ProfessoresService,
  ) { }

  ngOnInit(): void {
    this.carregarProfessores();
  }

  private carregarProfessores() {
    this.carregandoProfessores = true;
    this.professoresService.obterTodos().subscribe({
      next: (professores) => this.professores = professores,
      error: (erro) => console.log("Ocorreu um erro ao carregar a lista de professores: " + erro),
      complete: () => this.carregandoProfessores = false
    });
  }

  redirecionarPaginaCadastro() {
    this.router.navigate(["/professores/cadastro"]);
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
    this.professoresService.apagar(id).subscribe({
      next: () => this.apresentarMensagemApagando(),
      error: (erro) => console.log(`Ocorreu um erro ao apagar o professor: ${erro}`)
    });
  }

  private apresentarMensagemApagando() {
    this.messageService.add({
      severity: "success",
      summary: "Sucesso",
      detail: "Formação removida com sucesso",
    });
    this.carregarProfessores();
  }

  redirecionarEditar(idProfessores: number) {
    this.router.navigate(["/professores/editar/" + idProfessores]);
  }
}