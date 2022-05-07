import { createAction, props } from '@ngrx/store';

export const SET_CORE_CONFIGS = '';

export const SBSetCoreConfigs = createAction(
  '[CONFIG] Set',
  props<{ config: any }>()
);
