import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { reducer as autorizationSlice } from '../Slices/autorizationSlice -slice/autorizationSlice.slice';
import constructorReducer from '../Slices/constructorIngridientsSlice/constructorIngridients.slice';
import createOrderSlice from '../Slices/createOrder-slice/createOrder.slice';
import { reducer as ingredientsSlice } from '../Slices/ingridient-slice/ingridient.slice';
import { reducer as logoutUserSlice } from '../Slices/logoutSlice/logoutSlice.slice';
import { reducer as orderSlice } from '../Slices/order-slice/order.slice';
import profileOrdersSlice from '../Slices/profileOrders-slice/profileOrders.slice';
import registerSlice from '../Slices/register-slice/register.slice';
import updateTokensSlice from '../Slices/updateTokens-slice/updateTokens.slice';
import { reducer as userSlice } from '../Slices/user-slice/user.slice';

export const rootReducer = combineReducers({
  ingredientsSlice,
  constructorReducer,
  registerSlice,
  autorizationSlice,
  logoutUserSlice,
  userSlice,
  orderSlice,
  createOrderSlice,
  profileOrdersSlice,
  updateTokensSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
