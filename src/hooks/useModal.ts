import {useState} from 'react';

const useModal = () => {
  const [modal, setModal] = useState<boolean>(false);

  const toggleModal = () => {
    setModal(prevModal => !prevModal);
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const modalObj = {
    modal,
    toggleModal,
    openModal,
    closeModal,
  };

  return modalObj;
};

export default useModal;
