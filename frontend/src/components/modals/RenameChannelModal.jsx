import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ApiContext } from '../../contexts/ApiContext';
import { selectorsChannels } from '../../slices/channelsSlice';
import {Button, Modal, } from 'react-bootstrap';
import * as Yup from'yup';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import properties from '../toastProp';

export const RenameChannelModal = ({ id, show, handleClose, }) => {
  const { t } = useTranslation();
  const { renamedChannel } = useContext(ApiContext);
  const channels = useSelector(selectorsChannels.selectAll);
  const [channelForRename] = channels.filter((ch) => ch.id === id)
  const namesAllChannels = channels.map((channel) => channel.name)
  const validationSchema = Yup.object({
      name: Yup.string()
        .notOneOf(namesAllChannels, t('modalRemaneChannel.validation.uniq'))
        .required(t('modalRemaneChannel.validation.name'))
    });
  const handleSubmit = async (values) => {
      try {
        values.id = id;
        await renamedChannel(values);
        toast.success(t('toast.rename'), properties);
        handleClose();
      } catch (error) {
        toast.error(t('toast.rename'), properties);
        console.error(error);
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
          <Modal.Title>{t('modalRemaneChannel.renameChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ name: channelForRename ? channelForRename.name : '' }}
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
                    {t('modalRemaneChannel.buttonCancel')}
                  </Button>
                  <Button variant="primary" type="submit">
                    {t('modalRemaneChannel.buttonSend')}
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  };
