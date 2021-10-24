import React from "react";
// reactstrap components
import { Row, Col } from "reactstrap";
import UserResume from "../components/User/UserResume";
import UserNotificated from "../components/User/UserNotificated";

function UserProfile() {
	return (
		<>
			<div className="content">
				<Row>
					<Col sm="12" lg="4">
						<UserResume />
					</Col>
					<Col sm="12" lg="8">
						<UserNotificated />
					</Col>
				</Row>
			</div>
		</>
	);
}

export default UserProfile;
