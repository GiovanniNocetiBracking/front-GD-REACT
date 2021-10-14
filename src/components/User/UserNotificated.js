import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Button, Row, Col } from "reactstrap";
import firebase from "firebase/app";
import { firestore } from "../Firebase/firebaseConfig";
import { useAuth } from "../../contexts/AuthContext";
import { Formik, Form as FormF } from "formik";
import * as yup from "yup";
import { TextField } from "../Forms/TextField";
import { toast } from "react-toastify";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));

export default function UserNotificated() {
	const { currentUser } = useAuth();
	const [notificatedUsersByEmail, setNotificatedUsersByMail] = useState([]);
	const [notificatedUsersByCellPhone, setNotificatedUsersByCellPhone] =
		useState([]);
	const [loading, setLoading] = useState(false);
	const classes = useStyles();
	const validateForm1 = yup.object().shape({
		email: yup
			.string()
			.required("Este campo no puede ir vacio")
			.email("Pruebe con un correo valido"),
	});
	const validateForm2 = yup.object({
		cellPhone: yup
			.string()
			.required("Este campo no puede ir vacio")
			.min(8, "El numero debe contener almenos 8 caracteres y maximo 11")
			.nullable(),
	});

	const handleDelete = (key) => {
		firestore
			.collection("userNotificationInfo")
			.doc(currentUser.uid)
			.update({
				notificatedUsersByMail: firebase.firestore.FieldValue.arrayRemove(key),
			});
	};

	useEffect(() => {
		setLoading(true);
		firestore
			.collection("userNotificationInfo")
			.doc(currentUser.uid)
			.onSnapshot((doc) => {
				setNotificatedUsersByMail(doc.data().notificatedUsersByMail);
				setNotificatedUsersByCellPhone(doc.data().notificatedUsersByCellPhone);

				setLoading(false);
			});
	}, []);

	return (
		<>
			<Card className="card-user">
				<CardHeader>
					<h1>Metodos de notificacion</h1>
				</CardHeader>
				<CardBody>
					<Row>
						<Col>
							<h2>Notificacion por correo</h2>

							<Formik
								enableReinitialize={true}
								initialValues={{
									email: "",
								}}
								validationSchema={validateForm1}
								onSubmit={(values, actions) => {
									setLoading(true);
									try {
										firestore
											.collection("userNotificationInfo")
											.doc(currentUser.uid)
											.update({
												notificatedUsersByMail:
													firebase.firestore.FieldValue.arrayUnion(
														values.email
													),
											});
										actions.resetForm();
										setLoading(false);
									} catch (error) {
										toast.error(error.message, {
											position: toast.POSITION.BOTTOM_RIGHT,
											className: "foo-bar",
										});
										setLoading(false);
									}
								}}
							>
								{(formik) => (
									<FormF className="mt-4">
										<TextField
											label="Correo"
											name="email"
											type="text"
											placeholder="Ingrese una casilla de correo"
										/>
										<div className="d-flex justify-content-center">
											<Button disabled={loading} type="submit" className="mt-4">
												Agregar correo
											</Button>
										</div>
									</FormF>
								)}
							</Formik>
						</Col>
						<Col>
							<h4 className="mt-2 d-flex justify-content-center">Correos</h4>

							{notificatedUsersByEmail && notificatedUsersByEmail.length > 0 ? (
								notificatedUsersByEmail.map((user, key) => {
									return (
										<div className="" key={key}>
											<Row className="d-flex align-items-center">
												<Col className="d-flex justify-content-end">
													<ul>
														<li className="mt-2">{user}</li>
													</ul>
												</Col>
												<Col>
													<Button
														type="button"
														className=""
														onClick={handleDelete(key)}
													>
														<i
															className="tim-icons icon-trash-simple

"
														></i>
													</Button>
													<Button type="button" className="">
														<i className="tim-icons icon-pencil"></i>
													</Button>
												</Col>
											</Row>
										</div>
									);
								})
							) : (
								<h3 className="d-flex justify-content-center">
									no hay ningun elemento
								</h3>
							)}
						</Col>
					</Row>
					<Row className="mt-5">
						<Col>
							<h2 className="">Notificacion por red GSM</h2>
							<Formik
								enableReinitialize={true}
								initialValues={{
									cellPhone: "",
								}}
								validationSchema={validateForm2}
								onSubmit={(values, actions) => {
									setLoading(true);
									try {
										firestore
											.collection("userNotificationInfo")
											.doc(currentUser.uid)
											.update({
												notificatedUsersByCellPhone:
													firebase.firestore.FieldValue.arrayUnion(
														values.cellPhone
													),
											});
										actions.resetForm();
										setLoading(false);
										console.log(notificatedUsersByCellPhone);
									} catch (error) {
										toast.error(error.message, {
											position: toast.POSITION.BOTTOM_RIGHT,
											className: "foo-bar",
										});
										setLoading(false);
									}
								}}
							>
								{(formik) => (
									<FormF className="mt-4">
										<TextField
											label="Numero de celular"
											name="cellPhone"
											type="text"
											placeholder="ingrese su numero de celular"
										/>
										<div className="d-flex justify-content-center">
											<Button disabled={loading} type="submit" className="mt-4">
												Agregar numero
											</Button>
										</div>
									</FormF>
								)}
							</Formik>
						</Col>
						<Col>
							<h4 className="mt-2 d-flex justify-content-center">Numeros</h4>
							{notificatedUsersByCellPhone.map((user, key) => {
								return (
									<div className="" key={key}>
										<Row>
											<Col className="d-flex justify-content-end">
												<ul>
													<li>{user}</li>
												</ul>
											</Col>
											<Col>
												<Button type="button" className="danger">
													<i
														className="tim-icons icon-trash-simple

"
													></i>
												</Button>
												<Button type="button" className="danger">
													<i className="tim-icons icon-pencil"></i>
												</Button>
											</Col>
										</Row>
									</div>
								);
							})}
						</Col>
					</Row>
					{loading && (
						<Backdrop className={classes.backdrop} open>
							<CircularProgress color="inherit" />
						</Backdrop>
					)}
				</CardBody>
			</Card>
		</>
	);
}
