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

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const validate = yup.object({
    userName: yup.string(),
    email: yup.string().email("Pruebe con un correo valido"),
    firstName: yup.string(),
    lastName: yup.string(),
    about: yup
      .string()
      .min(10, "El mensaje debe tener almenos 10 caracteres")
      .max(700, "El mensaje debe tener como maximo 500 caracteres"),
  });
  return (
    <>
      <Formik
        initialValues={{
          userName: "",
          email: "",
          firstName: "",
          lastName: "",
          about: "",
        }}
        validationSchema={validate}
      >
        {(formik) => (
          <Card body>
            <CardTitle>
              <h4>Informacion de Usuario</h4>
            </CardTitle>
            <CardText>
              Esta informacion nos ayuda a conocerte brevemente y nos permite
              manejar de mejor manera tus incidencias
            </CardText>
            <FormF className="mt-4">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <TextField
                    label="Nombre de usuario"
                    name="userName"
                    type="text"
                    placeholder="Nombre de usuario"
                  />
                </div>
                <div className="col-sm-12 col-md-6">
                  <TextField
                    label="Correo"
                    name="email"
                    type="text"
                    placeholder="Correo"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <TextField
                    label="Nombre"
                    name="firstName"
                    type="text"
                    placeholder="Nombre"
                  />
                </div>
                <div className="col-sm-12 col-md-6">
                  <TextField
                    label="Apellido"
                    name="lastName"
                    type="text"
                    placeholder="Apellido"
                  />
                </div>
              </div>

              <TextArea
                label="Acerca de mi empresa u hogar"
                type="textarea"
                name="about"
                placeholder="Escribe una breve descripcion de tu empresa o de tu hogar, la informacion que nos brinde sera de utilidad para llevar de mejor manera la gestion de un posible incidente."
              />

              <Button disabled={loading} type="submit" className="mt-4">
                Guardar informacion
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
