import React, { useState, useEffect } from "react";
import {
	Row,
	Col,
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
	const [selected, setSelected] = useState("");
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [reportsData, setReportsData] = useState();
	const handleOpen = () => {
		setDropdown(!dropdown);
	};
	const handleStartDate = (event) => {
		setStartDate(event.target.value);
	};
	const handleEndDate = (event) => {
		setEndDate(event.target.value);
	};
	const handleSearch = () => {
		firestore
			.collection("reports")
			.doc(currentUser.uid)
			.onSnapshot((doc) => {
				setReportsData([doc.data().alertMail, doc.data().alertSMS]);
			});
		console.log(reportsData);
	};
	useEffect(() => {
		handleSearch();
	}, [currentUser]);

	return (
		<>
			<div className="content">
				<div className="mt-5">
					<Row className=" d-flex justify-content-center">
						<Col sm="6" lg="2">
							<Dropdown isOpen={dropdown} toggle={handleOpen}>
								<DropdownToggle caret> Selecciona una opcion...</DropdownToggle>
								<DropdownMenu right>
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
						<Col sm="6" lg="2">
							<Input type="date" onChange={handleStartDate}></Input>
						</Col>
						<Col sm="6" lg="2">
							<Input type="date" onChange={handleEndDate}></Input>
						</Col>
						<Col sm="6" lg="2">
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
					<br />
					<Row className=" d-flex justify-content-center">
						<Col sm="12" lg="8">
							<Card className="">
								<Table bordered className="p-5">
									<thead>
										<tr>
											<th>#</th>
											<th>First Name</th>
											<th>Last Name</th>
											<th>Username</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope="row">1</th>
											<td>Mark</td>
											<td>Otto</td>
											<td>@mdo</td>
										</tr>
										<tr>
											<th scope="row">2</th>
											<td>Jacob</td>
											<td>Thornton</td>
											<td>@fat</td>
										</tr>
										<tr>
											<th scope="row">3</th>
											<td>Larry</td>
											<td>the Bird</td>
											<td>@twitter</td>
										</tr>
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
