import React, { useState } from "react";
import { Card, CardText, CardTitle, Button, FormGroup } from "reactstrap";
import { Formik, Form as FormF } from "formik";
import * as yup from "yup";
import { TextField } from "./TextField";
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
export default function Subscribe() {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const validate = yup.object({
    email: yup
      .string()
      .email("Pruebe con un correo valido")
      .required("El campo email es requerido"),
  });
  return (
    <>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validate}
        onSubmit={async (values, actions) => {
          setLoading(true);
          const apiUrl = process.env.REACT_APP_URL_API;
          try {
            await axios
              .post(apiUrl + "/landing/suscribe", values)
              .then(({ data }) => {
                actions.resetForm();
                if (data._errorMessages) {
                  toast.error(data._errorMessages[0].message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                } else {
                  toast.success("Muchas gracias por suscribirte!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                }
              });
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        }}
      >
        {(formik) => (
          <Card body>
            <CardTitle>
              <h4>Formulario de suscripcion</h4>
            </CardTitle>
            <CardText>
              Si no quieres perderte ninguna novedad de Gas Detect, te sugerimos
              suscribirte, podras conocer todas las novedades que tenemos para
              ti y futuras promociones que no te puedes perder!
            </CardText>
            <FormF className="mt-4">
              <FormGroup row>
                <TextField
                  label="Correo"
                  name="email"
                  type="text"
                  placeholder="Correo"
                />
              </FormGroup>
              <div>
                <Button disabled={loading} type="submit">
                  Enviar!
                </Button>
                {loading && (
                  <Backdrop className={classes.backdrop} open>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                )}

                <ToastContainer />
              </div>
            </FormF>
          </Card>
        )}
      </Formik>
    </>
  );
}
