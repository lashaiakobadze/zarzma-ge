import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';

import { AuthData, UserService } from '../services/user.service';
import { UpdateUserToken, UpdateUserTokenSuccess } from './user.actions';
@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  updateToken$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpdateUserToken),
      mergeMap(() => of(this.userService.getAuthData())),
      switchMap((authData: AuthData) => {
        if (!authData.token) {
          return [];
        }
        return [UpdateUserTokenSuccess(authData)];
      })
    );
  });
}
