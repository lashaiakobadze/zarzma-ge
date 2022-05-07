import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CoreConfigModule } from './core/config/config.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreConfigModule.forRoot({
      preload: true,
      path: `config/config.json`
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
