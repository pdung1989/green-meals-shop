import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from 'react';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //loading data state
  const [error, setError] = useState(null);

  //fetch data from server
  const fetchMealsHandler = async () => {
    setError(null);
    try {
      const response = await fetch('https://green-meals-default-rtdb.firebaseio.com/meals/.json') //.json is required in firebase
      //check if it is error
      if(!response.ok) {
        throw new Error('Something went wrong');
      }
      //get json data
      const responseData = await response.json();//this is an object

      //loop thruogh every key of the responseData, add each meal object to the array
      const loadedData = [];
      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(loadedData);
      //show error message
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  //fetch data whenever the the function is called (the data changes)
  useEffect(() => {
    fetchMealsHandler();
  }, []);

  let mealsList = meals.map(mealData =>
    <MealItem
      key={mealData.id}
      id={mealData.id}
      name={mealData.name}
      description={mealData.description}
      price={mealData.price} />
  );
  //Loading before fetching data is done
  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>;
      </section>
    )
  };
  //show error to the screen
  if (error) {
    return (
      <section className={classes.error}>
        <p>{error}</p>
      </section>
    )
  };

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
};

export default AvailableMeals;