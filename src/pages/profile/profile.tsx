import { Preloader } from '@ui';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { getUserThunk } from '../../services/AsyncThunk/userThunk';
import {
  userEmailSelector,
  userNameSelector
} from '../../services/Slices/autorizationSlice.slice';
import { isLoadingLogout } from '../../services/Slices/logoutSlice.slice';
import { useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const userName = useSelector(userNameSelector) ?? '';
  const emailUser = useSelector(userEmailSelector) ?? '';
  const isLoading = useSelector(isLoadingLogout);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: userName,
    email: emailUser,
    password: ''
  });

  // useEffect(() => {
  //   if (!userName || !emailUser) {
  //     dispatch(getUserThunk());
  //   }
  // }, []);

  useEffect(() => {
    setFormValue((prevState) => {
      if (prevState.name === userName && prevState.email === emailUser)
        return prevState;

      return {
        ...prevState,
        name: userName,
        email: emailUser
      };
    });
  }, [userName, emailUser]);

  const isFormChanged =
    formValue.name !== userName ||
    formValue.email !== emailUser ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: userName,
      email: emailUser,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
