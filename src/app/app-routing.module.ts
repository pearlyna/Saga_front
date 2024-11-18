import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './omponents/home/home.component';
import { SobreComponent } from './omponents/sobre/sobre.component';
import { CadastroComponent } from './omponents/cadastro/cadastro.component';
import { AdicionarComponent } from './omponents/adicionar/adicionar.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
