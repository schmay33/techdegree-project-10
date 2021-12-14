import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Context from "../../Context";

function CreateCourse() {
	const context = useContext(Context.Context);
	const [errors, setErrors] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [materialsNeeded, setMaterialsNeeded] = useState("");
	const [estimatedTime, setEstimatedTime] = useState("");
	const authUser = context.authenticatedUser;

	let navigate = useNavigate();
	const location = useLocation();

	const { from } = location.state || { from: { pathname: "/" } };

	const submit = (e) => {
		e.preventDefault();
		const course = {
			title: title,
			description: description,
			materialsNeeded: materialsNeeded,
			estimatedTime: estimatedTime,
			userId: authUser.id,
		};
		context.data
			.createCourse(course, authUser.emailaddress, authUser.password)
			.then((errors) => {
				if (errors.length) {
					setErrors(errors);
				} else {
					navigate("/");
				}
			})
			.catch((error) => {
				console.error(error);
				navigate("/error");
			});
	};

	const cancel = (e) => {
		e.preventDefault();
		navigate(from);
	};

	return (
		<div className="wrap">
			<h2>Create Course</h2>
			{errors.length ? (
				<div className="validation--errors">
					<h3>Validation Errors</h3>
					<ul>
						{errors.map((error, i) => (
							<li key={i}>{error}</li>
						))}
					</ul>
				</div>
			) : null}

			<form onSubmit={submit}>
				<div className="main--flex">
					<div>
						<label htmlFor="courseTitle">Course Title</label>
						<input
							id="courseTitle"
							name="courseTitle"
							type="text"
							onChange={(e) => {
								setTitle(e.target.value);
							}}
							value={title}
						/>

						<p>
							By {authUser.firstName} {authUser.lastName}
						</p>

						<label htmlFor="courseDescription">
							Course Description
						</label>
						<textarea
							id="courseDescription"
							name="courseDescription"
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						></textarea>
					</div>
					<div>
						<label htmlFor="estimatedTime">Estimated Time</label>
						<input
							id="estimatedTime"
							name="estimatedTime"
							type="text"
							onChange={(e) => {
								setEstimatedTime(e.target.value);
							}}
						/>

						<label htmlFor="materialsNeeded">
							Materials Needed
						</label>
						<textarea
							id="materialsNeeded"
							name="materialsNeeded"
							onChange={(e) => {
								setMaterialsNeeded(e.target.value);
							}}
						></textarea>
					</div>
				</div>
				<button className="button" type="submit">
					Create Course
				</button>
				<button className="button button-secondary" onClick={cancel}>
					Cancel
				</button>
			</form>
		</div>
	);
}

export default CreateCourse;
