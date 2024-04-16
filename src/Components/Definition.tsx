import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import "../Styles/Definition.css";

interface DefinitionProps {
  word: string;
  trans: string;
}

function Definition(props: DefinitionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="overflow-hidden " onClick={toggleModal}>
      <div className="card definition mt-5 border-dark rounded">
        <div className="card-body">
          <h5 className="card-title user-select-none overflow-hidden">
            {props.word}
          </h5>
          <p className="card-text user-select-none">
            {props.trans}
          </p>
          
        </div>
      </div>
      
      <Modal show={modalOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{`${props.word}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Translation: ${props.trans}`}</Modal.Body>
      </Modal>
    </div>
  );
}

export default Definition;