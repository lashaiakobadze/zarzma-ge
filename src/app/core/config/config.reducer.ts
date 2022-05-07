import { on, Action } from '@ngrx/store';
import { createImmerReducer } from '../immerNgrx';

import * as coreConfigActions from './config.actions';
import { Configuration } from './core-config.interface';

export interface SBCoreConfigSate {
  config: Configuration;
}

const initialState: SBCoreConfigSate = {
  config: <any>{}
};

const reducer = createImmerReducer(
  initialState,

  on(coreConfigActions.SBSetCoreConfigs, (draft, action) => {
    draft.config = action.config;
    return draft;
  })
);

export function SBCoreConfigReducer(state: SBCoreConfigSate, action: Action) {
  return reducer(state, action);
}
