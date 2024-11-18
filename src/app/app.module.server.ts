import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module'; // Import the AppModule
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule, // Correctly import AppModule
    ServerModule, // Ensure ServerModule is imported
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
