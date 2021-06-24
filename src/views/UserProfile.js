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
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  Row,
  Col,
} from "reactstrap";
import UserForm from "../components/Forms/UserProfile";

function UserProfile() {
  return (
    <>
      <div className="content">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Card className="card-user ">
              <CardBody>
                <CardText />
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/emilyz.jpg").default}
                    />
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">Ceo/Co-Founder</p>
                </div>
                <div className="card-description">
                  Do not be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </div>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </Col>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Card>
              <UserForm />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
