import React, { useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <Card>
            <Card.Body>
              <h2>Ingresar</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button className="w-100" type="submit">
                  Ingresar
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            ¿Aun no tienes una cuenta? <Link to="/register">Registrate</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
