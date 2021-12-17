import React, { useRef, useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Context from "../../Context";
import { Alert, Container } from "react-bootstrap";

const UserSignUp = () => {
	const context = useContext(Context.Context);
    const [show, setShow] = useState(false);
	const emailAddress = useRef("");
	const password = useRef("");
	const firstName = useRef("");
	const lastName = useRef("");

	const [errors, setErrors] = useState([]);

	const navigate = useNavigate();
	const location = useLocation();

	const { from } = location.state || { from: { pathname: "/" } };

	// Function to submit form and create user
	const submit = (e) => {
		e.preventDefault();
		const user = {
			firstName: firstName.current.value,
			lastName: lastName.current.value,
			emailAddress: emailAddress.current.value,
			password: password.current.value,
		};
		context.data
			.createUser(user)
			.then((errors) => {
				if (errors.length) {
					setErrors(errors);
                    setShow(true);
				} else {
					context.actions
						.signIn(
							emailAddress.current.value,
							password.current.value
						)
						.then((response) => {
							if (response !== null && response.id) {
								navigate(from);
							} else {
								setErrors(response.message);
                                setShow(true);
							}
						})
						.catch((err) => {
							console.error(err);
							navigate("/error");
						});
				}
			})
			.catch((error) => {
				console.log(error);
				navigate("/error");
			});
	};

	const cancel = (e) => {
		e.preventDefault();
		navigate(from);
	};

	return (
		<div className="form--centered">
			<h2>Sign Up</h2>
			{show ? (
				<Container>
					<Alert variant="danger" onClose={() => setShow(false)} dismissible className="validation--errors">
						<Alert.Heading>Validation Errors</Alert.Heading>
						<ul>
							{errors.map((error, i) => (
								<li>{error}</li>
							))}
						</ul>
					</Alert>
				</Container>
			) : null}
			<form>
				<label htmlFor="firstName">First Name</label>
				<input
					id="firstName"
					name="firstName"
					type="text"
					ref={firstName}
				/>
				<label htmlFor="lastName">Last Name</label>
				<input
					id="lastName"
					name="lastName"
					type="text"
					ref={lastName}
				/>
				<label htmlFor="emailAddress">Email Address</label>
				<input
					id="emailAddress"
					name="emailAddress"
					type="email"
					ref={emailAddress}
				/>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					ref={password}
				/>
				<button className="button" type="submit" onClick={submit}>
					Sign Up
				</button>
				<button className="button button-secondary" onClick={cancel}>
					Cancel
				</button>
			</form>
			<p>
				Already have a user account? Click here to{" "}
				<Link to="/signin">sign in!</Link>
			</p>
		</div>
	);
};

export default UserSignUp;
