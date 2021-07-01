import { Fragment } from 'react';
import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';

const Meals = () => {
  return (
    <Fragment>
      <AvailableMeals />
      <MealsSummary />
    </Fragment>
  );
};

export default Meals;