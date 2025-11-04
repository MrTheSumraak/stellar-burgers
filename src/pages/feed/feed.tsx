import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeedsThunk } from '../../services/AsyncThunk/orderThunk';
import {
  getOrdersSelector,
  loadingSelector
} from '../../services/Slices/order.slice';
import { useDispatch, useSelector } from '../../services/store';
import { ingredientsThunk } from '../../services/AsyncThunk/ingredientsThunk';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(loadingSelector);
  const orders: TOrder[] = useSelector(getOrdersSelector);

  useEffect(() => {
    console.log(orders);
    dispatch(ingredientsThunk());
    !orders.length && dispatch(getFeedsThunk());
  }, [dispatch, orders]);

  /** TODO: взять переменную из стора */

  const handleGetFeeds = () => {
    dispatch(getFeedsThunk());
    console.log(orders);
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />
  );
};
