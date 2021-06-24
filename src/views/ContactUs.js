import React from "react";
import {
  Row,
  Col,
} from "reactstrap";
import Contact from "../components/Forms/Contact"
import Subscribe from "../components/Forms/Subscribe"
import 'react-toastify/dist/ReactToastify.css';

export default function ContactUsForm() {
  return (
    <div className="content">
      <Row className="">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Contact />
        </Col>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
         <Subscribe/>
        </Col>
      </Row>
    </div>
  );
}
