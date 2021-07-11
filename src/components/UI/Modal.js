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

const portalElement = document.getElementById('overlay')
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement )}
    </Fragment>
  );
};

export default Modal;