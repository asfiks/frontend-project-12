import React, { createContext, useState, useEffect } from 'react';

export const ModalContext = createContext();
export const ModalProvider = ({ children }) => {

  const [isOpenModal, setOpenModal] = useState(false);

  const openModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <ModalContext.Provider value={{ isOpenModal, openModal, closeModal, }}>
      {children}
    </ModalContext.Provider>
  );
};