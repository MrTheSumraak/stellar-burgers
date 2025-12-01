import reducer, {
  showRegistrationSuccessModal,
  closeRegistrationSuccessModal
} from './register.slice';
import { registerThunk } from '../../AsyncThunk/registerUserThunk';

describe('registerSlice reducer', () => {
  const initialState = {
    isLoading: false,
    success: false,
    hasError: '',
    onModalopen: false
  };

  it("pending registerThunk: isLoading = true, hasError = ''", () => {
    const state = reducer(initialState, { type: registerThunk.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.hasError).toBe('');
  });

  it('fulfilled registerThunk: успешная регистрация, success = true, isLoading = false', () => {
    const action = {
      type: registerThunk.fulfilled.type,
      payload: { success: true }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.success).toBe(true);
    expect(state.hasError).toBe('');
  });

  it('rejected registerThunk: ошибка регистрации, hasError заполнен ошибкой, isLoading = false', () => {
    const action = {
      type: registerThunk.rejected.type,
      error: { message: 'Ошибка регистрации пользователя' }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(
      state.hasError === 'Ошибка регистрации пользователя' ||
        state.hasError === action.error.message
    ).toBe(true);
  });

  it('showRegistrationSuccessModal: открытие модального окна успешной регистрации, onModalopen = true', () => {
    const state = reducer(initialState, showRegistrationSuccessModal());
    expect(state.onModalopen).toBe(true);
  });

  it('closeRegistrationSuccessModal: закрытие модального окна успешной регистрации, onModalopen = false', () => {
    const prevState = { ...initialState, onModalopen: true };
    const state = reducer(prevState, closeRegistrationSuccessModal());
    expect(state.onModalopen).toBe(false);
  });
});
