import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  mergeMap,
  withLatestFrom
  // filter
} from 'rxjs/operators';
import { AuthData, UserService } from '../services/user.service';

import * as userActions from './user.actions';
// import * as settingsAction from '../../settings/store/settings.actions';
// import { selectSBisUserAuthenticated, selectSBuser } from './user.selectors';
// import { selectSBuserAuthStatus } from '.';

@Injectable()
export class UserEffects {
  timerId: any;
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store
  ) {}

  player$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.UpdateUserToken),
      switchMap(() => {
        // this.userService.getAuthData().pipe(
        //   // mergeMap((authData: AuthData) => userActions.UpdateUserTokenSuccess(authData.token, authData.expirationDate)),
        //     // catchError((err) => of(userActions.TokenValidateFailure(err)))
        //   mergeMap((_resp) => {
        //     return [];
        //   }),
        // );
        return [];
      })
    );
  });

  // isSessionActive$: Observable<Action> = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(userActions.SBIsSessionActive),
  //     withLatestFrom(this.store.select(selectSBuserAuthStatus)),
  //     filter(([_action, isAuthenticated]) =>
  //       this.continueAction(isAuthenticated, 60000)
  //     ),
  //     switchMap(([_action, _isAuthenticated]) =>
  //       this.userService.isSessionActive().pipe(
  //         mergeMap((_resp) => {
  //           return [];
  //         }),
  //         catchError((err) => {
  //           if (err.status > 500) {
  //             return of();
  //           }
  //           return of(userActions.SBClearUserInfoOnLogouSuccess());
  //         })
  //       )
  //     )
  //   );
  // });

  // player$: Observable<Action> = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(userActions.UpdateUserToken),
  //     map((action) => action.),
  //     // withLatestFrom(this.store.select(selectUser)),
  //     switchMap(([authToken, oldUser]) => {
  //       return this.userService.isPlayerAuthenticated(authToken).pipe(
  //         mergeMap((user: SBPlayer) => {
  //           const actions: any[] = [
  //             userActions.SBGetBalance(),
  //             settingsAction.SBUpdateCurrencyId({
  //               currencyId: user.currency
  //             }),
  //             userActions.SBUpdateUserTokenSuccess()
  //           ];
  //           if (user.id !== oldUser.id) {
  //             actions.push(userActions.SBUpdatePlayer({ user: user }));
  //           }
  //           return actions;
  //         }),
  //         catchError((err) => of(userActions.SBTokenValidateFailure(err)))
  //       );
  //     })
  //   );
  // });

  // logout$: Observable<Action> = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(userActions.SBLogoutUser),
  //     map((action) => action.authToken),
  //     withLatestFrom(this.store.select(selectSBisUserAuthenticated)),
  //     filter(([_authToken, isAuthenticated]) => isAuthenticated),
  //     switchMap(([authToken, _state]) => {
  //       return this.userService.logout(authToken).pipe(
  //         map(() => userActions.SBLogoutUserSuccess()),
  //         catchError((err) => of(userActions.SBLogoutUserFailure(err)))
  //       );
  //     })
  //   );
  // });

  /**
   * @description This function returns true or false. During current time interval always returns false.
   * @param isAuthenticated User status
   * @param ignoreTime Time in miliseconds to ignore
   * @returns boolean
   */
  //   private continueAction(
  //     isAuthenticated: SBAuthStatus,
  //     ignoreTime: number
  //   ): boolean {
  //     if (!this.timerId) {
  //       this.timerId = setInterval(() => {
  //         clearInterval(this.timerId);
  //         this.timerId = undefined;
  //       }, ignoreTime);
  //       return isAuthenticated === SBAuthStatus.Authorized;
  //     }
  //     return false;
  //   }
}
