import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Card, Button, CardBody, Row, Col } from "reactstrap"

import { useAuth } from "../../contexts/AuthContext"
import {
  googleProvider,
  facebookProvider,
  gitHubProvider,
} from "components/Firebase/firebaseConfig"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}))

export default function ButtonSocialMedia() {
  const { signInWithGoogle, signInWithFacebook, signInWithGitHub } = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const classes = useStyles()
  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await signInWithGoogle(googleProvider)
      setLoading(false)
      history.push("/")
    } catch (error) {
      console.log(error)
    }
  }
  const handleFacebookLogin = async () => {
    setLoading(true)
    try {
      await signInWithFacebook(facebookProvider)
      setLoading(false)
      history.push("/")
    } catch (error) {
      console.log(error)
    }
  }
  const handleGitHubLogin = async () => {
    setLoading(true)
    try {
      await signInWithGitHub(gitHubProvider)
      setLoading(false)
      history.push("/")
    } catch (error) {
      console.log(error)
    }
  }

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
      {loading && (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  )
}
