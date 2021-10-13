import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Button, Row, Col } from "reactstrap";
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
	const [notificatedUsersByMail, setNotificatedUsersByMail] = useState([]);
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

	useEffect(() => {
		setLoading(true);

		firestore
			.collection("userNotificationInfo")
			.doc(currentUser.uid)
			.onSnapshot((doc) => {
				if (doc.length > 0) {
					setNotificatedUsersByMail(doc.data().notificatedUsersByMail);
					setNotificatedUsersByCellPhone(
						doc.data().notificatedUsersByCellPhone
					);
				}
				setLoading(false);
			});
	}, [currentUser]);

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
										setNotificatedUsersByMail([
											...notificatedUsersByMail,
											values.email,
										]);

										actions.resetForm();
										setLoading(false);
										console.log(notificatedUsersByMail);
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
							<ul></ul>
						</Col>
					</Row>
					<Row className="mt-5">
						<Col>
							<h2 className="">Notificacion por red GSM</h2>
							<Formik
								enableReinitialize={true}
								initialValues={{
									email: "",
								}}
								validationSchema={validateForm2}
								onSubmit={(values, actions) => {
									setLoading(true);
									try {
										setNotificatedUsersByCellPhone(values.cellPhone);
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
