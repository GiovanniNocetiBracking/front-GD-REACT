import React, { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Card, CardTitle, Button, Container } from "reactstrap"
import { Link, useHistory } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import { Formik, Form as FormF } from "formik"
import * as yup from "yup"
import { TextField } from "../Forms/TextField"
import { ToastContainer, toast } from "react-toastify"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core/styles"
import ButtonSocialMedia from "./ButtonSocialMedia"

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}))

export default function Login() {
  const { login } = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const classes = useStyles()
  const validate = yup.object({
    email: yup
      .string()
      .email("Pruebe con un correo valido")
      .required("El campo email es requerido"),
    password: yup.string().required("El campo contraseña es requerido"),
  })

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
            }}
            validationSchema={validate}
            onSubmit={async (values, actions) => {
              setLoading(true)
              try {
                await login(values.email, values.password)
                  .then((res) => {
                    setLoading(false)
                    toast.success("Ingreso exitoso", {
                      position: toast.POSITION.BOTTOM_RIGHT,
                      className: "foo-bar",
                    })

                    setTimeout(() => history.push("/"), 3500)
                  })
                  .catch((error) => {
                    setLoading(false)
                    toast.error(error.message, {
                      position: toast.POSITION.BOTTOM_RIGHT,
                      className: "foo-bar",
                    })
                    actions.resetForm()
                  })
              } catch (error) {
                setLoading(false)
                console.log("catch login", error)
              }
            }}
          >
            {(formik) => (
              <>
                <Card body>
                  <div className="text-center">
                    <h1>Inicio de sesion</h1>
                  </div>
                  <div className="dropdown-divider py-3"></div>
                  <div>
                    <ButtonSocialMedia />
                  </div>
                  <div className="dropdown-divider py-3"></div>
                  <div>
                    <Card>
                      <CardTitle>
                        <h4 className="text-center py-2">
                          Inicio de sesion con credenciales
                        </h4>
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
                        <Button
                          disabled={loading}
                          type="submit"
                          className="mt-4 w-100"
                        >
                          Iniciar sesion!
                        </Button>
                        <div className="py-3 d-flex justify-content-center">
                          <Link to="/forgot-password">
                            ¿Olvidaste tu contraseña?
                          </Link>
                        </div>
                        {loading && (
                          <Backdrop className={classes.backdrop} open>
                            <CircularProgress color="inherit" />
                          </Backdrop>
                        )}
                        <ToastContainer />
                      </FormF>
                    </Card>
                  </div>
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
  )
}
