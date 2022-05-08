import * as fromUser from './user.reducer';
import * as userActions from './user.actions';
import { SBPlayer } from '@singular-group/sb-models';

describe('User Reducer', () => {
    let initialState: fromUser.SBUserState;
    let reducer: any;

    beforeEach(() => {
        initialState = fromUser.SBUserInitialState;
        reducer = fromUser.SBUserReducer;
    });

    it('should return default state', () => {
        const state = reducer(undefined, { type: null });
        expect(state).toMatchSnapshot();
    });

    it('SBUpdateUserToken | should set authToken and loadingStatus', () => {
        const action = userActions.SBUpdateUserToken({
            authToken: 'Token123321',
        });
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
    });

    it('SBUpdateUserTokenSuccess | should set isChecked and loadingStatus', () => {
        const action = userActions.SBUpdateUserTokenSuccess();
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
    });

    it('SBUpdateUserTokenSuccess | should set authStatus 2 (SBAuthStatus.Unauthorized)', () => {
        const action = userActions.SBUpdateUserTokenSuccess();
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
    });

    it('SBUpdateUserTokenSuccess | should set authStatus 1 (SBAuthStatus.Authorized)', () => {
        const user = new SBPlayer();
        user.active = 0;
        const modifiedState = reducer(
            initialState,
            userActions.SBUpdatePlayer({ user })
        );
        const action = userActions.SBUpdateUserTokenSuccess();
        const state = reducer(modifiedState, action);
        expect(state).toMatchSnapshot();
    });

    it('SBUpdatePlayer | should set user', () => {
        const action = userActions.SBUpdatePlayer({ user: new SBPlayer() });
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
    });

    it('SBTokenValidateFailure | should set error and loadingStatus', () => {
        const action = userActions.SBTokenValidateFailure({
            error: 'GENERAL_ERROR',
        });
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
    });

    it('SBGetBalanceSuccess | should set balance', () => {
        const modifiedState = {
            ...initialState,
            ...{ user: new SBPlayer() },
        };
        const action = userActions.SBGetBalanceSuccess({ balance: 22 });
        const state = reducer(modifiedState, action);
        expect(state).toMatchSnapshot();
    });

    it('SBReducePlayerBalance | should reduce balance', () => {
        const modifiedState = {
            ...initialState,
            ...{ user: new SBPlayer() },
        };
        modifiedState.user.balance = 50;
        const action = userActions.SBReducePlayerBalance({ balance: 20 });
        const state = reducer(modifiedState, action);
        expect(state).toMatchSnapshot();
    });

    it('SBIncreasePlayerBalance | should increase balance', () => {
        const modifiedState = {
            ...initialState,
            ...{ user: new SBPlayer() },
        };
        modifiedState.user.balance = 50;
        const action = userActions.SBIncreasePlayerBalance({ balance: 20 });
        const state = reducer(modifiedState, action);
        expect(state).toMatchSnapshot();
    });

    it('SBSessionExpired | should set user and authToken', () => {
        const modifiedState = {
            ...initialState,
            ...{ user: new SBPlayer() },
        };
        modifiedState.user.currency = 2;
        const action = userActions.SBSessionExpired();
        const state = reducer(modifiedState, action);
        expect(state).toMatchSnapshot();
    });

    it('SBLogoutUserFailure | should set error', () => {
        const action = userActions.SBLogoutUserFailure({
            error: 'GENERAL_ERROR',
        });
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
    });
});
