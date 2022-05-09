import { on, Action } from '@ngrx/store';

import { createImmerReducer } from '../../immerNgrx';
import { LoadingStatus } from '../models/authLoadStatus.model';
import { AuthStatus } from '../models/authStatus.model';

import * as userActions from './user.actions';
export interface UserState {
  authToken: string;
  expiresInDuration: Date;
  isChecked: boolean;
  loadingStatus: LoadingStatus;
  authStatus: AuthStatus;
  error?: Error;
}

export const UserInitialState: UserState = {
  authToken: 'simulateToken',
  expiresInDuration: null,
  isChecked: false,
  loadingStatus: LoadingStatus.NOT_LOADED,
  authStatus: AuthStatus.Undefined
};

const reducer = createImmerReducer(
  UserInitialState,
  on(userActions.SignUpUser, (draft, _action) => {
    draft.authStatus = AuthStatus.Unauthorized;
    draft.loadingStatus = LoadingStatus.LOADING;
    return draft;
  }),

  on(userActions.SignUpUserSuccess, (draft, _action) => {
    draft.authStatus = AuthStatus.Unauthorized;
    draft.loadingStatus = LoadingStatus.LOADED;
    return draft;
  }),

  on(userActions.SignUpUserFailure, (draft, action) => {
    draft.error = action.error;
    draft.authStatus = AuthStatus.Unauthorized;
    draft.loadingStatus = LoadingStatus.LOADED;
    return draft;
  }),

  on(userActions.LoginUser, (draft, _action) => {
    draft.authStatus = AuthStatus.Unauthorized;
    draft.loadingStatus = LoadingStatus.LOADING;
    return draft;
  }),

  on(userActions.LoginUserFailure, (draft, action) => {
    draft.error = action.error;
    draft.authStatus = AuthStatus.Unauthorized;
    draft.loadingStatus = LoadingStatus.LOADED;
    return draft;
  }),

  on(userActions.LogoutUser, (draft, _action) => {
    draft.authStatus = AuthStatus.Unauthorized;
    draft.loadingStatus = LoadingStatus.LOADING;
    return draft;
  }),

  on(userActions.LogoutUserSuccess, (draft, _action) => {
    draft.authToken = null;
    draft.authStatus = AuthStatus.Unauthorized;
    draft.expiresInDuration = null;
    draft.loadingStatus = LoadingStatus.LOADED;
    return draft;
  }),

  on(userActions.LogoutUserFailure, (draft, action) => {
    draft.error = action.error;
    draft.loadingStatus = LoadingStatus.LOADED;
    return draft;
  }),

  on(userActions.UpdateUser, (draft, _action) => {
    draft.loadingStatus = LoadingStatus.LOADING;
    return draft;
  }),

  on(userActions.UpdateUserSuccess, (draft, action) => {
    const now = new Date();
    draft.expiresInDuration = new Date(now.getTime() + action.expiresIn * 1000);

    draft.isChecked = true;
    draft.authStatus = action.token
      ? AuthStatus.Authorized
      : AuthStatus.Unauthorized;

    draft.authToken = action.token || 'simulateToken';
    draft.loadingStatus = LoadingStatus.LOADED;
    return draft;
  }),

  on(userActions.UpdateUserFailure, (draft, action) => {
    draft.error = action.error;
    draft.authStatus = AuthStatus.Unauthorized;
    draft.loadingStatus = LoadingStatus.LOADED;
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
