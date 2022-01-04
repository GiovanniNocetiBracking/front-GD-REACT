import React, { useState, useEffect } from "react";
import {
	Row,
	Col,
	Table,
	Card,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
import firebase from "firebase/app";
import { firestore, database } from "../Firebase/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { useAuth } from "../../contexts/AuthContext";

export default function ReportTable() {
	const { currentUser } = useAuth();
	const [glp, setGlp] = useState(0);
	const [co, setCo] = useState(0);
	const [notificatedUsersByEmail, setNotificatedUsersByEmail] = useState([]);
	const [notificatedUsersByCellPhone, setNotificatedUsersByCellPhone] =
		useState([]);
	const [contador, setContador] = useState(0);
	const [dropdown, setDropdown] = useState(false);
	const [selected, setSelected] = useState("ambos");
	const [reportsByMail, setReportsByMail] = useState([]);
	const [reportsBySms, setReportsBySms] = useState([]);
	const [reports, setReports] = useState([]);
	const [filteredReports, setFilteredReports] = useState([]);
	const [flag, setFlag] = useState(false);
	const apiUrl = process.env.REACT_APP_URL_API;
	const handleNotifications = (glp, co) => {
		const message = `Se ha detectado la presencia de gas en niveles peligrosos, GLP = ${glp} PPM y CO = ${co} PPM`;

		const text = `Se ha detectado la presencia de gas en niveles peligrosos, GLP = ${glp} PPM y CO = ${co} PPM`;

		if (notificatedUsersByEmail.length > 0) {
			notificatedUsersByEmail.forEach(async (element) => {
				const data = { email: element, message };
				await axios
					.post(apiUrl + "/sendMailNotifications", data)
					.then((response) => {
						console.log(" mail", response);
						toast.success(
							"Gases en nivel peligroso, se ha enviado una notificacion via MAIL",
							{
								position: toast.POSITION.BOTTOM_RIGHT,
								className: "foo-bar",
							}
						);
					})
					.then(() => {
						const date = new Date();
						const data = { glp, co, date, withMail: true, type: "mail" };
						firestore
							.collection("reports")
							.doc(currentUser.uid)
							.update({
								alertMail: firebase.firestore.FieldValue.arrayUnion(data),
							});
					})
					.catch((err) => {
						const date = new Date();
						const data = { glp, co, date, withMail: false, type: "mail" };
						firestore
							.collection("reports")
							.doc(currentUser.uid)
							.update({
								alertMail: firebase.firestore.FieldValue.arrayUnion(data),
							});
						toast.error(err, {
							position: toast.POSITION.BOTTOM_RIGHT,
							className: "foo-bar",
						});
					});
			});
		}

		if (notificatedUsersByCellPhone.length > 0) {
			notificatedUsersByCellPhone.forEach(async (element) => {
				const data = { number: element, text };
				await axios
					.post(apiUrl + "/sendSmsNotifications", data)
					.then((response) => {
						console.log(" sms", response);
						toast.success(
							"Gases en nivel peligroso, se ha enviado una notificacion via SMS",
							{
								position: toast.POSITION.BOTTOM_RIGHT,
								className: "foo-bar",
							}
						);
					})
					.then(() => {
						const date = new Date();
						const data = { glp, co, date, withSms: true, type: "sms" };
						firestore
							.collection("reports")
							.doc(currentUser.uid)
							.update({
								alertSMS: firebase.firestore.FieldValue.arrayUnion(data),
							});
					})
					.catch((err) => {
						const date = new Date();
						const data = { glp, co, date, withSms: false, type: "sms" };
						firestore
							.collection("reports")
							.doc(currentUser.uid)
							.update({
								alertSMS: firebase.firestore.FieldValue.arrayUnion(data),
							});
						toast.error(err, {
							position: toast.POSITION.BOTTOM_RIGHT,
							className: "foo-bar",
						});
					});
			});
		}
	};

	useEffect(() => {
		if (glp < 1 && co < 1) {
			// eslint-disable-next-line
			setContador(0);
		}
		if (glp > 20 || co > 20) {
			const interval = setInterval(() => {
				handleNotifications(glp, co);
				// eslint-disable-next-line
				setContador(contador + 1);
				console.log("Notificaciones", contador);
			}, 120000);
			return () => clearInterval(interval);
		}
		// eslint-disable-next-line
	});
	useEffect(() => {
		if ((glp > 20 && contador === 0) || (co > 20 && contador === 0)) {
			handleNotifications(glp, co);
			console.log("notificacion 0", contador);
			setContador(contador + 1);
			// eslint-disable-next-line
		}
		// eslint-disable-next-line
	}, [glp, co]);

	const handleOpen = () => {
		setDropdown(!dropdown);
	};

	const handleFlag = () => {
		for (let i = 0; i < 2; i++) {
			setTimeout(() => {
				setFlag(!flag);
			}, 1000);
		}
	};
	const dateTransform = (seconds, nanoSeconds) => {
		let data = new Date(seconds * 1000 + nanoSeconds / 1000000);
		let finalDate =
			data.getDate() + "-" + (data.getMonth() + 1) + "-" + data.getFullYear();
		return finalDate;
	};
	const handleSearch = async () => {
		firestore
			.collection("reports")
			.doc(currentUser.uid)
			.onSnapshot((doc) => {
				setReportsByMail(doc.data().alertMail);
				setReportsBySms(doc.data().alertSMS);
			});

		setReports([...reportsByMail, ...reportsBySms]);
	};
	const handleFilteredSearch = (reports, selected) => {
		let filtered = reports.filter((items) => items.type === selected);
		setFilteredReports(filtered);
	};
	useEffect(() => {
		handleSearch();
		// eslint-disable-next-line
	}, [flag, glp, co]);
	useEffect(() => {
		handleFilteredSearch(reports, selected);
		// eslint-disable-next-line
	}, [selected]);
	useEffect(() => {
		handleFlag();
		const glpData = database.ref("Sensor1/lpg");
		glpData.on("value", (snapshot) => {
			setGlp(snapshot.val());
		});
		const coData = database.ref("Sensor1/co");
		coData.on("value", (snapshot) => {
			setCo(snapshot.val());
		});
		firestore
			.collection("userNotificationInfo")
			.doc(currentUser.uid)
			.onSnapshot((doc) => {
				setNotificatedUsersByEmail(doc.data().notificatedUsersByMail);
				setNotificatedUsersByCellPhone(doc.data().notificatedUsersByCellPhone);
			});
		// eslint-disable-next-line
	}, [currentUser]);

	return (
		<>
			<div className="content">
				<div className="mt-5">
					<Row className="d-flex justify-content-center">
						<Col sm="12" md="6" lg="3">
							<h3>Tipo de Notificaciones</h3>
						</Col>
						<Col sm="12" md="6" lg="3">
							<Dropdown isOpen={dropdown} toggle={handleOpen}>
								<DropdownToggle caret> {selected}</DropdownToggle>
								<DropdownMenu>
									<DropdownItem
										onClick={() => {
											setSelected("sms");
										}}
									>
										SMS
									</DropdownItem>
									<DropdownItem
										onClick={() => {
											setSelected("mail");
										}}
									>
										Mail
									</DropdownItem>
									<DropdownItem
										onClick={() => {
											setSelected("ambos");
										}}
									>
										Ambos
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</Col>
					</Row>

					<br />
					<Row className=" d-flex justify-content-center mt-5">
						<Col sm="12" lg="8">
							<Card className="mb-5">
								<h2 className="text-center mt-2">Alertas</h2>
								<Table bordered className="p-5 ">
									<thead className="text-center">
										<tr>
											<th>#</th>
											<th>GLP</th>
											<th>CO</th>
											<th>FECHA</th>
											<th>TIPO DE NOTIFICACION</th>
											<th>ESTADO DE NOTIFICACION</th>
										</tr>
									</thead>
									<tbody>
										{reports.length !== 0 ? (
											filteredReports.length !== 0 ? (
												filteredReports.map((el, index) => (
													<tr key={index} className="text-center">
														<td>{index + 1}</td>
														<td>{el.glp}</td>
														<td>{el.co}</td>
														<td>
															{dateTransform(
																el.date.seconds,
																el.date.nanoseconds
															)}
														</td>
														<td>
															{el.withMail === undefined ? "SMS" : "MAIL"}
														</td>
														<td>
															{el.withMail === true
																? "ENVIADA"
																: el.withSMS === true
																? "ENVIADA"
																: "Sin notificacion"}
														</td>
													</tr>
												))
											) : (
												reports.map((el, index) => (
													<tr key={index} className="text-center">
														<td>{index + 1}</td>
														<td>{el.glp}</td>
														<td>{el.co}</td>
														<td>
															{dateTransform(
																el.date.seconds,
																el.date.nanoseconds
															)}
														</td>
														<td>
															{el.withMail === undefined ? "SMS" : "MAIL"}
														</td>
														<td>
															{el.withMail === true
																? "ENVIADA"
																: el.withSMS === true
																? "ENVIADA"
																: "NO ENVIADA"}
														</td>
													</tr>
												))
											)
										) : (
											<tr>
												<td>no hay informacion..</td>
												<td>no hay informacion..</td>
												<td>no hay informacion..</td>
												<td>no hay informacion..</td>
												<td>no hay informacion..</td>
												<td>no hay informacion..</td>
											</tr>
										)}
									</tbody>
								</Table>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
			<ToastContainer />
		</>
	);
}
