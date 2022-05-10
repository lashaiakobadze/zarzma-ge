import { InjectionToken } from '@angular/core';

export enum LoadingStatus {
  LOADING = 'loading',
  LOADED = 'loaded',
  Error = 'error'
}
export interface LazyLoadingStatus {
  loading: LoadingStatus;
}

export interface LazyComponentsModuleDef {
  selector: string;
  loadChildren: any;
  data?: {
    preload: boolean;
    delay?: number;
  };
}

export interface LazyLoadComponentsDef {
  selector: string;
  component: any;
}

export const LAZY_LOADING_MODULES = new InjectionToken<
  LazyComponentsModuleDef[]
>('lazy-load-modules');
export const LAZY_LOADING_COMPONENTS = new InjectionToken<
  LazyLoadComponentsDef[]
>('lazy-load-components');
