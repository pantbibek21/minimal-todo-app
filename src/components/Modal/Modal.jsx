import React from 'react';
import styles from './Modal.module.scss';

function Modal({ dialog }) {
  return (
    <div className={styles.backdrop}>
      {dialog}
    </div>
  );
}

export default Modal;
