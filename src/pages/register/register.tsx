import { Preloader } from '@ui';
import { RegisterUI } from '@ui-pages';
import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerThunk } from '../../services/AsyncThunk/registerUserThunk';
import {
  errorRegisterSelector,
  registerLoadingSelector,
  registerSuccessSelector
} from '../../services/Slices/register.slice';
import { useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const isLoading = useSelector(registerLoadingSelector);
  const errorMessage = useSelector(errorRegisterSelector);
  const isSucess = useSelector(registerSuccessSelector);

  isSucess &&
    navigation('/register/success', {
      state: {
        background: {
          pathname: location.pathname,
          search: location.search,
          hash: location.hash
        }
      }
    });
  // prompt(String(isSucess));

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerThunk({ name: userName, email, password }));
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <RegisterUI
      errorText={errorMessage}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
