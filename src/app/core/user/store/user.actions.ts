import { createAction, props } from '@ngrx/store';

export const SignUpUser = createAction(
  '[USER] SignUp  User',
  props<{ username: string; password: string }>()
);

export const SignUpUserSuccess = createAction(
  '[USER] SignUp User Success',
  props<{ signUpMsg: string }>()
);

export const SignUpUserFailure = createAction(
  '[USER] SignUp  User Failure',
  props<{ error: any }>()
);

export const LoginUser = createAction(
  '[USER] Login  User',
  props<{ username: string; password: string }>()
);

export const LoginUserSuccess = createAction(
  '[USER] Login User Success',
  props<{ token: string; expiresIn: number }>()
);

export const LoginUserFailure = createAction(
  '[USER] Login  User Failure',
  props<{ error: any }>()
);

export const LogoutUser = createAction('[USER] Logout User');

export const LogoutUserSuccess = createAction('[USER] Logout User Success');

export const LogoutUserFailure = createAction(
  '[USER] Logout User Failure',
  props<{ error: any }>()
);

export const UpdateUser = createAction('[USER] Update Token');

export const UpdateUserSuccess = createAction(
  '[USER] Update Token Success',
  props<{ token: string; expiresIn: number }>()
);

export const UpdateUserFailure = createAction(
  '[USER] Update Token Failure',
  props<{ error: any }>()
);

export const AutoAuthUser = createAction('[USER] Auto Auth User');
