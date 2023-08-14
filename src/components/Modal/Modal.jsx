import { createPortal } from 'react-dom';
import { Backdrop, ModalContainer } from './Modal.styled';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, []);

  const closeModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={closeModal}>
      <ModalContainer>{children}</ModalContainer>
    </Backdrop>,
    modalRoot
  );
};
