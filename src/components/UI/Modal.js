import React, { Fragment } from 'react';

import classes from './Modal.module.css';

const Backdrop = props => {
  return <div classes={classes.backdrop} />;
};

const ModalOverlay = props => {
  return (
    <div classes={classes.modal}>
      <div classes={classes.content}>
        {props.children}
      </div>
    </div>
  )
}

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop />
      <ModalOverlay />
    </Fragment>

  );
};

export default Modal;