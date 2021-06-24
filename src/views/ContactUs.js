import React from "react";
import { Row, Col } from "reactstrap";
import Contact from "../components/Forms/Contact";
import Subscribe from "../components/Forms/Subscribe";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUsForm() {
  return (
    <div className="content d-flex align-items-center ">
      <Row className="">
        <Col sm={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 1 }}>
          <Contact />
        </Col>
        <Col sm={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 1 }}>
          <Subscribe />
        </Col>
      </Row>
    </div>
  );
}
