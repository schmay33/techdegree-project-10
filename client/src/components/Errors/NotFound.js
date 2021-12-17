import React from "react";
import { Alert, Container } from "react-bootstrap";

function NotFound() {
	return (
		<Container>
			<Alert variant="danger">
				<div className="wrap">
					<h2>Not Found</h2>
					<p>Sorry! We couldn't find the page you're looking for.</p>
				</div>
			</Alert>
		</Container>
	);
}

export default NotFound;
