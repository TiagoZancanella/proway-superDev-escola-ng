import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProfessoresCadastro } from '../../../models/professores-cadastro';
import { ProfessoresService } from '../../../services/professores.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-professores-cadastro',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    ],
  providers: [MessageService, ProfessoresService],
  templateUrl: './professores-cadastro.component.html',
  styleUrls: ['./professores-cadastro.component.css']
})
export class ProfessoresCadastroComponent {

  professores = new ProfessoresCadastro();


  ngOnInit(){
    this.formacoes
  }


  formacoes = [
    { label: 'Engenheiro', value: 'Engenheiro' },
    { label: 'Professor', value: 'Professor' },
    { label: 'Médico', value: 'Médico' },
    { label: 'Advogado', value: 'Advogado' },
    { label: 'Enfermeiro', value: 'Enfermeiro' },
    { label: 'Desenvolvedor de Software', value: 'Desenvolvedor de Software' },
    { label: 'Contador', value: 'Contador' },
    { label: 'Arquiteto', value: 'Arquiteto' },
    { label: 'Psicólogo', value: 'Psicólogo' },
    { label: 'Designer Gráfico', value: 'Designer Gráfico' }
  ];

  constructor(
    private router: Router,
    private professoresService: ProfessoresService,
    private messageService: MessageService
  ) {}

  
  cadastrar() {
    this.professoresService.cadastrar(this.professores).subscribe({
      next: () => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao cadastrar o professor: " + erro)
    });
  }

  private apresentarMensagemCadastrado() {
    this.messageService.add({
      severity: "success",
      summary: "Sucesso",
      detail: "Professor cadastrado com sucesso"
    });
    this.router.navigate(["/professores"]);
  }
}
