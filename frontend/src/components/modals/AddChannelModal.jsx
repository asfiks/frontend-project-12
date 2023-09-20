import React, { useContext, useEffect } from 'react';
//import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { ApiContext } from '../../contexts/ApiContext';
import { selectorsChannels, setCurrentChannelId } from '../../slices/channelsSlice';
import {Button, Modal, } from 'react-bootstrap';
import * as Yup from'yup';
import { Formik, Form, Field } from 'formik';


export const AddChannelModal = ({ show, handleClose, /* setNewChannel */ }) => {
  
  const state = useSelector((state) => state)
  const username  = localStorage.getItem('username');
  const { getAddNewChannelFromServer } = useContext(ApiContext);
  const dispatch = useDispatch();
  const channels = useSelector(selectorsChannels.selectAll);
  const namesAllChannels = channels.map((channel) => channel.name)
  const validationSchema = Yup.object({
      name: Yup.string().required('Поле "Введите имя" обязательно для заполнения').notOneOf(namesAllChannels, 'Канал с таким названием уже существуют')
    });
/*     useEffect(() => {
      console.log(state)
    }, state) */
  
  const handleSubmit = async (values) => {
    values.username = username;
    await getAddNewChannelFromServer(values);
    handleClose();
  }

  return (
      <Modal
        onHide={handleClose}
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
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
                    Отменить
                  </Button>
                  <Button variant="primary" type="submit">
                    Создать канал
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  };
