import { TUser } from '@utils-types';
import {
  autorizationThunk,
  resetPaswordThunk
} from '../../AsyncThunk/autorizationUserThunk';
import reducer from './autorizationSlice.slice';

describe('тестирование слайса авторизации', () => {
  const initialState = {
    isLoading: false,
    success: false,
    hasError: '',
    isAuthCheck: false,
    user: undefined as TUser | undefined
  };

  describe('pending', () => {
    it('pending autorizationThunk → isLoading = true, isAuthCheck = false', () => {
      const state = reducer(initialState, {
        type: autorizationThunk.pending.type
      });
      expect(state.isLoading).toBe(true);
      expect(state.isAuthCheck).toBe(false);
    });

    it('pending resetPaswordThunk → isLoading = true', () => {
      const state = reducer(initialState, {
        type: resetPaswordThunk.pending.type
      });
      expect(state.isLoading).toBe(true);
    });
  });

  describe('fulfilled', () => {
    it('fulfilled autorizationThunk → user записан, success = true, isLoading = false', () => {
      const fakeUser: TUser = { name: 'Test', email: 'test@mail.com' };
      const action = {
        type: autorizationThunk.fulfilled.type,
        payload: { user: fakeUser, refreshToken: 'rt', accessToken: 'at' }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.user).toEqual(fakeUser);
      expect(state.hasError).toBe('');
      expect(state.isAuthCheck).toBe(true);
    });

    it('fulfilled resetPaswordThunk → success = true, isLoading = false', () => {
      const state = reducer(initialState, {
        type: resetPaswordThunk.fulfilled.type
      });
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
    });
  });

  describe('rejected', () => {
    it('rejected autorizationThunk → hasError заполнен, success = false, isLoading = false', () => {
      const action = {
        type: autorizationThunk.rejected.type,
        error: { message: 'Ошибка авторизации' }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.hasError).toBe('Ошибка авторизации');
      expect(state.isAuthCheck).toBe(true);
    });

    it('rejected resetPaswordThunk → success = false, isLoading = false, hasError заполнен', () => {
      const action = {
        type: resetPaswordThunk.rejected.type,
        error: { message: 'Ошибка сброса пароля' }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.hasError).toBe('Ошибка сброса пароля');
    });
  });
});
