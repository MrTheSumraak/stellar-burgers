import { TOrder } from '@utils-types';
import reducer from './profileOrders.slice';
import { getOrdersThunk } from '../../AsyncThunk/orderThunk';

describe('тестирование слайса profileOrdersSlice', () => {
  const initialState = {
    orders: [] as TOrder[],
    hasError: '',
    isLoading: false
  };

  const fakeOrder = {
    _id: 'order123',
    ingredients: ['ing0', 'ing1'],
    status: 'done',
    name: 'Test Order',
    createdAt: '2025-12-01T09:00:00Z',
    updatedAt: '2025-12-01T09:00:00Z',
    number: 321
  };

  it('тестирование pending-флага загрузки и ошибки', () => {
    const state = reducer(initialState, {
      type: getOrdersThunk.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.hasError).toBeUndefined();
  });

  it('fulfield getOrdersThunk: получение заказов пользователя, isLoading = false', () => {
    const payload = fakeOrder;
    const action = { type: getOrdersThunk.fulfilled.type, payload };
    const state = reducer(initialState, action);

    expect(state.orders).toEqual(fakeOrder);
    expect(state.isLoading).toBe(false);
  });

  it('rejected getOrdersThunk: hasError: ошибка на месте!', () => {
    const errorMessage = 'Ошибка получения заказов пользователя';
    const action = {
      type: getOrdersThunk.rejected.type,
      error: { message: errorMessage }
    };

    const state = reducer(initialState, action);
    expect(state.hasError).toBe(errorMessage);
    expect(state.isLoading).toBe(false);
  });
});
