import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Modalwindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal ({largeImage, toggleModal}) {

  const handleClose = e => {
    if (e.target === e.currentTarget || e.code === 'Escape')
    toggleModal();
  };

  useEffect (()=>{
    window.addEventListener('keydown', handleClose);

    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  }, [])

    return createPortal(
      <Overlay onClick={handleClose}>
        <Modalwindow>
          <img src={largeImage} alt="" />
        </Modalwindow>
      </Overlay>,
      modalRoot
    );
  }

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
