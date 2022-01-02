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
import { firestore } from "../Firebase/firebaseConfig";
import { useAuth } from "../../contexts/AuthContext";

export default function ReportTable() {
	const { currentUser } = useAuth();
	const [dropdown, setDropdown] = useState(false);
	const [selected, setSelected] = useState("ambos");
	const [reportsByMail, setReportsByMail] = useState([]);
	const [reportsBySms, setReportsBySms] = useState([]);
	const [reports, setReports] = useState([]);
	const [filteredReports, setFilteredReports] = useState([]);
	const [flag, setFlag] = useState(false);
	const handleOpen = () => {
		setDropdown(!dropdown);
	};

	const handleFlag = () => {
		for (let i = 0; i < 1; i++) {
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
		console.log(filtered);
	};
	useEffect(() => {
		handleSearch();
		console.log(reports);
		// eslint-disable-next-line
	}, [flag]);
	useEffect(() => {
		handleFilteredSearch(reports, selected);
		// eslint-disable-next-line
	}, [selected]);
	useEffect(() => {
		handleFlag();
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
		</>
	);
}
