import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardTitle, Button, Container } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form as FormF } from "formik";
import * as yup from "yup";
import { TextField } from "../Forms/TextField";
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
export default function Register() {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const validate = yup.object({
    email: yup
      .string()
      .email("Pruebe con un correo valido")
      .required("El campo email es requerido"),
    password: yup.string().required("El campo contraseña es requerido"),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir"),
  });
  const { register } = useAuth();
  const history = useHistory();

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <Formik
            initialValues={{
              email: "",
              password: "",
              repeatPassword: "",
            }}
            validationSchema={validate}
            onSubmit={async (values, actions) => {
              setLoading(true);
              try {
                await register(values.email, values.password);
                setLoading(false);
                history.push("/");
              } catch (error) {
                setLoading(false);

                toast.error(error.message, {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  className: "foo-bar",
                });
              }
            }}
          >
            {(formik) => (
              <>
                <Card body>
                  <CardTitle>
                    <h2>Registro de Usuario</h2>
                  </CardTitle>
                  <FormF>
                    <TextField
                      label="Correo"
                      name="email"
                      type="text"
                      placeholder="Ingrese su correo"
                    />
                    <TextField
                      label="Contraseña"
                      name="password"
                      type="password"
                      placeholder="Ingrese su contraseña"
                    />
                    <TextField
                      label="Repetir contraseña"
                      name="repeatPassword"
                      type="password"
                      placeholder="Repita su contraseña"
                    />
                    <Button
                      disabled={loading}
                      type="submit"
                      className="mt-4 w-100"
                    >
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
              </>
            )}
          </Formik>
          <div className="w-100 text-center mt-2">
            ¿Ya tienes una cuenta? <Link to="/login">Ingresa</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
