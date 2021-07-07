import React from "react";
import { Card, Button, CardBody, Row, Col } from "reactstrap";

export default function ButtonSocialMedia() {
  return (
    <>
      <Card style={{ borderColor: "#333" }}>
        <CardBody className="d-flex justify-content-center align-items-center">
          <Row>
            <Col md={12}>
              <Button block>
                <i className="fab fa-facebook px-2"></i>Iniciar con Facebook
              </Button>
            </Col>
            <Col md={12}>
              <Button block>
                <i className="fab fa-github px-2"></i>Iniciar con GitHub
              </Button>
            </Col>
            <Col md={12}>
              <Button block>
                <i className="fab fa-google-plus-g px-2"></i>Iniciar con Google
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}
