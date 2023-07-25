import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { ModalContext } from '../contexts/ModalContext';
/* import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../contexts/AuthContext';
import { fetchData, selectorsChannels, setCurrentChannelId } from '../slices/channelsSlice'; */

const ModalAddChannel = () => {
    const { isOpenModal, openModal, closeModal } = useContext(ModalContext)
    return (
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">
                Добавить канал
              </div>
              <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close"  onClick={closeModal} ></button>
            </div>
            <div className="modal-body">
              <form className="">
                <div>
                  <input name="name" id="name" className="mb-2 form-control" value="" />
                  <label className="visually-hidden" htmlFor="name">Имя канала</label>
                  <div className="invalid-feedback"></div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary"  onClick={closeModal} >Отменить</button>
                    <button type="submit" className="btn btn-primary">Отправить</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ModalAddChannel;