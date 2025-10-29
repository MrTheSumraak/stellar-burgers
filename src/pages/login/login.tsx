import { Preloader } from '@ui';
import { LoginUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { autorizationThunk } from '../../services/AsyncThunk/autorizationUserThunk';
import {
  errorAuthSelector,
  isSuccessAuthSelector
} from '../../services/Slices/autorizationSlice.slice';
import { useDispatch, useSelector } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errorText = useSelector(errorAuthSelector);
  const isLoading = useSelector((state) => state.autorizationSlice.isLoading);
  const isSuccessAuth = useSelector(isSuccessAuthSelector);
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(autorizationThunk({ email, password }));
  };

  useEffect(() => {
    if (isSuccessAuth) {
      navigate('/profile', { replace: true });
    }
  }, [isSuccessAuth, navigate]);

  return isLoading ? (
    <Preloader />
  ) : (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
