import React from "react";
import {
  Card,
  CardText,
  CardTitle,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

export default function ContactUs() {
  return (
    <div className="content">
      <Row className="">
        <Col sm="6">
          <Card body>
            <CardTitle>
              <h4>Formulario de contacto</h4>
            </CardTitle>
            <CardText>
              Si tienes alguna consulta o comentario, siempre estaremos
              encantados de recibirlo, para ello puedes rellenar el siguiente
              formulario y te responderemos a la brevedad.
            </CardText>
            <Form className="mt-4">
              <FormGroup row>
                <Label for="name" sm={2}>
                  Nombre
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Ingrese su nombre"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="mail" sm={2}>
                  Correo
                </Label>
                <Col sm={10}>
                  <Input
                    type="mail"
                    name="mail"
                    id="mail"
                    placeholder="Ingrese su direccion de correo electronico"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleText" sm={2}>
                  Mensaje
                </Label>
                <Col sm={10}>
                  <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    placeholder="Escribe aqui tu mensaje"
                  />
                </Col>
              </FormGroup>

              <Button size="lg" block className="mt-4">
                Enviar!
              </Button>
            </Form>
          </Card>
        </Col>
        <Col sm="6">
          <Card body>
            <CardTitle>
              <h4>Formulario de suscripcion</h4>
            </CardTitle>
            <CardText>
              Si no quieres perderte ninguna novedad de Gas Detect, te sugerimos
              suscribirte, podras conocer todas las novedades que tenemos para
              ti y futuras promociones que no te puedes perder!
            </CardText>
            <Form className="mt-4">
              <FormGroup row>
                <Label for="mail" sm={2}>
                  Correo
                </Label>
                <Col sm={10}>
                  <Input
                    type="mail"
                    name="mail"
                    id="mail"
                    placeholder="Ingrese su direccion de correo electronico"
                  />
                </Col>
              </FormGroup>

              <Button size="lg" block className="mt-4">
                Suscribete!
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
