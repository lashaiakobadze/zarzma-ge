import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CoreConfigModule } from './core/config/config.module';
import { ApiService, CoreConfigReducer } from './core';
import { UserEffects, UserModule, UserReducer } from './core/user';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
    StoreModule.forFeature('user', UserReducer),
    StoreModule.forFeature('coreConfig', CoreConfigReducer),
    EffectsModule.forRoot(),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
