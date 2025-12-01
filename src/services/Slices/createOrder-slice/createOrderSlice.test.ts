import { TOrder } from '@utils-types';
import { createOrderThunk } from '../../AsyncThunk/createOrderThunk';
import reducer, { closeModalData } from './createOrder.slice';
import { TNewOrderResponse } from '@api';

describe('тестирование слайса создания ордера', () => {
  const initialState = {
    order: [] as TOrder[],
    isLoading: false,
    orderModalData: null,
    hasError: undefined,
    success: false
  };

  const fakeOrder: TOrder = {
    _id: 'order1',
    ingredients: [],
    status: 'done',
    name: 'Test Order',
    createdAt: '2025-12-01T09:00:00Z',
    updatedAt: '2025-12-01T09:00:00Z',
    number: 123
  };

  it('тестирование pending-флага загрузки и успеха', () => {
    const state = reducer(initialState, {
      type: createOrderThunk.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.hasError).toBe('');
  });

  it('fulfilled createOrderThunk: добавление заказа, success = true, isLoading = false', () => {
    const payload = {
      success: true,
      order: fakeOrder
    };
    const action = { type: createOrderThunk.fulfilled.type, payload };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.success).toBe(true);
    expect(state.order).toContainEqual(fakeOrder);
    expect(state.orderModalData).toEqual(fakeOrder);
  });

  it('rejected createOrderThunk: success = false, isLoading = false, hasError заполнен', () => {
    const action = {
      type: createOrderThunk.rejected.type,
      error: { message: 'Ошибка создания заказа' }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.success).toBe(false);
    expect(state.hasError).toBe('Ошибка создания заказа');
  });

  it('closeModalData: очищает orderModalData и hasError', () => {
    const prevState = {
      ...initialState,
      orderModalData: fakeOrder,
      hasError: 'Ошибка'
    };
    const state = reducer(prevState, closeModalData());
    expect(state.orderModalData).toBeNull();
    expect(state.hasError).toBeUndefined();
  });
});
