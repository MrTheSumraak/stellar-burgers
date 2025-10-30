import { Preloader } from '@ui';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import {
  getUserThunk,
  updateUserThunk
} from '../../services/AsyncThunk/userThunk';
import { isLoadingLogout } from '../../services/Slices/logoutSlice.slice';
import { getIsLoadingSelector } from '../../services/Slices/user.slice';
import { useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const userName = localStorage.getItem('userName') ?? '';
  const emailUser = localStorage.getItem('userEmail') ?? '';
  // const userName = useSelector(userNameSelector) ?? '';
  // const emailUser = useSelector(userEmailSelector) ?? '';
  const isLogoutLoading = useSelector(isLoadingLogout);
  const isUpdateloading = useSelector(getIsLoadingSelector);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: userName,
    email: emailUser,
    password: ''
  });

  useEffect(() => {
    if (!userName || !emailUser) {
      dispatch(getUserThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    setFormValue((prevState) => {
      if (
        prevState.name.toLowerCase() === userName.toLowerCase() &&
        prevState.email.toLowerCase() === emailUser.toLowerCase()
      )
        return prevState;

      return {
        ...prevState,
        name: userName,
        email: emailUser,
        password: ''
      };
    });
  }, [userName, emailUser]);

  const isFormChanged =
    formValue.name !== userName ||
    formValue.email !== emailUser ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    formValue && dispatch(updateUserThunk(formValue));
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
    console.log(formValue);
  };

  return isLogoutLoading ? (
    <Preloader />
  ) : (
    <ProfileUI
      formValue={formValue}
      isLoading={isUpdateloading}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
