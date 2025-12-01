import { FC, useEffect } from 'react';
import { ingredientsThunk } from '../../services/AsyncThunk/ingredientsThunk';
import { ingredientsSelector } from '../../services/Slices/ingridient-slice/ingridient.slice';
import { useDispatch, useSelector } from '../../services/store/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const ingredients = useSelector(ingredientsSelector);
  const ingredientData = ingredients.find((item) => item);

  useEffect(() => {
    if (!ingredientData) {
      dispatch(ingredientsThunk());
    }
  }, [dispatch, ingredientData]);

  return !ingredientData ? (
    <Preloader />
  ) : (
    <IngredientDetailsUI ingredientData={ingredientData} />
  );
};
