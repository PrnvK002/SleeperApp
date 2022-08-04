import React from 'react';
import { Modal } from 'react-bootstrap';

function SuccessModal( { show , handleClose  } ) {
    console.log('successModal',show);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Success Message </Modal.Title>
        </Modal.Header>
        <Modal.Body> You have successfully Completed the quiz </Modal.Body>
      </Modal>
    </>
  );
}

export default SuccessModal;