import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from './constructorIngridients.slice';
import { nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

describe('constructorSlice test', () => {
  const makeIngredient = (
    overrides: Partial<TConstructorIngredient>
  ): TConstructorIngredient => ({
    _id: 'default',
    id: nanoid(10),
    name: 'Default',
    type: 'main',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: 'default.png',
    image_large: 'default-large.png',
    image_mobile: 'default-mobile.png',
    ...overrides
  });

  const ingredientA = makeIngredient({
    _id: 'ingA',
    name: 'Ingredient A',
    price: 100,
    type: 'sauce'
  });
  const ingredientB = makeIngredient({
    _id: 'ingB',
    name: 'Ingredient B',
    price: 200,
    type: 'main'
  });

  it('добавление ингридиента', () => {
    const state = reducer(undefined, addIngredient(ingredientA));
    expect(state.currentIngredients).toHaveLength(1);
    expect(state.currentIngredients[0]).toEqual(ingredientA);
  });

  it('удаление ингридиента', () => {
    const initial = {
      currentIngredients: [ingredientA, ingredientB],
      bun: null
    };

    const state = reducer(initial, removeIngredient(ingredientA.id));
    expect(state.currentIngredients).toHaveLength(1);
    expect(state.currentIngredients[0]).toEqual(ingredientB);
  });

  it('изменнеие порядка ингридиентов', () => {
    const initial = {
      currentIngredients: [ingredientA, ingredientB],
      bun: null
    };
    const state = reducer(
      initial,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 })
    );
    expect(state.currentIngredients[0]).toEqual(ingredientB);
    expect(state.currentIngredients[1]).toEqual(ingredientA);
  });
});
