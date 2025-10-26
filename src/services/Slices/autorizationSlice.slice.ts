import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { autorizationThunk } from '../AsyncThunk/autorizationUserThunk';

type IInitialState = {
  isLoading?: boolean;
  success?: boolean;
  hasError?: string;
  isAuthCheck?: boolean;
  user: TUser | undefined;
};

const initialState: IInitialState = {
  isLoading: false,
  success: false,
  hasError: '',
  isAuthCheck: false,
  user: undefined
};

type IAutorizationAction<T> = {
  user: TUser;
  refreshToken: string;
  accessToken: string;
} & T;

export const autorizationSlice = createSlice({
  name: 'autorizationSlice',
  reducers: {},
  initialState,
  selectors: {
    isSuccessAuthSelector: (state) => state.success,
    errorAuthSelector: (state) => state.hasError,
    userNameSelector: (state) => state.user?.name,
    userEmailSelector: (state) => state.user?.email
  },
  extraReducers: (builder) => {
    builder
      .addCase(autorizationThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthCheck = false;
        state.success = false;
      })
      .addCase(
        autorizationThunk.fulfilled,
        (state, action: PayloadAction<IAutorizationAction<IInitialState>>) => {
          state.isLoading = false;
          state.success = true;
          state.user = action.payload.user;
          state.hasError = '';
          state.isAuthCheck = true;
        }
      )
      .addCase(autorizationThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError =
          action.error.message || 'Ошибка авторизации пользователя';
        state.isAuthCheck = true;
      });
  }
});

export const { reducer } = autorizationSlice;
export const {
  isSuccessAuthSelector,
  errorAuthSelector,
  userNameSelector,
  userEmailSelector
} = autorizationSlice.selectors;
export default autorizationSlice.reducer;
