import { TIngredient } from '@utils-types';
import { ingredientsThunk } from '../../AsyncThunk/ingredientsThunk';
import { reducer } from './ingridient.slice';

describe('тестирование слайса ингридиентов', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    hasError: null
  };

  const fakeIngredients: TIngredient[] = [
    {
      _id: 'ing1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 150,
      price: 50,
      image: 'bun.png',
      image_large: 'bun-large.png',
      image_mobile: 'bun-mobile.png'
    },
    {
      _id: 'ing2',
      name: 'Котлета',
      type: 'main',
      proteins: 20,
      fat: 10,
      carbohydrates: 5,
      calories: 250,
      price: 100,
      image: 'meat.png',
      image_large: 'meat-large.png',
      image_mobile: 'meat-mobile.png'
    }
  ];

  it('тестирование pending-флага загрузки и ошибки', () => {
    const state = reducer(initialState, {
      type: ingredientsThunk.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.hasError).toBeNull();
  });

  it('fulfilled ingredientsThunk: добавление ингридиентов, success = true, isLoading = false', () => {
    const payload: TIngredient[] = fakeIngredients;
    const action = { type: ingredientsThunk.fulfilled.type, payload };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(fakeIngredients);
    expect(state.hasError).toBeNull();
  });

  it('rejected ingredientsThunk: hasError: ошибка на месте!', () => {
    const action = {
      type: ingredientsThunk.rejected.type,
      error: { message: 'Ошибка загрузки ингридиентов' }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe('Ошибка загрузки ингридиентов');
  });
});
