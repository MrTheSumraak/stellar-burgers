import { useDispatch, useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { FC, useEffect } from 'react';
import { BurgerConstructor, BurgerIngredients } from '../../components';
import { Preloader } from '../../components/ui';
import { ingredientsThunk } from '../../services/AsyncThunk/ingredientsThunk';
import {
  ingredientsSelector,
  isIngridientLoading
} from '../../services/Slices/ingridient.slice';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const isIngredientsLoading = useSelector(isIngridientLoading);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
