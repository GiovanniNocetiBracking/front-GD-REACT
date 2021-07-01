/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
// reactstrap components
import { Card, CardHeader, CardTitle, Row, Col } from "reactstrap";
import { database } from "components/Firebase/firebaseConfig";
import { CardBody } from "reactstrap";
import Gauge from "variables/gauge";

function Dashboard() {
  const [glp, setGlp] = useState(null);
  const [co, setCo] = useState(null);
  const [smoke, setSmoke] = useState(null);
  useEffect(() => {
    const glpData = database.ref("Sensor1/lpg");
    glpData.on("value", (snapshot) => {
      setGlp(snapshot.val());
    });
    const coData = database.ref("Sensor1/co");
    coData.on("value", (snapshot) => {
      setCo(snapshot.val());
    });
    const smokeData = database.ref("Sensor1/smoke");
    smokeData.on("value", (snapshot) => {
      setSmoke(snapshot.val());
    });
  }, []);
  return (
    <>
      <div className="content">
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
              <CardBody>
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
              <CardBody>
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
              <CardBody>
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
        <Row></Row>
      </div>
    </>
  );
}

export default Dashboard;
