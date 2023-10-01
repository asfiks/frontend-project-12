import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ApiContext } from '../../contexts/ApiContext';
import { selectorsChannels } from '../../slices/channelsSlice';
import {Button, Modal, } from 'react-bootstrap';


export const RemoveChannelModal = ({ id, show, handleClose }) => {
  const { removeChannel } = useContext(ApiContext);

  const handleClick = async (id) => {
      await removeChannel({ 'id': id });
      handleClose();
    }

  return (
    <Modal 
      onHide={handleClose}
      show={show}
    >
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Уверены?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Отменить</Button>
          <Button variant="primary"onClick={async ()=> await handleClick(id)}>Удалить</Button>
        </Modal.Footer>
      </Modal>
    );
  };
