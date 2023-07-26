import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalAddChannel = (props) => {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить канал
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="">
                <div>
                  <input name="name" id="name" className="mb-2 form-control" value="" />
                  <label className="visually-hidden" htmlFor="name">Имя канала</label>
                  <div className="invalid-feedback"></div>
                  <div className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={props.onHide}>Отменить</Button>
                    <Button variant="primary" onClick={props.onHide}>Отправить</Button>
                  </div>
                </div>
              </form>
        </Modal.Body>
      </Modal>
    );
}