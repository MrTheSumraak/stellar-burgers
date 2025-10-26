// import { Navigate } from 'react-router-dom';
// import { getCookie } from '../../utils/cookie';

// type ProtectedRouteProps = {
//   children: React.ReactElement;
// };

// export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const accessToken = getCookie('accessToken') || undefined;

//   return !accessToken ? <Navigate to='/login' replace /> : children;
// };

import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router';
import {
  getIsAuthCheckSelector,
  getIsLoadingSelector
} from '../../services/Slices/user.slice';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

type UserInfo = {
  userName: string | '';
  userEmail: string | '';
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isLoading = useSelector(getIsLoadingSelector); //  isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  const isAuthCheck = useSelector(getIsAuthCheckSelector);
  const userInfo: UserInfo = {
    userName: localStorage.getItem('userName') || '',
    userEmail: localStorage.getItem('userEmail') || ''
  };
  const isUserAuthorized = Boolean(userInfo.userName && userInfo.userEmail);
  console.log(isUserAuthorized);

  const location = useLocation();

  if (!isAuthCheck) {
    // пока идёт чекаут пользователя , показываем прелоадер
    return <Preloader />;
  }

  if (!onlyUnAuth && !isUserAuthorized) {
    //  если маршрут для авторизованного пользователя, но пользователь неавторизован, то делаем редирект
    return <Navigate replace to='/login' state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL
  }

  if (onlyUnAuth && isUserAuthorized) {
    //  если маршрут для неавторизованного пользователя, но пользователь авторизован
    // при обратном редиректе  получаем данные о месте назначения редиректа из объекта location.state
    // в случае если объекта location.state?.from нет — а такое может быть , если мы зашли на страницу логина по прямому URL
    // мы сами создаём объект c указанием адреса и делаем переадресацию на главную страницу
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
