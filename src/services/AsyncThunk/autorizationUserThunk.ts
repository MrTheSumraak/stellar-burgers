import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserApi, TLoginData } from '../../utils/burger-api';
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
      // prompt('success', String(response.success));
      // console.log(`Токен: ${getCookie('accessToken')}`);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
