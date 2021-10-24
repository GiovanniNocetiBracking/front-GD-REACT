import React from "react";
import { Row, Col } from "reactstrap";
import Contact from "../components/Forms/Contact";
import Subscribe from "../components/Forms/Subscribe";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUsForm() {
	return (
		<div className="content">
			<Row className="d-flex justify-content-center">
				<Col lg={{ size: 10 }}>
					<Contact />
				</Col>
			</Row>
			<Row className="d-flex justify-content-center">
				<Col lg={{ size: 10 }}>
					<Subscribe />
				</Col>
			</Row>
		</div>
	);
}
