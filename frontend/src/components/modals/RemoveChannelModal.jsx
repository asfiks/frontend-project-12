import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ApiContext } from '../../contexts/ApiContext';
import { selectorsChannels } from '../../slices/channelsSlice';
import {Button, Modal, } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const RemoveChannelModal = ({ id, show, handleClose }) => {
  const { removeChannel } = useContext(ApiContext);
  const { t } = useTranslation();
  const handleClick = async (id) => {
    await removeChannel({ id });
    handleClose();
  }

  return (
    <Modal 
      onHide={handleClose}
      show={show}
    >
        <Modal.Header closeButton>
          <Modal.Title>{t('modalRemoveChannel.removeChannel')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{t('modalRemoveChannel.confirm')}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>{t('modalRemoveChannel.buttonCancel')}</Button>
          <Button variant="primary"onClick={async ()=> await handleClick(id)}>{t('modalRemoveChannel.buttonRemove')}</Button>
        </Modal.Footer>
      </Modal>
    );
  };
