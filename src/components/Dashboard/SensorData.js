import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap";
import { database, firestore } from "../Firebase/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import Gauge from "variables/gauge";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

export default function SensorData() {
	const apiUrl = process.env.REACT_APP_URL_API;
	const [glp, setGlp] = useState();
	const [co, setCo] = useState();
	const [smoke, setSmoke] = useState();
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
		const smokeData = database.ref("Sensor1/smoke");
		smokeData.on("value", (snapshot) => {
			setSmoke(snapshot.val());
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
		if (glp >= 200 || smoke >= 200 || co >= 200) {
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
	}, [glp, co, smoke]);
	return (
		<>
			<div className="content">
				<Card body>
					<Row>
						<Col lg="4">
							<Card className="card-chart">
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
						<Col lg="4">
							<Card className="card-chart">
								<CardHeader>
									<h5 className="card-category">Humo</h5>
									<CardTitle tag="h3">
										<i className="tim-icons icon-alert-circle-exc text-warning" />{" "}
										{smoke}
									</CardTitle>
								</CardHeader>

								<CardBody className="">
									<Gauge
										label="Humo"
										valor={smoke}
										yellowFrom={50}
										yellowTo={75}
										redFrom={75}
										redTo={100}
									/>
								</CardBody>
							</Card>
						</Col>
						<Col lg="4">
							<Card className="card-chart">
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
					</Row>
				</Card>
			</div>
			<ToastContainer />
		</>
	);
}
