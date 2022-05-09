import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserToken } from '../store/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  constructor(private store: Store) {}

  selectUserToken() {
    return this.store.select(selectUserToken);
  }
}
