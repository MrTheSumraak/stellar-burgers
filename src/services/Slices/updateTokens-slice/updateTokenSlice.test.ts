import { updateTokensThunk } from '../../AsyncThunk/updateTokens';
import reducer from './updateTokens.slice';

describe('тестирование слайса UpdateTokenSlice', () => {
  const initialState = {
    isLoading: false,
    hasError: undefined
  };

  it('pending updateTokensThunk: isLoading = true', () => {
    const action = { type: updateTokensThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.hasError).toBeUndefined();
  });

  it('fulfield updateTokensThunk: isLoading = false', () => {
    const action = { type: updateTokensThunk.fulfilled.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });

  it('rejected updateTokensThunk: hasError заполенено, isLoading = false', () => {
    const action = {
      type: updateTokensThunk.rejected.type,
      error: { message: 'Ошибка обновления токенов' }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(
      state.hasError === 'Ошибка обновления токенов' ||
        state.hasError === action.error.message
    ).toBe(true);
  });
});
