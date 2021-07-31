import React, { useEffect, useState } from "react"
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap"
import { database, messaging } from "components/Firebase/firebaseConfig"
import Gauge from "variables/gauge"

export default function SensorData() {
  const [glp, setGlp] = useState()
  const [co, setCo] = useState()
  const [smoke, setSmoke] = useState()
  const [notificationToken, setNotificationToken] = useState("")

  useEffect(() => {
    const glpData = database.ref("Sensor1/lpg")
    glpData.on("value", (snapshot) => {
      setGlp(snapshot.val())
    })
    const coData = database.ref("Sensor1/co")
    coData.on("value", (snapshot) => {
      setCo(snapshot.val())
    })
    const smokeData = database.ref("Sensor1/smoke")
    smokeData.on("value", (snapshot) => {
      setSmoke(snapshot.val())
    })
  }, [])
  useEffect(() => {
    messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken()
      })
      .then((data) => {
        setNotificationToken(data)
      })
  }, [])
  const handleNotifications = async () => {
    if (glp >= 200) {
      await fetch("https://fcm.googleapis.com/fcm/send", {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "key=AAAA00Vyvgw:APA91bEIKqjQlozcSJ8gV9e-xLWu0yqcse-e4tuwNhOngFXiyScu0jgAfSy0LAJrTI6b0TKP2qIQkrGEpnuRhln5bSa4iyneouf0lvhClKypDn7SYEi74m06zQjpySexTcte6FZES3J_",
        },
        method: "POST",
        body: JSON.stringify({
          notification: {
            title: "Gas Detect",
            body: "Riesgo de contaminacion en el ambiente",
            click_action: "http://localhost:3000/",
            icon: "http://url-to-an-icon/icon.png",
          },
          to: notificationToken,
        }),
      })
        .then(function (res) {
          console.log(res)
        })
        .catch(function (res) {
          console.log(res)
        })
    }
  }
  useEffect(() => {
    handleNotifications()
  })
  return (
    <>
      <div className="content">
        <Card body>
          <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Gases licuados de petroleo</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-alert-circle-exc text-warning" />{" "}
                    {glp}
                  </CardTitle>
                </CardHeader>
                <CardBody className="">
                  <Gauge
                    label="GLP"
                    valor={glp}
                    yellowFrom={50}
                    yellowTo={75}
                    redFrom={75}
                    redTo={100}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Humo</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-alert-circle-exc text-warning" />{" "}
                    {smoke}
                  </CardTitle>
                </CardHeader>

                <CardBody className="">
                  <Gauge
                    label="Humo"
                    valor={smoke}
                    yellowFrom={50}
                    yellowTo={75}
                    redFrom={75}
                    redTo={100}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Monoxido de carbono</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-alert-circle-exc text-warning" />{" "}
                    {co}
                  </CardTitle>
                </CardHeader>

                <CardBody className="">
                  {" "}
                  <Gauge
                    label="Co"
                    valor={co}
                    yellowFrom={50}
                    yellowTo={75}
                    redFrom={75}
                    redTo={100}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  )
}
