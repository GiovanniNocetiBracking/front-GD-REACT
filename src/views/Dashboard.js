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
import React from "react";
// reactstrap components
import { Card, CardHeader, CardTitle, Row, Col } from "reactstrap";
import Co from "components/Firebase/Co";
import Glp from "components/Firebase/Glp";
import Smoke from "components/Firebase/Smoke";

function Dashboard(props) {
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
                  <Glp />
                </CardTitle>
              </CardHeader>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Humo</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-alert-circle-exc text-warning" />{" "}
                  <Co />
                </CardTitle>
              </CardHeader>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Monoxido de carbono</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-alert-circle-exc text-warning" />{" "}
                  <Smoke />
                </CardTitle>
              </CardHeader>
            </Card>
          </Col>
        </Row>
        <Row></Row>
      </div>
    </>
  );
}

export default Dashboard;
