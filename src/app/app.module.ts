import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SobreComponent } from './components/sobre/sobre.component';
import { AdicionarComponent } from './components/adicionar/adicionar.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ReadAllComponent } from './components/read-all/read-all.component';
import { MatIconModule } from '@angular/material/icon';  
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';  // Updated import
import { LerHistoriaComponent } from './components/ler-historia/ler-historia.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReadAllComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    SobreComponent, 
    CadastroComponent,
    AdicionarComponent,
    LerHistoriaComponent,

  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // New way to provide HttpClient
    provideClientHydration(),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
