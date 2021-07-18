import React from "react"
import { Row, Col } from "reactstrap"
import Contact from "../components/Forms/Contact"
import Subscribe from "../components/Forms/Subscribe"
import "react-toastify/dist/ReactToastify.css"

export default function ContactUsForm() {
  return (
    <div className="content">
      <Row className="d-flex justify-content-center">
        <Col sm={{ size: 6 }} lg={{ size: 5 }}>
          <Contact />
        </Col>
        <Col sm={{ size: 6 }} lg={{ size: 5 }}>
          <Subscribe />
        </Col>
      </Row>
    </div>
  )
}
