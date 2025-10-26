import { TRegisterData } from '@api';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrderThunk } from '../../services/AsyncThunk/createOrderThunk';
import { updateUserThunk } from '../../services/AsyncThunk/userThunk';
import { clearConstructor } from '../../services/Slices/constructorIngridients.slice';
import {
  closeModalData,
  errorCreateOrderSelector,
  orderModalDataSelector,
  ordersLoading
} from '../../services/Slices/createOrder.slice';
import { RootState, useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorOrder = useSelector(errorCreateOrderSelector);
  const userData: Partial<TRegisterData> = {
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || ''
  };

  const currentIngredient = useSelector(
    (state: RootState) => state.constructorReducer.currentIngredients
  );

  const currentBun = useSelector(
    (state: RootState) => state.constructorReducer.bun
  );

  const constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  } = {
    bun: currentBun,
    ingredients: currentIngredient
  };

  const orderRequest = useSelector(ordersLoading);

  const orderModalData = useSelector(orderModalDataSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(updateUserThunk(userData));
    dispatch(createOrderThunk());
  };

  const closeOrderModal = () => {
    dispatch(closeModalData());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      error={errorOrder}
    />
  );
};
