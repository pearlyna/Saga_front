import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Saga';
  mostrarHeaderFooter: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // header/footer não devem ser exibidos
        const rotasSemHeaderFooter = [
          '/sobre',
          '/cadastro',
          '/login',
          '/adicionar',
          '/ler-historia',
        ];

        // verifica se a rota atual é a de edição 
        const isEditRoute = event.urlAfterRedirects.startsWith('/editar');

        // se a rota atual for de edição, não mostrar o header/footer
        this.mostrarHeaderFooter = !rotasSemHeaderFooter.includes(event.urlAfterRedirects) && !isEditRoute;
      }
    });
  }
}
