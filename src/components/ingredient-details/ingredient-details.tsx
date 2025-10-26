import { FC } from 'react';
import { ingredientsSelector } from '../../services/Slices/ingridient.slice';
import { useSelector } from '../../services/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredients = useSelector(ingredientsSelector);
  const ingredientData = ingredients.find((item) => item);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
