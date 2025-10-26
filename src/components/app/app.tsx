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
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { SuccessModalButton } from '../modal/successModal';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation =
    location.state && (location.state as { background: Location })?.background;
  const navigation = useNavigate();

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
