import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/salad.jpeg';
import classes from './Header.module.css';

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>GreenMeals</h1>
        <HeaderCartButton />
      </header>
      <div>
        <img src={mealsImage} alt="green food" />
      </div>
    </Fragment>
  );
};

export default Header;