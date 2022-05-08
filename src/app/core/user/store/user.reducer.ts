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
  authToken: string;
  isChecked: boolean;
  loadingStatus: LoadingStatus;
  authStatus: AuthStatus;
  error?: Error;
}

export const UserInitialState: UserState = {
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

  on(userActions.TokenValidateFailure, (draft, action) => {
    draft.error = action.error;
    draft.authStatus = AuthStatus.Unauthorized;
    draft.loadingStatus = LoadingStatus.LOADED;
    return draft;
  }),

  on(userActions.SBLogoutUserFailure, (draft, action) => {
    draft.error = action.error;
    return draft;
  })
);

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
