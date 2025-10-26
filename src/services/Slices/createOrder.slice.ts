import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createOrderThunk } from '../AsyncThunk/createOrderThunk';

interface IInitialState {
  order: TOrder[];
  isLoading: boolean;
  orderModalData: TOrder | null;
  hasError: string | undefined;
}

const initialState: IInitialState = {
  order: [],
  isLoading: false,
  orderModalData: null,
  hasError: undefined
};

const createOrderSlice = createSlice({
  name: 'createOrderSlice',
  initialState,
  selectors: {
    oredersSelectors: (state) => state.order,
    ordersLoading: (state) => state.isLoading,
    orderModalDataSelector: (state) => state.orderModalData,
    errorCreateOrderSelector: (state) => state.hasError
  },
  reducers: {
    closeModalData: (state) => {
      state.orderModalData = null;
      state.hasError = undefined;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.hasError = '';
      })
      .addCase(
        createOrderThunk.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.isLoading = false;
          state.order.push(action.payload);
          state.orderModalData = action.payload;
        }
      )
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error.message || 'Ошибка создания заказа';
      });
  }
});

export default createOrderSlice.reducer;

export const { closeModalData } = createOrderSlice.actions;

export const {
  ordersLoading,
  oredersSelectors,
  orderModalDataSelector,
  errorCreateOrderSelector
} = createOrderSlice.selectors;
