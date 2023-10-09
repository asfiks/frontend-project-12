import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ApiContext } from '../../contexts/ApiContext';
import { selectorsChannels } from '../../slices/channelsSlice';
import {Button, Modal, } from 'react-bootstrap';
import * as Yup from'yup';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddChannelModal = ({ show, handleClose }) => {
  const { t } = useTranslation();
  //toast("Wow so easy!");
  const username  = localStorage.getItem('username');
  const { getAddNewChannelFromServer } = useContext(ApiContext);
  const channels = useSelector(selectorsChannels.selectAll);
  const namesAllChannels = channels.map((channel) => channel.name)
  const validationSchema = Yup.object({
      name: Yup.string()
        .notOneOf(namesAllChannels, t('modalAdd.validation.uniq'))
        .required(t('modalAdd.validation.name'))
    });

  const handleSubmit = async (values) => {
    values.username = username;
    try {
      await getAddNewChannelFromServer(values);
      toast("тест тестов");
      handleClose();
    } catch (error) {
      console.error(error)
    }

  }

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
            {({ errors, touched, }) => (
              <Form>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  autoFocus
                  className={`form-control ${errors.name && touched.name ? 'is-invalid' : null}`}
                />
                {errors.name && touched.name ? <div className="invalid-tooltip">{errors.name}</div> : null}
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
