import React, { useState, useEffect } from "react";
import {
	Row,
	Col,
	Form,
	Table,
	Card,
	Input,
	Button,
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
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [reportsByMail, setReportsByMail] = useState([]);
	const [reportsBySms, setReportsBySms] = useState([]);
	const [reports, setReports] = useState([]);
	const [flag, setFlag] = useState(false);
	const handleOpen = () => {
		setDropdown(!dropdown);
	};
	const handleStartDate = (event) => {
		setStartDate(event.target.value);
	};
	const handleEndDate = (event) => {
		setEndDate(event.target.value);
	};
	const handleFlag = () => {
		for (let i = 0; i < 1; i++) {
			setTimeout(() => {
				setFlag(!flag);
			}, 1000);
		}
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

		reports.forEach((el) => {
			let dateTranformed = new Date(
				el.date.seconds * 1000 + el.date.nanoseconds / 1000000
			);
			let finalDate =
				dateTranformed.getDate() +
				"-" +
				(dateTranformed.getMonth() + 1) +
				"-" +
				dateTranformed.getFullYear();
		});
	};

	useEffect(() => {
		handleSearch();
	}, [flag]);

	useEffect(() => {
		handleFlag();
	}, []);

	return (
		<>
			<div className="content">
				<div className="mt-5">
					<Form>
						<Row className="d-flex justify-content-center ">
							<Col sm="6" md="6" lg="4">
								<Input type="date" required onChange={handleStartDate}></Input>
							</Col>
							<Col sm="6" md="6" lg="4">
								<Input type="date" required onChange={handleEndDate}></Input>
							</Col>
						</Row>
						<Row className="d-flex justify-content-center">
							<Col
								sm="12"
								md="6"
								lg="3"
								className="mt-5 d-flex justify-content-end"
							>
								<Dropdown isOpen={dropdown} toggle={handleOpen}>
									<DropdownToggle caret>
										{" "}
										Selecciona una opcion...
									</DropdownToggle>
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

							<Col sm="12" md="6" lg="3" className="mt-5">
								<Button
									onClick={() =>
										alert(
											"tipo: " +
												selected +
												" fecha inicio: " +
												startDate +
												" fecha fin: " +
												endDate
										)
									}
								>
									Buscar
								</Button>
							</Col>
						</Row>
					</Form>

					<br />
					<Row className=" d-flex justify-content-center mt-5">
						<Col sm="12" lg="8">
							<Card className="mb-5">
								<Table bordered className="p-5 ">
									<thead>
										<tr>
											<th>#</th>
											<th>GLP</th>
											<th>CO</th>
											<th>FECHA</th>
											<th>TIPO</th>
										</tr>
									</thead>
									<tbody>
										{reports.length !== 0 ? (
											reports.map((el, index) => (
												<tr key={index}>
													<td>{index + 1}</td>
													<td>{el.glp}</td>
													<td>{el.co}</td>
													<td>{index + 1}</td>
													<td>{el.withMail || el.withSms}</td>
												</tr>
											))
										) : (
											<tr>
												<td>no hay datos</td>
												<td>no hay datos</td>
												<td>no hay datos</td>
												<td>no hay datos</td>
												<td>no hay datos</td>
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
