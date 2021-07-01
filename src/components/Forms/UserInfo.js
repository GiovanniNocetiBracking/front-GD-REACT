import React, { useState, useEffect } from "react";
import { Card, Button } from "reactstrap";
import { firestore } from "../Firebase/firebaseConfig";
import { useAuth } from "../../contexts/AuthContext";
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
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userInfo, setuserInfo] = useState({});
  const classes = useStyles();
  const validate = yup.object({
    userName: yup
      .string()
      .min(5, "El nombre de usuario debe contener almenos 5 caracteres")
      .max(25, "El nombre de usuario debe tener como maximo 500 caracteres"),
    email: yup.string().email("Pruebe con un correo valido"),
    firstName: yup
      .string()
      .min(5, "El nombre debe contener almenos 5 caracteres")
      .max(25, "El nombre debe contener como maximo 500 caracteres"),
    lastName: yup
      .string()
      .min(5, "El apellido debe contener almenos 5 caracteres")
      .max(25, "El apellido debe contener como maximo 500 caracteres"),
    about: yup
      .string()
      .min(10, "El mensaje debe contener almenos 10 caracteres")
      .max(700, "El mensaje debe contener como maximo 500 caracteres"),
  });
  useEffect(() => {
    firestore
      .collection("userInfo")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setuserInfo({ ...doc.data() });
      });
  }, []);
  console.log(userInfo);

  return (
    <>
      <Formik
        initialValues={{
          userName: userInfo.userName,
          lastName: userInfo.lastName,
          firstName: userInfo.firstName,
          about: userInfo.about,
          email: currentUser.email,
        }}
        validationSchema={validate}
        onSubmit={(values, actions) => {
          setLoading(true);
          try {
            firestore
              .collection("userInfo")
              .doc(currentUser.uid)
              .set({
                userName: values.userName,
                lastName: values.lastName,
                firstName: values.firstName,
                about: values.about,
              })
              .then(() => {
                toast.success("Informacion editada", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  className: "foo-bar",
                });
                actions.resetForm();
                setLoading(false);
              });
          } catch (error) {
            toast.error(error.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
              className: "foo-bar",
            });
            setLoading(false);
          }
        }}
      >
        {(formik) => (
          <Card body>
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
                    disabled
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
                placeholder={`Escribe una breve descripcion de tu empresa o de tu hogar, la informacion que nos brinde sera de utilidad para llevar de mejor manera la gestion de un posible incidente.`}
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
