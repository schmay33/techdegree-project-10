import config from "./config";

export default class Data {
	api(
		path,
		method = "GET",
		body = null,
		requiresAuth = false,
		credentials = null
	) {
		const url = config.apiUrl + path;

		const options = {
			method,
            body,
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
		};

		if (body !== null) {
			options.body = JSON.stringify(body);
		}

		if (requiresAuth) {
			const encodedCredentials = btoa(
				`${credentials.username}:${credentials.password}`
			);
			options.headers["Authorization"] = `Basic ${encodedCredentials}`;
		}
		return fetch(url, options);
	}
}
