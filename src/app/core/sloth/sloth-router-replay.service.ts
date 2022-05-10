import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { createAction, props } from '@ngrx/store';
import {
  ROUTER_NAVIGATED,
  RouterNavigatedAction,
  ROUTER_NAVIGATION
} from '@ngrx/router-store';
import { map, tap } from 'rxjs/operators';
export const ROUTER_NAVIGATED_EXTENDED = createAction(
  '[SLOTH] ROUTER_NAVIGATED_EXTENDED',
  props<any>()
);

@Injectable()
export class ReplayService {
  routerNavigatedAction: any = null;

  constructor(private actions$: Actions) {
    this.actions$
      .pipe(
        ofType(ROUTER_NAVIGATED, ROUTER_NAVIGATION),
        map((action: RouterNavigatedAction) => action),
        tap((action) => {
          this.routerNavigatedAction = action;
        })
      )
      .subscribe();
  }

  getLastAction() {
    return this.routerNavigatedAction;
  }
}
