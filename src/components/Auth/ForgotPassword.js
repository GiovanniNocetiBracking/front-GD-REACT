import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardTitle, Button, Container } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
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

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const history = useHistory();
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
            }}
            validationSchema={validate}
            onSubmit={async (values, actions) => {
              setLoading(true);
              try {
                const res = await forgotPassword(values.email);
                setLoading(false);
                toast.success(
                  "Se le envio a su correo un link para que cree una nueva contraseña",
                  {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    className: "foo-bar",
                  }
                );
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {(formik) => (
              <>
                <Card body>
                  <CardTitle>
                    <h2>Crea una contraseña nueva</h2>
                  </CardTitle>
                  <FormF>
                    <TextField
                      label="Correo"
                      name="email"
                      type="text"
                      placeholder="Ingrese su correo"
                    />
                    <Button
                      disabled={loading}
                      type="submit"
                      className="mt-5 w-100"
                    >
                      Resetear contraseña
                    </Button>
                    <div className="mt-3 d-flex justify-content-center">
                      <Link to="/login">Iniciar sesion</Link>
                    </div>
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
            ¿Aun no tienes una cuenta? <Link to="/register">Registrate</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
