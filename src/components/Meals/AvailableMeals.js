import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from "./AvailableMeals.module.css";
import { useCallback, useEffect, useState } from 'react';



const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);


  const fetchMealsHandler = useCallback(() => {
    fetch('https://green-meals-default-rtdb.firebaseio.com/meals/.json') //.json is required in firebase
      .then(response => response.json())
      .then(data => addKeys(data))
      .catch(error => console.log(error));
  }, []);

  //fetch data whenever the the function is called (the data changes)
  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);


  //add keys into the meal objects
  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) =>
      Object.defineProperty(item, 'id', { value: keys[index] }));
    setMeals(valueKeys);

  }
  const mealsList = meals.map(mealData =>
    <MealItem
      key={mealData.id}
      id={mealData.id}
      name={mealData.name}
      description={mealData.description}
      price={mealData.price} />
  );

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
};

export default AvailableMeals;