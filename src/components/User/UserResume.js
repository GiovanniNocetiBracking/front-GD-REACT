import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Button, Row, Col } from "reactstrap";
import { Modal } from "react-bootstrap";
import { firestore } from "../Firebase/firebaseConfig";
import UserInfo from "../Forms/UserInfo";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import useWindowSize from "../../hooks/useWindowSize";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));

export default function UserResume() {
	const size = useWindowSize();
	const { currentUser } = useAuth();
	const classes = useStyles();
	const [openModal, setOpenModal] = useState(false);
	const [userInfo, setuserInfo] = useState({});
	const [loading, setLoading] = useState(false);

	const handleClose = () => setOpenModal(false);
	const handleShow = () => setOpenModal(true);
	const toastForForm = () => {
		toast.success("Informacion editada", {
			position: toast.POSITION.BOTTOM_RIGHT,
			className: "foo-bar",
		});
	};
	useEffect(() => {
		setLoading(true);
		firestore
			.collection("userInfo")
			.doc(currentUser.uid)
			.onSnapshot((doc) => {
				setuserInfo(doc.data());
				setLoading(false);
			});
	}, [currentUser]);
	return (
		<>
			{!userInfo ? (
				<Card className="card-user">
					<CardBody className=" mh-100" style={{ height: "600px" }}>
						<div className="author">
							<img
								alt="..."
								className="avatar"
								src={
									currentUser.photoURL ||
									require("assets/img/anime3.png").default
								}
							/>
						</div>
					</CardBody>
					<CardFooter>
						<div className="d-flex justify-content-center">
							<Button onClick={handleShow}>
								Editar informacion de usuario
							</Button>
						</div>
					</CardFooter>
				</Card>
			) : (
				<Card className="card-user">
					<CardBody className=" mh-100" style={{ height: "600px" }}>
						<div className="author">
							<img
								alt="..."
								className="avatar"
								src={
									currentUser.photoURL ||
									require("assets/img/anime3.png").default
								}
							/>
							;
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
												? "d-flex justify-content-center"
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
												? "d-flex justify-content-center"
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
												? "d-flex justify-content-center"
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
						<Button className="ml-5" onClick={handleShow}>
							Editar informacion de usuario
						</Button>
					</CardFooter>
				</Card>
			)}
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
			{loading && (
				<Backdrop className={classes.backdrop} open>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}
			<ToastContainer />
		</>
	);
}
