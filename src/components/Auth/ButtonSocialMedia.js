import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, CardBody, Row, Col } from "reactstrap";

import { useAuth } from "../../contexts/AuthContext";
import {
  googleProvider,
  facebookProvider,
  gitHubProvider,
} from "components/Firebase/firebaseConfig";

export default function ButtonSocialMedia() {
  const { signInWithGoogle, signInWithFacebook, signInWithGitHub } = useAuth();
  const history = useHistory();
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle(googleProvider).then(() => {
        history.push("/");
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFacebookLogin = async () => {
    try {
      await signInWithFacebook(facebookProvider).then(() => {
        history.push("/");
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleGitHubLogin = async () => {
    try {
      await signInWithGitHub(gitHubProvider).then(() => {
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
              <Button onClick={handleFacebookLogin} block>
                <i className="fab fa-facebook px-2"></i>Iniciar con Facebook
              </Button>
            </Col>
            <Col md={12}>
              <Button block onClick={handleGitHubLogin}>
                <i className="fab fa-github px-2"></i>Iniciar con GitHub
              </Button>
            </Col>
            <Col md={12}>
              <Button onClick={handleGoogleLogin} block>
                <i className="fab fa-google-plus-g px-2"></i>Iniciar con Google
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}
