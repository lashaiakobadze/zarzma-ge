import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import * as userActions from './user.actions';
import { SBUserEffects } from './user.effects';
import { UserService } from '../services/user.service';
import { cold, hot } from 'jasmine-marbles';
import { provideMockStore } from '@ngrx/store/testing';
import {
    selectSBuser,
    selectSBisUserAuthenticated,
} from '@singular-group/sb-core';
import { SBPlayer } from '@singular-group/sb-models';
import * as settingsAction from '../../settings/store/settings.actions';

describe('Book A Bet Effects', () => {
    let effects: SBUserEffects;
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
                SBUserEffects,
                provideMockActions(() => actions$),
                {
                    provide: UserService,
                    useValue: {
                        isPlayerAuthenticated: jest.fn(),
                        getBalance: jest.fn(),
                        logout: jest.fn(),
                        setUserId: jest.fn(),
                        removeUserId: jest.fn(),
                    },
                },
                provideMockStore({
                    selectors: [
                        {
                            selector: selectSBuser,
                            value: {
                                id: 3,
                            },
                        },
                        {
                            selector: selectSBisUserAuthenticated,
                            value: true,
                        },
                    ],
                }),
            ],
        });
        userService = TestBed.inject(UserService);
        actions$ = TestBed.inject(Actions);
        effects = TestBed.inject(SBUserEffects);
    });

    describe('User$', () => {
        it('should be created', () => {
            expect(effects).toBeTruthy();
        });

        it('should return SBUpdateUserTokenSuccess, SBGetBalance, SBUpdateCurrencyId, SBUpdatePlayerActions Actions if call succeeds', () => {
            const user = new SBPlayer();
            user.currency = 2;
            user.id = 2;
            const action = userActions.SBUpdateUserToken({
                authToken: 'Token123',
            });

            const SBGetBalance = userActions.SBGetBalance();
            const SBUpdateCurrencyId = settingsAction.SBUpdateCurrencyId({
                currencyId: user.currency,
            });

            const SBUpdateUserTokenSuccess = userActions.SBUpdateUserTokenSuccess();
            const SBUpdatePlayer = userActions.SBUpdatePlayer({ user });

            const expected = cold('---(abcd)-', {
                a: SBGetBalance,
                b: SBUpdateCurrencyId,
                c: SBUpdateUserTokenSuccess,
                d: SBUpdatePlayer,
            });
            const response = cold('-a|', { a: user });
            userService.isPlayerAuthenticated = jest.fn(() => response);
            actions$ = hot('--a', { a: action });
            expect(effects.player$).toBeObservable(expected);
        });

        it('should return SBTokenValidateFailure action, if call fails', () => {
            const err = {
                error: new Error('SBTokenValidateFailure message!'),
            };
            const action = userActions.SBUpdateUserToken({
                authToken: 'Token123',
            });
            const completion = userActions.SBTokenValidateFailure(err);

            const expected = cold('--b', { b: completion });
            const response = cold('-#', {}, err);

            userService.isPlayerAuthenticated = jest.fn(() => response);
            actions$ = hot('-a', { a: action });
            expect(effects.player$).toBeObservable(expected);
        });

        it('should return SBGetBalanceSuccess Action, with response if call succeeds', () => {
            const action = userActions.SBGetBalance();
            const completion = userActions.SBGetBalanceSuccess({
                balance: 200,
            });
            const expected = cold('--b', { b: completion });
            const response = cold('-a|', { a: 200 });
            userService.getBalance = jest.fn(() => response);
            actions$ = hot('-a', { a: action });
            expect(effects.balance$).toBeObservable(expected);
        });

        it('should return SBGetBalanceFailure action, if call fails', () => {
            const err = {
                error: new Error('SBGetBalanceFailure message!'),
            };
            const action = userActions.SBGetBalance();
            const completion = userActions.SBGetBalanceFailure(err);

            const expected = cold('--b', { b: completion });
            const response = cold('-#', {}, err);

            userService.getBalance = jest.fn(() => response);
            actions$ = hot('-a', { a: action });
            expect(effects.balance$).toBeObservable(expected);
        });

        it('should return SBLogoutUserSuccess Action, if call succeeds and user isAuthenticated', () => {
            const action = userActions.SBLogoutUser({ authToken: 'Token123' });
            const completion = userActions.SBLogoutUserSuccess();
            const expected = cold('--b', { b: completion });
            const response = cold('-a|', { a: {} });
            userService.logout = jest.fn(() => response);
            actions$ = hot('-a', { a: action });
            expect(effects.logout$).toBeObservable(expected);
        });

        it('should return SBLogoutUserFailure action, if call fails', () => {
            const err = {
                error: new Error('SBLogoutUserFailure message!'),
            };
            const action = userActions.SBLogoutUser({ authToken: 'Token123' });
            const completion = userActions.SBLogoutUserFailure(err);

            const expected = cold('--b', { b: completion });
            const response = cold('-#', {}, err);

            userService.logout = jest.fn(() => response);
            actions$ = hot('-a', { a: action });
            expect(effects.logout$).toBeObservable(expected);
        });
    });
});
