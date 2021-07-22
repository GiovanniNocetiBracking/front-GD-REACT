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
import React, { useState } from "react"
// reactstrap components
import { Card, CardHeader, CardTitle, Button } from "reactstrap"
import SensorData from "components/Dashboard/SensorData"

function Dashboard() {
  const [handleDevice, setHandleDevice] = useState(false)
  const btnHandleDevice = () => {
    setHandleDevice(!handleDevice)
  }

  return (
    <>
      {!handleDevice ? (
        <div className="content">
          <Card body>
            <CardHeader>
              <CardTitle>
                <h1>Aun no tienes un dispositivo Gas Detect asociado</h1>
              </CardTitle>
            </CardHeader>
            <Button onClick={btnHandleDevice}>Registrar dispositivo</Button>
          </Card>
        </div>
      ) : (
        <SensorData Btn={btnHandleDevice} />
      )}
    </>
  )
}

export default Dashboard
