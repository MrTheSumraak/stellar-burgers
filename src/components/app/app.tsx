import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useEffect } from 'react';
import { updateTokensThunk } from '../../services/AsyncThunk/updateTokens';
import { getUserThunk } from '../../services/AsyncThunk/userThunk';
import { getUserSelector } from '../../services/Slices/user.slice';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import { SuccessModalButton } from '../modal/successModal';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const userSelector = useSelector(getUserSelector);
  const location = useLocation();
  const backgroundLocation =
    location.state && (location.state as { background: Location })?.background;
  const navigation = useNavigate();

  useEffect(() => {
    console.log('app rend');
    dispatch(updateTokensThunk());
    dispatch(getUserThunk());
  }, [dispatch]);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={backgroundLocation || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <Modal
                onClose={() => {
                  navigation(-1);
                }}
                title=''
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                onClose={() => {
                  navigation(-1);
                }}
                title='Детали ингредиента'
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  onClose={() => {
                    navigation(-1);
                  }}
                  title=''
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
          <Route
            path='/register/success'
            element={
              <Modal
                title='Вы успешно зарегистрировались! Пожалуйста, выполните вход'
                onClose={() => navigation(-1)}
              >
                <SuccessModalButton />
              </Modal>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>

        {backgroundLocation && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal
                  onClose={() => {
                    navigation(-1);
                  }}
                  title=''
                >
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  onClose={() => {
                    navigation(-1);
                  }}
                  title='Детали ингредиента'
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal
                    onClose={() => {
                      navigation(-1);
                    }}
                    title=''
                  >
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
            <Route
              path='/register/success'
              element={
                <Modal
                  title='Вы успешно зарегистрировались! Пожалуйста, выполните вход'
                  onClose={() => navigation(-1)}
                >
                  <SuccessModalButton />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
