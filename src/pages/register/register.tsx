import { Preloader } from '@ui';
import { RegisterUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerThunk } from '../../services/AsyncThunk/registerUserThunk';
import {
  errorRegisterSelector,
  registerLoadingSelector,
  registerSuccessSelector
} from '../../services/Slices/register.slice';
import { useDispatch, useSelector } from '../../services/store';
import { validateregisterForm } from '../../utils/validation';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const isLoading = useSelector(registerLoadingSelector);
  const errorMessage = useSelector(errorRegisterSelector);
  const isSucess = useSelector(registerSuccessSelector);
  const location = useLocation();

  // навигация при успехе
  useEffect(() => {
    if (isSucess) {
      navigation('/register/success', {
        state: {
          background: {
            pathname: location.pathname,
            search: location.search,
            hash: location.hash
          }
        }
      });
    }
  }, [isSucess, navigation, location]);

  const formData = useMemo(
    () => ({ name: userName, email, password }),
    [userName, email, password]
  );

  // результат валидации (Vest возвращает объект suite)
  const validationResult = useMemo(
    () => validateregisterForm(formData),
    [formData]
  );

  // errors: { name: string[]; email: string[]; password: string[] }
  const errors = useMemo(
    () => validationResult.getErrors(),
    [validationResult]
  );

  const hasErrors = validationResult.hasErrors();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // пометить все поля как touched чтобы показать ошибки
    setTouched({ name: true, email: true, password: true });

    // повторная валидация уже в validationResult
    if (hasErrors) return;

    dispatch(registerThunk({ name: userName, email, password }));
  };

  // onChange handlers будут выставлять touched при blur/изменении, но можно и здесь
  const handleFieldChange = (
    field: 'name' | 'email' | 'password',
    v: React.SetStateAction<string>
  ) => {
    if (typeof v === 'function') {
      // v — это апдейтер (prev => newVal). Применим его к текущему значению поля.
      if (field === 'name')
        setUserName((prev) => (v as (s: string) => string)(prev));
      // if (field === 'email')
      //   setEmail((prev) => (v as (s: string) => string)(prev));
      if (field === 'password')
        setPassword((prev) => (v as (s: string) => string)(prev));
      // пометка touched
      setTouched((t) => ({ ...t, [field]: true }));
      return;
    }

    // v — строка
    const value = v as string;
    if (field === 'name') setUserName(value);
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    setTouched((t) => ({ ...t, [field]: true }));
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <RegisterUI
      errorText={errorMessage}
      email={email}
      userName={userName}
      password={password}
      setEmail={(v) => handleFieldChange('email', v)}
      setPassword={(v) => handleFieldChange('password', v)}
      setUserName={(v) => handleFieldChange('name', v)}
      handleSubmit={handleSubmit}
      // передаём ошибки и touched, UI решает, показывать ли
      fieldErrors={errors}
      touched={touched}
    />
  );
};

// import { Preloader } from '@ui';
// import { RegisterUI } from '@ui-pages';
// import { FC, SyntheticEvent, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerThunk } from '../../services/AsyncThunk/registerUserThunk';
// import {
//   errorRegisterSelector,
//   registerLoadingSelector,
//   registerSuccessSelector
// } from '../../services/Slices/register.slice';
// import { useDispatch, useSelector } from '../../services/store';

// export const Register: FC = () => {
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigation = useNavigate();
//   const isLoading = useSelector(registerLoadingSelector);
//   const errorMessage = useSelector(errorRegisterSelector);
//   const isSucess = useSelector(registerSuccessSelector);

//   isSucess &&
//     navigation('/register/success', {
//       state: {
//         background: {
//           pathname: location.pathname,
//           search: location.search,
//           hash: location.hash
//         }
//       }
//     });

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();
//     dispatch(registerThunk({ name: userName, email, password }));
//   };

//   return isLoading ? (
//     <Preloader />
//   ) : (
//     <RegisterUI
//       errorText={errorMessage}
//       email={email}
//       userName={userName}
//       password={password}
//       setEmail={setEmail}
//       setPassword={setPassword}
//       setUserName={setUserName}
//       handleSubmit={handleSubmit}
//     />
//   );
// };
