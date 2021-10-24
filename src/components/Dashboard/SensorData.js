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
import { database, firestore } from "../Firebase/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import Gauge from "variables/gauge";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import {
	chartExample1,
	chartExample2,
	chartExample3,
	chartExample4,
} from "variables/charts.js";

export default function SensorData(props) {
	const [bigChartData, setbigChartData] = useState("data1");
	const setBgChartData = (name) => {
		setbigChartData(name);
	};
	const apiUrl = process.env.REACT_APP_URL_API;
	const [glp, setGlp] = useState();
	const [co, setCo] = useState();
	//const [notificationToken, setNotificationToken] = useState("")
	const { currentUser } = useAuth();
	const [notificatedUsersByEmail, setNotificatedUsersByEmail] = useState([]);
	const [notificatedUsersByCellPhone, setNotificatedUsersByCellPhone] =
		useState([]);

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
	/* useEffect(() => {
		messaging
			.requestPermission()
			.then(() => {
				return messaging.getToken();
			})
			.then((data) => {
				setNotificationToken(data);
			});
	}, []); */
	useEffect(() => {
		firestore
			.collection("userNotificationInfo")
			.doc(currentUser.uid)
			.onSnapshot((doc) => {
				setNotificatedUsersByEmail(doc.data().notificatedUsersByMail);
				setNotificatedUsersByCellPhone(doc.data().notificatedUsersByCellPhone);
			});
	}, [currentUser]);

	const handleNotifications = () => {
		const message = "Se ha detectado la presencia de gas en niveles peligrosos";
		const text = "Se ha detectado la presencia de gas en niveles peligrosos";
		if (glp >= 200 || co >= 200) {
			notificatedUsersByEmail.forEach(async (element) => {
				const data = { email: element, message };
				await axios
					.post(apiUrl + "/sendMailNotifications", data)
					.then((response) => {
						console.log(response);
						toast.error(
							"Gases en nivel peligroso, se ha enviado una notificacion via MAIL",
							{
								position: toast.POSITION.BOTTOM_RIGHT,
								className: "foo-bar",
							}
						);
					});
			});
			notificatedUsersByCellPhone.forEach(async (element) => {
				const data = { number: element, text };
				await axios
					.post(apiUrl + "/sendSmsNotifications", data)
					.then((response) => {
						console.log(response);
						toast.error(
							"Gases en nivel peligroso, se ha enviado una notificacion via SMS",
							{
								position: toast.POSITION.BOTTOM_RIGHT,
								className: "foo-bar",
							}
						);
					});
			});

			/* await fetch("https://fcm.googleapis.com/fcm/send", {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "key=AAAA00Vyvgw:APA91bEIKqjQlozcSJ8gV9e-xLWu0yqcse-e4tuwNhOngFXiyScu0jgAfSy0LAJrTI6b0TKP2qIQkrGEpnuRhln5bSa4iyneouf0lvhClKypDn7SYEi74m06zQjpySexTcte6FZES3J_",
        },
        method: "POST",
        body: JSON.stringify({
          notification: {
            title: "Gas Detect",
            body: "Riesgo de contaminacion en el ambiente",
            click_action: "http://localhost:3000/",
            icon: "http://url-to-an-icon/icon.png",
          },
          to: notificationToken,
        }),
      })
        .then(function (res) {
          console.log(res)
        })
        .catch(function (res) {
          console.log(res)
        }) */
		}
	};

	useEffect(() => {
		handleNotifications();
	});
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
										<h1>Titulo de los gases licuados del petroleo</h1>
									</CardTitle>
								</CardHeader>
								<CardBody className="">
									<Table className="tablesorter" responsive>
										<thead className="text-primary">
											<tr>
												<th>Name</th>
												<th>Country</th>
												<th>City</th>
												<th className="text-center">Salary</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Dakota Rice</td>
												<td>Niger</td>
												<td>Oud-Turnhout</td>
												<td className="text-center">$36,738</td>
											</tr>
											<tr>
												<td>Minerva Hooper</td>
												<td>Curaçao</td>
												<td>Sinaai-Waas</td>
												<td className="text-center">$23,789</td>
											</tr>
											<tr>
												<td>Sage Rodriguez</td>
												<td>Netherlands</td>
												<td>Baileux</td>
												<td className="text-center">$56,142</td>
											</tr>
											<tr>
												<td>Philip Chaney</td>
												<td>Korea, South</td>
												<td>Overland Park</td>
												<td className="text-center">$38,735</td>
											</tr>
											<tr>
												<td>Doris Greene</td>
												<td>Malawi</td>
												<td>Feldkirchen in Kärnten</td>
												<td className="text-center">$63,542</td>
											</tr>
											<tr>
												<td>Mason Porter</td>
												<td>Chile</td>
												<td>Gloucester</td>
												<td className="text-center">$78,615</td>
											</tr>
											<tr>
												<td>Jon Porter</td>
												<td>Portugal</td>
												<td>Gloucester</td>
												<td className="text-center">$98,615</td>
											</tr>
										</tbody>
									</Table>
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
										<h1>Titulo de los gases licuados del petroleo</h1>
									</CardTitle>
								</CardHeader>
								<CardBody className="">
									<Table className="tablesorter" responsive>
										<thead className="text-primary">
											<tr>
												<th>Name</th>
												<th>Country</th>
												<th>City</th>
												<th className="text-center">Salary</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Dakota Rice</td>
												<td>Niger</td>
												<td>Oud-Turnhout</td>
												<td className="text-center">$36,738</td>
											</tr>
											<tr>
												<td>Minerva Hooper</td>
												<td>Curaçao</td>
												<td>Sinaai-Waas</td>
												<td className="text-center">$23,789</td>
											</tr>
											<tr>
												<td>Sage Rodriguez</td>
												<td>Netherlands</td>
												<td>Baileux</td>
												<td className="text-center">$56,142</td>
											</tr>
											<tr>
												<td>Philip Chaney</td>
												<td>Korea, South</td>
												<td>Overland Park</td>
												<td className="text-center">$38,735</td>
											</tr>
											<tr>
												<td>Doris Greene</td>
												<td>Malawi</td>
												<td>Feldkirchen in Kärnten</td>
												<td className="text-center">$63,542</td>
											</tr>
											<tr>
												<td>Mason Porter</td>
												<td>Chile</td>
												<td>Gloucester</td>
												<td className="text-center">$78,615</td>
											</tr>
											<tr>
												<td>Jon Porter</td>
												<td>Portugal</td>
												<td>Gloucester</td>
												<td className="text-center">$98,615</td>
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
											<h5 className="card-category">Total Shipments</h5>
											<CardTitle tag="h2">Performance</CardTitle>
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
														Accounts
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
														Purchases
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
											data={chartExample1[bigChartData]}
											options={chartExample1.options}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col lg="4">
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Total Shipments</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-bell-55 text-info" /> 763,215
									</CardTitle>
								</CardHeader>
								<CardBody>
									<div className="chart-area">
										<Line
											data={chartExample2.data}
											options={chartExample2.options}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col lg="4">
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Daily Sales</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-delivery-fast text-primary" />{" "}
										3,500€
									</CardTitle>
								</CardHeader>
								<CardBody>
									<div className="chart-area">
										<Bar
											data={chartExample3.data}
											options={chartExample3.options}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col lg="4">
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Completed Tasks</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-send text-success" /> 12,100K
									</CardTitle>
								</CardHeader>
								<CardBody>
									<div className="chart-area">
										<Line
											data={chartExample4.data}
											options={chartExample4.options}
										/>
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
