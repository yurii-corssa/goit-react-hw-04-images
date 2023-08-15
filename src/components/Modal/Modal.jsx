import { createPortal } from 'react-dom';
import { Backdrop, ModalContainer } from './Modal.styled';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const closeOnEscape = e => {
      if (e.code === 'Escape') onClose();
    };

    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  const closeOnClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <Backdrop onClick={closeOnClick}>
      <ModalContainer>{children}</ModalContainer>
    </Backdrop>,
    modalRoot
  );
};
