import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, CardText, Button } from "reactstrap";
import { Modal } from "react-bootstrap";
import { firestore } from "../Firebase/firebaseConfig";
import UserInfo from "../Forms/UserInfo";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

export default function UserResume() {
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setuserInfo] = useState({});
  const { currentUser } = useAuth();
  const handleClose = () => setOpenModal(false);
  const handleShow = () => setOpenModal(true);
  const toastForForm = () => {
    toast.success("Informacion editada", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    });
  };
  useEffect(() => {
    firestore
      .collection("userInfo")
      .doc(currentUser.uid)
      .onSnapshot((doc) => {
        setuserInfo(doc.data());
      });
  }, [currentUser]);
  return (
    <>
      <Card className="card-user">
        <CardBody>
          <CardText />
          <div className="author">
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              <img
                alt="..."
                className="avatar"
                src={require("assets/img/anime3.png").default}
              />
              <h5 className="title">{userInfo.userName}</h5>
            </a>
            <p>
              {userInfo.firstName} {userInfo.lastName}
            </p>
          </div>
          <div className="card-description d-flex justify-content-center">
            {userInfo.about}
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
        id="userUpdateModal"
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
          <UserInfo onHide={handleClose} Alerta={toastForForm} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}
