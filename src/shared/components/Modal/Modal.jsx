import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

const modalEl = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
        document.addEventListener("keydown", this.handleClose);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleClose);
    }

    handleClose = (e) => {
        if(e.target === e.currentTarget) {
            this.props.closeModal();
            return;
        }
        if (e.code === "Escape") {
            this.props.closeModal();
        }
    }

    render() {
      const { children } = this.props;
      const { handleClose } = this;
      return (createPortal(
        <div className={styles.Overlay} onClick={handleClose} >
          <div className={styles.Modal}>
          {children}
          </div>
        </div>, modalEl)
    );
  }
}

Modal.defaultProps = {
  closeModal: ()=>{},
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Modal;