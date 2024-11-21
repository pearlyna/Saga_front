import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Saga';

  mostrarHeaderFooter = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Hide header/footer for specific routes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Specify the routes where the header/footer should NOT appear
        this.mostrarHeaderFooter = !['/sobre', '/cadastro', '/adicionar', '/ler-historia'].includes(event.url);
      }
    });
  }
}
