import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfessoresEditar } from '../../../models/professores-editar';
import { ProfessoresService } from '../../../services/professores.service';
import { Professores } from '../../../models/professores';



@Component({
  selector: 'app-professores-editar',
  imports: [
    FormsModule,
    FloatLabelModule,
    InputMaskModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './professores-editar.component.html',
  styleUrl: './professores-editar.component.css',
  providers: [MessageService],
})
export class ProfessoresEditarComponent {
  professores: ProfessoresEditar;
  idEditar: number;

  constructor(
    private router: Router,
    private professoresService: ProfessoresService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
  ) {
    this.professores = new ProfessoresEditar();
    this.idEditar = parseInt(this.activateRoute.snapshot.paramMap.get("id")!.toString());
  }
  ngOnInit() {
    this.professoresService.obterPorId(this.idEditar).subscribe({
      next: professores => this.preencherCamposParaEditar(professores),
      error: erro => console.log("Ocorreu um erro ao carregar dados do professores:" + erro),
    });
  }
  redirecionarEditar(IdProfessores: number) {
    this.router.navigate(["/professores/editar/" + IdProfessores])
  }
  private preencherCamposParaEditar(professores: Professores) {
    // this.professores.?? = professores.???;

    // ????
  }


  editar() {
    this.professoresService.editar(this.idEditar, this.professores).subscribe({
      next: professores => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao editar o professores:" + erro),
    }
    )
  }


  private apresentarMensagemCadastrado() {
    this.messageService.add({ severity: "sucess", summary: "sucesso", detail: "formacao alterado com sucesso" });
    this.router.navigate(["/formacoes"]);
  }
}