import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';

// import { UserReducer } from './store/user.reducer';
// import { UserEffects } from './store/user.effects';

import { UserService } from './services/user.service';

@NgModule({
  imports: [
    // StoreModule.forRoot({})
    // StoreModule.forFeature('user', UserReducer),
    // EffectsModule.forFeature([UserEffects])
  ],
  providers: [UserService]
})
export class UserModule {}
