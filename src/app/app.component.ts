import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Fix here
})

export class AppComponent {
  title = 'Saga';

   showHeaderFooter = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Hide header/footer for specific routes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Specify the routes where the header/footer should NOT appear
        this.showHeaderFooter = !['/sobre', '/cadastro', '/adicionar'].includes(event.url);
      }
    });
  }
}
