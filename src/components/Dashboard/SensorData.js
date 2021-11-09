import React, { useEffect, useState } from "react";
import {
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Row,
	Col,
	Button,
	ButtonGroup,
	Table,
} from "reactstrap";
import { Line, Bar } from "react-chartjs-2";
import classNames from "classnames";
import firebase from "firebase/app";
import { database, firestore } from "../Firebase/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import Gauge from "variables/gauge";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { chart1, chart2, chart3, chart4 } from "variables/charts.js";

export default function SensorData() {
	const [bigChartData, setbigChartData] = useState("data1");
	const setBgChartData = (name) => {
		setbigChartData(name);
	};
	const apiUrl = process.env.REACT_APP_URL_API;
	const [glp, setGlp] = useState(0);
	const [co, setCo] = useState(0);
	const [glpDataLine, setGlpDataLine] = useState([0]);
	const [coDataLine, setCoDataLine] = useState([0]);
	const { currentUser } = useAuth();
	const [notificatedUsersByEmail, setNotificatedUsersByEmail] = useState([]);
	const [notificatedUsersByCellPhone, setNotificatedUsersByCellPhone] =
		useState([]);
	let contador = 0;

	const updateglpLine = () => {
		if (glpDataLine.length >= 12) {
			glpDataLine.splice(0, 1);
		} else {
			setGlpDataLine([...glpDataLine, glp]);
		}
	};

	const updatecoLine = () => {
		if (coDataLine.length >= 12) {
			coDataLine.splice(0, 1);
		} else {
			setCoDataLine([...coDataLine, co]);
		}
	};
	useEffect(() => {
		updateglpLine();
		updatecoLine();
		// eslint-disable-next-line
		if (glp < 1 && co < 1) {
			// eslint-disable-next-line
			contador = 0;
		}
		if (glp > 20 || co > 20) {
			const interval = setInterval(() => {
				handleNotifications(glp, co);
				contador++;
				console.log("Notificaciones", contador);
			}, 120000);
			return () => clearInterval(interval);
		}
	});

	useEffect(() => {
		const glpData = database.ref("Sensor1/lpg");
		glpData.on("value", (snapshot) => {
			setGlp(snapshot.val());
		});
		const coData = database.ref("Sensor1/co");
		coData.on("value", (snapshot) => {
			setCo(snapshot.val());
		});
	}, []);

	useEffect(() => {
		firestore
			.collection("userNotificationInfo")
			.doc(currentUser.uid)
			.onSnapshot((doc) => {
				setNotificatedUsersByEmail(doc.data().notificatedUsersByMail);
				setNotificatedUsersByCellPhone(doc.data().notificatedUsersByCellPhone);
			});
	}, [currentUser]);

	useEffect(() => {
		if ((glp > 20 && contador === 0) || (co > 20 && contador === 0)) {
			handleNotifications(glp, co);
			console.log("notificacion 0", contador);
			contador++;
			// eslint-disable-next-line
		}
		// eslint-disable-next-line
	}, [glp, co]);

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
						const data = { glp, co, date, withMail: true };
						firestore
							.collection("reports")
							.doc(currentUser.uid)
							.update({
								alertMail: firebase.firestore.FieldValue.arrayUnion(data),
							});
					})
					.catch((err) => {
						const date = new Date();
						const data = { glp, co, date, withMail: false };
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
		} else {
			const date = new Date();
			const data = { glp, co, date, withMail: false };
			firestore
				.collection("reports")
				.doc(currentUser.uid)
				.update({
					alertMail: firebase.firestore.FieldValue.arrayUnion(data),
				});
		}

		if (notificatedUsersByCellPhone.length > 0) {
			notificatedUsersByCellPhone.forEach(async (element) => {
				const data = { number: element, text };
				await axios
					.post(apiUrl + "/sendSmsNotification", data)
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
						const data = { glp, co, date, withSms: true };
						firestore
							.collection("reports")
							.doc(currentUser.uid)
							.update({
								alertSMS: firebase.firestore.FieldValue.arrayUnion(data),
							});
					})
					.catch((err) => {
						const date = new Date();
						const data = { glp, co, date, withSms: false };
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
		} else {
			const date = new Date();
			const data = { glp, co, date, withMail: false };
			firestore
				.collection("reports")
				.doc(currentUser.uid)
				.update({
					alertSMS: firebase.firestore.FieldValue.arrayUnion(data),
				});
		}
	};

	const chartData1 = {
		data1: (canvas) => {
			let ctx = canvas.getContext("2d");

			let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

			gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
			gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
			gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

			return {
				labels: ["", "", "", "", "", "", "", "", "", "", "", "", "realtime"],

				datasets: [
					{
						label: "GLP",
						fill: true,
						backgroundColor: gradientStroke,
						borderColor: "#1f8ef1",
						borderWidth: 2,
						borderDash: [],
						borderDashOffset: 0.0,
						pointBackgroundColor: "#1f8ef1",
						pointBorderColor: "rgba(255,255,255,0)",
						pointHoverBackgroundColor: "#1f8ef1",
						pointBorderWidth: 20,
						pointHoverRadius: 4,
						pointHoverBorderWidth: 15,
						pointRadius: 4,
						data: [...glpDataLine],
					},
				],
			};
		},
		data2: (canvas) => {
			let ctx = canvas.getContext("2d");

			let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

			gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
			gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
			gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

			return {
				labels: ["", "", "", "", "", "", "", "", "", "", "", "", "realtime"],
				datasets: [
					{
						label: "CO",
						fill: true,
						backgroundColor: gradientStroke,
						borderColor: "#1f8ef1",
						borderWidth: 2,
						borderDash: [],
						borderDashOffset: 0.0,
						pointBackgroundColor: "#1f8ef1",
						pointBorderColor: "rgba(255,255,255,0)",
						pointHoverBackgroundColor: "#1f8ef1",
						pointBorderWidth: 20,
						pointHoverRadius: 4,
						pointHoverBorderWidth: 15,
						pointRadius: 4,
						data: [...coDataLine],
					},
				],
			};
		},
	};
	const chartData2 = {
		data: (canvas) => {
			let ctx = canvas.getContext("2d");

			let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

			gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
			gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
			gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

			return {
				labels: [
					"Lunes",
					"Martes",
					"Miercoles",
					"Jueves",
					"Viernes",
					"Sabado",
					"Domingo",
				],
				datasets: [
					{
						label: "Data",
						fill: true,
						backgroundColor: gradientStroke,
						borderColor: "#1f8ef1",
						borderWidth: 2,
						borderDash: [],
						borderDashOffset: 0.0,
						pointBackgroundColor: "#1f8ef1",
						pointBorderColor: "rgba(255,255,255,0)",
						pointHoverBackgroundColor: "#1f8ef1",
						pointBorderWidth: 20,
						pointHoverRadius: 4,
						pointHoverBorderWidth: 15,
						pointRadius: 4,
						data: [80, 100, 70, 80, 120, 80, 50],
					},
				],
			};
		},
	};
	const chartData3 = {
		data: (canvas) => {
			let ctx = canvas.getContext("2d");

			let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

			gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
			gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
			gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

			return {
				labels: [
					"Enero",
					"Febrero",
					"Marzo",
					"Abril",
					"Mayo",
					"Junio",
					"Julio",
					"Agosto",
					"Septiembre",
					"Octubre",
					"Noviembre",
					"Diciembre",
				],
				datasets: [
					{
						label: "Countries",
						fill: true,
						backgroundColor: gradientStroke,
						hoverBackgroundColor: gradientStroke,
						borderColor: "#d048b6",
						borderWidth: 2,
						borderDash: [],
						borderDashOffset: 0.0,
						data: [53, 20, 10, 80, 100, 45, 53, 20, 10, 80, 100, 45],
					},
				],
			};
		},
	};
	const chartData4 = {
		data: (canvas) => {
			let ctx = canvas.getContext("2d");

			let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

			gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
			gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
			gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

			return {
				labels: [
					"Lunes",
					"Martes",
					"Miercoles",
					"Jueves",
					"Viernes",
					"Sabado",
					"Domingo",
				],
				datasets: [
					{
						label: "My First dataset",
						fill: true,
						backgroundColor: gradientStroke,
						borderColor: "#00d6b4",
						borderWidth: 2,
						borderDash: [],
						borderDashOffset: 0.0,
						pointBackgroundColor: "#00d6b4",
						pointBorderColor: "rgba(255,255,255,0)",
						pointHoverBackgroundColor: "#00d6b4",
						pointBorderWidth: 20,
						pointHoverRadius: 4,
						pointHoverBorderWidth: 15,
						pointRadius: 4,
						data: [80, 100, 70, 80, 120, 80, 50],
					},
				],
			};
		},
	};

	return (
		<>
			<div className="content">
				<Card body>
					<Row>
						<Col lg="4">
							<Card className="card-chart mh-100" style={{ height: "450px" }}>
								<CardHeader>
									<h5 className="card-category">Gases licuados de petroleo</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-alert-circle-exc text-warning" />{" "}
										{glp}
									</CardTitle>
								</CardHeader>
								<CardBody className="">
									<Gauge
										label="GLP"
										valor={glp}
										yellowFrom={50}
										yellowTo={75}
										redFrom={75}
										redTo={100}
									/>
								</CardBody>
							</Card>
						</Col>
						<Col lg="8">
							<Card className="card-chart mh-100" style={{ height: "450px" }}>
								<CardHeader>
									<CardTitle>
										<h1>Gas metano CH4</h1>
									</CardTitle>
								</CardHeader>
								<CardBody className="">
									<div className="container">
										<h4>
											Su particularidad es que es un asfixiante simple, ya que
											actúa desplazando el oxigeno que respiramos, (por sobre el
											25% produce asfixia por deficiencia de oxigeno), lo que
											significa que se puede estar expuesto a este gas en bajas
											cantidades sin sufrir mayores problemas físicos.
											<br /> Sin embargo su real peligro es su gran porcentaje
											de inflamabilidad, ya que su limite de explosividad varia
											entre un 5% en su nivel mínimo de explosividad y un 15% en
											su nivel máximo.
										</h4>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col lg="4">
							<Card className="card-chart mh-100" style={{ height: "450px" }}>
								<CardHeader>
									<h5 className="card-category">Monoxido de carbono</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-alert-circle-exc text-warning" />{" "}
										{co}
									</CardTitle>
								</CardHeader>

								<CardBody className="">
									{" "}
									<Gauge
										label="Co"
										valor={co}
										yellowFrom={50}
										yellowTo={75}
										redFrom={75}
										redTo={100}
									/>
								</CardBody>
							</Card>
						</Col>
						<Col lg="8">
							<Card className="card-chart mh-100" style={{ height: "450px" }}>
								<CardHeader>
									<CardTitle>
										<h1>Monoxido de carbono Co2</h1>
									</CardTitle>
								</CardHeader>
								<CardBody className="">
									<Table className="tablesorter" responsive>
										<thead className="text-primary">
											<tr>
												<th>
													<h5>Concentracion de carbono</h5>
												</th>
												<th>
													<h5>Tiempo de exposicion</h5>
												</th>
												<th>
													<h5>Signos y sintomas</h5>
												</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<h5>44 PPM (0.0040%)</h5>
												</td>
												<td>
													<h5>6 a 8 horas</h5>
												</td>
												<td>
													<h5>
														Maxima concentracion permitida. Labios y uñas toman
														un color rojo brillante
													</h5>
												</td>
											</tr>
											<tr>
												<td>
													<h5>200 PPM (0.02%)</h5>
												</td>
												<td>
													<h5>2 a 3 horas</h5>
												</td>
												<td>
													<h5>cefalea leve</h5>
												</td>
											</tr>
											<tr>
												<td>
													<h5>400 PPM (0.4%)</h5>
												</td>
												<td>
													<h5>1 a 2 horas</h5>
												</td>
												<td>
													<h5>cefalea frontal</h5>
												</td>
											</tr>
											<tr>
												<td>
													<h5>800 PPM (0.08%)</h5>
												</td>
												<td>
													<h5>45 minutos</h5>
												</td>
												<td>
													<h5>
														Mareos, náuseas y convulsiones. <br />
														Insensibilidad durante 2 horas.
													</h5>
												</td>
											</tr>
											<tr>
												<td>
													<h5>1600 PPM (0.16%)</h5>
												</td>
												<td>
													<h5>20 minutos</h5>
												</td>
												<td>
													<h5>
														cefalea, taquicardia, mareos y nauseas. <br />
														En menos de 2 horas <b>Muerte</b>
													</h5>
												</td>
											</tr>
										</tbody>
									</Table>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Card>
				<Card body>
					<Row>
						<Col xs="12">
							<Card className="card-chart">
								<CardHeader>
									<Row>
										<Col className="text-left" sm="6">
											<h5 className="card-category">ultimos datos</h5>
											<CardTitle tag="h2">
												Monitoreo de gases en tiempo real
											</CardTitle>
										</Col>
										<Col sm="6">
											<ButtonGroup
												className="btn-group-toggle float-right"
												data-toggle="buttons"
											>
												<Button
													tag="label"
													className={classNames("btn-simple", {
														active: bigChartData === "data1",
													})}
													color="info"
													id="0"
													size="sm"
													onClick={() => setBgChartData("data1")}
												>
													<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
														Gases licuados de petroleo
													</span>
													<span className="d-block d-sm-none">
														<i className="tim-icons icon-single-02" />
													</span>
												</Button>
												<Button
													color="info"
													id="1"
													size="sm"
													tag="label"
													className={classNames("btn-simple", {
														active: bigChartData === "data2",
													})}
													onClick={() => setBgChartData("data2")}
												>
													<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
														Monoxido de carbono
													</span>
													<span className="d-block d-sm-none">
														<i className="tim-icons icon-gift-2" />
													</span>
												</Button>
											</ButtonGroup>
										</Col>
									</Row>
								</CardHeader>
								<CardBody>
									<div className="chart-area">
										<Line
											data={chartData1[bigChartData]}
											options={chart1.options}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col lg="6">
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">
										Total De correos de alerta / Semana
									</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-bell-55 text-info" /> 76
									</CardTitle>
								</CardHeader>
								<CardBody>
									<div className="chart-area">
										<Line data={chartData2.data} options={chart2.options} />
									</div>
								</CardBody>
							</Card>
						</Col>

						<Col lg="6">
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">
										Total de SMS de alerta / Semana
									</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-send text-success" /> 12
									</CardTitle>
								</CardHeader>
								<CardBody>
									<div className="chart-area">
										<Line data={chartData4.data} options={chart4.options} />
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col lg="12">
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Total de alertas por mes</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-delivery-fast text-primary" />{" "}
										Alertas/Mes
									</CardTitle>
								</CardHeader>
								<CardBody>
									<div className="chart-area">
										<Bar data={chartData3.data} options={chart3.options} />
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Card>
			</div>
			<ToastContainer />
		</>
	);
}
