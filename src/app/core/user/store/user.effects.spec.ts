import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { UserEffects } from './user.effects';
import { UserService } from '../services/user.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('Book A Bet Effects', () => {
  let effects: UserEffects;
  let actions$: Observable<any>;
  let userService: any;
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        {
          provide: UserService,
          useValue: {}
        },
        provideMockStore({
          selectors: []
        })
      ]
    });
    userService = TestBed.inject(UserService);
    actions$ = TestBed.inject(Actions);
    effects = TestBed.inject(UserEffects);
  });

  describe('User$', () => {
    it('should be created', () => {
      expect(effects).toBeTruthy();
    });
  });
});
