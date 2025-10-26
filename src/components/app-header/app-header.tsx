import { AppHeaderUI } from '@ui';
import { FC, useEffect } from 'react';
import { updateTokensThunk } from '../../services/AsyncThunk/updateTokens';
import { getUserThunk } from '../../services/AsyncThunk/userThunk';
import { errorUserSelector } from '../../services/Slices/user.slice';
import { useDispatch, useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const errorUser = useSelector(errorUserSelector);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   // dispatch(getUserThunk());
  //   // dispatch(updateTokensThunk());
  // }, [dispatch]);
  const userName = localStorage.getItem('userName') ?? undefined;
  return <AppHeaderUI userName={userName} />;
};
