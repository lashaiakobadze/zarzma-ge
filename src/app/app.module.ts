import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CoreConfigModule } from './core/config/config.module';
import { UserModule } from './core/user';
import { ReplayService } from './core/sloth/sloth-router-replay.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    CoreConfigModule.forRoot({
      preload: true,
      path: `config/config.json`
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot()
  ],
  providers: [ReplayService],
  bootstrap: [AppComponent]
})
export class AppModule {}
