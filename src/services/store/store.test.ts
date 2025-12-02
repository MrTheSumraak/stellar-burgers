import { rootReducer } from './store';

describe('rootReduser', () => {
  it('корректная инициализация', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    // проверяем, что все ключи присутствуют
    expect(initialState).toHaveProperty('ingredientsSlice');
    expect(initialState).toHaveProperty('constructorReducer');
    expect(initialState).toHaveProperty('registerSlice');
    expect(initialState).toHaveProperty('autorizationSlice');
    expect(initialState).toHaveProperty('logoutUserSlice');
    expect(initialState).toHaveProperty('userSlice');
    expect(initialState).toHaveProperty('orderSlice');
    expect(initialState).toHaveProperty('createOrderSlice');
    expect(initialState).toHaveProperty('profileOrdersSlice');
    expect(initialState).toHaveProperty('updateTokensSlice');
  });
});
