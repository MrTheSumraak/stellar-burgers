import { reducer } from './order.slice';
import { getFeedsThunk, getOrderByNumber } from '../../AsyncThunk/orderThunk';
import { TFeedsResponse } from '@api';
import { TOrder } from '@utils-types';

describe('тестирование слайса orderSlice', () => {
  const initialState = {
    orders: [] as TOrder[],
    isLoading: false,
    hasError: '',
    total: 0,
    totalToday: 0,
    success: false,
    orderModalData: null,
    currentOrder: null
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

  const fakeOrderList = [
    {
      _id: 'order1',
      ingredients: ['ing0', 'ing1'],
      status: 'done',
      name: 'Test Order1',
      createdAt: '2025-12-01T09:00:00Z',
      updatedAt: '2025-12-01T09:00:00Z',
      number: 123
    },
    {
      _id: 'order2',
      ingredients: ['ing0', 'ing1', 'ing2'],
      status: 'done',
      name: 'Test Order2',
      createdAt: '2025-11-01T09:00:00Z',
      updatedAt: '2025-11-01T09:00:00Z',
      number: 1234
    }
  ];

  const fakeResponse: TFeedsResponse = {
    orders: fakeOrderList,
    total: 5,
    totalToday: 3,
    success: true
  };

  describe('pending', () => {
    it('тестирование pending-флага загрузки и ошибки', () => {
      const state = reducer(initialState, {
        type: getFeedsThunk.pending.type
      });

      expect(state.isLoading).toBe(true);
    });

    it('тестирование pending-флага загрузки и ошибки', () => {
      const state = reducer(initialState, {
        type: getOrderByNumber.pending.type
      });

      expect(state.isLoading).toBe(true);
    });
  });

  describe('fulfield', () => {
    it('fulfilled getFeedsThunk: получение заказов, их количетства; success = true, isLoading = false', () => {
      const payload = fakeResponse;
      const action = { type: getFeedsThunk.fulfilled.type, payload };
      const state = reducer(initialState, action);
      expect(state.orders).toEqual(fakeOrderList);
      expect(state.total).toBe(5);
      expect(state.totalToday).toBe(3);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
    });

    it('fulfilled getOrderByNumber: currentOrder записан, isLoading = false', () => {
      const payload = fakeOrder;
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.currentOrder).toEqual(fakeOrder);
    });
  });

  describe('rejected', () => {
    it('rejected getFeedsThunk: hasError: ошибка на месте!', () => {
      const action = {
        type: getFeedsThunk.rejected.type,
        error: { message: 'Ошибка загрузки ленты заказов' }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.hasError).toBe('Ошибка загрузки ленты заказов');
    });

    it('rejected getOrderByNumber: hasError: ошибка на месте!', () => {
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: 'Ошибка загрузки выбранного заказа' }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.hasError).toBe('Ошибка загрузки выбранного заказа');
    });
  });
});
