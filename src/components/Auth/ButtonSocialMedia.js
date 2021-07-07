import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, CardBody, Row, Col } from "reactstrap";

import { useAuth } from "../../contexts/AuthContext";
import { googleProvider } from "components/Firebase/firebaseConfig";

export default function ButtonSocialMedia() {
  const { signInWhitGoogle } = useAuth();
  const history = useHistory();
  const handleLogin = async () => {
    try {
      await signInWhitGoogle(googleProvider).then((result) => {
        console.log(result);
        history.push("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

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
              <Button onClick={handleLogin} block>
                <i className="fab fa-google-plus-g px-2"></i>Iniciar con Google
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}
