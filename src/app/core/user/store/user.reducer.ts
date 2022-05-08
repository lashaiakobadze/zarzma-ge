import { on, Action } from '@ngrx/store';

import { createImmerReducer } from '../../immerNgrx';

import * as userActions from './user.actions';

export enum LoadingStatus {
  NOT_LOADED = 'not-loaded',
  LOADING = 'loading',
  PARTIALY_LOADING = 'partialy-loading',
  EMPTY = 'empty',
  PARTIALY_LOADED = 'partialy-loaded',
  LOADED = 'loaded',
  Error = 'error'
}

export enum AuthStatus {
  Undefined,
  Authorized,
  Unauthorized
}

export interface UserState {
  // user: SBPlayer;
  authToken: string;
  isChecked: boolean;
  loadingStatus: LoadingStatus;
  authStatus: AuthStatus;
  error?: Error;
}

export const UserInitialState: UserState = {
  // user: new SBPlayer(),
  isChecked: false,
  loadingStatus: LoadingStatus.NOT_LOADED,
  authStatus: AuthStatus.Undefined,
  authToken: 'simulateToken'
};

const reducer = createImmerReducer(
  UserInitialState,

  on(userActions.UpdateUserToken, (draft, _action) => {
    draft.loadingStatus = LoadingStatus.LOADING;
    return draft;
  }),

  on(userActions.UpdateUserTokenSuccess, (draft, action) => {
    draft.isChecked = true;
    draft.authStatus = action.token
      ? AuthStatus.Authorized
      : AuthStatus.Unauthorized;
    draft.authToken = action.token || 'simulateToken';
    draft.loadingStatus = LoadingStatus.LOADED;
    return draft;
  }),

  // on(userActions.SBTokenStatusChecked, (draft, _action) => {
  //   draft.authStatus =
  //     draft.user?.active === 0
  //       ? SBAuthStatus.Authorized
  //       : SBAuthStatus.Unauthorized;
  //   draft.isChecked = true;
  //   return draft;
  // }),

  on(userActions.TokenValidateFailure, (draft, action) => {
    draft.error = action.error;
    draft.authStatus = AuthStatus.Unauthorized;
    draft.loadingStatus = LoadingStatus.LOADED;
    return draft;
  })

  // on(userActions.SBLogoutUserSuccess, (draft, _action) => {
  //   return clearUserSpecificInfo(draft);
  // }),

  // on(userActions.SBClearUserInfoOnLogouSuccess, (draft, _action) => {
  //   return clearUserSpecificInfo(draft);
  // }),

  // on(userActions.SBSessionExpired, (draft, _action) => {
  //   const user: SBPlayer = new SBPlayer();
  //   user.currency = draft.user.currency;
  //   draft.user = user;
  //   draft.authToken = null;
  //   draft.authStatus = SBAuthStatus.Unauthorized;
  //   draft.retail = null;
  //   return draft;
  // }),

  // on(userActions.SBLogoutUserFailure, (draft, action) => {
  //   draft.error = action.error;
  //   return draft;
  // })
);

// function clearUserSpecificInfo(draft: UserState): UserState {
//   const user: SBPlayer = new SBPlayer();
//   draft.authStatus = SBAuthStatus.Unauthorized;
//   user.currency = draft.user.currency;
//   draft.user = user;
//   draft.authToken = null;
//   draft.retail = null;
//   return draft;
// }

/**
 * user reducers
 *
 * @export
 * @param [state=initialState]
 * @param action
 * s
 */
export function UserReducer(state: UserState, action: Action) {
  return reducer(state, action);
}
