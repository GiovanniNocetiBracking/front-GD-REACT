import React, { useEffect, useState } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap"
import { database } from "components/Firebase/firebaseConfig"
import Gauge from "variables/gauge"

export default function SensorData({ Btn }) {
  const [glp, setGlp] = useState(null)
  const [co, setCo] = useState(null)
  const [smoke, setSmoke] = useState(null)

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
                    {co}
                  </CardTitle>
                </CardHeader>

                <CardBody className="">
                  <Gauge
                    label="Humo"
                    valor={co}
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
                    {smoke}
                  </CardTitle>
                </CardHeader>

                <CardBody className="">
                  {" "}
                  <Gauge
                    label="Co"
                    valor={smoke}
                    yellowFrom={50}
                    yellowTo={75}
                    redFrom={75}
                    redTo={100}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
              <Button onClick={Btn}>Eliminar dispositivo</Button>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  )
}
