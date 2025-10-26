import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrdersThunk } from '../../services/AsyncThunk/orderThunk';
import {
  profileIsLoadingSelector,
  profileOrdersSelector
} from '../../services/Slices/profileOrders.slice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const isLoading = useSelector(profileIsLoadingSelector);
  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);
  const orders: TOrder[] = useSelector(profileOrdersSelector);

  return <ProfileOrdersUI orders={orders} isLoading={isLoading} />;
};
