import { TUser } from '@utils-types';
import { getUserThunk, updateUserThunk } from '../../AsyncThunk/userThunk';
import { reducer } from './user.slice';

describe('тестирование слайса UserSlice', () => {
  const initialState = {
    user: null as TUser | null,
    isLoading: false,
    success: false,
    isAuthchecked: false,
    hasError: undefined as string | undefined
  };

  const fakeUser: TUser = {
    name: 'Test User',
    email: 'test@mail.com'
  };

  describe('pending', () => {
    it('pending getUserThunk: isLoading = true, hasError = undefined, isAuthchecked = false', () => {
      const state = reducer(initialState, { type: getUserThunk.pending.type });
      expect(state.isLoading).toBe(true);
      expect(state.hasError).toBeUndefined();
      expect(state.isAuthchecked).toBe(false);
    });

    it('pending updateUserThunk: isLoading = true', () => {
      const action = { type: updateUserThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });
  });

  describe('fulfield', () => {
    it('fulfilled getUserThunk: user записан, success = true, isLoading = false, isAuthchecked = true', () => {
      const action = { type: getUserThunk.fulfilled.type, payload: fakeUser };
      const state = reducer(initialState, action);
      expect(state.user).toEqual(fakeUser);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.isAuthchecked).toBe(true);
    });

    it('fulfilled updateUserThunk: user обновлён, success = true, isLoading = false', () => {
      const action = {
        type: updateUserThunk.fulfilled.type,
        payload: fakeUser
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.user).toEqual(fakeUser);
    });
  });

  describe('rejected', () => {
    it('rejected getUserThunk: hasError заполнен, success = false, isLoading = false, isAuthchecked = true', () => {
      const action = {
        type: getUserThunk.rejected.type,
        error: { message: 'Ошибка загрузки пользователя' }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.isAuthchecked).toBe(true);
      expect(state.hasError).toBe('Ошибка загрузки пользователя');
    });

    it('rejected updateUserThunk: hasError заполнен, success = false, isLoading = false', () => {
      const action = {
        type: updateUserThunk.rejected.type,
        error: { message: 'Ошибка обновления пользователя' }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.hasError).toBe('Ошибка обновления пользователя');
    });
  });
});
