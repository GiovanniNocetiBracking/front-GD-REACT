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
					<Col sm="12">
						<UserResume />
					</Col>
				</Row>
				<Row>
					<Col sm="12">
						<UserNotificated />
					</Col>
				</Row>
			</div>
		</>
	);
}

export default UserProfile;
