import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { registerThunk } from '../AsyncThunk/registerUserThunk';

type IInitialState = {
  isLoading?: boolean;
  success?: boolean;
  hasError?: string;
};

const initialState: IInitialState = {
  isLoading: false,
  success: false,
  hasError: ''
};

type IRegistrationAction<T> = {
  user: TUser;
  refreshToken: string;
  accessToken: string;
} & T;

export const registerSlice = createSlice({
  name: 'registerSlice',
  reducers: {},
  initialState,
  selectors: {
    registerLoadingSelector: (state) => state.isLoading,
    errorRegisterSelector: (state) => state.hasError,
    registerSuccessSelector: (state) => state.success
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        registerThunk.fulfilled,
        (state, action: PayloadAction<IRegistrationAction<IInitialState>>) => {
          state.isLoading = false;
          state.success = action.payload.success;
          state.hasError = '';
        }
      )
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError =
          action.error.message || 'Ошибка регистрации пользователя';
        prompt(state.hasError);
      });
  }
});

export const { reducer } = registerSlice;
export const {
  registerLoadingSelector,
  errorRegisterSelector,
  registerSuccessSelector
} = registerSlice.selectors;
export default registerSlice.reducer;
