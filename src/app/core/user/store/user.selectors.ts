import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserToken = createSelector(
  selectUserState,
  (state: UserState) => state?.authToken
);

export const selectUuthenticationError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectUuthCheckStatus = createSelector(
  selectUserState,
  (state: UserState) => state.isChecked
);

export const selectUserAuthStatus = createSelector(
  selectUserState,
  (state: UserState) => state.authStatus
);
