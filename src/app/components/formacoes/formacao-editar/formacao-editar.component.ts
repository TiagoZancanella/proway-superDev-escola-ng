import { Component } from '@angular/core';
import { Formacao } from '../../../models/formacao';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormacaoEditar } from '../../../models/formacao-editar';
import { Router, ActivatedRoute } from '@angular/router';
import { CursoEditar } from '../../../models/curso-editar';
import { CursoService } from '../../../services/curso.service';
import { FormacaoService } from '../../../services/formacao.service';

@Component({
  selector: 'app-formacao-editar',
  imports: [
    FormsModule,
    FloatLabelModule,
    InputMaskModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './formacao-editar.component.html',
  styleUrl: './formacao-editar.component.css'
})
export class FormacaoEditarComponent {
  formacao: FormacaoEditar;
  idEditar: number;

  constructor(
    private router: Router,
    private formacaoService: FormacaoService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
  ) {
    this.formacao = new FormacaoEditar();
    this.idEditar = parseInt(this.activateRoute.snapshot.paramMap.get("id")!.toString());
  }
  ngOnInit() {
    this.formacaoService.obterPorId(this.idEditar).subscribe({
      next: formacao => this.preencherCamposParaEditar(formacao),
      error: erro => console.log("Ocorreu um erro ao carregar dados do formacao:" + erro),
    });
  }
  redirecionarEditar(IdFormacoes: number) {
    this.router.navigate(["/formacoes/editar/" + IdFormacoes])
  }
  private preencherCamposParaEditar(formacao: Formacao) {
    this.formacao.descricao = formacao.descricao;
  }


  editar() {
    this.formacaoService.editar(this.idEditar, this.formacao).subscribe({
      next: formacao => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao editar o formacao:" + erro),
    }




    )

  }


  private apresentarMensagemCadastrado(){
    this.messageService.add({ severity:"sucess", summary: "sucesso", detail: "formacao alterado com sucesso"});
    this.router.navigate(["/formacoes"]);
    }
}