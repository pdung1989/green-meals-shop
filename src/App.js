import { Fragment, useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

function App() {
  const [cartIsShow, setCardIsShow] = useState(false);

  const showCartHandler = () => {
    setCardIsShow(true);
  };

  const hideCartHandler = () => {
    setCardIsShow(false);
  };

  return (
    <Fragment>
      {cartIsShow && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
