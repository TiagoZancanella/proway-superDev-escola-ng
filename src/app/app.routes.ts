import { Routes } from '@angular/router';
import { CursosListaComponent } from './components/cursos/cursos-lista/cursos-lista.component';
import { CursoCadastroComponent } from './components/cursos/curso-cadastro/curso-cadastro.component';
import { AlunosListaComponent } from './components/alunos/alunos-lista/alunos-lista.component';
import { CursoEditarComponent } from './components/cursos/curso-editar/curso-editar.component';
import { FormacaoCadastroComponent } from './components/formacoes/formacao-cadastro/formacao-cadastro.component';
import { FormacaoListaComponent } from './components/formacoes/formacao-lista/formacao-lista.component';
import { FormacaoEditarComponent } from './components/formacoes/formacao-editar/formacao-editar.component';
import { ProfessoresCadastroComponent } from './components/professores/professores-cadastro/professores-cadastro.component';
import { ProfessoresEditarComponent } from './components/professores/professores-editar/professores-editar.component';
import { ProfessoresListaComponent } from './components/professores/professores-lista/professores-lista.component';

export const routes: Routes = [
    {path: "cursos", component: CursosListaComponent},
    {path: "cursos/cadastro", component: CursoCadastroComponent},
    {path: "alunos", component: AlunosListaComponent},
    {path: "cursos/editar/:id", component: CursoEditarComponent},
    {path: "professores/cadastro", component: ProfessoresCadastroComponent},
    {path: "professores", component: ProfessoresListaComponent},
    {path: "professores/editar/:id", component: ProfessoresEditarComponent},
    {path: "formacoes", component: FormacaoListaComponent},
    {path: "formacoes/cadastro", component: FormacaoCadastroComponent},
    {path: "formacoes/editar/:id", component: FormacaoEditarComponent},
    
];
