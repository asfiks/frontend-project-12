import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { selectorsChannels } from '../../slices/channelsSlice';
import { ApiContext } from '../../contexts/ApiContext';
import 'react-toastify/dist/ReactToastify.css';
import properties from '../toastProp';

const AddChannelModal = ({ show, handleClose }) => {
  const { t } = useTranslation();
  const username = localStorage.getItem('username');
  const { getAddNewChannelFromServer } = useContext(ApiContext);
  const channels = useSelector(selectorsChannels.selectAll);
  const namesAllChannels = channels.map((channel) => channel.name);
  const validationSchema = Yup.object({
    name: Yup.string()
      .notOneOf(namesAllChannels, t('modalAdd.validation.uniq'))
      .min(3, t('modalAdd.validation.nameMinMax'))
      .max(20, t('modalAdd.validation.nameMinMax'))
      .required(t('modalAdd.validation.name')),
  });

  const handleSubmit = async (values) => {
    const updatedValues = { ...values, username };
    try {
      await getAddNewChannelFromServer(updatedValues);
      toast.success(t('toast.add'), properties);
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
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modalAdd.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit, handleChange, values, touched, errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                autoFocus
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Label htmlFor="name" className="visually-hidden">{t('modalAdd.name')}</Form.Label>
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  {t('modalAdd.buttonCancel')}
                </Button>
                <Button variant="primary" type="submit">
                  {t('modalAdd.buttonCreate')}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
