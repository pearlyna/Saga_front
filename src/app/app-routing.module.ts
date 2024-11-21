import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AdicionarComponent } from './components/adicionar/adicionar.component';
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
    path: 'adicionar',
    component: AdicionarComponent, 
  },
  {
    path: 'ler-historia/:id',
    component: LerHistoriaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
