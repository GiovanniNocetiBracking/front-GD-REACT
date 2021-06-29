import React, { useState } from "react";
import { Card, CardText, CardTitle, Button, FormGroup } from "reactstrap";
import { Formik, Form as FormF } from "formik";
import * as yup from "yup";
import { TextField } from "./TextField";
import { TextArea } from "./TextArea";
import { ToastContainer, toast } from "react-toastify";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const validate = yup.object({
    name: yup.string().required("El campo nombre es requerido"),
    subject: yup
      .string()
      .required("El campo asunto es requerido")
      .max(50, "Maximo 50 caracteres"),
    email: yup
      .string()
      .email("Pruebe con un correo valido")
      .required("El campo correo es requerido"),
    message: yup
      .string()
      .required("El campo mensaje es requerido")
      .min(10, "El mensaje debe contener almenos 10 caracteres")
      .max(500, "El mensaje debe contener como maximo 500 caracteres"),
  });
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          subject: "",
          message: "",
        }}
        validationSchema={validate}
        onSubmit={async (values, actions) => {
          setLoading(true);
          const apiUrl = process.env.REACT_APP_URL_API;
          try {
            const res = await axios
              .post(apiUrl + "/landing/contactUs", values)
              .then(() => {
                console.log(res);
                toast.success("Mensaje enviado", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  className: "foo-bar",
                });
              });
            actions.resetForm();
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {(formik) => (
          <Card body>
            <CardTitle>
              <h4>Formulario de contacto</h4>
            </CardTitle>
            <CardText>
              Si tienes alguna consulta o comentario, siempre estaremos
              encantados de recibirlo, para ello puedes rellenar el siguiente
              formulario y te responderemos a la brevedad.
            </CardText>
            <FormF className="mt-4">
              <FormGroup row>
                <TextField
                  label="Nombre"
                  name="name"
                  type="text"
                  placeholder="Nombre"
                />
              </FormGroup>
              <FormGroup row>
                <TextField
                  label="Correo"
                  name="email"
                  type="text"
                  placeholder="Correo"
                />
              </FormGroup>
              <FormGroup row>
                <TextField
                  label="Asunto"
                  name="subject"
                  type="text"
                  placeholder="Asunto"
                />
              </FormGroup>
              <FormGroup row>
                <TextArea
                  label="Mensaje"
                  type="textarea"
                  name="message"
                  placeholder="Escribe tu mensaje aqui"
                />
              </FormGroup>
              <Button disabled={loading} type="submit">
                Enviar!
              </Button>
              {loading && (
                <Backdrop className={classes.backdrop} open>
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
              <ToastContainer />
            </FormF>
          </Card>
        )}
      </Formik>
    </>
  );
}
