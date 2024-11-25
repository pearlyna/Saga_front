import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { AdicionarComponent } from './components/adicionar/adicionar.component';
import { EditarComponent } from './components/editar/editar.component';
import { LerHistoriaComponent } from './components/ler-historia/ler-historia.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'sobre',
    component: SobreComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'adicionar',
    component: AdicionarComponent,
  },
  {
    path: 'editar/:id',
    component: EditarComponent,
  },
  {
    path: 'ler-historia',
    component: LerHistoriaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
