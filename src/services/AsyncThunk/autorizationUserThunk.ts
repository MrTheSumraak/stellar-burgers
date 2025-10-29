import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  resetPasswordApi,
  TLoginData
} from '../../utils/burger-api';
import { setCookie } from '../../utils/cookie';

export const autorizationThunk = createAsyncThunk(
  'authorization/user',
  async (data: TLoginData) => {
    try {
      const response = await loginUserApi(data);
      localStorage.setItem('userName', response.user.name);
      localStorage.setItem('userEmail', response.user.email);
      localStorage.setItem('refreshToken', response.refreshToken || '');
      setCookie('accessToken', response.accessToken || '');
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

interface IResetPassword {
  password: string;
  token: string;
}

export const resetPaswordThunk = createAsyncThunk(
  'resetPassword/user',
  async (props: IResetPassword) => {
    try {
      const response = await resetPasswordApi(props);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
