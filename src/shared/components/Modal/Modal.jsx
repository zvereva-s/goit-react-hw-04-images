import {useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

const modalEl = document.getElementById('modal-root');

function Modal({ closeModal, children }) {
  
  useEffect(() => {
    window.addEventListener("keydown", handleClose);
  }, []);
  useEffect(() => {
    return () => {
      window.removeEventListener("keydown", handleClose);
    };
  }, []);

  function handleClose(e) {
    if (e.target === e.currentTarget) {
      closeModal();
      return;
    }
    if (e.code === "Escape") {
      closeModal();
    }
  }
  return createPortal(
      (<div className={styles.Overlay} onClick={handleClose}>
        <div className={styles.Modal}>
          {children}
        </div>
      </div>
      ), modalEl
    );
}

Modal.defaultProps = {
  closeModal: ()=>{},
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Modal;
