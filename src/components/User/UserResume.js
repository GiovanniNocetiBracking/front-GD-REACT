import React, { useState } from "react";
import { Card, CardBody, CardFooter, CardText, Button } from "reactstrap";
import { Modal } from "react-bootstrap";
import UserForm from "../Forms/UserInfo";

export default function UserResume() {
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleShow = () => setOpenModal(true);
  return (
    <>
      <Card className="card-user ">
        <CardBody>
          <CardText />
          <div className="author">
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              <img
                alt="..."
                className="avatar"
                src={require("assets/img/emilyz.jpg").default}
              />
              <h5 className="title">Mike Andrew</h5>
            </a>
            <p className="description">Ceo/Co-Founder</p>
          </div>
          <div className="card-description">
            Do not be scared of the truth because we need to restart the human
            foundation in truth And I love you like Kanye loves Kanye I love
            Rick Owens’ bed design but the back is...
          </div>
        </CardBody>
        <CardFooter>
          <Button onClick={handleShow}>Editar informacion de usuario</Button>
        </CardFooter>
      </Card>
      <Modal
        show={openModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Informacion de Usuario
            <p className="text-muted">
              Esta informacion nos ayuda a conocerte brevemente y nos permite
              manejar de mejor manera tus incidencias
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
