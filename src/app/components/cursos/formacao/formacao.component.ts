import { Component } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormacaoService } from '../../../services/formacao.service';
import { Formacao } from '../../../models/formacao';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-formacao',
  imports: [FormsModule,InputTextModule, TextareaModule, ButtonModule],
  templateUrl: './formacao.component.html',
  standalone: true,
  styleUrl: './formacao.component.css',
  providers: [MessageService, FormacaoService]
})
export class FormacaoComponent {
  formacao: Formacao = new Formacao();

  constructor(
    private router: Router,
    private formacaoService: FormacaoService,
    private messageService: MessageService,
  ) {}

  cadastrar() {
    this.formacaoService.cadastrar(this.formacao).subscribe({
      next: () => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao cadastrar a formação: " + erro),
    });
  }

  private apresentarMensagemCadastrado() {
    this.messageService.add({ severity: "success", summary: "sucesso", detail: "Formação cadastrada com sucesso" });
    this.router.navigate(["/formacoes"]);
  }
}
