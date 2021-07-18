import React, { useState, useEffect } from "react"
import { Card, CardBody, CardFooter, Button, Row, Col } from "reactstrap"
import { Modal } from "react-bootstrap"
import { firestore } from "../Firebase/firebaseConfig"
import UserInfo from "../Forms/UserInfo"
import { ToastContainer, toast } from "react-toastify"
import { useAuth } from "../../contexts/AuthContext"
import useWindowSize from "../../hooks/useWindowSize"

export default function UserResume() {
  const size = useWindowSize()
  const [openModal, setOpenModal] = useState(false)
  const [userInfo, setuserInfo] = useState({})
  const { currentUser } = useAuth()
  const handleClose = () => setOpenModal(false)
  const handleShow = () => setOpenModal(true)
  const toastForForm = () => {
    toast.success("Informacion editada", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    })
  }
  useEffect(() => {
    firestore
      .collection("userInfo")
      .doc(currentUser.uid)
      .onSnapshot((doc) => {
        setuserInfo(doc.data())
      })
  }, [currentUser])
  return (
    <>
      <Card className="card-user">
        <CardBody>
          <div className="author">
            <img
              alt="..."
              className="avatar"
              src={
                currentUser.photoURL || require("assets/img/anime3.png").default
              }
            />

            <div>
              <Row>
                <Col
                  lg={6}
                  className={`${
                    size.width >= 992
                      ? "d-flex justify-content-end"
                      : "d-flex justify-content-center"
                  }`}
                >
                  <h4>
                    <b>Nombre de usuario:</b>
                  </h4>
                </Col>
                <Col
                  lg={6}
                  className={`${
                    size.width >= 992
                      ? "d-flex justify-content-start"
                      : "d-flex justify-content-center"
                  }`}
                >
                  <h4>{userInfo.userName || ""}</h4>
                </Col>
              </Row>
              <Row>
                <Col
                  lg={6}
                  className={`${
                    size.width >= 992
                      ? "d-flex justify-content-end"
                      : "d-flex justify-content-center"
                  }`}
                >
                  <h4>
                    <b>Nombre completo:</b>
                  </h4>
                </Col>
                <Col
                  lg={6}
                  className={`${
                    size.width >= 992
                      ? "d-flex justify-content-start"
                      : "d-flex justify-content-center"
                  }`}
                >
                  <h4>
                    {userInfo.firstName || ""} {userInfo.lastName || ""}
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col
                  lg={6}
                  className={`${
                    size.width >= 992
                      ? "d-flex justify-content-end"
                      : "d-flex justify-content-center"
                  }`}
                >
                  <h4>
                    <b>Informacion del usuario:</b>
                  </h4>
                </Col>
                <Col
                  lg={6}
                  className={`${
                    size.width >= 992
                      ? "d-flex justify-content-start"
                      : "d-flex justify-content-center"
                  }`}
                >
                  <h4>{userInfo.about || ""}</h4>
                </Col>
              </Row>
            </div>
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
  )
}
