import React, { useRef, useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Context from "../../Context";
import { Alert, Container } from "react-bootstrap";

const UserSignIn = () => {
	const context = useContext(Context.Context);
	const username = useRef("");
	const password = useRef("");
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();
	const location = useLocation();
	const [show, setShow] = useState(false);

	
	let { from } = location.state || { from: { pathname: "/" } };

	const submit = (e) => {
		e.preventDefault();
		let errorList = [];
		if(!username.current.value) {
			errorList.push("Please provide a username");
		}
		if(!password.current.value) {
			errorList.push("Please provide a password");
		}

		if (!errorList.length) {
			context.actions
				.signIn(username.current.value, password.current.value)
				.then((response) => {
					if (response !== null && response.emailaddress) {
						navigate(from);
					} else {
						setErrors(response.message);
					}
				})
				.catch((err) => {
					console.error(err);
					navigate("/error");
				});
		} else {
			setErrors(errorList);
			setShow(true);
		}
	};

	const cancel = (e) => {
		e.preventDefault();
		navigate(from);
	};

	return (
		<div className="form--centered">
			<h2>Sign In</h2>
			{show ? (
				<Container>
					<Alert variant="danger" onClose={() => setShow(false)} dismissible className="validation--errors">
						<Alert.Heading>Validation Errors</Alert.Heading>
						<ul>
							{errors.map((error, i) => <li key={i}>{error}</li>)}
						</ul>
					</Alert>
				</Container>
			) : null}
			<form onSubmit={submit}>
				<label htmlFor="emailAddress">Email Address</label>
				<input
					id="emailAddress"
					name="emailAddress"
					type="email"
					ref={username}
				/>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					ref={password}
				/>
				<button className="button" type="submit">
					Sign In
				</button>
				<button className="button button-secondary" onClick={cancel}>
					Cancel
				</button>
			</form>
			<p>
				Don't have a user account? Click here to{" "}
				<Link to="/signup">sign up!</Link>
			</p>
		</div>
	);
};

export default UserSignIn;
