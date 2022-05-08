import { createAction, props } from '@ngrx/store';

/**
 * should be fired to set/update user token
 *
 * @export
 * UpdateUserTokenAction
 *  {Action}
 */
// export const UpdateUserToken = createAction(
//   '[USER] Update Token',
//   props<{ authToken: string }>()
// );
export const UpdateUserToken = createAction('[USER] Update Token');

/**
 * should be fired when token successfully updated
 *
 * @export
 * UpdateUserTokenActionSuccess
 *  {Action}
 */
export const UpdateUserTokenSuccess = createAction(
  '[USER] Update Token Success',
  props<{ token: string; expirationDate: Date }>()
);

// export const SBTokenStatusChecked = createAction('[USER] Token Status Checked');

// /**
//  * should be fired when user logout
//  *
//  * @export
//  * SBReducePlayerBalanceAction
//  *  {Action}
//  */
// export const SBLogoutUser = createAction(
//   '[USER] Logout User',
//   props<{ authToken: string }>()
// );

// export const SBLogoutUserSuccess = createAction('[USER] Logout User Success');

// export const SBClearUserInfoOnLogouSuccess = createAction(
//   '[USER] Clear User Info On Logout Success'
// );

// export const SBSessionExpired = createAction('[USER] Session Expired');

// export const SBLogoutUserFailure = createAction(
//   '[USER] Logout User Failure',
//   props<{ error: any }>()
// );

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

// export const SBIsSessionActive = createAction('[USER] Is Session Active');
