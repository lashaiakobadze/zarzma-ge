import { createFeatureSelector } from '@ngrx/store';
import { SBCoreConfigSate } from './config.reducer';

export const selectSBcoreConfig =
  createFeatureSelector<SBCoreConfigSate>('coreConfig');
