import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, catchError } from 'rxjs/operators';

import { AuthData } from '../models/authData.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import {
  AutoAuthUser,
  LoginUser,
  LoginUserFailure,
  LoginUserSuccess,
  LogoutUser,
  LogoutUserSuccess,
  SignUpUser,
  SignUpUserFailure,
  SignUpUserSuccess,
  UpdateUser,
  UpdateUserFailure,
  UpdateUserSuccess
} from './user.actions';
@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  SignUpUser$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(SignUpUser),
      switchMap((action: User) => {
        const user = new User(action.username, action.password);
        return this.userService.signUp(user.username, user.password).pipe(
          mergeMap((signUpMsg: string) => {
            if (signUpMsg) {
              return [SignUpUserSuccess({ signUpMsg })];
            }
            return [];
          }),
          catchError((err: any) => of(SignUpUserFailure(err)))
        );
      })
    );
  });

  LoginUser$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginUser),
      switchMap((action: User) => {
        const user = new User(action.username, action.password);
        return this.userService.login(user.username, user.password).pipe(
          mergeMap((authData: AuthData) => {
            const actions: any[] = [];
            const token = authData.token;

            if (token) {
              const expiresIn = authData.expiresIn;
              this.userService.setAuthTimer(expiresIn);
              actions.push(LoginUserSuccess({ token, expiresIn }));
              // TODO this.router.navigate(['/admin/chantsPanel']);
            }
            return actions;
          }),
          catchError((err: any) => of(LoginUserFailure(err)))
        );
      })
    );
  });

  LoginUserSuccess$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginUserSuccess),
      switchMap((action: AuthData) => {
        if (!action.token) {
          return [];
        }
        return [
          UpdateUserSuccess({
            token: action.token,
            expiresIn: action.expiresIn
          })
        ];
      })
    );
  });

  logoutUser$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(LogoutUser),
      mergeMap(() => of(this.userService.logout())),
      switchMap(() => {
        // TODO this.router.navigate(['/admin']);
        return [LogoutUserSuccess()];
      })
    );
  });

  UpdateUser$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpdateUser),
      mergeMap(() => of(this.userService.getAuthData())),
      switchMap((authData: AuthData) => {
        if (!authData.token) {
          return [
            UpdateUserFailure({ error: "user don't updated successfully" })
          ];
        }
        return [UpdateUserSuccess(authData)];
      })
    );
  });

  AutoAuthUser$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(AutoAuthUser),
      mergeMap(() => of(this.userService.getAuthData())),
      switchMap((authData: AuthData) => {
        const authInformation = authData;
        if (!authInformation) {
          return [];
        }
        const now = new Date();
        const expiresIn = authInformation.expiresIn - now.getTime();

        if (expiresIn > 0) {
          this.userService.setAuthTimer(expiresIn / 1000);
          return [UpdateUserSuccess(authData)];
        }

        return [];
      })
    );
  });
}
