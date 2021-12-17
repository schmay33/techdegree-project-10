import React from "react";
import { Alert, Container } from "react-bootstrap";

const UnhandledError = () => {
	return (
		<Container>
			<Alert variant="danger">
				<div className="wrap">
					<h2>Error</h2>
					<p>Sorry! We just encountered an unexpected error.</p>
				</div>
			</Alert>
		</Container>
	);
};

export default UnhandledError;
