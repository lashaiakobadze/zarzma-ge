import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

// export const selectUser = createSelector(
//   selectUserState,
//   (state: UserState) => state.user
// );

export const selectUserToken = createSelector(
  selectUserState,
  (state: UserState) => state?.authToken
);

export const selectUuthenticationError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

// export const selectUsUserAuthenticated = createSelector(
//   selectUserState,
//   (state: UserState) => state.user.active == 0
// );

// export const selectUserCurrency = createSelector(
//   selectUserState,
//   (state: UserState) => state.user.active
// );

export const selectUuthCheckStatus = createSelector(
  selectUserState,
  (state: UserState) => state.isChecked
);

export const selectUserAuthStatus = createSelector(
  selectUserState,
  (state: UserState) => state.authStatus
);
