import { reducer } from './logoutSlice.slice';
import { logoutThunk } from '../../AsyncThunk/logoutThunk';

describe('тестирование слайса logout', () => {
  const initialState = {
    success: false,
    isLoading: false,
    hasError: ''
  };

  it('тестирование pending-флага загрузки и ошибки', () => {
    const state = reducer(initialState, {
      type: logoutThunk.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.hasError).toBe('');
  });

  it('fulfilled logoutThunk: success = true, isLoading = false', () => {
    const state = reducer(initialState, {
      type: logoutThunk.fulfilled.type
    });

    expect(state.isLoading).toBe(false);
    expect(state.success).toBe(true);
  });

  it('rejected ingredientsThunk: hasError: ошибка на месте!', () => {
    const action = {
      type: logoutThunk.rejected.type,
      error: { message: 'Ошибка выхода из учетной записи' }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe('Ошибка выхода из учетной записи');
  });
});
