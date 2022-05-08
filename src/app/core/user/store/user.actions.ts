import { createAction, props } from '@ngrx/store';

export const UpdateUserToken = createAction('[USER] Update Token');

export const UpdateUserTokenSuccess = createAction(
  '[USER] Update Token Success',
  props<{ token: string; expirationDate: Date }>()
);

/**
 * should be fired when user logout
 *
 * @export
 * SBReducePlayerBalanceAction
 *  {Action}
 */
export const SBLogoutUser = createAction(
  '[USER] Logout User',
  props<{ authToken: string }>()
);

export const SBLogoutUserSuccess = createAction('[USER] Logout User Success');

export const SBLogoutUserFailure = createAction(
  '[USER] Logout User Failure',
  props<{ error: any }>()
);

/**
 * should be fired when token is invalid
 *
 * @export
 * TokenValidateFailureAction
 *  {Action}
 */
export const TokenValidateFailure = createAction(
  '[USER] Token Validate Failure',
  props<{ error: any }>()
);
