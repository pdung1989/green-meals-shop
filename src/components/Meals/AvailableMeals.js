import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from "./AvailableMeals.module.css";
import { useCallback, useEffect, useState } from 'react';



const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  //fetch data from server
  const fetchMealsHandler = useCallback(async () => {
    const response = await fetch('https://green-meals-default-rtdb.firebaseio.com/meals/.json') //.json is required in firebase
    const responseData = await response.json();//this is an object

    const loadedData = [];
  //loop thruogh every key of the responseData to get the value is the object of each meal
    for (const key in responseData) {
      loadedData.push({
        id: key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price
      })
    }
    setMeals(loadedData);
  }, []);

  //fetch data whenever the the function is called (the data changes)
  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

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