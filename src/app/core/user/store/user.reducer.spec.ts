import * as fromUser from './user.reducer';

describe('User Reducer', () => {
  let initialState: fromUser.UserState;
  let reducer: any;

  beforeEach(() => {
    initialState = fromUser.UserInitialState;
    reducer = fromUser.UserReducer;
  });

  it('should return default state', () => {
    const state = reducer(undefined, { type: null });
  });
});
