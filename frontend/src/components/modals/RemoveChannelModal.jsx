import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { ApiContext } from '../../contexts/ApiContext';
import 'react-toastify/dist/ReactToastify.css';
import properties from '../toastProp';

const RemoveChannelModal = ({ id, show, handleClose }) => {
  const { removeChannel } = useContext(ApiContext);
  const { t } = useTranslation();
  const handleClick = async () => {
    try {
      await removeChannel({ id });
      toast.success(t('toast.remove'), properties);
      handleClose();
    } catch (error) {
      toast.error(t('toast.error'), properties);
      console.error(error);
    }
  };

  return (
    <Modal
      onHide={handleClose}
      show={show}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modalRemoveChannel.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{t('modalRemoveChannel.confirm')}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>{t('modalRemoveChannel.buttonCancel')}</Button>
        <Button variant="danger" onClick={() => handleClick(id)}>{t('modalRemoveChannel.buttonRemove')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
