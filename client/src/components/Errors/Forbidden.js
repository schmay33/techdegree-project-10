import React from "react";
import { Alert, Container } from "react-bootstrap";

const Forbidden = () => {
	return (
		<Container>
			<Alert variant="danger">
				<div className="wrap">
					<h2>Forbidden</h2>
					<p>Oh oh! You can't access this page.</p>
				</div>
			</Alert>
		</Container>
	);
};

export default Forbidden;
